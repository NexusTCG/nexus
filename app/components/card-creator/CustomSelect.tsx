"use client";

import React from "react";
import { 
  useFormContext, 
  Controller 
} from "react-hook-form";

type CustomSelectProps = {
    name: string;
    options: { [key: string]: string };
    label: string;
    className?: string;
    disabled?: boolean;
};

export default function CustomSelect({
    name,
    options,
    label,
    ...rest
}: CustomSelectProps) {
    const { 
      control, 
      formState: { 
        errors 
      } 
    } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <div className="custom-select-container">
                    <label htmlFor={name}>{label}</label>
                    <select
                        {...field}
                        {...rest}
                        id={name}
                        className={`custom-select ${errors[name] ? 'error' : ''}`}
                    >
                        <option value="">Select...</option>
                        {Object.entries(options).map(([value, label]) => (
                            <option key={value} value={value}>
                                {label.toString()}
                            </option>
                        ))}
                    </select>
                    {errors[name]?.message?.toString() ?? ''}
                </div>
            )}
        />
    );
}
