import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import SignUp from "../Signup";
import Login from "../Login";
interface NavbarToggleBtnProps {
  btn: React.ReactNode;
}

const navbarPages: { name: string; url: string }[] = [
  { name: "Home", url: "/" },
  { name: "Properties", url: "/properties" },
  { name: "Agents", url: "/agents" },
  { name: "Agencies", url: "/agencies" },
  { name: "Blogs", url: "/blogs" },
  { name: "Pricing", url: "/pricing" },
  { name: "Contact Us", url: "/contact-us" },
  { name: "FAQ", url: "/Faqs" },
  { name: "About Us", url: "/about-us" },
];
export default function NavbarToggleBtn({ btn }: NavbarToggleBtnProps) {
  const navigation = useNavigate();
  const authmember = true;
  const registerBtnClasses =
    "text-white bg-slate-600  px-8 hover:no-underline hover:bg-slate-400 transtion-colors duration-200 ease-linear";
  const [isActive, setIsActive] = useState<string>("");
  return (
    <Sheet>
      <SheetTrigger>{btn}</SheetTrigger>
      <SheetContent className="max-w-lg  w-3/4 bg-blue-950 border-transparent overflow-auto">
        <ul className="flex  flex-col items-stretch list-none mt-5 ">
          {navbarPages.map((page, index) => (
            <NavLink
              key={page.name}
              to={page.url}
              className={` w-full py-2 px-1 rounded-md   text-center text-white transition-all duration-200 ease-linear ${
                isActive === `page-${index + 1}` ? " bg-slate-500" : null
              }`}
              onMouseEnter={() => setIsActive(`page-${index + 1}`)}
              onMouseLeave={() => setIsActive("")}
            >
              {page.name}
            </NavLink>
          ))}
        </ul>
        {authmember ? (
          <div
            className={`flex flex-row gap-2  items-center justify-center mt-4`}
          >
            <SignUp btnTitle={"Signup"} btnClasses={registerBtnClasses} />

            <Login btnClasses={registerBtnClasses} btnTitle="Signin" />
          </div>
        ) : (
          <div className="mt-4">
            <button
              className="w-full text-white bg-slate-600 p-2 rounded-md hover:bg-slate-400 transition-colors duration-200 ease-linear"
              onClick={() => {
                navigation("/dashboard");
              }}
            >
              My dashboard
            </button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
