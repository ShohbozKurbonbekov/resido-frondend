export const serverAPI: string = `${import.meta.env.VITE_SERVER_API}`;

export const ErrorMessages = {
  error1: "Something went wrong",
  error2: "Please, Login first!",
  error3: "Please, Fill in all the inputs!",
  error4: "Message is emty!",
  error5: "Only Images with jpeg, jpg formats allowed!",
  error6: "Only common users are allowed to the agent here",
};

export const customTruncate = (text: string, limit: number) => {
  if (text) {
    return text.length > limit ? text.slice(0, limit) + "......" : text;
  }
};

export const carouselAutoPlayDelay = 3000;
export const updateShareUrl = (url: string): string => {
  return `multiBuilding.com/${url}`;
};

export const defaultUserAvatar =
  "https://cdn-icons-png.flaticon.com/512/149/149071.png";

export const defaultAgencyAvatar = "/img/ag-3.png";

export const defaultBlogImage =
  "https://images.unsplash.com/photo-1522199755839-a2bacb67c546";
