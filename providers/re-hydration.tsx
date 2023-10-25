"use client";
import React, { useEffect, useState } from "react";

function ReHydration() {
  const [isMounted, setIsMoounted] = useState(false);
  useEffect(() => {
    setIsMoounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }
  return <div>ReHydration</div>;
}

export default ReHydration;
