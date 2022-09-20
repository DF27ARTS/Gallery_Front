import React, { useState } from "react";
import "./DetailImage.css";
import { MdOutlineLabelImportant } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { FaFeatherAlt } from "react-icons/fa";
import {
  DeleteImage,
  DisableImageDetail,
  MoveDetailImageBackward,
  MoveDetailImageForward,
  UpdateImageFeaturedPropery,
  UpdateImageTitle,
} from "../../Redux/actions/actions";
import { useHistory } from "react-router-dom";

export default function DetailImage() {
  const dispatch = useDispatch();
  const Image = useSelector((state) => state.rootReducer.SingleImage);
  const gallery = useSelector((state) => state.rootReducer.Gallery);
  const {
    user: { id },
  } = useSelector((state) => state.rootReducer.User);
  const featuredImages = useSelector(
    (state) => state.rootReducer.FeaturedImages
  );
  const [RightMenu, setRightMenu] = useState(false);
  const [ActiveDetail, setActiveDetail] = useState(false);
  const [ActiveDelete, setActiveDelete] = useState(false);
  const [ActiveUpdate, setActiveUpdate] = useState(false);
  const [InputImageDetail, setInputImageDetail] = useState("");
  const [Featured, setFeatured] = useState(false);
  const History = useHistory();
  const PathName = History.location.pathname; // /detail
  const DetailActive = useSelector(
    (state) => state.rootReducer.DetailImageState
  );

  const Gallery =
    PathName !== "/detail"
      ? gallery.length && gallery
      : featuredImages.length && featuredImages;

  const Mforward =
    Image &&
    Gallery.length &&
    Image.id_image === Gallery[Gallery.length - 1].id_image
      ? true
      : false;
  const Mbackward =
    Image && Gallery.length && Image.id_image === Gallery[0].id_image
      ? true
      : false;

  const HandleDeleteImage = () => {
    dispatch(DeleteImage(Image));
  };

  const HandleActiveDetail = () => {
    setActiveDetail(!ActiveDetail);
    setActiveDelete(false);
    setActiveUpdate(false);
  };

  const HandleActiveDelete = () => {
    setActiveDelete(!ActiveDelete);
    setActiveDetail(false);
    setActiveUpdate(false);
  };

  const HandleActiveUpdate = () => {
    setActiveUpdate(!ActiveUpdate);
    setActiveDelete(false);
    setActiveDetail(false);
  };

  const HandleRightMenu = () => {
    setActiveUpdate(false);
    setActiveDelete(false);
    setActiveDetail(false);
    setRightMenu(!RightMenu);
  };

  const HandleAddToFeature = () => {
    dispatch(
      UpdateImageFeaturedPropery({
        id_image: Image.id_image,
        value: !Image.featured,
      })
    );
    setFeatured(!Featured);
    if (PathName === "/detail") {
      dispatch(DisableImageDetail());
    }
  };

  const HandleCloseMenuDetail = () => {
    dispatch(DisableImageDetail());
    setRightMenu(false);
  };

  return (
    <>
      <div
        className={
          DetailActive ? "container_detail" : "container_detail C_D_block"
        }
      >
        <div className="cont_single_img_detail">
          <img
            onClick={() => HandleCloseMenuDetail()}
            className="detail_image"
            src={Image.image_url}
            alt={Image.title}
          />
          <div
            className={
              !RightMenu
                ? "container_settings"
                : "container_settings container_settings_active"
            }
          >
            <span
              onClick={() => HandleActiveDetail()}
              className="setting_img_detail"
            >
              Image Detail
            </span>
            {ActiveDetail ? (
              <div className="cont_img_detail_sittings">
                <span className="img_detail_title">{Image.title}</span>
                <span className="img_detail_dateTitle">Date</span>
                <span className="img_detail_info">
                  {Image.createdAt.slice(0, 10)}
                </span>
                <span className="img_detail_info">
                  {Image.createdAt.slice(11, 19)}
                </span>
              </div>
            ) : null}
            <span
              onClick={() => HandleActiveDelete()}
              className="setting_img_detail"
            >
              Delete Image
            </span>
            {ActiveDelete ? (
              <div className="cont_img_detail_sittings">
                <span className="img_detail_delete_msg">Are you sure ?</span>
                <span className="img_detail_delete_msg">
                  This action is irreversible
                </span>
                <button
                  onClick={() => HandleDeleteImage()}
                  className="img_detail_delete_btn"
                >
                  DELETE
                </button>
              </div>
            ) : null}
            <span
              onClick={() => HandleActiveUpdate()}
              className="setting_img_detail"
            >
              Rename Image
            </span>
            {ActiveUpdate ? (
              <div className="cont_img_detail_sittings">
                <div className="container_single_input">
                  <input
                    onChange={({ target: { value } }) =>
                      setInputImageDetail(value)
                    }
                    type="text"
                    placeholder=" "
                    className="input_form_img_detail"
                  />
                  <span className="span_input_img_detail">Image Name</span>
                </div>
                <button
                  onClick={() =>
                    dispatch(
                      UpdateImageTitle({
                        title: InputImageDetail,
                        id_image: Image.id_image,
                        id_user: id,
                      })
                    )
                  }
                  className="btn_form_img_detail"
                >
                  Rename Image
                </button>
              </div>
            ) : null}
          </div>
          <MdOutlineLabelImportant
            onClick={() => HandleAddToFeature()}
            className={
              Image.featured
                ? "featured_btn_active featured_btn"
                : "featured_btn"
            }
          />
          {Image.featured ? (
            <button className="message_fetaured_btn">
              Remove from Featured
            </button>
          ) : (
            <button className="message_fetaured_btn">Add to Featured</button>
          )}
          <BiDotsVerticalRounded
            onClick={() => HandleRightMenu()}
            className="right_menu_detail"
          />
          <button className="right_menu_message">Menu</button>
        </div>
        {!Mforward ? (
          <IoIosArrowForward
            className="arrows Right"
            onClick={() =>
              dispatch(
                MoveDetailImageForward(
                  Image?.id_image,
                  PathName !== "/detail" ? "gallery" : "detail"
                )
              )
            }
          />
        ) : null}
        {!Mbackward ? (
          <IoIosArrowBack
            className="arrows Left"
            onClick={() =>
              dispatch(
                MoveDetailImageBackward(
                  Image?.id_image,
                  PathName !== "/detail" ? "gallery" : "detail"
                )
              )
            }
          />
        ) : null}
      </div>
    </>
  );
}
