import { useCallback, useMemo, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";

import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import type { Property } from "@/lib/type/property";
import React from "react";
import { serverAPI } from "@/lib/config";

interface ImageType {
  property: Property;
}

// ----------------------------------------- COMPOONENT ------------------------------------
const LightboxImages: React.FC<ImageType> = React.memo(({ property }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(0);

  const retrievePropertyImages = useMemo(() => {
    return property.images.map((image) => ({ src: `${serverAPI}/${image}` }));
  }, [property]);

  // --------------------------------------- HANDLERS --------------------------------------
  const handleImageClick = useCallback((index: number): void => {
    setIndex(index);
    setOpen(true);
  }, []);

  // ---------------------------------------- RENDERS -------------------------------------
  return (
    <>
      <div className="relative grid grid-cols-3 justify-items-center items-center gap-4 mt-3 group ">
        {retrievePropertyImages.map((image, index: number) => (
          <img
            src={image.src}
            key={index}
            alt={`Image-${index}`}
            className="rounded-md w-full h-full object-cover cursor-pointer group-hover:bg-opacity-80 transition-all duration-300 ease-linear"
            onClick={() => handleImageClick(index)}
          />
        ))}
      </div>

      {/* // LIGHBOX IMAGES */}
      <Lightbox
        open={open}
        index={index}
        close={() => setOpen(false)}
        slides={retrievePropertyImages}
        plugins={[Thumbnails]}
        thumbnails={{
          position: "bottom",
          width: 120,
          height: 80,
          border: 1,
          borderRadius: 4,
          padding: 4,
          gap: 16,
          showToggle: true,
        }}
      />
    </>
  );
});

export default LightboxImages;
