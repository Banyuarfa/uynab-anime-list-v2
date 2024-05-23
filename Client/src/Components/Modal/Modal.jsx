/* eslint-disable react/prop-types */
import "./disclaimermodal.css";
import "./favoritemodal.css";
import "./animemodal.css";
import "./modal.css";
import translate from "translate";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../Utils/Context";
import ListOfAnime from "../../Components/ListOfAnime/ListOfAnime.jsx";
import { api } from "../../App.jsx";
import { getLocalStorage } from "../../Utils/LocalStorage.jsx";

export function DisclaimerModal() {
  return (
    <>
      <p className="disclaimer-text">
        UynabAnimeListV2 hanyalah situs kumpulan informasi dari berbagai anime
        seperti <a href="https://myanimelist.net">MAL</a>, bukan situs streaming
        anime. Situs ini masih banyak kekurangannya, jadi mohon dimaklumi jika
        masih ada bug. Jika kamu menemukan bug, silahkan laporkan kepada{" "}
        <a href="https://www.instagram.com/nyu_arfx/">Developer</a> melalui
        direct message instagram.
        <br />
        Situs ini merupakan versi terbarukan dari{" "}
        <a href="https://banyuarfa.github.io/UynabAnimeList/">
          UynabAnimeList
        </a>{" "}
        versi lama.
      </p>
    </>
  );
}

export function AnimeModal({ anime }) {
  const [translation, setTranslation] = useState("");
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    async function getEpisodes(id) {
      const fetchVideos = await fetch(`${api}/anime/${id}/videos`);
      const res = await fetchVideos.json();
      return res;
    }

    getEpisodes(anime.mal_id).then((res) => setEpisodes(res.data.episodes));
  }, [anime.mal_id]);

  translate.engine = "google";
  const w = translate(anime.synopsis, "id");
  w.then((res) => setTranslation(res)).catch(() =>
    setTranslation("belum diartikan")
  );

  return (
    <>
      <header className="anime-modal-header">
        <div
          className="anime-modal-header-background"
          style={{
            background: `url(${anime.images.jpg.image_url}) no-repeat center center / cover`,
          }}
        ></div>

        <div className="anime-modal-header-info">
          <h3 className="anime-modal-header-title">{anime.title}</h3>
          <p className="anime-modal-header-status">Status: {anime.status}</p>
          <p className="anime-modal-header-year">
            {anime.aired.string.includes("to")
              ? anime.aired.string.slice(0, anime.aired.string.indexOf(" to "))
              : anime.aired.string}
          </p>
          <p className="anime-modal-header-genre">
            Genre: {anime.genres.map((genre) => genre.name).join(", ")}
          </p>
          <p className="anime-modal-header-score">
            score {anime.score === null ? 0 : anime.score}
          </p>
        </div>
      </header>
      <section className="anime-modal-body">
        <details className="anime-modal-body-synopsis">
          <summary>Sinopsis</summary>
          <p>{translation || anime.synopsis}</p>
        </details>
        <div className="anime-modal-body-trailer-container">
          {anime.trailer.embed_url ? (
            <>
              <h3>Trailer</h3>
              <iframe
                className="anime-modal-body-trailer"
                src={anime.trailer.embed_url}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </>
          ) : (
            <h3>Trailer tidak tersedia</h3>
          )}
        </div>
        <div className="anime-modal-body-episodes">
          <h3>Episodes</h3>
          <ul className="anime-modal-body-episodes-list">
            {episodes.length === 0 && <p>Episode belum tersedia</p>}
            {episodes.map((episode) => {
              return (
                <>
                  <li
                    key={episode.id}
                    className="anime-modal-body-episodes-list-item"
                  >
                    <a href={episode.url}>
                      <img
                        src={episode.images.jpg.image_url}
                        alt={episode.title}
                      />
                      <p>{episode.episode}:</p>
                      <p>
                        {episode.title.length > 17
                          ? episode.title.slice(0, 17) + "..."
                          : episode.title}
                      </p>
                    </a>
                  </li>
                </>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}

export function FavoriteModal() {
  const { favorites } = useContext(Context);
  return (
    <ul className="favoritelist-list">
      {favorites.length === 0 ? (
        <p className="favoritelist-empty">Tambahkan favorite anime</p>
      ) : (
        <ListOfAnime list={getLocalStorage("favorites")} />
      )}
    </ul>
  );
}

export default function Modal({ children, title }) {
  const { setShowModal, showModal, setModalType } = useContext(Context);

  function modalHandleClick() {
    setShowModal(false);
    setModalType("");
  }

  return (
    <dialog className={`modal ${showModal ? "modal-active" : ""}`}>
      <div className="modal-overlay" onClick={modalHandleClick}></div>
      <div className="container">
        <div className="modal-header">
          <h1>{title}</h1>
          <button onClick={modalHandleClick}>back</button>
        </div>

        <div className="modal-content">{children}</div>
      </div>
    </dialog>
  );
}
