import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GetAllFeatuedImages,
  SetImageDetail,
} from "../../Redux/actions/actions";
import background_img from "../../Images/background_user_detail.jpg";
import wave from "../../Images/wave.svg";
import "./DetailUser.css";
import DetailImage from "../DetailImage/DetailImage";
import RightMenu from "../RightMenu/RightMenu";

export default function DetailUser() {
  const { user } = useSelector((state) => state.rootReducer.User);

  const FeaturedImages = useSelector(
    (state) => state.rootReducer.FeaturedImages
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetAllFeatuedImages(user.id));
  }, [dispatch]);

  return (
    <div className="full_container_detail">
      <img
        src={background_img}
        alt="background_img"
        className="full_container_detail_img"
      />
      <img src={wave} alt="wave" className="wave_svg" />
      <div className="container_user_detail">
        <div className="container_user_img">
          <img className="user_img_detail" src={user.user_image} alt="" />
          <span className="name_user_detail">{`${user.name} ${user.lastName}`}</span>
        </div>
        <div className="container_user_info">
          <span className="title_detail">Email</span>
          <span className="infomation_detail">{user.mail}</span>
          <span className="title_detail">Age</span>
          <span className="infomation_detail">{user.age}</span>
          <span className="title_detail">Gender</span>
          <span className="infomation_detail">{user.gender}</span>
        </div>
      </div>
      <div className="container_destacados">
        <span className="featured_detail_title">ℱ𝑒𝒶𝓉𝓊𝓇𝑒𝒹 ℐ𝓂𝒶𝑔𝑒𝓈</span>
        {FeaturedImages.length
          ? FeaturedImages.map((img) => (
              <img
                onClick={() => dispatch(SetImageDetail(img.id_image))}
                key={img.id_image}
                src={img.image_url}
                alt={img.id_image}
                className="gallery_single_image_user_detai"
              />
            ))
          : null}
      </div>
      <RightMenu />
      <DetailImage />
    </div>
  );
}
