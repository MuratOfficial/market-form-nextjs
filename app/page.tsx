"use client";

import FormBlocks from "@/components/form-blocks";
import { cn } from "@/lib/utils";
import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [variable, setVariable] = useState("");
  const links = [
    { name: "Telegram", href: "https://t.me/Murat_Toimet" },
    { name: "Linkedin", href: "https://www.linkedin.com/in/toimetm/" },
    {
      name: "Instagram",
      href: "https://www.instagram.com/official_murattoimet/",
    },
    { name: "Whatsapp", href: "https://wa.me/77472156675" },
    { name: "+77752156675", href: "+77752156675" },
  ];
  return (
    <main className="flex flex-col h-full items-center gap-y-10">
      <h1 className=" text-4xl font-bold">
        Форма определения желаемого продукта
      </h1>
      <div
        className={cn(
          "flex flex-col  items-center gap-y-10 opacity-100 h-full"
        )}
      >
        {" "}
        <p className="text-neutral-500 text-center px-12">
          Для определения нужного вам конечного продукта и приблизительной
          стоимости, просим пройти небольшой опрос. Либо вы можете напрямую
          позвонить или написать менеджеру по{" "}
          <span className="text-neutral-800 font-semibold">Whatsapp</span>
        </p>
        <div className="flex flex-row gap-x-16 h--max w-fit">
          <button
            onClick={() => setVariable("yes")}
            className="text-neutral-500 h-20  py-6 px-8 border-2 hover:shadow-md rounded-lg hover:border-neutral-800 hover:text-neutral-700 transition delay-200 duration-500 ease-linear"
          >
            Да я хочу пройти этот опрос.
          </button>
          <button
            onClick={() => setVariable("no")}
            className="text-neutral-500  py-6 px-8 border-2 hover:shadow-md rounded-lg hover:border-neutral-800 hover:text-neutral-700 transition delay-200 duration-500 ease-linear"
          >
            Нет, скорее дайте мне номер менеджера!
          </button>
        </div>
      </div>

      <div
        className={cn(
          "w-full collapse h-0 opacity-0 flex flex-col items-center justify-center",
          variable === "yes" &&
            "transition-opacity h-full visible opacity-100 delay-200 duration-1000 ease-linear z-10",
          variable === "no" &&
            "transition-opacity h-0 transition-[height] collapse opacity-0 delay-200 duration-500 ease-linear z-0"
        )}
      >
        <FormBlocks />
      </div>
      <div
        className={cn(
          "w-full collapse h-0 opacity-0 flex flex-col items-center justify-center",
          variable === "no" &&
            "transition-opacity h-full visible opacity-100 delay-200 duration-1000 ease-linear z-10"
        )}
      >
        <div className="text-neutral-400 flex px-32 flex-col gap-y-2 border-2 rounded-lg p-8 text-center text-lg ">
          <Link
            href="mailto:toimetm@gmail.com"
            className="hover:text-neutral-900 transition-colors duration-500 delay-150 hover:underline underline-offset-4"
          >
            toimetm@gmail.com
          </Link>

          {links.map((item, index) => (
            <Link key={index} href={item.href}>
              <p className="hover:text-neutral-900 transition-colors duration-500 delay-150">
                {item.name}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
