import { NavLink, useNavigate } from "react-router-dom";
import SignUp from "../Signup";
import Login from "../Login";
import { useEffect, useState } from "react";
import DropdownMenuPages from "./DrowndownMenu";
import { TextWrap } from "lucide-react";
import NavbarToggleBtn from "./NavbarToggleBtn";
import { useGlobals } from "@/app/hooks/useGlobals";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { serverAPI } from "@/lib/config";

const userProfileBtn =
  "px-5 py-3 hover:bg-slate-400  hover:text-white text-start capitalize font-jostFont text-base font-semibold transition-all duration-300 ease-linear rounded-md";
const registerBtnClasses =
  "border-none bg-transparent    hover:no-underline  ease-in p-0 hover:text-slate-300 transition-all duration-75 ease-in font-semibold";
const menuLinkClasses =
  "hover:text-slate-300 transition-all duration-75 ease-in";
// ---------------------------------------------- COMPONENT ---------------------------------------

interface NavbarType {
  handleLogout: () => Promise<void>;
}
export default function Navbar({ handleLogout }: NavbarType) {
  const [isPopover, setIsPopover] = useState<boolean>(false);
  const { authmember } = useGlobals();
  const navigation = useNavigate();

  const [navbarScrolled, setNavbarScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleNavbarScrolling = (): void => {
      setNavbarScrolled(window.scrollY > 50); // changeable
    };

    window.addEventListener("scroll", handleNavbarScrolling);

    return () => window.removeEventListener("scroll", handleNavbarScrolling);
  }, [navbarScrolled]);

  // ---------------------------------------------- HANDLERS ---------------------------------------

  // --------------------------------------------- RENDER ---------------------------------------
  return (
    <nav
      className={`py-4 w-full fixed  top-0 z-50 transition-all duration-300 ease-in  ${
        navbarScrolled
          ? "bg-slate-50 shadow-[0_0.1rem_0.2rem_0_rgba(0,0,0,0.2)]"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex flex-row items-center gap-8 justify-between lg:justify-start">
        <NavLink
          to="/"
          className={`flex flex-row items-center gap-1   ${
            navbarScrolled ? "text-darkBlue" : "text-stone-50"
          }`}
        >
          <img
            src={navbarScrolled ? `/img/logo.svg` : `/img/svg/logo-light.svg`}
            alt="navbar logo"
          />
          <span className="font-bold text-2xl hover:text-slate-300 transition-all duration-75 ease-linear -mt-1.5">
            Resido
          </span>
        </NavLink>

        {/* // Menu */}
        <div className="flex-1  hidden lg:block">
          <div className="flex flex-row items-center  justify-between">
            <ul
              className={`flex flex-row items-center gap-5  ${
                navbarScrolled ? "text-darkBlue" : "text-stone-50"
              } text-sm font-semibold font-jostFont`}
            >
              <li>
                <NavLink to="/" className={menuLinkClasses}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/property/getAll" className={menuLinkClasses}>
                  Properties
                </NavLink>
              </li>
              <li>
                <NavLink to="/agents" className={menuLinkClasses}>
                  Agents
                </NavLink>
              </li>
              <li>
                <NavLink to="/agencies" className={menuLinkClasses}>
                  Agencies
                </NavLink>
              </li>
              <li>
                <DropdownMenuPages />
              </li>
            </ul>

            {!authmember ? (
              <div
                className={`flex flex-row gap-2 text-sm ${
                  navbarScrolled ? "text-darkBlue" : "text-stone-50"
                }  items-center `}
              >
                <SignUp
                  btnTitle={"Signup"}
                  btnClasses={`${registerBtnClasses} ${
                    navbarScrolled ? "text-darkBlue" : "text-stone-50"
                  }`}
                />
                <span>Or</span>
                <Login
                  btnClasses={`${registerBtnClasses} ${
                    navbarScrolled ? "text-darkBlue" : "text-stone-50"
                  }`}
                  btnTitle="Signin"
                />
              </div>
            ) : (
              <Popover open={isPopover} onOpenChange={setIsPopover}>
                <PopoverTrigger
                  className={`${
                    navbarScrolled ? "text-darkBlue" : "text-stone-50"
                  } rounded-md`}
                >
                  <Avatar>
                    <AvatarImage
                      src={
                        authmember.avatar
                          ? `${serverAPI}/${authmember.avatar}`
                          : userProfileBtn
                      }
                    />
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="flex flex-col   items-stretch p-2 me-6 mt-4">
                  <button
                    className={userProfileBtn}
                    onClick={() => {
                      navigation("/dashboard");
                    }}
                  >
                    my dashboard
                  </button>
                  <button className={userProfileBtn} onClick={handleLogout}>
                    logout
                  </button>
                </PopoverContent>
              </Popover>
            )}
          </div>
        </div>

        {/* //toggle part */}

        <NavbarToggleBtn
          handleLogout={handleLogout}
          btn={
            <TextWrap
              className={` lg:hidden block ${
                navbarScrolled ? "text-darkBlue" : "text-stone-50"
              } `}
            />
          }
        />
      </div>
    </nav>
  );
}
