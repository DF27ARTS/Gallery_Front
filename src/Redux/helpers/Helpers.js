export const MoveForward = (ArrayGallery, id) => {
  let SingleImage;
  for (let i = 0; i < ArrayGallery.length; i++) {
    if (ArrayGallery[i].id_image === id) {
      SingleImage = ArrayGallery[i + 1];
    }
  }
  return SingleImage;
};

export const MoveBacward = (ArrayGallery, id) => {
  let SingleImage;
  for (let i = 0; i < ArrayGallery.length; i++) {
    if (ArrayGallery[i].id_image === id) {
      SingleImage = ArrayGallery[i - 1];
    }
  }
  return SingleImage;
};
