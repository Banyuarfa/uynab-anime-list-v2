/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { Context } from "../../Utils/Context.jsx";
import "./home.css";
import ListOfAnime from "../../Components/ListOfAnime/ListOfAnime.jsx";

function Header() {
  const { setQuery, setUrl, setPage } = useContext(Context);
  const [searchValue, setSearchValue] = useState("");

  function onSearch(e) {
    setUrl("/anime");
    setPage(1);
    setSearchValue(e.target.value);
  }

  function submitHandle() {}
  return (
    <div className="header-container">
      <div className="header-background" />
      <div className="header-content">
        <h1 className="header-title">Halo Nakama!</h1>
        <p className="header-subtitle">Welcome to UynabAnimeList V2</p>
        <input
          placeholder="Cari Anime"
          className="header-search"
          type="search"
          name=""
          id="navbar-search"
          onChange={(e) => onSearch(e)}
          autoComplete="off"
        />
        <select
          onClick={submitHandle}
          className="header-search-button"
          onChange={(e) => {
            setUrl(e.target.value);
            setQuery(searchValue);
          }}
          type="button"
          name="cari"
        >
          <option value="/anime">Anime</option>
          <option value="/manga">Manga</option>
        </select>
      </div>
    </div>
  );
}

function Main() {
  const { animes, loading } = useContext(Context);
  return (
    <div className="main">
      <h1>Animes/Mangas</h1>
      {animes?.length === 0 && <h2>Tidak ada anime</h2>}

      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <ul className="anime-grid--container">
          <ListOfAnime list={animes} />
        </ul>
      )}

      <Pages />
    </div>
  );
}

function Pages() {
  const { setPage, page, pageUp, pageDown, maxPage } = useContext(Context);

  function inputPage() {
    const input = prompt("Masukkan halaman yang ingin ditampilkan");

    isNaN(input) || input === "" || input > maxPage || input < 1
      ? alert("Halaman Tidak Ada")
      : setPage(Number(input));
  }

  return (
    <div className="page">
      <button
        disabled={page <= 1 ? true : false}
        onClick={pageDown}
        className="page-button"
      >
        -
      </button>
      <p onClick={inputPage} className="page-number">
        {page + "/" + maxPage}
      </p>
      <button className="page-button" onClick={pageUp}>
        +
      </button>
    </div>
  );
}

function Footer() {
  return (
    <footer className="footer">
      Made with ❤️ by <a href="https://www.instagram.com/nyu_arfx/">Dev</a>
    </footer>
  );
}
export default function Home() {
  return (
    <section className="home-page">
      <Header />
      <Main />
      <Footer />
    </section>
  );
}
