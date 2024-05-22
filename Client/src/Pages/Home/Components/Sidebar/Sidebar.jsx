import "./sidebar.css";
import { Context } from "../../../../Utils/Context";
import { useContext } from "react";

export default function Sidebar() {
  const { movieList } = useContext(Context);

  function handleClick(url) {
    const sidebar = document.querySelector(".sidebar");
    sidebar.classList.toggle("sidebar-active");
    return movieList(url);
  }
  return (
    <>
      <aside className="sidebar">
        <div className="container">
          <ul>
            <li>
              <button onClick={() => handleClick("/top/anime")}>
                Discover
              </button>
            </li>
            <li>
              <button onClick={() => handleClick("/seasons/now")}>
                Season Now
              </button>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}
