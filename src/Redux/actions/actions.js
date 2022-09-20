import axios from "axios";
import { setToken, getToken, deleteToken } from "../helpers/Token.js";
import { setEmail, getEmail } from "../helpers/Mail.js";
export const AUTHENTICATED = "AUTHENTICATED";
export const UNAUTHORISED = "UNAUTHORISED";
export const CHANGE_ALERT_MESSAGE = "CHANGE_ALERT_MESSAGE";
export const CLOSE_ALERT_MESSAGE = "CLOSE_ALERT_MESSAGE";
export const SAVE_IMAGE = "SAVE_IMAGE";
export const GET_ALL_IMAGES = "GET_ALL_IMAGES";
export const CLEAR_GALLERY = "CLEAR_GALLERY";
export const SET_IMAGE_DETAIL = "SET_IMAGE_DETAIL";
export const MOVE_FORWARD = "MOVE_FORWARD";
export const MOVE_BACKWARD = "MOVE_BACKWARD";
export const DELETE_IMAGE = "DELETE_IMAGE";
export const ENABLE_IMAGE_DETAIL = "ENABLE_IMAGE_DETAIL";
export const DISABLE_IMAGE_DETAIL = "DISABLE_IMAGE_DETAIL";
export const NEW_FOLDER_CREATED = "NEW_FOLDER_CREATED";
export const GET_ALL_FOLDERS = "GET_ALL_FOLDERS";
export const DELETE_FOLDER = "DELETE_FOLDER";
export const UPDATE_FOLDER = "UPDATE_FOLDER";
export const UPDATE_IMAGE_TITLE = "UPDATE_IMAGE_TITLE";
export const CHANGE_IMAGE_FEATURED = "CHANGE_IMAGE_FEATURED";
export const GET_ALL_FEATURED_IMAGES = "GET_ALL_FEATURED_IMAGES";
export const GET_FOLDER_IMAGES = "GET_FOLDER_IMAGES";
export const CHANGE_IMAGE_FORM_STATE = "CHANGE_IMAGE_FORM_STATE";

// const url = "http://localhost:3001";
const url = "https://gallery-api-register.herokuapp.com";

export const UserInscription =
  ({ userImage, userInfomation }) =>
  async (dispatch) => {
    try {
      let response;
      try {
        response = await axios.post(`${url}/gallery/userImage`, userImage);
      } catch (error) {
        console.log(error);
      }

      const User = {
        user_image: response?.data,
        name: userInfomation.name,
        lastName: userInfomation.lastName,
        age: userInfomation.age,
        mail: userInfomation.mail,
        gender: userInfomation.gender,
        password: userInfomation.password,
        authenticated: true,
      };

      const {
        data: {
          user: { dataValues },
          token,
        },
      } = await axios.post(`${url}/auth/registration`, User);
      setToken(token);
      setEmail(dataValues.mail);
      return dispatch({
        type: AUTHENTICATED,
        payload: dataValues,
      });
    } catch (error) {
      dispatch({
        type: CHANGE_ALERT_MESSAGE,
        payload: "User mail already exist",
      });
    }
  };

export const verifyUserToken = () => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `${url}/auth/verifyLogoutUser?user_mail=${getEmail()}`
    );
    if (data === "OK") {
      const {
        data: { dataValues },
        statusText,
      } = await axios.get(`${url}/auth/verifytoken`, {
        headers: {
          Authorization: getToken(),
        },
      });

      statusText === "OK"
        ? dispatch({
            type: AUTHENTICATED,
            payload: dataValues,
          })
        : dispatch({
            type: UNAUTHORISED,
          });
    }
  } catch (error) {
    dispatch({
      type: UNAUTHORISED,
    });
  }
};

export const Sign_Up = (User) => async (dispatch) => {
  try {
    const {
      data: {
        token,
        user: { dataValues },
      },
    } = await axios.post(`${url}/auth/logIn`, User);
    setToken(token);
    setEmail(dataValues.mail);
    return dispatch({
      type: AUTHENTICATED,
      payload: dataValues,
    });
  } catch (error) {
    dispatch({
      type: CHANGE_ALERT_MESSAGE,
      payload: "User mail or password incorrect",
    });
  }
};

export const Log_out = () => async (dispatch) => {
  try {
    dispatch({
      type: CLEAR_GALLERY,
    });
    await axios.put(`${url}/auth/logoutUser`, { user_mail: getEmail() });
    deleteToken();
    // deleteEmail();
    return dispatch({
      type: UNAUTHORISED,
    });
  } catch (error) {
    dispatch({
      type: CHANGE_ALERT_MESSAGE,
      payload: "Log out failed",
    });
  }
};

////////////////////////////////////////////////////////////////

// Gallery Routes

////////////////////////////////////////////////////////////////

export const ChangeAlertMessage = (text) => {
  return {
    type: CHANGE_ALERT_MESSAGE,
    payload: text,
  };
};

export const CloseAlertMessage = () => {
  return {
    type: CLOSE_ALERT_MESSAGE,
  };
};

export const SaveImage = (user_mail, title, formDats) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      `${url}/gallery/save?user_mail=${user_mail}&title=${title}`,
      formDats
    );
    dispatch({
      type: SAVE_IMAGE,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CHANGE_ALERT_MESSAGE,
      payload: "There's been an error saving the image",
    });
  }
};

export const GetAllImages = (mail) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${url}/gallery?mail=${mail}`);
    dispatch({
      type: GET_ALL_IMAGES,
      payload: data.Images,
    });
  } catch (error) {
    dispatch({
      type: CHANGE_ALERT_MESSAGE,
      payload: "There's been an error",
    });
  }
};

export const DeleteImage = (image) => async (dispatch) => {
  try {
    const public_id = image.image_url.split("/")[7].split(".")[0];
    await axios.delete(`${url}/gallery/delete/${image.id_image}/${public_id}`);
    return dispatch({
      type: DELETE_IMAGE,
      payload: image.id_image,
    });
  } catch (error) {
    return dispatch({
      type: CHANGE_ALERT_MESSAGE,
      payload: "The Image could not be deleted",
    });
  }
};

export const SetImageDetail = (id) => {
  return {
    type: SET_IMAGE_DETAIL,
    payload: id,
  };
};

export const MoveDetailImageForward = (id, value) => {
  return {
    type: MOVE_FORWARD,
    payload: { id, value },
  };
};

export const MoveDetailImageBackward = (id, value) => {
  return {
    type: MOVE_BACKWARD,
    payload: { id, value },
  };
};

export const EnableImageDetail = () => {
  return { type: ENABLE_IMAGE_DETAIL };
};

export const DisableImageDetail = () => {
  return { type: DISABLE_IMAGE_DETAIL };
};

export const CreateNewFolder = (title, userId) => async (dispatch) => {
  try {
    const info = {
      folderName: title,
      user_id: userId,
    };
    const { data } = await axios.post(`${url}/gallery/folder`, info);
    return dispatch({
      type: NEW_FOLDER_CREATED,
      payload: data,
    });
  } catch (error) {
    return dispatch({
      type: CHANGE_ALERT_MESSAGE,
      payload: "There's been a problem creating the folder",
    });
  }
};

export const GetallFolders = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${url}/gallery/folder`);
    return dispatch({
      type: GET_ALL_FOLDERS,
      payload: data,
    });
  } catch (error) {
    return dispatch({
      type: CHANGE_ALERT_MESSAGE,
      payload: "There's been a problem getting the Folders",
    });
  }
};

export const UpdateFolderName = (newFolder) => async (dispatch) => {
  try {
    const { data } = await axios.put(`${url}/gallery/folder`, newFolder);
    return dispatch({
      type: UPDATE_FOLDER,
      payload: data,
    });
  } catch (error) {
    return dispatch({
      type: CHANGE_ALERT_MESSAGE,
      payload: "There's been a problem updating the Folder",
    });
  }
};

export const DeleteFolder = (id) => async (dispatch) => {
  try {
    try {
      await axios.get(`${url}/gallery/folderLength?folder_id=${id}`);
    } catch (error) {
      return dispatch({
        type: CHANGE_ALERT_MESSAGE,
        payload: "The folder contains images it cannot be deleted",
      });
    }
    await axios.delete(`${url}/gallery/folder?folder_id=${id}`);
    return dispatch({
      type: DELETE_FOLDER,
      payload: id,
    });
  } catch (error) {
    return dispatch({
      type: CHANGE_ALERT_MESSAGE,
      payload: "There's been a problem by deleting the folder",
    });
  }
};

export const UpdateImageTitle = (image) => async (dispatch) => {
  try {
    const { data } = await axios.put(`${url}/gallery`, image);
    dispatch({
      type: CHANGE_ALERT_MESSAGE,
      payload: "Image name updated",
    });
    return dispatch({
      type: UPDATE_IMAGE_TITLE,
      payload: data,
    });
  } catch (error) {
    return dispatch({
      type: CHANGE_ALERT_MESSAGE,
      payload: "There's been a problem by changing the title",
    });
  }
};

export const UpdateImageFeaturedPropery = (image) => async (dispatch) => {
  try {
    const { data } = await axios.put(`${url}/gallery/featured`, image);
    return dispatch({
      type: CHANGE_IMAGE_FEATURED,
      payload: data,
      id: image.id_image,
    });
  } catch (error) {
    return dispatch({
      type: CHANGE_ALERT_MESSAGE,
      payload: "The image_featured property couldn't be updated",
    });
  }
};

export const GetAllFeatuedImages = (id_user) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `${url}/gallery/featured?id_user=${id_user}`
    );
    return dispatch({
      type: GET_ALL_FEATURED_IMAGES,
      payload: data,
    });
  } catch (error) {
    return dispatch({
      type: CHANGE_ALERT_MESSAGE,
      payload: "You don't have featured images",
    });
  }
};

export const GetFolderImages = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `${url}/gallery/folderImages?folder_id=${id}`
    );
    return dispatch({
      type: GET_FOLDER_IMAGES,
      payload: data,
      folder_id: id,
    });
  } catch (error) {
    return dispatch({
      type: CHANGE_ALERT_MESSAGE,
      payload: "Couldn't get the images",
    });
  }
};

export const SaveFolderImage = (id, title, image) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      `${url}/gallery/folderImages?id=${id}&title=${title}`,
      image
    );
    const response = await axios.get(`${url}/gallery/folder`);

    return dispatch({
      type: GET_ALL_IMAGES,
      payload: data,
      folder_id: id,
      folders: response.data,
    });
  } catch (error) {
    dispatch({
      type: CHANGE_ALERT_MESSAGE,
      payload: "There's been an error saving the image",
    });
  }
};

export const ChangeImageFormState = () => {
  return {
    type: CHANGE_IMAGE_FORM_STATE,
  };
};
