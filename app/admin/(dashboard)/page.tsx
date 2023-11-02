import { UserButton } from "@clerk/nextjs";
import React from "react";
import { DataTableDemo, Form } from "./columns/column";
import prismadb from "@/lib/prismadb";
import { format } from "date-fns";

const DashboardPage = async () => {
  const forms = await prismadb.form.findMany();
  const formattedData: Form[] = forms.map((item) => ({
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
    id: item.id,
    items: item.items[0],
    items1: item.items[0],
    work: item.work,
    hurry: item.hurry,
    username: item.username,
    tel: item.tel,
    email: item.email,
  }));
  return (
    <div className="flex flex-col px-16 pt-8 justify-center items-center">
      <div>
        <UserButton afterSignOutUrl="/admin" />
      </div>
      <div className="w-full h-full">
        <DataTableDemo data={formattedData} />
      </div>
    </div>
  );
};

export default DashboardPage;
