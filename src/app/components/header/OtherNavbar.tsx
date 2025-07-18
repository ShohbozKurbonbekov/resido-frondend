import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import SignUp from "../Signup";
import Login from "../Login";

export default function OtherNavbar() {
  const [showNavbar, setShowNavbar] = useState<boolean>(false);
  const authMember: boolean = false;

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
    <div className="container mx-auto flex flex-row items-center ">
      <ul
        className={`flex flex-row items-center gap-5   grow  text-darkBlue text-sm font-semibold font-jostFont`}
      >
        <li>
          <NavLink to="/" className="flex flex-row items-center gap-1">
            <img
              src={`/public/img/logo.svg`}
              alt=""
              className="text-stone-50"
            />
            <span className="font-bold  text-[28px] hover:text-slate-300 transition-all duration-75 ease-in">
              Resido
            </span>
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
          <NavLink
            to="/Features"
            className={
              "hover:text-slate-300 transition-all duration-75 ease-in"
            }
          >
            Features
          </NavLink>
        </li>
      </ul>

      {!authMember ? (
        <div
          className={`flex flex-row gap-2 text-sm
           text-darkBlue
            items-center font-semibold font-jostFont `}
        >
          <SignUp
            btnTitle={"Signup"}
            btnClasses={
              "border-none bg-transparent   text-darkBlue  hover:no-underline   p-0  font-semibold hover:text-slate-300 transition-all duration-75 ease-in"
            }
          />
          <span className="">Or</span>
          <Login
            btnClasses={`border-none bg-transparent    hover:no-underline  p-0 hover:text-slate-300 transition-all duration-75 ease-in font-semibold text-darkBlue
            `}
            btnTitle="Signin"
          />
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
  return (
    <>
      {/* // Shown in the beginning */}
      <nav className="py-5 shadow-sm shadow-slate-100">{navbarContent}</nav>

      {/* // Shown when scrolled over 80px */}
      <nav
        className={`py-5 shadow-sm shadow-slate-100 fixed top-0 left-0 z-50 w-full transition-transform duration-200 ease-in-out  ${
          showNavbar ? "translate-y-0" : "-translate-y-full invisible opacity-0"
        }`}
      >
        {navbarContent}
      </nav>
    </>
  );
}
