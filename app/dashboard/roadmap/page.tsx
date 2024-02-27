"use client";

import React, { 
  useState, 
  useContext, 
  useEffect
} from "react";
import { useForm } from "react-hook-form";
import { createClient } from "@/app/lib/supabase/client";
import { DashboardContext } from "@/app/context/DashboardContext";
import TextSection from "@/app/components/content/TextSection";
import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
} from "@mui/material"
import {
  Send,
  Check,
  Error
} from "@mui/icons-material";

type FeatureRequestType = {
  feature: string;
  requester: string;
  user_id: string;
};

export default function Roadmap() {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { 
      errors, 
      isValid 
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
    if (userProfileData?.username) {
      setValue("requester", userProfileData.username);
      setValue("user_id", userProfileData.id);
    }
  }, [userProfileData?.username]);

  // Submit feature request
  async function submitFeatureRequest(
    data: FeatureRequestType
  ) {
    const { feature } = data;
    const { error } = await supabase
      .from("feature_requests")
      .insert([{ 
        feature_request: feature,
        requester: userProfileData?.username,
      }]);
    if (error) {
      setAlertInfo({
        type: "error",
        icon: <Error />,
        message: "Error submitting feature request"
      });
      setShowAlertInfo(true);
      setTimeout(() => {
        setShowAlertInfo(false);
      }, 6000);
      console.error("Error submitting feature request", error);
    } else {
      setAlertInfo({
        type: "success",
        icon: <Check />,
        message: "Error submitting feature request"
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
      {/* Section: Nexus Universe */}
      <TextSection
        sectionId="roadmap-card-creator"
        overline="step 1"
        title="Card Creator"
      >
        <Typography
          variant="body1"
          className="
            text-white
            font-medium
          "
        >
          The first step is to build and improve the Card Creator. {" "}
          It will let people start bringing their card ideas to life. {" "}
          We can then grow the community of people who enjoy making TCG cards. {""}
          With enough cards created, we can start playtesting the game. {" "}
        </Typography>
        <Typography
          variant="subtitle1"
          className="
            text-white
            font-semibold
          "
        >
          Request a feature!
        </Typography>
        {userProfileData?.id && (
          <form onSubmit={handleSubmit(submitFeatureRequest)}>
            <Box
              className="
                flex
                flex-col
                justify-start
                items-start
                w-full
                gap-4
                mt-8
              "
            >
              <TextField
                multiline
                rows={6}
                {...register("feature")}
                label="Feature Request"
                id="outlined-required"
                placeholder={
                  userProfileData.username ? 
                  `Hey, ${userProfileData.username}! Missing a feature? Let us know!` : 
                  "I think you should build..."
                }
                inputProps={{ maxLength: 200 }}
                helperText={`${featureValue ? featureValue.length : 0}/${200} characters`}
                error={!!errors.feature}
                FormHelperTextProps={{ className: "text-neutral-400" }}
                className="
                  w-full
                  gap-1
                "
              />
              <Button
                variant="outlined"
                color="primary"
                disabled={!isValid || !userProfileData?.username}
                endIcon={<Send />}
                type="submit"
                size="large"
                className="
                  w-full
                "
              >
                Send request!
              </Button>
            </Box>
            
          </form>
        )}
        {/* Alert */}
        {userProfileData?.username && showAlertInfo && (
          <Alert
            severity={alertInfo?.type}
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
      </TextSection>

      <TextSection
        sectionId="roadmap-playtesting"
        overline="Step 2"
        title="Early Playtesting"
      >
        <Typography
          variant="body1"
          className="
          text-white
            font-medium
          "
        >
          The first step is to build and improve the Card Creator. {" "}
          It will let people start bringing their card ideas to life. {" "}
          With enough cards created, we can start playtesting the game. {" "}
          Then we can iterate on the game rules based on testing. {" "}
        </Typography>
      </TextSection>

      <TextSection
        sectionId="roadmap-playtesting"
        overline="Step 3"
        title="Game Development"
      >
        <Typography
          variant="body1"
          className="
          text-white
            font-medium
          "
        >
          When the game rules are solid, we can start building the game. {" "}
          Simultaneously we&apos;ll grow the community, and collection of cards. {""}
          Nexus will be a digital card game, so building it will take some time. {" "}
          But once its out, we can start playing our cards with other players. {" "}
        </Typography>
      </TextSection>
    </Box>
  );
}