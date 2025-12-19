import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import SignUp from "../Signup";
import Login from "../Login";
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
const navbarBtnClasses =
  "border-none bg-transparent    hover:no-underline  p-0 hover:text-slate-300 transition-all duration-75 ease-in font-semibold text-darkBlue";
const menuLinkClasses =
  "hover:text-slate-300 transition-all duration-75 ease-in";

// --------------------------------------------- COMPONENT -------------------------------------------
interface OtherNavbarType {
  handleLogout: () => Promise<void>;
}

export default function OtherNavbar({ handleLogout }: OtherNavbarType) {
  const [showNavbar, setShowNavbar] = useState<boolean>(false);
  const { authmember } = useGlobals();
  const navigation = useNavigate();

  useEffect(() => {
    const handleNavbarScrolling = (): void => {
      if (window.scrollY > 50) {
        setShowNavbar(true);
      } else {
        setShowNavbar(false);
      }
    };

    window.addEventListener("scroll", handleNavbarScrolling);

    return () => window.removeEventListener("scroll", handleNavbarScrolling);
  }, []);

  const navbarContent = (
    <div className="container mx-auto flex flex-row items-center lg:gap-8 justify-between lg:justify-stretch z-100">
      <NavLink to="/" className={`flex flex-row items-center gap-1 -mt-1.5 `}>
        <img
          src={`/img/logo.svg`}
          alt="navbar logo"
          className="text-stone-50"
        />
        <span className="font-bold text-2xl hover:text-slate-300 transition-all duration-75 ease-linear">
          Resido
        </span>
      </NavLink>

      {/* // Menu */}
      <div className="flex-1  hidden lg:block">
        <div className="flex flex-row items-center justify-between">
          <ul
            className={`flex flex-row items-center gap-5  text-darkBlue text-sm font-semibold font-jostFont`}
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

          {/* // registration */}
          {!authmember ? (
            <div
              className={`flex flex-row gap-2 text-sm
           text-darkBlue
            items-center font-semibold font-jostFont `}
            >
              <SignUp btnTitle={"Signup"} btnClasses={navbarBtnClasses} />
              <span>Or</span>
              <Login btnClasses={navbarBtnClasses} btnTitle="Signin" />
            </div>
          ) : (
            <Popover>
              <PopoverTrigger
                className={`text-darkBlue text-sm font-semibold font-jostFont hover:text-slate-300 transition-all duration-75 ease-in`}
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
              <PopoverContent className="flex flex-col  items-stretch p-2  me-6 mt-4">
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

      {/* // toggle user icon */}
      <NavbarToggleBtn
        handleLogout={handleLogout}
        btn={<TextWrap className={`lg:hidden block text-darkBlue `} />}
      />
    </div>
  );
  return (
    <>
      {/* // Shown in the beginning */}
      <nav className="py-5 shadow-md shadow-slate-100">{navbarContent}</nav>

      {/* // Shown when scrolled over 80px */}
      <nav
        className={`py-5 shadow-md shadow-slate-100 fixed -top-1 left-0 z-50 w-full transition-transform duration-300 ease-linear bg-[#fff] ${
          showNavbar
            ? "translate-y-0 "
            : "-translate-y-full opacity-0 invisible"
        }`}
      >
        {navbarContent}
      </nav>
    </>
  );
}
