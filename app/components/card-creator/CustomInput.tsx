import React from "react";
import { 
  Controller, 
  useFormContext 
} from "react-hook-form";

type CustomInputProps = {
    name: string;
    placeholder: string;
};

export default function CustomInput({
    name,
    placeholder
}: CustomInputProps) {

  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ 
        field, 
        fieldState: { 
          error 
        } 
      }) => (
        <input
          {...field}
          placeholder={placeholder}
          className={
            `custom-input-base ${error ?
            'custom-input-error' : ''
        }`}
        />
      )}
    />
  );
};
