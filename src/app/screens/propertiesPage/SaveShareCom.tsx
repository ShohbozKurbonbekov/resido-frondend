import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Heart, Share2 } from "lucide-react";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
  EmailShareButton,
  EmailIcon,
  TelegramShareButton,
  TelegramIcon,
} from "react-share";

type SaveShareComType = {
  shareUrl: string;
  shareTitle: string;
};
export default function SaveShareCom({
  shareUrl,
  shareTitle,
}: SaveShareComType) {
  return (
    <div className="bg-white rounded-md p-5 mb- grid grid-cols-2 gap-3 mb-5">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <button className="w-full py-4 border-2 border-green-600 rounded-md text-green-500 bg-green-100 flex flex-row gap-2 items-center justify-center font-semibold font-jostFont text-base cursor-pointer active:bg-white transition-colors duration-150 ease-linear">
            <Share2 className="h-5 w-5" />
            Share
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="top" className="w-60 bg-green-100 mb-3">
          <DropdownMenuLabel className="text-green-500 text-center flex flex-row justify-center gap-1">
            <Share2 />
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup className="grid grid-cols-2 place-items-center gap-2">
            {/* Facebook Share */}
            <DropdownMenuItem className="hover:scale-110 transition-all duration-200 ease-linear active:scale-90">
              <FacebookShareButton url={shareUrl} hashtag={shareTitle}>
                <FacebookIcon size={32} round />
              </FacebookShareButton>
            </DropdownMenuItem>

            {/* Twitter Share */}
            <DropdownMenuItem className="hover:scale-110 transition-all duration-200 ease-linear active:scale-90">
              <TwitterShareButton url={shareUrl} title={shareTitle}>
                <TwitterIcon size={32} round />
              </TwitterShareButton>
            </DropdownMenuItem>

            {/* // LinkedIn Share */}
            <DropdownMenuItem className="hover:scale-110 transition-all duration-200 ease-linear active:scale-90">
              <LinkedinShareButton url={shareUrl} title={shareTitle}>
                <LinkedinIcon size={32} round />
              </LinkedinShareButton>
            </DropdownMenuItem>

            {/* // Email Share  */}
            <DropdownMenuItem className="hover:scale-110 transition-all duration-200 ease-linear active:scale-90">
              <EmailShareButton
                url={shareUrl}
                subject={shareTitle}
                body="Check this out!"
              >
                <EmailIcon size={32} round />
              </EmailShareButton>
            </DropdownMenuItem>

            {/* // Whatsapp Share */}
            <DropdownMenuItem className="hover:scale-110 transition-all duration-200 ease-linear active:scale-90">
              <WhatsappShareButton url={shareUrl} title={shareTitle}>
                <WhatsappIcon size={32} round />
              </WhatsappShareButton>
            </DropdownMenuItem>

            {/* // Telegram Share */}
            <DropdownMenuItem className="hover:scale-110 transition-all duration-200 ease-linear active:scale-90">
              <TelegramShareButton url={shareUrl} title={shareTitle}>
                <TelegramIcon size={32} round />
              </TelegramShareButton>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <button className="w-full py-4 rounded-md flex flex-row gap-2 items-center justify-center font-semibold font-jostFont text-base cursor-pointer active:bg-white transition-colors duration-150 ease-linear border-2 border-red-700  text-red-500 bg-red-100 group ">
        <Heart className="fill-red-500 stroke-transparent group-active:stroke-transparent h-5 w-5" />
        Save
      </button>
    </div>
  );
}
