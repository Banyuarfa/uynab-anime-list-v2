import "./sidebar.css";
import { Context } from "../../../../Utils/Context";
import { useContext, useRef } from "react";
import { getLocalStorage } from "../../../../Utils/LocalStorage";

export default function Sidebar() {
  const { movieList } = useContext(Context);

  function handleClick(url) {
    const sidebar = document.querySelector(".sidebar");
    sidebar.classList.toggle("sidebar-active");
    return movieList(url);
  }
  const aside = useRef(null);

  return (
    <>
      <aside ref={aside} className={`sidebar ${getLocalStorage("darkMode")} `}>
        <div className="container">
          <ul>
            <li>
              <button onClick={() => handleClick("/anime")}>Anime</button>
            </li>
            <li>
              <button onClick={() => handleClick("/top/anime")}>
                Top Anime
              </button>
            </li>
            <li>
              <button onClick={() => handleClick("/seasons/now")}>
                Anime Season Now
              </button>
            </li>
            <li>
              <button onClick={() => handleClick("/seasons/upcoming")}>
                Upcoming Anime Season
              </button>
            </li>
            <li>
              <button onClick={() => handleClick("/schedules")}>
                Anime Schedule
              </button>
            </li>
            <li>
              <button onClick={() => handleClick("/manga")}>Manga</button>
            </li>
            <li>
              <button onClick={() => handleClick("/top/manga")}>
                Top Manga
              </button>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}
