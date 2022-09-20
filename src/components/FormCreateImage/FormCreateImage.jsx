import React from "react";
import { ImArrowRight2 } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { ChangeImageFormState } from "../../Redux/actions/actions";
import "./FormCreateImage.css";

export default function FormCreateImage({
  HandleChange,
  HandleSubmit,
  ImageLoaded,
  setImageTitle,
  ErrorTitle,
  setErrorTitle,
}) {
  const dispatch = useDispatch();
  const ImageFormState = useSelector(
    (state) => state.rootReducer.ImageFormState
  );

  const HandleChangeTitle = ({ target: { value } }) => {
    setImageTitle(value);
  };

  const HandleSubmitForm = () => {
    HandleSubmit();
  };

  const ChangeFormState = () => {
    dispatch(ChangeImageFormState());
    setErrorTitle("");
  };

  return (
    <>
      <div className="navbar">
        {ImageFormState ? (
          <div className="container_form_img">
            <div className="cont_text">
              <input
                id="img_text"
                onChange={(e) => HandleChangeTitle(e)}
                type="text"
                placeholder=" "
                className="input_title"
              />
              <label className="label_title" htmlFor="img_text">
                Image Title
              </label>
            </div>

            <input
              id="inputFile"
              onChange={(e) => HandleChange(e)}
              type="file"
            />
            <label
              className={
                ImageLoaded
                  ? "upload_image upload_image_selected"
                  : "upload_image"
              }
              htmlFor="inputFile"
            >
              Upload Image
            </label>
            <span className="error_label_img_form">{ErrorTitle}</span>
            <button className="save_img" onClick={() => HandleSubmitForm()}>
              Save
            </button>
            <ImArrowRight2
              onClick={() => ChangeFormState()}
              className="goBack_btn"
            />
          </div>
        ) : (
          <>
            <span className="msg_upload_img" onClick={() => ChangeFormState()}>
              Upload Image
            </span>
          </>
        )}
      </div>
    </>
  );
}
