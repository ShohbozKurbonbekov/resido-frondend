import { NavLink } from "react-router-dom";
import SignUp from "../Signup";
import Login from "../Login";
import { useEffect, useState } from "react";

export default function Navbar() {
  const authMember = false;
  const [navbarScrolled, setNavbarScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleNavbarScrolling = (): void => {
      setNavbarScrolled(window.scrollY > 50); // changeable
    };

    window.addEventListener("scroll", handleNavbarScrolling);

    return () => window.removeEventListener("scroll", handleNavbarScrolling);
  }, [navbarScrolled]);

  return (
    <nav
      className={`navbar py-4 w-full fixed  top-0 z-50 transition-all duration-300 ease-in  ${
        navbarScrolled
          ? "bg-slate-50 shadow-[0_0.1rem_0.2rem_0_rgba(0,0,0,0.2)]"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex flex-row items-center">
        <ul
          className={`flex flex-row items-center gap-5   grow font-medium ${
            navbarScrolled ? "text-darkBlue" : "text-stone-50"
          } text-[14px] font-semibold font-jostFont`}
        >
          <li>
            <NavLink to="/" className="flex flex-row items-center">
              <img
                src={
                  navbarScrolled
                    ? `/public/img/logo.svg`
                    : `/img/svg/logo-light.svg`
                }
                alt=""
                className="text-stone-50"
              />
              <span className="font-bold ms-1 text-[28px] hover:text-slate-300 transition-all duration-75 ease-in">
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
            className={`flex flex-row gap-2 text-[14px] ${
              navbarScrolled ? "text-darkBlue" : "text-stone-50"
            } text-medium items-center `}
          >
            <SignUp
              btnTitle={"Signup"}
              btnClasses={`border-none bg-transparent    hover:no-underline  ease-in p-0 hover:text-slate-300 transition-all duration-75 ease-in font-semibold ${
                navbarScrolled ? "text-darkBlue" : "text-stone-50"
              }`}
            />
            <span className="middle">Or</span>
            <Login
              btnClasses={`border-none bg-transparent    hover:no-underline  ease-in p-0 hover:text-slate-300 transition-all duration-75 ease-in font-semibold ${
                navbarScrolled ? "text-darkBlue" : "text-stone-50"
              }`}
              btnTitle="Signin"
            />
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </nav>
  );
}
