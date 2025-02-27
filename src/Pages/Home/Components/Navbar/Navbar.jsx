import "./navbar.css";
import menuBurger from "../../../../assets/menu-burger.svg";
import favList from "../../../../assets/wishlist-heart.png";
import { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../../../../Utils/Context";
import defaultuserpicture from "../../../../assets/defaultuserpicture.png";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import darkMode from "../../../../assets/night-mode.png";
import lightMode from "../../../../assets/light-mode.png";

export default function Navbar() {
  const [width, setWidth] = useState();
  const {
    dark,
    setDarkMode,
    showFavoriteModal,
    user,
    setUser,
    setCookie,
    removeCookie,
  } = useContext(Context);

  function sidebarHandleClick() {
    const sidebar = document.querySelector(".sidebar");
    sidebar.classList.toggle("sidebar-active");
  }

  function userProfileHandleClick() {
    const userMenu = document.querySelector(".user-menu");
    userMenu.classList.toggle("display-grid");
  }
  const header = useRef(null);
  useEffect(() => {
    window.addEventListener("resize", () => setWidth(() => window.innerWidth));
  }, [width]);

  return (
    <header ref={header} className="navbar">
      <nav className="container">
        <button className="sidebar-toggle" onClick={sidebarHandleClick}>
          <img src={menuBurger} alt="menu" />
        </button>
        <h1 className="navbar-title">UAL v2</h1>
        <ul className="navigation">
          <button onClick={setDarkMode}>
            <img src={dark === "dark-mode" ? darkMode : lightMode} alt="" />
          </button>
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
                <li className="user-menu-item">
                  <GoogleLogin
                    text="signin"
                    width={"20px"}
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
                </li>
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
