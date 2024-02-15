"use client";

import React, {
  useState,
  useEffect,
  useRef
} from "react";
import useSession from "@/app/hooks/useSession";
import fetchUserProfiles from "@/app/lib/actions/supabase-data/fetchUserProfilesData";
import fetchCards from "@/app/lib/actions/supabase-data/fetchCardData";
import { CardsTableType } from "@/app/utils/types/supabase/cardsTableType";
import {
  Box,
  Typography,
  IconButton,
  Grid,
  Tooltip,
  CircularProgress
} from "@mui/material";
import UploadIcon from '@mui/icons-material/Upload';
import EditIcon from '@mui/icons-material/Edit';
import Image from "next/image";
import Link from "next/link";

export default function ProfileId({
  params 
}: {
  params: { slug: string } 
}) {

  const [isProfileOwner, setIsProfileOwner] = useState<boolean>(false);
  const [userUsername, setUserUsername] = useState<string>("");
  const [userAvatarUrl, setUserAvatarUrl] = useState<string>("");
  const [userFirstName, setUserFirstName] = useState<string>("");
  const [userLastName, setUserLastName] = useState<string>("");
  const [userBio, setUserBio] = useState<string>("");
  const [cards, setCards] = useState<CardsTableType[] | null>([]);
  const [userAvatarUploading, setUserAvatarUploading] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const user = useSession()?.user;

  // Fetch user profile matching the params.slug
  useEffect(() => {
    if (user && params.slug) {
      const paramsSlugLower = params.slug.toLowerCase();
      const fetchUserData = async () => {
        const data = await fetchUserProfiles({
          from: "profiles",
          select: "*",
          filter: { column: "username", value: paramsSlugLower }
        });
  
        if (data !== null && data.length > 0) {
          setUserUsername(data[0].username);
          setUserAvatarUrl(data[0].avatar_url);
          setUserFirstName(data[0].first_name);
          setUserLastName(data[0].last_name);
          setUserBio(data[0].bio);
          // Check if user session matches the profile owner
          if (user?.id === data[0].id) {
            setIsProfileOwner(true);
          }
        }
      };
      fetchUserData();
    }
  }, [user, params.slug])

  // Fetch user profile's cards
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
            card.cardCreator === userUsername &&
            card.cardRender !== null &&
            card.cardRender !== "" &&
            card.cardCreator !== null &&
            card.cardCreator !== ""
          );
        setCards(filteredData);
      }
    };
    fetchCardData();
  }, [userUsername]);

  // Handle avatar upload click
  function handleUploadClick() {
    fileInputRef.current?.click();
  }

  // Log userAvatarUrl updates
  useEffect(() => {
    console.log(`Updated userAvatarUrl: ${userAvatarUrl}`);
  }, [userAvatarUrl]);

  // Handle avatar upload
  async function handleAvatarChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    console.log(file);
    if (!file) return;
    setUserAvatarUploading(true);

    try {
      const formData = new FormData();
      const filename = `${userUsername}-avatar.png`;
      formData.append("file", file);
      formData.append("filename", filename.toLowerCase());

      const response = await fetch('/data/upload-avatar', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        console.log("Full API Response:", jsonResponse);
        console.log(`Data returned by API: ${jsonResponse.data}`); 
        setUserAvatarUrl(jsonResponse.data); 
        // TODO: Update user profile with new avatar URL
        // Remove setter for userAvatarUrl as its updated by useEffect
        // Make this a function instead of API call
        // Upload new image, and set user's avatar_url in profiles table
      } else {
        console.error("Failed to upload avatar");
      }
    } catch (error) {
      console.error(error);
    }
    setUserAvatarUploading(false);
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
            width: "96px",
            height: "96px",
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
          {userAvatarUrl && (
            <Image
                src={userAvatarUrl}
                alt={`${userUsername}'s avatar`}
                layout="fill"
                objectFit="cover"
            />
          )}
        </Box>)}
        {!userAvatarUrl && (<Box
          id="profile-avatar-upload-container"
          sx={{
            width: "96px",
            height: "96px",
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
            hover:bg-neutral-700/20
          "
        >
          <IconButton
            disabled={userAvatarUploading}
            aria-label="upload avatar"
            size="large"
            onClick={handleUploadClick}
            className="
              opacity-50
              hover:opacity-100
            "
          >
            {!userAvatarUploading && (<UploadIcon fontSize="inherit"/>)}
            {userAvatarUploading && (<CircularProgress />)}
          </IconButton>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            accept="image/*"
            onChange={handleAvatarChange}
          />
        </Box>)}
        <Box
          id="profile-user-info"
          className="
            flex
            flex-col
            justify-start
            items-start
          "
        >
          <Box
            id="profile-user-info-names"
            className="
              flex
              flex-row
              justify-start
              items-end
              gap-1
            "
          >
            <Typography
              variant="h4"
              className="
                font-semibold
                text-white
              "
            >
              {userFirstName} {userLastName}
            </Typography>
            <Typography
              variant="subtitle1"
              className="
                font-medium
                text-xl
              "
            >
              @{userUsername}
            </Typography>
          </Box>
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
              <Link
                href={`/dashboard/cards/${card.id}`}
              >
                <Image
                  src={card.cardRender}
                  alt={card.cardName}
                  fill
                  style={{
                    objectFit: "cover"
                  }}
                />
              </Link>
              {/* Link to cards/[slug]/edit */}
              {isProfileOwner && (<EditIcon />)} 
            </Box>
          </Tooltip>
        </Grid>
        ))}
      </Grid>
      </Box>
    </Box>
  );
}