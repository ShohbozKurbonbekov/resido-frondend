import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";

export const blogShareNetworks = [
  { name: "facebook", ShareIcon: FacebookShareButton, Icon: FacebookIcon },
  { name: "twitter", ShareIcon: TwitterShareButton, Icon: TwitterIcon },
  {
    name: "linkedin",
    ShareIcon: LinkedinShareButton,
    Icon: LinkedinIcon,
  },
  { name: "email", ShareIcon: EmailShareButton, Icon: EmailIcon },
  { name: "telegram", ShareIcon: TelegramShareButton, Icon: TelegramIcon },
];

type CATEGORIES_TYPE = "GENERAL" | "RECOMMENDED" | "NEWS" | "HUMOR";
export const CATEGORIES: CATEGORIES_TYPE[] = [
  "NEWS",
  "HUMOR",
  "GENERAL",
  "RECOMMENDED",
];
