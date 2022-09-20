import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CreateNewFolder, GetAllImages } from "../../Redux/actions/actions";

import "./Folders.css";
import MenuFolder from "./MenuFolder";

export default function Folders() {
  const dispatch = useDispatch();
  const [InputFolder, setInputFolder] = useState("");
  const Gallery = useSelector((state) => state.rootReducer.Gallery);
  const {
    user: { id, mail },
  } = useSelector((state) => state.rootReducer.User);
  const Folders = useSelector((state) => state.rootReducer.Folders);

  const HandleSubmit = () => {
    dispatch(CreateNewFolder(InputFolder, id));
    setInputFolder("");
  };

  return (
    <div className="container_folders">
      <div className="cont_input_folder">
        <input
          onChange={({ target: { value } }) => setInputFolder(value)}
          placeholder=" "
          id="input_folder"
          type="text"
          value={InputFolder}
        />
        <label className="label_input_folder" htmlFor="input_folder">
          Folder Title
        </label>
        <button onClick={() => HandleSubmit()} className="btn_input_folder">
          Create Folder
        </button>
      </div>
      <div className="cont_folders">
        {!Gallery[0] ? (
          <span
            onClick={() => dispatch(GetAllImages(mail))}
            className="single_folder"
          >
            Main Folder
          </span>
        ) : (
          <div className="cont_main_folder">
            <img
              onClick={() => dispatch(GetAllImages(mail))}
              src={Gallery[0].image_url}
              alt={Gallery[0].title}
              className="main_folder_background_img"
            />
            <span className="main_folder_title">Main Folder</span>
          </div>
        )}
        {Folders.length ? (
          Folders.map((folder) => (
            <MenuFolder key={folder.id} folder={folder} />
          ))
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
