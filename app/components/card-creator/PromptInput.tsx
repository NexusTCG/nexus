// PromptInput.tsx
import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ToggleButton,
  ToggleButtonGroup,
  TextField,
} from "@mui/material/";

type PromptInputProps = {
  onPromptChange: (prompt: string) => void;
};

export default function PromptInput({
  onPromptChange,
}: PromptInputProps): React.ReactElement {
  const [promptType, setPromptType] = useState<string | null>("content");
  const promptRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (promptRef.current) {
      promptRef.current.focus();
    }
  }, [promptType]);

  function handlePromptTypeChange(
    e: React.MouseEvent<HTMLElement>,
    newPromptType: string | null,
  ) {
    setPromptType(newPromptType);
  }

  return (
    <Box>
      {/* ToggleButtonGroup and TextField goes here */}
      <ToggleButtonGroup
        value={promptType}
        exclusive
        onChange={handlePromptTypeChange}
        aria-label="prompt type"
        className="w-full"
      >
        {/* ToggleButton components */}
      </ToggleButtonGroup>
      <TextField
        id="prompt"
        label="AI Prompt"
        variant="outlined"
        multiline
        rows={2}
        placeholder={
          promptType === "content"
            ? "Write a content prompt.."
            : "Write an art prompt.."
        }
        inputRef={promptRef}
        onChange={(e) => onPromptChange(e.target.value)}
      />
    </Box>
  );
}
