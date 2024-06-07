/* eslint-disable react/prop-types */
import star from "../../assets/star.png";
import heart from "../../assets/heart.png";
import heartFilled from "../../assets/heart-filled.png";
import "./listofanime.css";
import { Context } from "../../Utils/Context";
import { useContext } from "react";

export default function ListOfAnime({ list }) {
  const { addFavorites, deleteFavorites, favorites, showAnimeModal } =
    useContext(Context);

  return (
    <>
      {list.map((anime) => (
        <li className="anime-grid" key={anime.mal_id}>
          <div className="anime-wrapper">
            {favorites.some((f) => f.mal_id === anime.mal_id) ? (
              <button
                className="anime-card-add-btn"
                onClick={(e) => deleteFavorites(anime, e)}
              >
                <img src={heartFilled} alt="delete" />
              </button>
            ) : (
              <button
                className="anime-card-add-btn"
                onClick={(e) => addFavorites(anime, e)}
              >
                <img src={heart} alt="favorite" />
              </button>
            )}
            <a onClick={(e) => showAnimeModal(anime, e)} className="anime-card">
              <div className="anime-card-poster--container">
                <img
                  className="anime-card-poster"
                  src={anime.images.jpg.image_url}
                  alt="anime poster"
                />
                <p className="anime-card-score">
                  <img src={star} alt="score" />
                  {anime.score === null ? 0 : anime.score}
                </p>
              </div>
              <div className="anime-information">
                <p className="anime-card-title">
                  {anime.title.length > 15
                    ? anime.title.slice(0, 13) + "..."
                    : anime.title}
                </p>
                <p className="anime-card-year">
                  {anime.aired?.string.includes("to")
                    ? anime.aired?.string.slice(
                        0,
                        anime.aired?.string.indexOf(" to ")
                      )
                    : anime.aired?.string}
                </p>
              </div>
            </a>
          </div>
        </li>
      ))}
    </>
  );
}
