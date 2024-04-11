"use client";

// Hooks
import React, {
  // useState,
  useEffect,
  useContext,
} from "react";
import { 
  useForm,
} from "react-hook-form";
import useSession from "@/app/hooks/useSession";
import { DashboardContext } from "@/app/context/DashboardContext";
// Types
import { CardCommentFormType } from "@/app/utils/types/forms/cardCommentFormType";
// Schema
import CardCommentFormSchema from "@/app/utils/schemas/CardCommentFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
// Utils
import PostHogClient from "@/app/lib/posthog/posthog";
// Components
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { InputAdornment } from "@mui/material";


type CardCommentFormProps = {
  cardId: number;
};

export default function CardCommentForm({
  cardId
}: CardCommentFormProps) {
  const { 
    userProfileData 
} = useContext(DashboardContext);
  const methods = useForm<CardCommentFormType>({
    defaultValues: {
      card_id: cardId,
      user_id: "", 
      user: "",
      comment: "",
    },
    resolver: zodResolver(CardCommentFormSchema),
    mode: "onChange",
  });
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: {
      isValid, 
      errors 
    },
  } = methods;

  const posthog = PostHogClient();
  const session = useSession();
  const form = watch();

  // Form submit handler
  async function onSubmit(
    data: CardCommentFormType
  ) {
    console.log(data);

    try {
      console.log("Submit comment");
      const response = await fetch("/api/data/submit-card-comment", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        if (data) {
          posthog.capture({
            distinctId: data.id,
            event: "💬 New Card Comment Submitted"
          })
        }
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error(error);
    }

    reset();
  };

  // Set user_id and cardCreator
  // values based on user session
  useEffect(() => {
    if (session?.user?.id) {
      setValue(
        "user_id",
        session.user.id
      );
    }
    if (
      userProfileData?.username && 
      userProfileData?.username !== 
      undefined
    ) {
      setValue(
        "user",
        userProfileData?.username as string
      );
    }
  }, [
    session,
    userProfileData,
    setValue
  ]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="
        flex
        flex-col
        justify-start
        items-end
        w-full
        p-4
        gap-1
        border-b
          border-neutral-800
      "
    >
      <TextField
        id="comment"
        {...register("comment")}
        error={!!errors.comment}
        helperText={errors.comment?.message}
        label="Comment"
        variant="outlined"
        fullWidth
        multiline
        rows={3}
        placeholder="Write a comment..."
        className="
          w-full
          bg-neutral-900/25
          rounded
          shadow
          focus:outline-none
          focus:shadow-outline
          focus:border-blue-300
        "
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Button
                type="submit"
                variant="outlined"
                size="small"
                color="primary"
                disabled={!isValid || form.comment === ""}
                className="
                  mt-auto
                  px-2
                  py-1
                  text-white
                  rounded
                  shadow
                "
              >
                Send
              </Button>
            </InputAdornment>
          )
        }}
      />
    </form>
  )
}