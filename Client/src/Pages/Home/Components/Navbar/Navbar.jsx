import "./navbar.css";
import menuBurger from "../../../../assets/menu-burger.svg";
import favList from "../../../../assets/wishlist-heart.svg";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../../../Utils/Context";
import defaultuserpicture from "../../../../assets/defaultuserpicture.png";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

export default function Navbar() {
  const [width, setWidth] = useState();
  const { showFavoriteModal, user, setUser, setCookie, removeCookie } =
    useContext(Context);

  function sidebarHandleClick() {
    const sidebar = document.querySelector(".sidebar");
    sidebar.classList.toggle("sidebar-active");
  }

  function userProfileHandleClick() {
    const userMenu = document.querySelector(".user-menu");
    userMenu.classList.toggle("display-grid");
  }

  useEffect(() => {
    window.addEventListener("resize", () => setWidth(() => window.innerWidth));
  }, [width]);

  return (
    <header className="navbar">
      <nav className="container">
        <button className="sidebar-toggle" onClick={sidebarHandleClick}>
          <img src={menuBurger} alt="menu" />
        </button>
        <h1 className="navbar-title">UynabAnimeList</h1>
        <ul className="navigation">
          {width >= 768 ? (
            <>
              <li
                onClick={(e) => showFavoriteModal(e)}
                className="navigation-button"
              >
                <button className="addtofavorite-button">
                  <img src={favList} alt="favorit" />
                </button>
              </li>
            </>
          ) : (
            <></>
          )}
          <li
            onClick={userProfileHandleClick}
            className="user navigation-button"
          >
            <p>{user ? user.name : "Guest"}</p>
            <img
              id="user"
              src={user ? user.picture : defaultuserpicture}
              alt={user ? user.name : "user"}
            />
            <ul className="user-menu">
              <li className="user-menu-item">
                <button onClick={(e) => showFavoriteModal(e)}>Favorite</button>
              </li>
              {user ? (
                <li className="user-menu-item">
                  <button
                    onClick={() => {
                      removeCookie("user");
                      window.location.reload();
                    }}
                  >
                    Log Out
                  </button>
                </li>
              ) : (
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    const decoded = jwtDecode(credentialResponse.credential);
                    setUser(decoded);
                    setCookie("user", credentialResponse.credential, {
                      expires: new Date(decoded.exp * 1000),
                    });
                  }}
                  onError={() => {
                    alert("Login Failed");
                  }}
                />
              )}
            </ul>
          </li>
        </ul>
      </nav>
      <input
        className="navbar-search"
        id="navbar-search"
        type="search"
        autoComplete="on"
        placeholder="Cari Film"
      />
    </header>
  );
}
