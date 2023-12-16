"use client";

import React, { useState, useRef, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Box from '@mui/material/Box';
import { ListItemIcon, ListItemText, Typography } from '@mui/material';

type TextfieldWithSlashMenuProps = {
  textfieldLabel: string;
  textfieldWidth: string;
  textfieldFullWidth: boolean;
  menuOptions: { icon: React.ReactNode, title: string, description: string }[];
}

export default function TextfieldWithSlashMenu(props: TextfieldWithSlashMenuProps) {
  const [text, setText] = useState('');
  const [showSelect, setShowSelect] = useState(false);
  const [selectPosition, setSelectPosition] = useState({ top: 0, left: 0 });
  const textFieldRef = useRef<HTMLInputElement>(null);

  const calculatePosition = () => {
    if (textFieldRef.current) {
      const selectionPoint = textFieldRef.current.getBoundingClientRect();
      setSelectPosition({
        top: selectionPoint.top - 30,
        left: selectionPoint.left + (text.length * 8) - 270
      });
    }
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    const title = event.target.value as string;
    const option = props.menuOptions.find(o => o.title === title);
    if (option) {
      const newText = text.slice(0, text.lastIndexOf('/')) + option.title + " (" + option.description + ")";
      setText(newText);
    }
    setShowSelect(false);
  };

  useEffect(() => {
    setShowSelect(text.endsWith('/'));
    if (text.endsWith('/')) {
      calculatePosition();
    }
  }, [text]);

  useEffect(() => {
    if (!showSelect && textFieldRef.current) {
      textFieldRef.current.focus();
    }
  }, [text, showSelect]);

  return (
    <Box position="relative" className="flex w-full">
      <TextField
        fullWidth={props.textfieldFullWidth}
        label={props.textfieldLabel}
        value={text}
        onChange={handleTextChange}
        ref={textFieldRef}
        multiline
        rows={4}
        sx={{ width: props.textfieldWidth }}
      />
      {showSelect && (
        <Select
          style={{
            position: 'absolute',
            top: `${selectPosition.top}px`,
            left: `${selectPosition.left}px`
          }}
          value={text}
          onChange={handleSelectChange}
          autoWidth
          variant="outlined"
          sx={{ width: "360px", zIndex: 1 }}
          className="!bg-slate-800 shadow-md shadow-slate-950"
        >
          {props.menuOptions.map((option, index) => (
            <MenuItem
              key={index}
              value={option.title}
              className="flex flex-col items-start w-[360px] space-y-2 p-4"
              sx={{ minHeight: 'auto' }}
            >
              <ListItemIcon className="text-gray-100">
                {option.icon}
              </ListItemIcon>
              <ListItemText primary={option.title} sx={{ margin: 0, color: 'text.primary' }} />
              <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'normal' }}>
                {option.description}
              </Typography>
            </MenuItem>
          ))}
        </Select>
      )}
    </Box>
  );
}