import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import SignUp from "../Signup";
import Login from "../Login";
import { useGlobals } from "@/app/hooks/useGlobals";
import { navbarPages } from "@/app/data/navbar";

const navbarToggleBtnClasses =
  "w-full text-white bg-slate-600 p-2 rounded-md hover:bg-slate-400 transition-colors duration-200 ease-linear";

const registerBtnClasses =
  "text-white bg-slate-600  px-8 hover:no-underline hover:bg-slate-400 transtion-colors duration-200 ease-linear";

interface NavbarToggleBtnProps {
  btn: React.ReactNode;
}

export default function NavbarToggleBtn({ btn }: NavbarToggleBtnProps) {
  const navigation = useNavigate();
  const { authmember, logout } = useGlobals();
  const [isActive, setIsActive] = useState<string>("");

  return (
    <Sheet>
      <SheetTrigger>{btn}</SheetTrigger>
      <SheetContent className="max-w-lg  w-3/4 bg-[rgba(0,0,0,0.7)] border-transparent overflow-auto">
        <ul className="flex  flex-col items-stretch list-none mt-5 ">
          {navbarPages.map((page, index) => (
            <NavLink
              key={page.name}
              to={page.url}
              className={` w-full py-2 px-1 rounded-md   text-center text-white transition-all duration-200 ease-linear -mt-1.5 ${
                isActive === `page-${index + 1}` ? " bg-slate-500" : null
              }`}
              onMouseEnter={() => setIsActive(`page-${index + 1}`)}
              onMouseLeave={() => setIsActive("")}
            >
              {page.name}
            </NavLink>
          ))}
        </ul>
        {!authmember ? (
          <div
            className={`flex flex-row gap-2  items-center justify-center mt-4`}
          >
            <SignUp btnTitle={"Signup"} btnClasses={registerBtnClasses} />

            <Login btnClasses={registerBtnClasses} btnTitle="Signin" />
          </div>
        ) : (
          <div className="mt-4 flex flex-col gap-1">
            <button
              className={navbarToggleBtnClasses}
              onClick={() => {
                navigation("/dashboard");
              }}
            >
              My dashboard
            </button>
            <button className={navbarToggleBtnClasses} onClick={logout}>
              Logout
            </button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
