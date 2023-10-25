"use client";

import FormBlocks from "@/components/form-bolcks";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function Home() {
  const [variable, setVariable] = useState("");
  return (
    <main className="flex flex-col h-full items-center gap-y-10 py-12">
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
        <div className="flex flex-row gap-x-16">
          <button
            onClick={() => setVariable("yes")}
            className="text-neutral-500 py-6 px-8 border-2 hover:shadow-md rounded-lg hover:border-neutral-800 hover:text-neutral-700 transition delay-200 duration-500 ease-linear"
          >
            Да я хочу пройти этот опрос.
          </button>
          <button
            onClick={() => setVariable("no")}
            className="text-neutral-500 py-6 px-8 border-2 hover:shadow-md rounded-lg hover:border-neutral-800 hover:text-neutral-700 transition delay-200 duration-500 ease-linear"
          >
            Нет, скорее дайте мне номер менеджера!
          </button>
        </div>
      </div>

      <div
        className={cn(
          "w-full collapse h-0 opacity-0 flex flex-col items-center justify-center",
          variable === "yes" &&
            "transition-opacity h-full visible opacity-100 delay-200 duration-1000 ease-linear"
        )}
      >
        <FormBlocks />
      </div>
    </main>
  );
}
