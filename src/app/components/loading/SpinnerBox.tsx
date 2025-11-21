import React from "react";

interface SpinnerBoxType {
  count?: number; // number of skeleton cards to render
  columns?: string; // grid columns, default responsive
  gap?: string; // spacing between cards
  className?: string; // optional additional classes
  cardHeight?: string; // height of each skeleton card
  cardRadius?: string; // border radius of cards
}

const SpinnerBox: React.FC<SpinnerBoxType> = ({
  count = 4,
  columns = "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  gap = "gap-4",
  className = "",
  cardHeight = "h-64",
  cardRadius = "rounded-xl",
}) => {
  return (
    <div className={`grid ${columns} ${gap} ${className}`}>
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className={`bg-white animate-pulse ${cardHeight} ${cardRadius}`}
        >
          {/* Optional inner structure */}
          <div className="p-4 flex flex-col justify-between h-full">
            <div className="h-20 w-20 bg-gray-300 rounded-full mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SpinnerBox;
