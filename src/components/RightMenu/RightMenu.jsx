import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GetallFolders,
  GetFolderImages,
  Log_out,
} from "../../Redux/actions/actions";
import { BiDotsVerticalRounded } from "react-icons/bi";

import "./RightMenu.css";
import { Link, useHistory } from "react-router-dom";

export default function RightMenu() {
  const { user } = useSelector((state) => state.rootReducer.User);
  const [RightMenu, setRightMenu] = useState(false);
  const dispatch = useDispatch();
  const Folders = useSelector((state) => state.rootReducer.Folders);
  const History = useHistory();
  const PathName = History.location.pathname; // /detail

  useEffect(() => {
    dispatch(GetallFolders());
  }, [dispatch]);

  const HandleClick = (id) => {
    dispatch(GetFolderImages(id));
    setRightMenu(false);
  };

  return (
    <>
      <div className="user_menu">
        {user ? (
          <>
            <div className="cont_image">
              <Link to="/detail">
                <img
                  className="user_image"
                  src={user.user_image}
                  alt={user.name}
                />
              </Link>
            </div>

            <BiDotsVerticalRounded
              onClick={() => setRightMenu(true)}
              className={
                PathName === "/home" ? "user_menu_icon" : "user_menu_icon white"
              }
            />
          </>
        ) : null}
      </div>
      <div
        className={
          RightMenu
            ? "container_menu_background"
            : "container_menu_background block_r_m"
        }
      >
        <div className="container_right_menu">
          {user ? (
            <>
              <Link to="/detail">
                <img
                  className="right_image_active"
                  src={user.user_image}
                  alt={user.name}
                />
              </Link>
              <BiDotsVerticalRounded
                onClick={() => setRightMenu(false)}
                className={"right_icon_active"}
              />
            </>
          ) : null}
          <div className="settings">
            <div className="cont_links">
              <Link to="/home">
                <button className="rightMenu_links">Home</button>
              </Link>
              <Link to="/detail">
                <button className="rightMenu_links">User Detail</button>
              </Link>
            </div>
            {Folders.length
              ? Folders.map((folder) => (
                  <Link
                    to="/home"
                    key={folder.id}
                    onClick={() => HandleClick(folder.id)}
                    className="folders_right_menu"
                  >
                    {folder.name}
                  </Link>
                ))
              : null}
          </div>
          <button onClick={() => dispatch(Log_out())} className="btn_log_out">
            Log out
          </button>
        </div>
      </div>
    </>
  );
}
