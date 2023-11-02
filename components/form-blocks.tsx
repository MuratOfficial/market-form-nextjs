"use client";
import React, { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Link as ScrollLink,
  Events,
  scrollSpy,
  animateScroll as scroll,
} from "react-scroll";
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
import Link from "next/link";

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
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    // console.log(data);
    try {
      console.log("submitted");
      await axios.post(`/api/`, data);
      toast({
        title: "Опрос завершен",
        description: "Данные приняты, благодарим за ответы!",
      });
      setIsSubmitted(true);
    } catch (error) {
      toast({
        title: "Что-то пошло не так(...",
        description: "Возможно вы мне не заполнили обьязательные поля",
        action: <ToastAction altText="Еще раз">Еще раз</ToastAction>,
      });
    }
  };

  useEffect(() => {
    // Registering the 'begin' event and logging it to the console when triggered.
    Events.scrollEvent.register("begin", (to, element) => {
      console.log("begin", to, element);
    });

    // Registering the 'end' event and logging it to the console when triggered.
    Events.scrollEvent.register("end", (to, element) => {
      console.log("end", to, element);
    });

    // Updating scrollSpy when the component mounts.
    scrollSpy.update();

    // Returning a cleanup function to remove the registered events when the component unmounts.
    return () => {
      Events.scrollEvent.remove("begin");
      Events.scrollEvent.remove("end");
    };
  }, []);

  const scrollTo = (range: number) => {
    scroll.scrollMore(range); // Scrolling to 100px from the top of the page.
  };

  const [showItems1, setShowItems1] = useState(false);
  const [showWork, setShowWork] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const scrollDown = (setItem: string) => {
    if (setItem === "items1") {
      setShowItems1(true);
      scrollTo(300);
    }
    if (setItem === "work") {
      setShowWork(true);
      scrollTo(400);
    }
    if (setItem === "form") {
      setShowForm(true);
      scrollTo(400);
    }
  };

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
    <div className="h-max  max-w-[760px] flex flex-col p-12 border-2 rounded-lg gap-y-4">
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
                      <FormLabel className="text-base lg:text-lg xs:text-sm">
                        Вид услуги
                      </FormLabel>
                      <FormDescription className=" lg:text-[16px] xs:text-xs">
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
                              <FormLabel className="lg:text-sm xs:text-xs font-normal">
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
                onClick={() => scrollDown("items1")}
                type="button"
                className="hover:shadow-md lg:text-md xs:text-sm transition delay-200 duration-500 ease-linear rounded-lg w-fit py-1 px-3 border-2 hover:border-black text-sm text-neutral-500 hover:text-neutral-900"
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
                      <FormLabel className="text-base lg:text-lg xs:text-sm">
                        Тип сайта
                      </FormLabel>
                      <FormDescription className="lg:text-[16px] xs:text-xs">
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
                              <FormLabel className="lg:text-sm xs:text-xs font-normal">
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
                onClick={() => scrollDown("work")}
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
                    <FormLabel className="lg:text-lg xs:text-sm">
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
                          <FormLabel className="font-normal lg:text-sm xs:text-xs">
                            Легкий (2-8 раб. часов)
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="md" />
                          </FormControl>
                          <FormLabel className="font-normal lg:text-sm xs:text-xs">
                            Средний (больше 8 раб. часов)
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="lg" />
                          </FormControl>
                          <FormLabel className="font-normal lg:text-sm xs:text-xs">
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
                    <FormLabel className="lg:text-lg xs:text-sm">
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
                          <FormLabel className="font-normal lg:text-sm xs:text-xs">
                            Не срочный
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="hurry" />
                          </FormControl>
                          <FormLabel className="font-normal lg:text-sm xs:text-xs">
                            Срочный
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="maxhurry" />
                          </FormControl>
                          <FormLabel className="font-normal lg:text-sm xs:text-xs">
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
                onClick={() => scrollDown("form")}
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
                    <FormLabel className="lg:text-lg xs:text-sm">
                      Ваше имя
                    </FormLabel>
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
                    <FormLabel className="lg:text-lg xs:text-sm">
                      Email
                    </FormLabel>
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
                    <FormLabel className="lg:text-lg xs:text-sm">
                      Телефон
                    </FormLabel>
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
          <p className="lg:text-lg xs:text-sm">
            Спасибо за прохождения опроса, мы с вами свяжемся для детального
            обсуждения вашего заказа! Всего доброго! Наши работы можете
            посмотреть на{" "}
            <span className="font-medium bg-gradient-to-r hover:from-pink-500 hover:to-yellow-500 p-1 rounded-md hover:text-white">
              <Link href="https://toimet.tech">ToimetTech</Link>
            </span>
          </p>
        </div>
      )}
    </div>
  );
}

export default FormBlocks;
