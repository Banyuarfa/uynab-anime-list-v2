/* eslint-disable react-hooks/exhaustive-deps */
import Home from "./Pages/Home/Home";
import Navbar from "./Pages/Home/Components/Navbar/Navbar.jsx";
import Sidebar from "./Pages/Home/Components/Sidebar/Sidebar.jsx";
import { useEffect, useState } from "react";
import { Context } from "./Utils/Context.jsx";
import Modal, {
  AnimeModal,
  FavoriteModal,
  DisclaimerModal,
} from "./Components/Modal/Modal.jsx";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import { getLocalStorage, setLocalStorage } from "./Utils/LocalStorage.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { CookiesProvider } from "react-cookie";
export const api = "https://api.jikan.moe/v4";

function Children() {
  const [animes, setAnimes] = useState([]);
  const [url, setUrl] = useState("");
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [modalType, setModalType] = useState("");
  const [loading, setLoading] = useState(false);
  const [clickedAnime, setClickedAnime] = useState({});
  const [user, setUser] = useState(null);
  const [query, setQuery] = useState("");

  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  function showAnimeModal(anime, e) {
    e.preventDefault();
    setShowModal(true);
    setModalType("anime");
    setClickedAnime(anime);
  }

  function showFavoriteModal() {
    setShowModal(true);
    setModalType("favorite");
  }

  function pageUp() {
    setPage((page) => page + 1);
  }
  function pageDown() {
    setPage((page) => page - 1);
  }

  function movieList(value) {
    setUrl(value);
  }

  function addFavorites(anime) {
    favorites.includes(anime)
      ? alert("Anime Sudah Di Tambahkan")
      : setFavorites((favorites) => [...favorites, anime]);
    setLocalStorage("favorites", favorites);
  }
  function deleteFavorites(anime) {
    const trash = favorites.filter((f) => f.mal_id !== anime.mal_id);
    setFavorites(trash);
  }

  async function getAnimes(url, page, query) {
    setLoading(true);
    try {
      const animes = await fetch(
        `${api}${url || "/top/anime"}?page=${page}&q=${query || ""}&sfw=true`
      );
      const res = await animes.json();
      return res;
    } catch (error) {
      return error;
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getAnimes(url, page, query).then((res) => {
      setAnimes(res.data);
      setMaxPage(res.pagination.last_visible_page);
    });
  }, [url, page, query]);

  useEffect(() => {
    cookies.user ? setUser(jwtDecode(cookies.user)) : setUser(null);
    getLocalStorage("favorites") && setFavorites(getLocalStorage("favorites"));
  }, []);

  useEffect(() => {
    setTimeout(() => {
      favorites !== null && setLocalStorage("favorites", favorites);
    }, 10);
  }, [favorites]);

  useEffect(() => {
    setModalType("disclaimer");
    setShowModal(true);
  }, []);

  return (
    <Context.Provider
      value={{
        animes,
        setPage,
        page,
        pageUp,
        pageDown,
        movieList,
        favorites,
        addFavorites,
        deleteFavorites,
        setShowModal,
        showModal,
        showAnimeModal,
        showFavoriteModal,
        maxPage,
        loading,
        setLoading,
        setModalType,
        user,
        setUser,
        setCookie,
        removeCookie,
        setQuery,
        setUrl,
      }}
    >
      {modalType === "disclaimer" && (
        <Modal title={"Disclaimer"}>
          <DisclaimerModal />
        </Modal>
      )}
      {modalType === "favorite" && (
        <Modal title={"Favorite List"}>
          <FavoriteModal />
        </Modal>
      )}
      {modalType === "anime" && (
        <Modal title={"Anime Detail"}>
          <AnimeModal anime={clickedAnime} />
        </Modal>
      )}
      <Navbar />
      <Sidebar />
      <main>
        <Home />
      </main>
    </Context.Provider>
  );
}

export default function App() {
  return (
    <GoogleOAuthProvider clientId={process.env.VITE_GOOGLE_CLIENT_ID}>
      <CookiesProvider defaultSetOptions={{ path: "/" }}>
        <Children />
      </CookiesProvider>
    </GoogleOAuthProvider>
  );
}
