"use client";

import React from "react";
import Link from "next/link";
import Button from "@mui/material/Button";
import PaymentIcon from '@mui/icons-material/Payment';

export default function BuyCreditsButton() {
  const paymentLink = "https://buy.stripe.com/test_eVabKcdpt1odfio4gg";

  return (
    <Link
      href={paymentLink}
      target="_blank" 
      rel="noopener noreferrer"
    >
      <Button
        variant="outlined"
        color="primary"
        startIcon={<PaymentIcon />}
        size="large"
        className="
          flex
          justify-start
          items-center
          w-full
          hover:cursor-pointer
          hover:bg-teal-600/30
          hover:text-white
          hover:border-teal-600
        "
      >
        Buy Credits
      </Button>
    </Link>
  )
}