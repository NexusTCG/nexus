"use client";

// Hooks
import React, {
  useState,
  useEffect,
  useContext
} from "react";
import { useRouter } from "next/navigation";
import { DashboardContext } from "@/app/context/DashboardContext";
// Actions
import fetchCards from "@/app/lib/actions/supabase-data/fetchCardData";
// Utils
import Link from "next/link";
import { format } from 'date-fns';
// Types
import { CardsTableType } from "@/app/utils/types/supabase/cardsTableType";
// Custom Components
import CardRender from "@/app/components/card-creator/CardRender";
import CardComments from "@/app/components/card-render/CardComments";
import CardCommentForm from "@/app/components/card-render/CardCommentForm";
// Components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import Skeleton from "@mui/material/Skeleton";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Tooltip from "@mui/material/Tooltip";
// Icons
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IosShareIcon from "@mui/icons-material/IosShare";
import CloseIcon from "@mui/icons-material/Close";

export default function Card({
   params 
}: {
   params: {
    slug: string 
  } 
}) {
  const { 
    userProfileData 
} = useContext(DashboardContext);
  const router = useRouter();

  const [commentsCount, setCommentsCount] = useState<number>(0);
  const [isCardOwner, setIsCardOwner] = useState<boolean>(false);
  const [cardData, setCardData] = useState<CardsTableType | null>(null);
  const [formattedDate, setFormattedDate] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  function handleShare() {
    console.log("Share button clicked");
    setModalOpen(true);
  }

  function handleEdit() {
    console.log("Edit button clicked");
    router.push(`/dashboard/cards/${cardData?.id}/edit`);
  };

  function handleDelete() {
    console.log("Delete button clicked");
    // TODO: Implement delete functionality
    // Import and invoke Supabase delete function
  }

  // Fetch card data
  useEffect(() => {
    const loadCardData = async () => {
      const cardId = parseInt(params.slug, 10);
      const cards = await fetchCards({
        from: "cards",
        filter: {
          column: "id",
          value: cardId
        },
      });

      // TODO: Update this to make cards public or private
      if (cards && cards.length > 0) {
        const card = cards[0];
        setCardData(card);
        setIsCardOwner(
          card.cardCreator === 
          userProfileData?.username
        );
      } else {
        console.error("Card not found.");
      }
    };
    loadCardData();
  }, [
    params.slug, 
    userProfileData?.username
  ]);

  // Check if current user is the card creator
  useEffect(() => {
    if (
      cardData?.cardCreator === 
      userProfileData?.username
    ) {
      setIsCardOwner(true);
    }
  }, [
    cardData, 
    userProfileData?.username
  ]);

  // Format date from card data
  useEffect(() => {
    if (cardData) {
      const formattedDate = format(
        new Date(cardData.created_at), 
        "MMMM dd, yyyy"
      );
      setFormattedDate(formattedDate);
    }
  }, [cardData]);

  return (
    <Box
      id="card-page-container"
      className="
        flex
        flex-col
        lg:flex-row
        justify-start
        items-center
        lg:items-start
        w-full
        lg:h-[100vh]
        z-0
      "
    >
      {/* Card */}
      <Box
        id="card-container"
        className="
          flex
          flex-col
          justify-start
          items-center
          w-full
          h-full
        "
      >
        {/* Breadcrumbs */}
        <Breadcrumbs
          aria-label="breadcrumb"
          className="
            flex
            flex-row
            justify-start
            items-center
            w-full
            text-neutral-400
            text-sm
            px-6
            py-3
            border-b
            border-neutral-700
          "
        >
          <Link
            href="/dashboard/cards"
          >
            <Typography
              variant="caption"
              className="
                hover:text-neutral-300
              "
            >
              CARDS
            </Typography>
          </Link>
          {cardData ? (
            <Typography
              variant="caption"
              className="
                text-neutral-200
              "
            >
              {cardData?.cardName.toUpperCase() || "CARD NAME"}
            </Typography>
          ) : (
            <Skeleton
              variant="text"
              width={100}
              height={34}
              animation="wave"
            />
          )}
        </Breadcrumbs>
        {/* Card Render Container */}
        <Box
          id="card-render-container"
          className="
            flex
            flex-col
            lg:flex-row
            justify-center
            items-center
            w-full
            h-full
            p-6
            bg-neutral-800/50
          "
        >
          {/* Card Render */}
          {cardData && cardData?.id && (
            <Box
              id="card-render-inner-container"
              className="
                flex
                flex-col 
                lg:flex-row 
                justify-center
                items-center
                mb-6
                gap-6
                lg:gap-12
              "
            >
              <Box
                id="card-render-initial-mode"
                className="
                  flex
                  flex-col
                  justify-start
                  items-center
                  gap-4
                  hover:text-white
                "
              >
                <Typography
                  variant="subtitle2"
                  className="
                    font-medium
                    text-neutral-400
                  "
                >
                  INITIAL MODE
                </Typography>
                <CardRender
                  cardData={cardData}
                  cardMode="initial"
                />
              </Box>
              <Box
                id="card-render-anomaly-mode"
                className="
                  flex
                  flex-col
                  justify-start
                  items-center
                  gap-4
                  hover:text-white
                "
              >
                <Typography
                  variant="subtitle2"
                  className="
                    font-medium
                    text-neutral-400
                  "
                >
                  ANOMALY MODE
                </Typography>
                <CardRender
                  cardData={cardData}
                  cardMode="anomaly"
                />
              </Box>
            </Box>
          )}
        </Box>
        {/* Card Details */}
        <Box
          id="card-details-container"
          className="
            flex
            flex-col
            justify-between
            items-start
            w-full
            px-4
            pt-4
            pb-6
            border-t
            border-neutral-700
          "
        >
          <Box
            id="card-name-crud-buttons"
            className="
              flex
              flex-row
              justify-between
              items-center
              w-full
            "
          >
            {cardData ? (
              <Typography
                variant="h4"
                className="
                  font-medium
                  text-white
                "
              >
                {cardData?.cardName}
              </Typography>
            ) : (
              <Skeleton
                variant="text"
                width={200}
                height={32}
                animation="wave"
              />
            )}
            <Box
              id="buttons-container"
              className="
                flex
                flex-row
                justify-end
                items-center
                gap-1
              "
            >
              <Tooltip title="Share">
                <IconButton
                  disabled={true} // Disabled until implemented
                  aria-label="share"
                  size="small"
                  onClick={handleShare}
                  className="
                    opacity-50
                    hover:opacity-100
                  "
                >
                  <IosShareIcon />
                </IconButton>
              </Tooltip>
              {isCardOwner && 
              cardData && (
                <>
                  <Tooltip title="Edit">
                    <IconButton
                      disabled={!isCardOwner}
                      aria-label="edit"
                      size="small"
                      onClick={handleEdit}
                      className="
                        opacity-50
                        hover:opacity-100
                      "
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton
                      //  disabled={!isCardOwner} Disabled until implemented
                      disabled={true}
                      aria-label="delete"
                      size="small"
                      onClick={handleDelete}
                      className="
                        opacity-50
                        hover:opacity-100
                        hover:text-red-500
                      "
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </>
              )}
            </Box>
          </Box>
          {/* Created at & Created by */}
          <Box
            id="created-date-creator"
            className="
              flex
              flex-row
              justify-start
              items-baseline
              gap-1
            "
          >
            {cardData ? (
              <Typography
                variant="overline"
                className="
                  font-medium
                "
              >
                created {formattedDate}
              </Typography>
            ) : (
              <Skeleton
                variant="text"
                width={200}
                height={20}
                animation="wave"
              />
            )}
            {cardData ? (
              <Typography
                variant="overline"
                component="span"
                className="
                  font-medium
                "
              >
                by {""}
                <Tooltip title={`${cardData?.cardCreator}'s profile`}>
                  <Link href={`/dashboard/profile/${cardData?.cardCreator}`}>
                    <Typography
                      variant="overline"
                      className="
                        font-medium
                        text-teal-500
                        hover:cursor-pointer
                        hover:text-teal-400
                      "
                    >
                      {cardData?.cardCreator}
                    </Typography>
                  </Link>
                </Tooltip>
              </Typography>
            ) : ( 
              <Skeleton
                variant="text"
                width={100}
                height={32}
                animation="wave"
              />
            )}
          </Box>
          {/* Card art prompt */}
          {cardData?.art_prompt_options && (
            <Box
              id="card-art-prompt"
              className="
                flex
                flex-col
                justify-start
                items-start
                w-full
                mt-2
                pt-2
                border-t
                border-neutral-700/50
              "
            >
              <Typography
                variant="overline"
                className="
                  text-neutral-400
                "
              >
                Art Style Options
              </Typography>
              <Box
                id="card-art-prompt-options"
                className="
                  flex
                  flex-row
                  justify-start
                  items-start
                  flex-wrap
                  w-full
                  gap-1
                "
              >
                {cardData.art_prompt_options.sort().map((option, index) => (
                  <Typography
                    key={index}
                    variant="caption"
                    className="
                      text-neutral-400
                      bg-neutral-800
                      hover:text-teal-400
                      hover:bg-teal-900/50
                      py-1
                      px-2
                      rounded-full
                    "
                  >
                    {option}
                  </Typography>
                ))}
              </Box>
            </Box>
          )}
        </Box>
      </Box>
      {/* Card Page Content */}
      <Box
        id="card-page-content-container"
        className="
          flex
          flex-col
          justify-between
          items-center
          w-full
          lg:max-w-[480px]
          h-full
          gap-4
          border-t
          lg:border-t-0
          border-l-0
          lg:border-l
          border-neutral-700
        "
      >
        {/* Card Details */}
        <Box
          id="card-details-container"
          className="
            flex
            flex-col
            justify-between
            items-start
            w-full
            h-full
            rounded-b-lg
          "
        >
          {/* Card Comments */}
          {cardData?.id && (
            <Box
              id="card-comments-container"
              className="
                flex
                flex-col
                justify-between
                items-start
                w-full
                h-full
              "
            >
              <Typography
                variant="subtitle1"
                component="span"
                className="
                  flex
                  flex-row
                  justify-start
                  items-baseline
                  gap-2
                  w-full
                  text-lg
                  text-white
                  font-medium
                  px-4
                  py-2
                  bg-neutral-900
                  border-b
                border-neutral-700
                  sticky
                  top-0
                "
              >
                Comments
                <Typography
                  variant="subtitle1"
                  className="
                    text-neutral-300
                  "
                >
                  ({commentsCount})
                </Typography>
              </Typography>
              {/* Comments */}
              <Box
                className="
                  flex
                  flex-col
                  justify-start
                  items-start
                  w-full
                  h-full
                "
              >
                <CardComments
                  cardId={cardData.id}
                  setCommentsCount={setCommentsCount}
                />
              </Box>
              {/* Add Comment */}
              <Box
                className="
                  border-t
                  border-neutral-700
                  bg-neutral-900
                  w-full
                  z-10
                  sticky
                  bottom-0
                "
              >
                <CardCommentForm cardId={cardData.id} />
              </Box>
            </Box>
          )}
        </Box>
      </Box>

      {/* Share Modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="
          flex
          flex-col
          justify-center
          items-center
          w-full
          max-w-4xl
          m-auto
          md:p-auto
          p-12 
        "
      >
        <Box
          id="share-card-modal-container"
          className="
            flex
            flex-col
            justify-center
            items-center
            w-full
            p-6
            gap-4
            bg-neutral-800
            border
            border-neutral-700
            rounded-lg
            shadow-xl
            shadow-neutral-950/50
          "
        >
          <Box
            id="share-card-modal-header"
            className="
              flex
              flex-row
              justify-between
              items-center
              w-full
            "
          >
            <Typography
              variant="h4"
              className="
                text-white
              "
            >
              Share {cardData?.cardName || "card"}
              {/* Share on Discord */}
              {/* Share on Reddit */}
              {/* Share on X */}
            </Typography>
            <IconButton
              aria-label="close"
              size="small"
              className="
                opacity-50
                hover:opacity-100
              "
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}