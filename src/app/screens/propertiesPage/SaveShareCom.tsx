import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "@/lib/sweetAlerts";
import { BookMarked, Share2 } from "lucide-react";
import React from "react";
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
import type { SetStateType } from "@/lib/type/common";
import { UserSavingTargetGroup } from "@/lib/enums/user.enum";
import BlogService from "@/app/services/BlogService";

const shareIconWrapper =
  "hover:scale-110 transition-all duration-200 ease-linear active:scale-90";
// ------------------------------- COMPONENT --------------------------------
interface SaveShareComType {
  setReloadMainPage: SetStateType<boolean>;
  savedItemId: string;
  shareUrl: string;
  shareTitle: string;
  isSaved: boolean;
  targetItem: UserSavingTargetGroup;
}

const SaveShareCom: React.FC<SaveShareComType> = React.memo(
  ({
    setReloadMainPage,
    shareUrl,
    shareTitle,
    savedItemId,
    isSaved,
    targetItem,
  }) => {
    const saveMessage = !isSaved
      ? "Saved to the list successfully"
      : "Removed from the list successsfully!";
    // ------------------------------- HANDLERS --------------------------------
    const handleSave = async () => {
      try {
        if (targetItem === UserSavingTargetGroup.AGENT) {
          // const target = new AgentService();
        } else if (targetItem === UserSavingTargetGroup.PROPERTY) {
          // const target = new PropertyService();
        } else {
          const target = new BlogService();
          await target.saveTargetBlog(savedItemId);
        }
        await sweetTopSmallSuccessAlert(saveMessage);
        setReloadMainPage((prev) => !prev);
      } catch (error) {
        console.log("Error in SaveShareComponent: ", error);
        sweetErrorHandling(error!);
      }
    };

    // ----------------------------- RENDERS -----------------------------
    return (
      <div className="bg-white rounded-md p-5  grid grid-cols-2 gap-3 ">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="w-full py-4 border-2  border-green-600 rounded-md text-green-500 bg-green-100 flex flex-row gap-2 items-center justify-center font-semibold font-jostFont text-base cursor-pointer active:bg-white transition-colors duration-150 ease-linear">
              <Share2 className="h-5 w-5" />
              Share
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="top" className="w-60 bg-green-100 mb-3">
            <DropdownMenuLabel className="text-green-500  flex flex-row justify-center">
              <Share2 />
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup className="grid grid-cols-2 place-items-center gap-2">
              {/* Facebook Share */}
              <DropdownMenuItem asChild className={shareIconWrapper}>
                <FacebookShareButton url={shareUrl} hashtag={shareTitle}>
                  <FacebookIcon size={32} round />
                </FacebookShareButton>
              </DropdownMenuItem>

              {/* Twitter Share */}
              <DropdownMenuItem asChild className={shareIconWrapper}>
                <TwitterShareButton url={shareUrl} title={shareTitle}>
                  <TwitterIcon size={32} round />
                </TwitterShareButton>
              </DropdownMenuItem>

              {/* // LinkedIn Share */}
              <DropdownMenuItem asChild className={shareIconWrapper}>
                <LinkedinShareButton url={shareUrl} title={shareTitle}>
                  <LinkedinIcon size={32} round />
                </LinkedinShareButton>
              </DropdownMenuItem>

              {/* // Email Share  */}
              <DropdownMenuItem asChild className={shareIconWrapper}>
                <EmailShareButton
                  url={shareUrl}
                  subject={shareTitle}
                  body="Check this out!"
                >
                  <EmailIcon size={32} round />
                </EmailShareButton>
              </DropdownMenuItem>

              {/* // Whatsapp Share */}
              <DropdownMenuItem asChild className={shareIconWrapper}>
                <WhatsappShareButton url={shareUrl} title={shareTitle}>
                  <WhatsappIcon size={32} round />
                </WhatsappShareButton>
              </DropdownMenuItem>

              {/* // Telegram Share */}
              <DropdownMenuItem asChild className={shareIconWrapper}>
                <TelegramShareButton url={shareUrl} title={shareTitle}>
                  <TelegramIcon size={32} round />
                </TelegramShareButton>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <button
          className={`w-full py-4 rounded-md flex flex-row gap-2 items-center justify-center font-semibold font-jostFont text-base cursor-pointer  transition-all duration-150 ease-linear border-2 border-slate-800  text-white bg-slate-200 `}
          onClick={handleSave}
        >
          <BookMarked
            className={`${
              isSaved
                ? "fill-blue-200 stroke-blue-800"
                : "fill-slate-100 stroke-slate-700"
            } h-5 w-5`}
          />
          Save
        </button>
      </div>
    );
  }
);

export default SaveShareCom;
