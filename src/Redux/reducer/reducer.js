import { MoveForward, MoveBacward } from "../helpers/Helpers.js";
import {
  AUTHENTICATED,
  UNAUTHORISED,
  CHANGE_ALERT_MESSAGE,
  CLOSE_ALERT_MESSAGE,
  SAVE_IMAGE,
  GET_ALL_IMAGES,
  CLEAR_GALLERY,
  SET_IMAGE_DETAIL,
  MOVE_FORWARD,
  MOVE_BACKWARD,
  DELETE_IMAGE,
  ENABLE_IMAGE_DETAIL,
  DISABLE_IMAGE_DETAIL,
  NEW_FOLDER_CREATED,
  GET_ALL_FOLDERS,
  DELETE_FOLDER,
  UPDATE_FOLDER,
  UPDATE_IMAGE_TITLE,
  CHANGE_IMAGE_FEATURED,
  GET_ALL_FEATURED_IMAGES,
  GET_FOLDER_IMAGES,
  CHANGE_IMAGE_FORM_STATE,
} from "../actions/actions.js";

const inisialState = {
  User: {
    loggedIn: false,
    user: {},
  },
  AlertMessage: {
    active: false,
    message: "Example Message",
  },
  Gallery: [],
  FeaturedImages: [],
  Folders: [],
  SingleImage: {},
  DetailImageState: false,
  ImageFormState: false,
  CurrentFolderId: 0,
};

const rootReducer = (state = inisialState, action) => {
  switch (action.type) {
    case AUTHENTICATED:
      return {
        ...state,
        User: { loggedIn: true, user: action.payload },
      };
    case UNAUTHORISED:
      return {
        ...state,
        User: { loggedIn: false, user: {} },
      };
    case CHANGE_ALERT_MESSAGE:
      return {
        ...state,
        AlertMessage: {
          active: !state.AlertMessage.active,
          message: action.payload,
        },
      };
    case CLOSE_ALERT_MESSAGE:
      return {
        ...state,
        AlertMessage: {
          active: false,
          message: "",
        },
      };
    case SAVE_IMAGE:
      return {
        ...state,
        Gallery: [...state.Gallery, action.payload],
      };
    case GET_ALL_IMAGES:
      return {
        ...state,
        Gallery: action.payload,
        CurrentFolderId: action.folder_id ? action.folder_id : 0,
        Folders: action.folders ? action.folders : state.Folders,
      };
    case CLEAR_GALLERY:
      return {
        ...state,
        Gallery: [],
      };
    case SET_IMAGE_DETAIL:
      const gallery = [...state.Gallery];
      return {
        ...state,
        SingleImage: {
          ...gallery.find((img) => img.id_image === action.payload),
        },
        DetailImageState: true,
      };
    case MOVE_FORWARD:
      const CopyGalleryMF = [...state.Gallery];
      const CopyFeaturedImagesMF = [...state.FeaturedImages];
      const ID_MF = action.payload.id;
      const VALUE_MF = action.payload.value;
      return {
        ...state,
        SingleImage: MoveForward(
          VALUE_MF === "gallery" ? CopyGalleryMF : CopyFeaturedImagesMF,
          ID_MF
        ),
      };
    case MOVE_BACKWARD:
      const CopyGalleryMB = [...state.Gallery];
      const CopyFeaturedImagesMB = [...state.FeaturedImages];
      const ID_MB = action.payload.id;
      const VALUE_MB = action.payload.value;
      return {
        ...state,
        SingleImage: MoveBacward(
          VALUE_MB === "gallery" ? CopyGalleryMB : CopyFeaturedImagesMB,
          ID_MB
        ),
      };
    case DELETE_IMAGE:
      return {
        ...state,
        Gallery: state.Gallery.filter((img) => img.id_image !== action.payload),
        DetailImageState: false,
        AlertMessage: {
          active: true,
          message: "Image deleted successfully",
        },
      };
    case ENABLE_IMAGE_DETAIL:
      return {
        ...state,
        DetailImageState: true,
      };
    case DISABLE_IMAGE_DETAIL:
      return {
        ...state,
        DetailImageState: false,
      };
    case NEW_FOLDER_CREATED:
      return {
        ...state,
        Folders: [...state.Folders, action.payload],
      };
    case GET_ALL_FOLDERS:
      return {
        ...state,
        Folders: action.payload,
      };
    case UPDATE_FOLDER:
      return {
        ...state,
        Folders: action.payload,
      };
    case DELETE_FOLDER:
      return {
        ...state,
        Folders: state.Folders.filter((folder) => folder.id !== action.payload),
      };
    case UPDATE_IMAGE_TITLE:
      return {
        ...state,
        Gallery: action.payload,
      };
    case CHANGE_IMAGE_FEATURED:
      return {
        ...state,
        SingleImage: action.payload,
        FeaturedImages: state.FeaturedImages.filter(
          (img) => img.id_image !== action.id
        ),
      };
    case GET_ALL_FEATURED_IMAGES:
      return {
        ...state,
        FeaturedImages: [...action.payload],
      };
    case GET_FOLDER_IMAGES:
      return {
        ...state,
        Gallery: action.payload,
        CurrentFolderId: action.folder_id,
      };
    case CHANGE_IMAGE_FORM_STATE:
      return {
        ...state,
        ImageFormState: !state.ImageFormState,
      };
    default:
      return state;
  }
};

export default rootReducer;
