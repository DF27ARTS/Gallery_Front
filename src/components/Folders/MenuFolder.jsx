import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { RiChatDeleteFill } from "react-icons/ri";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { BsCalendar2DateFill } from "react-icons/bs";
import { BsPencilSquare } from "react-icons/bs";
import {
  DeleteFolder,
  GetFolderImages,
  UpdateFolderName,
} from "../../Redux/actions/actions";
import "./MenuFolder.css";

export default function MenuFolder({ folder }) {
  const dispatch = useDispatch();
  const [Menu_Folder, setMenu_Folder] = useState(false);
  const [Folder_detail, setFolder_detail] = useState(false);
  const [Folder_delete, setFolder_delete] = useState(false);
  const [Folder_update, setFolder_update] = useState(false);
  const [InputUpdateFolder, setInputUpdateFolder] = useState("");

  const SetDeleteFolder = () => {
    setFolder_delete(!Folder_delete);
    setFolder_detail(true);
    setFolder_update(false);
  };

  const SetDetailFolder = () => {
    setFolder_detail(!Folder_detail);
    setFolder_delete(false);
    setFolder_update(false);
  };

  const SetUpdateFolder = () => {
    setFolder_update(!Folder_update);
    setFolder_delete(false);
    setFolder_detail(true);
  };

  const HandleGetFolderImages = () => {
    dispatch(GetFolderImages(folder.id));
  };

  return (
    <>
      <span
        key={folder.id}
        onClick={() => HandleGetFolderImages()}
        className="single_folder"
      >
        {folder.folder_img ? (
          <img
            src={folder.folder_img}
            alt={folder.name}
            className="folder_background_img"
          />
        ) : null}
        <div
          className={
            Menu_Folder
              ? "cont_menu_folder"
              : "cont_menu_folder cont_menu_folder_block"
          }
        >
          <div
            className={
              Folder_detail
                ? "cont_folder_detail"
                : "cont_folder_detail cont_folder_detail_block"
            }
          >
            <span className="folder_date">{folder.createdAt.slice(0, 10)}</span>
            <span className="folder_date">
              {folder.createdAt.slice(11, 19)}
            </span>
          </div>
          <div
            className={
              !Folder_delete
                ? "cont_folder_detail"
                : "cont_folder_detail cont_folder_detail_block"
            }
          >
            <div className="delte_spans_text">Delete Folder</div>
            <div
              className="delte_spans_btn"
              onClick={() => dispatch(DeleteFolder(folder.id))}
            >
              DELETE
            </div>
          </div>
          <div
            className={
              !Folder_update
                ? "cont_folder_detail btn_update_folder_extra"
                : "cont_folder_detail btn_update_folder_extra cont_folder_detail_block"
            }
          >
            <input
              onChange={({ target: { value } }) => setInputUpdateFolder(value)}
              type="text"
              className="input_update_folder"
            />
            <button
              onClick={() =>
                dispatch(
                  UpdateFolderName({
                    name: InputUpdateFolder,
                    folder_id: folder.id,
                  })
                )
              }
              className="btn_update_folder"
            >
              Update
            </button>
          </div>
          <RiChatDeleteFill
            onClick={() => SetDeleteFolder()}
            className="folder_icons"
          />
          <BsCalendar2DateFill
            onClick={() => SetDetailFolder()}
            className="folder_icons"
          />
          <BsPencilSquare
            onClick={() => SetUpdateFolder()}
            className="folder_icons"
          />
        </div>
        <div className="show_menu">
          <BiDotsVerticalRounded
            onClick={() => setMenu_Folder(!Menu_Folder)}
            className="open_and_close_folder_menu"
          />
        </div>
        {folder.name}
      </span>
    </>
  );
}
