"use client";

// Hooks
import React, {
  useState,
  useEffect,
} from "react";
// Actions
import fetchCardComments from "@/app/lib/actions/supabase-data/fetchCardComments";
// Types
import { CardCommentsTableType } from "@/app/utils/types/supabase/cardCommentsTableType";
// Utils
import { createClient } from "@/app/lib/supabase/client";
import Link from "next/link";
import { format } from 'date-fns';
// Components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";

type CardCommentsProps = {
  cardId: number;
}

export default function CardComments({
   cardId 
}: CardCommentsProps) {
  const supabase = createClient();
  const [comments, setComments] = useState<CardCommentsTableType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!cardId) return;
    
    setLoading(true);
    fetchCardComments({ 
      from: "card_comments", 
      filter: { 
        column: "card_id", 
        value: cardId,
      } 
    })
      .then((data) => {
        if (data) setComments(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
      });
  }, [cardId]);

  useEffect(() => {
    const channel = supabase
      .channel('realtime comments')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'posts',
      }, (payload) => {
      if (
        'id' in payload.new && 
        'user_id' in payload.new && 
        'created_at' in payload.new && 
        'card_id' in payload.new && 
        'comment' in payload.new && 
        'user' in payload.new
      ) {
        setComments([...comments, payload.new as CardCommentsTableType])
      }
      }).subscribe();

    return () => {
      supabase.removeChannel(channel);
    }
  }, [supabase, comments, setComments])

  if (loading) {
    return (
      <Box
        className="
          flex
          flex-col
          justify-start
          items-start
          w-full
          px-4
          py-3
          border-b
          border-neutral-800
          bg-neutral-800/50
        "
      >
        <Skeleton
          variant="text"
          animation="wave"
          height={48}
          width="100%"
          className="rounded-sm"
        />
        <Box
          className="
            flex
            flex-col
            md:flex-row
            justify-start
            items-start
            w-full
            gap-1
          "
        >
          <Skeleton
            variant="text"
            animation="wave"
            height={20}
            width={120}
            className="rounded-sm"
          />
          <Skeleton
            variant="text"
            animation="wave"
            height={20}
            width={80}
            className="rounded-sm"
          />
        </Box>
      </Box>
    );
  }

  return !loading && comments.length > 0 ? (
    comments.map((
      comment: CardCommentsTableType, 
      index: number
    ) => ( 
      <Box
        key={index}
        className="
          flex
          flex-col
          justify-start
          items-start
          w-full
          gap-1
          px-4
          py-3
          border-b
          border-neutral-800
          bg-neutral-800/50
        "
      >
        <Typography
          variant="body1"
          className="
            text-white
            text-wrap
          "
        >
          {comment.comment}
        </Typography>
        <Box
          className="
            flex
            flex-col
            md:flex-row
            justify-start
            items-start
            w-full
            gap-1
          "
        >
          <Link href={`/dashboard/profile/${comment.user}`}>
            <Typography
              variant="body2"
              className="
                text-teal-500
              "
            >
              {comment.user}
            </Typography>
          </Link>
          <Typography
            variant="caption"
            className="
              text-neutral-400
            "
          >
            {format(new Date(comment.created_at), "MMMM dd, yyyy, hh:mm a")}
          </Typography>
        </Box>
      </Box>
    ))
  ) : null;
}