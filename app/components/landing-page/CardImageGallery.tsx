import React from "react";
import Image from "next/image";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

type CardImageGalleryProps = {
  images: { 
    src: string; 
    alt: string;
    name: string;
    creator: string; 
    width: number;
    height: number;
  }[];
};

export default function CardImageGallery({ 
  images 
}: CardImageGalleryProps) {
  return (
    <div>
      {images.map((image, index) => (
        <Box
          key={index}
          className="
            flex
            flex-col
            justify-center
            items-center
            gap-2
          "
        >
          <Box
            id="image-contanier"
            sx={{ 
              position: "relative", 
              overflow: "hidden",
              minWidth: "200px",
              maxWdith: "500px",
              width: "100%",
              borderRadius: "6px",
              filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.6))",
            }}
            className="
              flex
              flex-col
              justify-center
              items-center
              z-10
              mb-2
            "
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              sizes="(max-width: 400px) 100vw, (max-width: 300px) 50vw, (max-width: 200px) 33vw"
            />
          </Box>
          <Box
            className="
              flex
              flex-col
              justify-center
              items-center
              w-full
            "
          >
            <Typography
              variant="subtitle1"
              className="
                font-semibold
                text-white
              "
            >
              {image.name}
            </Typography>
            <Typography
              variant="subtitle2"
              component="span"
              className="
                font-medium
                text-wrap
                flex
                flex-row
                gap-1
              "
            >
              by {" "}
              <Typography
                variant="subtitle2"
                className="
                  font-medium
                  text-teal-400
                  italic
                "
              >
                {image.creator}
              </Typography>
            </Typography>
          </Box>
        </Box>
      ))}
    </div>
  );
}
