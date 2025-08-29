import { useEffect, useState } from "react";

export const useArrayPartGiver = (): number => {
  const [partSize, setPartSize] = useState(1);

  useEffect(() => {
    const updateSize = () => {
      if (window.innerWidth >= 1280) {
        setPartSize(4); // xl
      } else if (window.innerWidth >= 1024) {
        setPartSize(3); // lg
      } else if (window.innerWidth >= 640) {
        setPartSize(2); // sm & md
      } else {
        setPartSize(1); // xs
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);

    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  return partSize;
};
