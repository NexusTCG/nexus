"use client";

import React, { useState, useEffect } from "react";
import useSession from "@/app/hooks/useSession";
import fetchCards from "@/app/lib/actions/supabase-data/fetchCardData";
import fetchUserProfiles from "@/app/lib/actions/supabase-data/fetchUserProfilesData";
import { CardsTableType } from "@/app/utils/types/supabase/cardsTableType";
import {
  Box,
  Typography,
  IconButton,
  Grid,
  Tooltip
} from "@mui/material";
import UploadIcon from '@mui/icons-material/Upload';
import Image from "next/image";

export default function Profile() {
  const [cards, setCards] = useState<CardsTableType[] | null>([]);
    const [userProfile, setUserProfile] = useState<string>("profile");
    const [userAvatarUrl, setUserAvatarUrl] = useState<string>("");
    const [userFirstName, setUserFirstName] = useState<string>("");
    const [userLastName, setUserLastName] = useState<string>("");
    const [userBio, setUserBio] = useState<string>("");
    const user = useSession()?.user;

    useEffect(() => {
      const fetchUserData = async () => {
        if (user?.id) {
          const data = await fetchUserProfiles({
            from: "profiles",
            select: "*",
            filter: user.id
          });
  
          const profile = data?.find(
            profile => profile.id === user.id
          );
          if (profile) {
            setUserProfile(profile?.username);
            setUserAvatarUrl(profile?.avatar_url);
            setUserFirstName(profile?.first_name);
            setUserLastName(profile?.last_name);
            setUserBio(profile?.bio);
          }
        }
      };
  
      fetchUserData();
    }, [user?.id])

    useEffect(() => {
      const fetchCardData = async () => {
        const data = await fetchCards({
          from: "cards",
          select: "*",
          sortBy: { column: "created_at", ascending: false }
        });
        if (data) {
          const filteredData = data
            .filter(card =>
              card.cardCreator === userProfile &&
              card.cardRender !== null &&
              card.cardRender !== "" &&
              card.cardCreator !== null &&
              card.cardCreator !== ""
            );
          setCards(filteredData);
        }
      };
      fetchCardData();
    }, [userProfile]);

    function handleUploadAvatar() {
      // TODO: Implement avatar upload
    }

    return (
      <Box
        id="profile-container"
        className="
          flex
          flex-col
          justify-start
          items-center
          w-full
          gap-4
        "
      >
        <Box
          id="profile-header-container"
          className="
            w-full
            h-full
            flex
            flex-row
            justify-start
            items-center
            gap-4
            lg:pl-12
            md:pl-8
            sm:pl-4
            lg:pr-8
            md:pr-4
            sm:pr-2
            py-4
            bg-neutral-800
            border-b
          border-neutral-700
            top-0
            sticky
            z-10
          "
        >
          {userAvatarUrl && (<Box
            id="profile-avatar-container"
            sx={{
              width: "144px",
              height: "144px",
              position: "relative",
              overflow: "hidden"
            }}
            className="
              flex
              justify-center
              items-center
              rounded-full
              border-2
              border-neutral-700
            "
          >
            <Image
              fill
              src={userAvatarUrl}
              alt={`${userProfile}'s avatar`}
              style={{
                objectFit: "cover",
              }}
            />
          </Box>)}
          {!userAvatarUrl && (<Box
            id="profile-avatar-upload-container"
            sx={{
              width: "144px",
              height: "144px",
              position: "relative",
              overflow: "hidden"
            }}
            className="
              flex
              justify-center
              items-center
              rounded-full
              border-2
              border-neutral-700
              hover:border-neutral-500
              hover:bg-neutral-700/20
            "
          >
            <IconButton
              aria-label="upload avatar"
              size="large"
              onAbort={handleUploadAvatar}
            >
              <UploadIcon fontSize="inherit"/>
            </IconButton>
          </Box>)}
          <Box
            id="profile-user-info"
            className="
              flex
              flex-col
              justify-start
              items-start
              gap-1
            "
          >
            <Typography
              variant="h3"
              className="
                font-semibold
                text-white
              "
            >
              {userFirstName} {userLastName}
            </Typography>
            <Typography
              variant="h4"
              className="
                font-medium
              "
            >
              @{userProfile}
            </Typography>
            <Typography
              variant="body1"
              className="
                text-neutral-500
                mt-1
              "
            >
              {userBio}
            </Typography>
          </Box>
        </Box>
        <Box
          id="profile-cards-grid-container"
          className="
            flex
            flex-col
            justify-start
            items-center
            w-full
            lg:px-12
            md:px-8
            sm:px-6
            lg:mb-12
            mb-8
          "
        >
        {/* Card grid */}
        <Grid
          container
          spacing={2}
          className="
            bg-neutral-800
            border
            border-neutral-700
            pr-4
            ml-2
            mt-4
            rounded-lg
            shadow-xl
            shadow-red
          "
        >
          {cards?.map((card) => (
          <Grid
            item
            xs={6}
            md={4}
            lg={3}
            key={card.id}
          >
            <Tooltip
              title={`${card.cardName} by ${card.cardCreator}`}
              arrow
            >
              <Box
                id="card-render-container"
                sx={{
                  overflow: "hidden",
                  position: "relative",
                  height: "308px",
                }}
                className="
                  aspect-[5/7]
                  rounded-lg
                  hover:shadow-lg
                  hover:shadow-zinc-950/25
                  hover:scale-105
                  mb-2
                "
              >
                <Image
                  src={card.cardRender}
                  alt={card.cardName}
                  fill
                  style={{
                    objectFit: "cover"
                  }}
                />
              </Box>
            </Tooltip>
          </Grid>
          ))}
        </Grid>
        </Box>
      </Box>
    );
}