export const serverAPI: string = `${import.meta.env.VITE_SERVER_API}`;

export const ErrorMessages = {
  error1: "Something went wrong",
  error2: "Please, Login first!",
  error3: "Please, Fill in all the inputs!",
  error4: "Message is emty!",
  error5: "Only Images with jpeg, jpg formats allowed!",
  error6: "Only common users are allowed to the agent here",
  error7: "Only Common users are allowed to apply for an agent position",
  error8: "Your agent application is under review, Please wait!",
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

export const defaultPropertyAvatar = "/public/img/city.png";
export const defaultUserAvatar =
  "https://cdn-icons-png.flaticon.com/512/149/149071.png";

export const defaultAgencyAvatar = "/img/ag-3.png";

export const defaultBlogImage =
  "https://images.unsplash.com/photo-1522199755839-a2bacb67c546";

export const rowWrapperClasses =
  "grid grid-cols-1 md:grid-cols-2 gap-4 rounded-lg border border-slate-200 p-4 bg-slate-50/40";

export const inputClasses =
  "border-slate-300 bg-slate-50 text-slate-800 placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-emerald-600/30 focus-visible:border-emerald-600";

export const textClasses = "text-sm font-medium text-slate-700 font-jostFont";
