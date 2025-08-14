import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";

import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

type ImageTypeContent = {
  src: string;
};
type ImageType = {
  imageItems: ImageTypeContent[];
};
export default function LightboxImages({ imageItems }: ImageType) {
  const [open, setOpen] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(0);

  const handleImageClick = (index: number): void => {
    setIndex(index);
    setOpen(true);
  };
  return (
    <>
      <div className="grid grid-cols-3 justify-items-center items-center gap-4">
        {imageItems.map((image: ImageTypeContent, index: number) => (
          <img
            src={image.src}
            key={index}
            alt={`Image ${index}`}
            className="rounded-md w-full, h-full object-cover cursor-pointer hover:opacity-80 transition-opacity duration-200"
            onClick={() => handleImageClick(index)}
          />
        ))}
      </div>

      {/* // lighBox Images */}
      <Lightbox
        open={open}
        index={index}
        close={() => setOpen(false)}
        slides={imageItems}
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
}
