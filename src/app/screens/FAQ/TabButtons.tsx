import { memo } from "react";

interface TabButtonsType {
  activeButton: string;
  setActiveButton: (arg: string) => void;
  setSearchInquery: (args: { search: string }) => void;
}

const tabButtons: string[] = ["general", "payment", "update"];

const TabButtons = memo(function TabButtons({
  activeButton,
  setActiveButton,
  setSearchInquery,
}: TabButtonsType) {
  return (
    <ul className="w-full flex flex-row items-center  justify-start mb-4 gap-x-2 list-none">
      {tabButtons.map((button, index) => (
        <li key={index}>
          <button
            className={`p-[17px_18px] rounded-md  text-white duration-300 transition-all ease-linear capitalize font-jostFont font-semibold text-sm text-center ${
              activeButton === button
                ? "bg-blue-600 shadow-[0_0_0_3px_rgba(59,130,246,0.3)]"
                : "bg-blue-90 bg-blue-950"
            }`}
            onClick={() => {
              setActiveButton(button);
              setSearchInquery({ search: button });
            }}
          >
            {button}
          </button>
        </li>
      ))}
    </ul>
  );
});

export default TabButtons;
