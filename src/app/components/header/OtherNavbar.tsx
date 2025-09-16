import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import SignUp from "../Signup";
import Login from "../Login";
import DropdownMenuPages from "./DrowndownMenu";
import { CircleUserRound, TextWrap } from "lucide-react";
import NavbarToggleBtn from "./NavbarToggleBtn";

export default function OtherNavbar() {
  const [showNavbar, setShowNavbar] = useState<boolean>(false);
  const authMember: boolean = true;
  const navbarBtnClasses =
    "border-none bg-transparent    hover:no-underline  p-0 hover:text-slate-300 transition-all duration-75 ease-in font-semibold text-darkBlue";

  useEffect(() => {
    const handleNavbarScrolling = (): void => {
      if (window.scrollY > 80) {
        setShowNavbar(true);
      } else {
        setShowNavbar(false);
      }
    };

    window.addEventListener("scroll", handleNavbarScrolling);

    return () => window.removeEventListener("scroll", handleNavbarScrolling);
  }, []);

  const navbarContent = (
    <div className="container mx-auto flex flex-row items-center lg:gap-8 justify-between lg:justify-stretch">
      <NavLink to="/" className={`flex flex-row items-center gap-1 `}>
        <img src={`/public/img/logo.svg`} alt="" className="text-stone-50" />
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

          {/* // registration */}
          {!authMember ? (
            <div
              className={`flex flex-row gap-2 text-sm
           text-darkBlue
            items-center font-semibold font-jostFont `}
            >
              <SignUp btnTitle={"Signup"} btnClasses={navbarBtnClasses} />
              <span className="">Or</span>
              <Login btnClasses={navbarBtnClasses} btnTitle="Signin" />
            </div>
          ) : (
            <button
              className={`text-darkBlue text-sm font-semibold font-jostFont hover:text-slate-300 transition-all duration-75 ease-in`}
            >
              <CircleUserRound className="w-6 h-6" />
            </button>
          )}
        </div>
      </div>

      {/* // toggle user icon */}
      <NavbarToggleBtn
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
            : "-translate-y-full opacity-0 invisible shadow-red-700"
        }`}
      >
        {navbarContent}
      </nav>
    </>
  );
}
