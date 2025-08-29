import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

type pagesType = {
  page: string;
  path: string;
};

export default function DropdownMenuPages() {
  const navigation = useNavigate();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="p-0 m-0">
        <button
          type="button"
          className={
            "hover:text-slate-300 transition-all duration-75 ease-in flex flex-row items-center gap-1 focus-visible:ring-0 focus-visible:outline-none outline-none"
          }
        >
          Pages
          <ChevronDown className="h-4 w-4" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56 p-1 mt-3" align="start">
        <DropdownMenuGroup>
          {[
            { page: "Blogs", path: `/blogs` },
            { page: "Pricing", path: `/pricing` },
            { page: "Contact us", path: `/contact-us` },
            { page: "FAQ", path: `/FAQ` },
            { page: "About Us", path: `/about-us` },
          ].map((val: pagesType) => (
            <DropdownMenuItem key={val.path} className="h-auto w-auto p-0">
              <button
                className="bg-transparent border-0  focus-visible:ring-0 outline-none focus-visible:outline-none  text-base  font-jostFont capitalize  w-full hover:text-white  hover:bg-slate-500 transition-all duration-200 delay-0 text-darkBlue h-full px-4 py-3 rounded-md flex flex-row justify-start"
                onClick={() => {
                  navigation(`${val.path}`);
                }}
              >
                {val.page}
              </button>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
