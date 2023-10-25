"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

function Footer() {
  const [isMounted, setIsMoounted] = useState(false);
  useEffect(() => {
    setIsMoounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }
  return (
    <footer className="bg-transparent h-20 w-full">
      <div className="flex mx-auto py-8 items-center justify-center">
        <p className="lg:text-left xs:text-center text-xs font-normal text-center">
          &copy; Все права защищены. Был разработан
          <span className="font-medium bg-gradient-to-r hover:from-pink-500 hover:to-yellow-500 p-1 rounded-md hover:text-white">
            <Link href="https://toimet.tech">ToimetTech</Link>
          </span>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
