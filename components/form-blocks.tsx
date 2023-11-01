"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import axios from "axios";

const formSchema = z.object({
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "Вам нужно выбрать хотя бы 1 вид услуги",
  }),
  items1: z.array(z.string()).refine((value) => value.some((item1) => item1), {
    message: "Вам нужно выбрать хотя бы 1 тип сайта",
  }),
  work: z.enum(["sm", "md", "lg"], {
    required_error: "Выберите обьем работы",
  }),
  hurry: z.enum(["nohurry", "hurry", "maxhurry"], {
    required_error: "Выберите срочность",
  }),
  username: z.string().min(2, {
    message: "Напишите ваше имя",
  }),
  tel: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Username must be at least 2 characters.",
  }),
});

function FormBlocks() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      items: [],
      items1: [],
      username: "",
      tel: "",
      email: "",
    },
  });
  const router = useRouter();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    // console.log(data);
    try {
      // console.log("submitted");
      // await axios.post(`/api/`, data);
      toast({
        title: "Опрос завершен",
        description: "Данные приняты, благодарим за ответы!",
      });
      setIsSubmitted(true);
      router.refresh();
    } catch (error) {
      toast({
        title: "Что-то пошло не так(...",
        description: "Возможно вы мне не заполнили обьязательные поля",
        action: <ToastAction altText="Еще раз">Еще раз</ToastAction>,
      });
    }
  };

  const [showItems1, setShowItems1] = useState(false);
  const [showWork, setShowWork] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const items = [
    {
      id: "siteFill",
      label: "Заполнение сайта",
    },
    {
      id: "createSite",
      label: "Создать сайт с нуля",
    },
    {
      id: "createSiteCMS",
      label:
        "Создать сайт с нуля на конструкторах CMS (Tilda, Wordpress, и т.д.)",
    },
    {
      id: "changeSite",
      label: "Изменить имеющийся сайт",
    },
    {
      id: "other",
      label: "Другое",
    },
  ] as const;

  const items1 = [
    {
      id: "singlePage",
      label: "Одностраничный сайт (Портфолио, Афиша, и т.д)",
    },
    {
      id: "marketPlace",
      label: "Маркетплейс (Интернет-магазин, Онлайн-заказы, Кинотеатры и т.б.)",
    },
    {
      id: "database",
      label: "База данных (Дашборд, Админ-панель)",
    },
    {
      id: "corpSite",
      label: "Корпоративный сайт",
    },
    {
      id: "api",
      label: "Документация (API, описание сервиса)",
    },
    {
      id: "other1",
      label: "Другое",
    },
  ] as const;

  return (
    <div className="h-max w-[760px] flex flex-col p-12 border-2 rounded-lg gap-y-4">
      {isSubmitted === false ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className=" flex-none">
            <div className="flex flex-col gap-y-8 mb-8">
              <FormField
                control={form.control}
                name="items"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel className="text-base text-lg">
                        Вид услуги
                      </FormLabel>
                      <FormDescription className="text-md ">
                        Выберите вид услуги (или виды услуг), которую хотели бы
                        получить
                      </FormDescription>
                    </div>
                    {items.map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="items"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                          ...field.value,
                                          item.id,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== item.id
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal">
                                {item.label}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <button
                onClick={() => setShowItems1(true)}
                type="button"
                className="hover:shadow-md transition delay-200 duration-500 ease-linear rounded-lg w-fit py-1 px-3 border-2 hover:border-black text-sm text-neutral-500 hover:text-neutral-900"
              >
                Следующее
              </button>
            </div>
            <div
              className={cn(
                "flex flex-col gap-y-8 collapse h-0 opacity-0 ",
                showItems1 === true &&
                  "transition-opacity h-full visible opacity-100 delay-200 duration-1000 ease-linear mb-8"
              )}
            >
              <FormField
                control={form.control}
                name="items1"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel className="text-base text-lg">
                        Тип сайта
                      </FormLabel>
                      <FormDescription className="text-md ">
                        Выберите тип вашего сайта
                      </FormDescription>
                    </div>
                    {items1.map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="items1"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                          ...field.value,
                                          item.id,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== item.id
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal">
                                {item.label}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <button
                onClick={() => setShowWork(true)}
                type="button"
                className="hover:shadow-md transition delay-200 duration-500 ease-linear rounded-lg w-fit py-1 px-3 border-2 hover:border-black text-sm text-neutral-500 hover:text-neutral-900"
              >
                Следующее
              </button>
            </div>
            <div
              className={cn(
                "flex flex-col gap-y-8 collapse h-0 opacity-0 ",
                showWork === true &&
                  "transition-opacity h-full visible opacity-100 delay-200 duration-1000 ease-linear mb-8"
              )}
            >
              <FormField
                control={form.control}
                name="work"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-lg">
                      Выберите обьем выполняемой работы
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="sm" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Легкий (2-8 раб. часов)
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="md" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Средний (больше 8 раб. часов)
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="lg" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Большой (Сложный)
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="hurry"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-lg">
                      Выберите срочность работы
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="nohurry" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Не срочный
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="hurry" />
                          </FormControl>
                          <FormLabel className="font-normal">Срочный</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="maxhurry" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Очень срочный
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <button
                onClick={() => setShowForm(true)}
                type="button"
                className="hover:shadow-md transition delay-200 duration-500 ease-linear rounded-lg w-fit py-1 px-3 border-2 hover:border-black text-sm text-neutral-500 hover:text-neutral-900"
              >
                Следующее
              </button>
            </div>

            <div
              className={cn(
                "flex flex-col gap-y-8 collapse h-0 opacity-0 ",
                showForm === true &&
                  "transition-opacity h-full visible opacity-100 delay-200 duration-1000 ease-linear mb-8"
              )}
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Ваше имя</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Email</FormLabel>
                    <FormControl>
                      <Input placeholder="example@gmail.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Телефон</FormLabel>
                    <FormControl>
                      <Input placeholder="Телефон" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <button
              type="submit"
              className={cn(
                "hover:shadow-md transition delay-200 duration-500 ease-linear collapse rounded-lg w-fit py-1  px-3 border-2 hover:border-black text-sm text-neutral-500 hover:text-neutral-900",
                showForm === true && "visible"
              )}
            >
              Отправить
            </button>
          </form>
        </Form>
      ) : (
        <div className="text-center transition-opacity opacity-100 duration-700 delay-200 ease-in-out">
          <p>
            Спасибо за прохождения опроса, мы с вами свяжемся для детального
            обсуждения вашего заказа! Всего доброго!
          </p>
        </div>
      )}
    </div>
  );
}

export default FormBlocks;
