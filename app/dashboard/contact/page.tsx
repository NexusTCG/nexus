"use client";

import React, { 
  useEffect
} from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function Contact() {
  

  // Fetch Cal.com Embed
  useEffect(()=>{
	  (async function () {
      const cal = await getCalApi();
      cal(
        "ui", {
          "theme": "dark",
          "styles": {
            "branding":{
              "brandColor":"#14b8a6"
            }},
          "hideEventTypeDetails": true,
          "layout": "month_view"
        }
      );
	  })();
	}, [])

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
        
        {/* Cal.com Embed */}
        <Box
          id="contact-cal-embed-container"
          className="
            flex
            flex-col
            justify-start
            items-start
            w-full
            gap-4
            p-4
            bg-neutral-800
            rounded-lg
            border
            border-neutral-700
          "
        >
          <Box
            id="contact-cal-embed-content-container"
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
              Interview with Nils
            </Typography>
            <Typography
              variant="h3"
              className="
                text-white
              "
            >
              Get art credits!
            </Typography>
            <Typography
              variant="subtitle1"
            >
              Participate in a 30 minute interview about trading card games, custom TCG cards, {" "}
              and Nexus with Nils Westgårdh, creator of Nexus, to get 25 art credits!
            </Typography>
          </Box>
          <Cal 
            calLink="nexus-tcg/30min"
            style={{
              width:"100%",
              height:"100%",
              overflow:"scroll"
            }}
            config={{
              layout: "week_view",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};