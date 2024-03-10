"use client";

import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function Contact() {
  return (
    <Box
      id="contact-container"
      className="
        flex
        flex-col
        justify-start
        items-start
        w-full
        h-full
        py-8
        md:py-12
        px-12
        md:px-24
        gap-8
      "
    >
      <Typography
        variant="h2"
        className="
          text-white
        "
      >
        Contact
      </Typography>

      <Box
        id="contact-options-container"
        className="
          flex
          flex-col
          justify-start
          items-start
          w-full
          h-full
          gap-6
          md:gap-8
        "
      >
        {/* Contact Info */}
        <Box
          id="contact-info-container"
          className="
            flex
            flex-col
            justify-start
            items-start
            w-full
            gap-2
          "
        >
          <Typography
            variant="overline"
            className="
              text-teal-400
            "
          >
            Email us
          </Typography>
          <Typography
            variant="h3"
            className="
              text-white
            "
          >
            Send us a message!
          </Typography>
          <Typography
            variant="subtitle1"
          >
            Got a question, comment, or suggestion? Send us an email to {" "}
            <a
              href="mailto:contact@play.nexus"
              className="
                text-teal-500 
                hover:text-teal-400 
                transition
                duration-150
                ease-in-out
              "
            >
              contact@play.nexus
            </a>
            {" "} and we&apos;ll get back to you as soon as we can!
            
          </Typography>
          <Typography
            variant="caption"
            component="span"
            className="
              text-red-600
              italic
              py-2
              px-3 
              rounded-md
              bg-red-800/20
              mt-2
            "
          >
            Want to delete your account and data? Email us at {""}
            <Typography
              variant="caption"
              className="
                font-bold
              "
            >
              contact@play.nexus
            </Typography>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};