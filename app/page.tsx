"use client"

import { useEffect } from "react";

import Homepage from "./home/page";

export default function Home() {
  useEffect(() => {
    document.title = "NoteDomain";
  })

  return (
    <div>
      <Homepage />
    </div>
  );
}
