import { Separator } from "@/components/ui/separator";
import { Facebook, Heart, Instagram, Linkedin, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

export default function MainFooterContent() {
  return (
    <section className="bg-darkBlue  flex flex-col items-center">
      <div className="container py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 lg:gap-x-6 gap-y-10">
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-7 ">
            {/* // 3  parts */}
            <div className="w-full flex flex-col">
              <div className="flex flex-row items-center gap-2 text-slate-50 text-3xl font-jostFont mb-5">
                <img src="/public/img/svg/logo-light.svg" alt="" />
                <h3 className="font-bold">Resido</h3>
              </div>
              <div className="text-slate-300  text-sm flex flex-col gap-y-[10px] capitalize">
                <p>Collins Street West, Victoria 8007, Australia.</p>
                <p>+1 246-345-0695</p>
                <p>info@example.com</p>
              </div>
            </div>

            <ul className="flex flex-col gap-y-[10px] text-sm text-slate-300 font-jostFont capitalize">
              <h5 className="text-slate-50 font-bold text-xl mb-4">
                Navigation
              </h5>
              <li>
                <Link to="/">About</Link>
              </li>
              <li>
                <Link to="/">FAQs pagae</Link>
              </li>
              <li>
                <Link to="/">CheckOut</Link>
              </li>
              <li>
                <Link to="/">Contact</Link>
              </li>
              <li>
                <Link to="/">Blog</Link>
              </li>
            </ul>

            <ul className="flex flex-col gap-y-[10px] text-sm text-slate-300 font-jostFont capitalize">
              <h5 className="text-slate-50 font-bold text-xl mb-4">
                The Highlights
              </h5>
              <li>
                <Link to="/">Apartment</Link>
              </li>
              <li>
                <Link to="/">My Houses</Link>
              </li>
              <li>
                <Link to="/">Restaurant</Link>
              </li>
              <li>
                <Link to="/">Nightlife</Link>
              </li>
              <li>
                <Link to="/">Villas</Link>
              </li>
            </ul>
          </div>
          <div className="lg:col-span-2 grid grid-cols-1  md:grid-cols-2">
            {/* // 2 parts */}
            <ul className="flex flex-col gap-y-[10px] text-sm text-slate-300 font-jostFont capitalize mb-3">
              <h5 className="text-slate-50 font-bold text-xl mb-4">
                My Account
              </h5>
              <li>
                <Link to="/">my profile</Link>
              </li>
              <li>
                <Link to="/">my account</Link>
              </li>
              <li>
                <Link to="/">My property</Link>
              </li>
              <li>
                <Link to="/">favorites</Link>
              </li>
              <li>
                <Link to="/">Cart</Link>
              </li>
            </ul>

            <ul className="flex flex-col gap-y-[10px] text-sm text-slate-300 font-jostFont capitalize">
              <h5 className="text-slate-50 font-bold text-xl mb-4">
                My Account
              </h5>
              <div className="grid grid-cols-2 md:grid-cols-1 gap-3">
                <Link
                  to="/"
                  className="w-full inline-block border-2 border-[rgba(255,255,255,0.2)] rounded-sm"
                >
                  <li className="w-full h-auto  p-5 rounded-sm  flex flex-row justify-start gap-3 items-center">
                    <img
                      src="/img/svg/google-play.svg"
                      className="h-9 w-9 text-slate-50"
                      alt=""
                    />
                    <div className="flex-[1_0_0%] flex flex-col">
                      <h3 className="text-slate-50 font-jostFont text-lg capitalize font-bold">
                        Google play
                      </h3>
                      <p className="text-slate-300 text-sm capitalize font-jostFont">
                        Get it now
                      </p>
                    </div>
                  </li>
                </Link>

                <Link
                  to="/"
                  className="w-full inline-block border-2 border-[rgba(255,255,255,0.2)] rounded-sm h-auto "
                >
                  <li className="w-full p-5 rounded-sm  flex flex-row justify-start gap-3 items-center">
                    <img
                      src="/img/svg/apple-store.svg"
                      className="h-9 w-9 text-slate-50"
                      alt=""
                    />
                    <div className="flex-[1_0_0%] flex flex-col">
                      <h3 className="text-slate-50 font-jostFont text-lg capitalize font-bold">
                        Apple store
                      </h3>
                      <p className="text-slate-300 text-sm capitalize font-jostFont">
                        Get it now
                      </p>
                    </div>
                  </li>
                </Link>
              </div>
            </ul>
          </div>
        </div>
      </div>

      {/* // Separator */}
      <div className="w-full">
        <Separator style={{ backgroundColor: "#ffffff1a", width: "100%" }} />
      </div>
      <div className="container grid grid-cols-1 md:grid-cols-2 py-5 text-slate-50">
        <p className="text-slate-300 font-jostFont text-sm flex flex-row gap-2 ">
          <span>© 2025 Resido. Develop with</span>
          <Heart className="text-rose-600" />
          <span>By Shreethemes</span>
        </p>
        <ul className="w-full flex flex-row items-center justify-end gap-4">
          <li className="text-slate-300 text-sm ">
            <Link to="/www.instagram.com">
              <Instagram className="h-[22px] w-[22px]  hover:scale-110 transition-all duration-50 ease-in-out" />
            </Link>
          </li>
          <li className="text-slate-300 text-sm ">
            <Link to="/www.twitter.com">
              <Twitter className="h-[22px] w-[22px]  hover:scale-110 transition-all duration-50 ease-in-out" />
            </Link>
          </li>
          <li className="text-slate-300 text-sm ">
            <Link to="/www.facebook.com">
              <Facebook className="h-[22px] w-[22px]  hover:scale-110 transition-all duration-50 ease-in-out" />
            </Link>
          </li>
          <li className="text-slate-300 text-sm ">
            <Link to="/www.linkedIn.com">
              <Linkedin className="h-[22px] w-[22px]  hover:scale-110 transition-all duration-50 ease-in-out" />
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
