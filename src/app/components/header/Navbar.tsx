import { NavLink, useNavigate } from "react-router-dom";
import SignUp from "../Signup";
import Login from "../Login";
import { useEffect, useState } from "react";
import DropdownMenuPages from "./DrowndownMenu";
import { CircleUserRound, TextWrap } from "lucide-react";
import NavbarToggleBtn from "./NavbarToggleBtn";
import { useGlobals } from "@/app/hooks/useGlobals";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function Navbar() {
  const [isPopover, setIsPopover] = useState<boolean>(false);
  const { authmember, setAuthMember } = useGlobals();
  const navigation = useNavigate();
  const userProfileBtn =
    "px-5 py-3 hover:bg-slate-400  hover:text-white text-start capitalize font-jostFont text-base font-semibold transition-all duration-300 ease-linear rounded-md";
  const registerBtnClasses =
    "border-none bg-transparent    hover:no-underline  ease-in p-0 hover:text-slate-300 transition-all duration-75 ease-in font-semibold";
  const [navbarScrolled, setNavbarScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleNavbarScrolling = (): void => {
      setNavbarScrolled(window.scrollY > 50); // changeable
    };

    window.addEventListener("scroll", handleNavbarScrolling);

    return () => window.removeEventListener("scroll", handleNavbarScrolling);
  }, [navbarScrolled]);

  const handleLogout = (): void => {
    localStorage.removeItem("memberData");
    setAuthMember(null);
    navigation("/");
  };
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
            src={
              navbarScrolled
                ? `/public/img/logo.svg`
                : `/img/svg/logo-light.svg`
            }
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
                <NavLink
                  to="/"
                  className={
                    "hover:text-slate-300 transition-all duration-75 ease-in"
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/properties"
                  className={
                    "hover:text-slate-300 transition-all duration-75 ease-in"
                  }
                >
                  Properties
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/agents"
                  className={
                    "hover:text-slate-300 transition-all duration-75 ease-in"
                  }
                >
                  Agents
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/agencies"
                  className={
                    "hover:text-slate-300 transition-all duration-75 ease-in"
                  }
                >
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
                  btnClasses={` ${registerBtnClasses} ${
                    navbarScrolled ? "text-darkBlue" : "text-stone-50"
                  }`}
                />
                <span className="middle">Or</span>
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
                  <CircleUserRound className="w-6 h-6 hover:text-slate-300 transition-all duration-75 ease-in" />
                </PopoverTrigger>
                <PopoverContent className="flex flex-col    items-stretch p-2 me-6 mt-4">
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
