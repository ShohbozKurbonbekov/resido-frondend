import { Question_Taps } from "@/lib/enums/faq.enum";
import type { SetStateType } from "@/lib/type/common";

interface TabButtonsType {
  activeButton: string;
  setActiveButton: SetStateType<Question_Taps>;
}

export default function TabButtons({
  activeButton,
  setActiveButton,
}: TabButtonsType) {
  return (
    <ul className="w-full flex flex-row items-center  justify-start mb-4 gap-x-2 list-none">
      {Object.keys(Question_Taps).map((button, index) => (
        <li key={index}>
          <button
            className={`p-4 rounded-md  text-white duration-300 transition-all ease-linear capitalize font-jostFont font-semibold text-sm text-center ${
              activeButton === button
                ? "bg-blue-600 shadow-[0_0_0_3px_rgba(59,130,246,0.3)]"
                : "bg-blue-950"
            }`}
            onClick={() => {
              setActiveButton(button as Question_Taps);
            }}
          >
            {button}
          </button>
        </li>
      ))}
    </ul>
  );
}
