"use client";

import React, { 
  useState, 
  useContext, 
  useEffect
} from "react";
import { useForm } from "react-hook-form";
import { createClient } from "@/app/lib/supabase/client";
import { DashboardContext } from "@/app/context/DashboardContext";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import Skeleton from "@mui/material/Skeleton";
import SendIcon from "@mui/icons-material/Send";
import CheckIcon from "@mui/icons-material/Check";
import ErrorIcon from "@mui/icons-material/Error";

type FeatureRequestType = {
  feature: string;
  requester: string;
  user_id: string;
};

export default function Feedback() {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { 
      errors, 
      isValid,
      isSubmitting,
    }
} = useForm<FeatureRequestType>();

  const { userProfileData } = useContext(DashboardContext);
  const supabase = createClient();

  const [showAlertInfo, setShowAlertInfo] = useState<boolean>(false);
  const [alertInfo, setAlertInfo] = useState<{
    type: "success" | "error";
    icon: React.ReactNode;
    message: string;
  } | null>(null);

  const featureValue = watch("feature");

  // Set requester to username if available
  useEffect(() => {
    if (userProfileData?.username && userProfileData?.id) {
      setValue("requester", userProfileData.username);
      setValue("user_id", userProfileData.id);
    }
  }, [userProfileData?.username, userProfileData?.id]);

  // Submit feature request
  async function submitFeatureRequest(
    data: FeatureRequestType
  ) {
    const { feature } = data;
    const { error } = await supabase
      .from("feature_requests")
      .insert([{ 
        feature: feature,
        requester: userProfileData?.username,
      }]);
    if (error) {
      setAlertInfo({
        type: "error",
        icon: <ErrorIcon />,
        message: `Error submitting feature request: ${error.message}`
      });
      setShowAlertInfo(true);
      setTimeout(() => {
        setShowAlertInfo(false);
      }, 6000);
      console.error("Error submitting feature request. Please try again.", error);
    } else {
      setAlertInfo({
        type: "success",
        icon: <CheckIcon />,
        message: "Request submitted! Thanks for your feedback!"
      });
      setShowAlertInfo(true);
      setTimeout(() => {
        setShowAlertInfo(false);
      }, 6000);
      reset();
    }
  }

  return (
    <Box
      className="
        flex
        flex-col
        justify-start
        items-start
        w-full
        h-full
        p-12
        gap-8
      "
    >
      <Typography
        variant="h2"
        className="
          text-white
        "
      >
        Feature request
      </Typography>
      <form
        onSubmit={handleSubmit(submitFeatureRequest)}
        className="
          flex
          flex-col
          w-full
        "
      >
        <Box
          className="
            flex
            flex-col
            justify-start
            items-start
            w-full
            gap-4
            p-6
            rounded-lg
            bg-neutral-800
            shadow-2xl
            shadow-neutral-950/20
          "
        >
          {userProfileData?.id ? (<TextField
            multiline
            rows={6}
            {...register("feature")}
            label="Submit a feature request"
            id="outlined-required"
            placeholder={
              userProfileData.username ? 
              `Hey, ${userProfileData.username}! Missing a feature? Let us know!` : 
              "I think you should build..."
            }
            inputProps={{ maxLength: 250 }}
            helperText={`${featureValue ? featureValue.length : 0}/${250} characters`}
            error={!!errors.feature}
            FormHelperTextProps={{
              className: "flex w-full justify-end text-neutral-400 pr-4"
            }}
            className="
              w-full
              gap-1
            "
          />) : (
            <Skeleton
              variant="rectangular"
              animation="wave"
              className="
                w-full
                h-[200px]
                gap-1
                rounded-md
              "
            />
          )}
          {userProfileData?.username ? (
            <Button
              variant="outlined"
              color="primary"
              disabled={!isValid || !userProfileData?.username}
              startIcon={isSubmitting ? <CircularProgress size={24} /> : <SendIcon />}
              type="submit"
              size="large"
              className="
                w-full
              "
            >
              Send request!
            </Button>
          ) : (
            <Skeleton
              variant="rectangular"
              animation="wave"
              className="
                w-full
                h-[48px]
                rounded-md
              "
            />
          )}
        </Box>
      </form>
      {/* Alert */}
      {userProfileData?.username && showAlertInfo && (
      <Alert
        severity={alertInfo?.type}
        className="w-full mt-2 rounded-md"
        icon={
          alertInfo ? 
          alertInfo.icon : 
          undefined
        }
      >
        {
          alertInfo ? 
          alertInfo.message : 
          "Error"
        }
      </Alert>)}
    </Box>
  );
}