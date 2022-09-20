import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ChangeAlertMessage,
  ChangeImageFormState,
  GetallFolders,
  GetAllImages,
  SaveFolderImage,
  SaveImage,
  SetImageDetail,
} from "../../Redux/actions/actions";
import DetailImage from "../DetailImage/DetailImage";
import FormCreateImage from "../FormCreateImage/FormCreateImage";
import Folders from "../Folders/Folders";
import RightMenu from "../RightMenu/RightMenu";
import home_background_img from "../../Images/home_background_img.jpg";
import "./Home.css";

export default function Home() {
  const dispatch = useDispatch();
  const [Image, setImage] = useState(null);
  const [ImageTitle, setImageTitle] = useState("");
  const [ErrorTitle, setErrorTitle] = useState("");
  const [ImageLoaded, setImageLoaded] = useState(false);

  const { user } = useSelector((state) => state.rootReducer.User);
  const Gallery = useSelector((state) => state.rootReducer.Gallery);
  const CurrentFolderId = useSelector(
    (state) => state.rootReducer.CurrentFolderId
  );

  useEffect(() => {
    dispatch(GetAllImages(user.mail));
    dispatch(GetallFolders());
  }, [dispatch, user]);

  const HandleChange = ({ target: { files } }) => {
    setImage(files[0]);
    setImageLoaded(true);
  };

  const HandleSubmit = () => {
    if (ImageTitle.length > 20) {
      setErrorTitle("Title cannot be longer than 20 characters");
    } else if (!Image || !ImageTitle) {
      setErrorTitle("Image and Title are both required");
    } else {
      const formData = new FormData();
      formData.append("image", Image);
      if (CurrentFolderId === 0) {
        dispatch(SaveImage(user.mail, ImageTitle, formData));
      } else {
        dispatch(SaveFolderImage(CurrentFolderId, ImageTitle, formData));
      }
      setErrorTitle("");
      setImageLoaded(false);
      dispatch(ChangeImageFormState());
      dispatch(ChangeAlertMessage("Image saved successfully"));
    }
  };

  const HandleDetailImage = (id) => {
    dispatch(SetImageDetail(id));
  };

  return (
    <div className="container_home">
      <FormCreateImage
        HandleChange={HandleChange}
        HandleSubmit={HandleSubmit}
        ImageLoaded={ImageLoaded}
        setImageTitle={setImageTitle}
        ErrorTitle={ErrorTitle}
        setErrorTitle={setErrorTitle}
      />
      <img
        src={home_background_img}
        alt="home background image"
        className="home_background_image"
      />
      <div className="container_gallery">
        {Gallery.length ? (
          Gallery.map((img) => (
            <div className="cont_gallery_single_image">
              <img
                onClick={() => HandleDetailImage(img.id_image)}
                key={img.id_image}
                className="gallery_single_image img1"
                src={img.image_url}
                alt={img.title}
              />
              <span className="gallery_single_image_title">{img.title}</span>
            </div>
          ))
        ) : (
          <div></div>
        )}
      </div>
      <Folders />
      <RightMenu />
      <DetailImage />
    </div>
  );
}
