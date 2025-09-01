import { emptyInputAlert } from "@/lib/sweetAlerts";
import { Search } from "lucide-react";
import { useState } from "react";
interface HeroType {
  setSearchInquery: (arg: { search: string }) => void;
}

export default function Hero({ setSearchInquery }: HeroType) {
  const [searchInput, setSearchInput] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const query = searchInput.trim();

    if (!query) {
      // alert case
      emptyInputAlert("Please, Type a question", true);
      return;
    }

    setSearchInquery({
      search: query,
    });
  };
  return (
    <section className="py-20 relative ">
      {/* // background */}
      <img
        src="/img/bg-2.jpg"
        className="object-cover inset-0 w-full h-full absolute"
        alt="Hero background"
      />

      {/* Search bar */}
      <div className="container flex flex-col space-y-2 relative z-10 items-center justify-center">
        <h1 className="text-white text-4xl  capitalize font-bold font-jostFont leading-[40px] lg:text-[62.13px] lg:leading-[81px] text-center">
          Frequently asked questions
        </h1>

        <form
          onSubmit={handleSubmit}
          action="#"
          className=" flex rounded-sm my-6  w-full max-w-[610px] bg-white gap-4 items-center"
        >
          <input
            className="p-[12px_50px_12px_30px] text-base text-slate-500 font-jostFont focus-visible:ring-0 outline-0 bg-transparent flex-1"
            value={searchInput}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchInput(e.target.value)
            }
            placeholder="Search Your Query..."
            autoFocus
          />
          <button
            aria-label="Search"
            type="submit"
            className="h-auto w-auto active:ring-0 outline-none group"
          >
            <Search className=" w-[18px] h-[18px] px-3 box-content text-blue-700 group-active:scale-90 transition-transform duration-200 ease-linear" />
          </button>
        </form>
      </div>
    </section>
  );
}
