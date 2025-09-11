import SectionIntroNoBackground from "@/app/components/SectionIntroNoBackground";
import { Home } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserDashboard() {
  const navigation = useNavigate();
  const [thisBtnHover, setBtnHover] = useState<string>("");
  return (
    <>
      <SectionIntroNoBackground
        title="Welcome!"
        subtitle="Welcome to your account"
      />
      <section className="py-20 bg-sky-100 ">
        <div className="px-3 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:items-start">
          <div className="lg:col-span-3">
            <div className="sidebar w-full mb-7 pt-14 p-6 flex flex-col gap-y-7 bg-white rounded-md shadow-md shadow-slate-200 box-border items-center">
              {/* // header */}
              <div className="sidebar-header">
                <img
                  src={"/img/user-3.jpg"}
                  alt=""
                  className="max-w-44 rounded-full object-cover mb-2 "
                />
                <h3 className="text-xl mt-2.5 mb-1 text-darkBlue font-bold font-jostFont capitalize text-center leading-tight">
                  Adam Harshvardhan
                </h3>
                <p className="text-blue-700 font-jostFont capitalize font-normal text-size_15 text-center">
                  Canada USA
                </p>
              </div>

              {/* // features */}
              <ul className="flex flex-col list-none [&>*:last-child]:border-b-0 w-full">
                {[
                  "dashboard",
                  "saved listings",
                  "saved searches",
                  "my inquiries / appointments",
                  "profile",
                  "logout",
                ].map((feature: string, index: number) => (
                  <li
                    key={index}
                    className={`w-full px-2 py-4 transition-all duration-100 ease-linear border-b-slate-300 border-2 border-t-0 border-s-0 border-r-0 ${
                      thisBtnHover === `btn-${index + 1}`
                        ? "text-green-700 bg-green-200 border-b-white"
                        : null
                    }`}
                    onMouseEnter={() => setBtnHover(`btn-${index + 1}`)}
                    onMouseLeave={() => setBtnHover("")}
                  >
                    <button
                      className="flex flex-row items-center justify-start gap-2 w-full"
                      onClick={() => {
                        navigation(`/}`);
                      }}
                    >
                      <Home />
                      <span className="flex-1 text-start font-semibold capitalize">
                        {feature}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="lg:col-span-9 bg-red-500"> main</div>
        </div>
      </section>
    </>
  );
}
