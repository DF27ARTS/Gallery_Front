export const setEmail = (email) => {
  localStorage.setItem("email", email);
};

export const getEmail = () => {
  return localStorage.getItem("email");
};
