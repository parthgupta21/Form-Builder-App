import { GetForms, GetFormStats } from "@/actions/form";
import Image from "next/image";
import { LuView } from "react-icons/lu";
import { ReactNode, Suspense } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import { FaWpforms } from "react-icons/fa";
import { HiCursorClick } from "react-icons/hi";
import { TbArrowBounce } from "react-icons/tb";
import { Separator } from "@/components/ui/separator";
import { CreateFormBtn } from "@/components/CreateFormBtn";
import { form } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import { formatDistance } from "date-fns";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BiRightArrowAlt } from "react-icons/bi";
import { FaEdit } from "react-icons/fa";

export default function Home() {
  return <div className="container pt-4">
    <Suspense fallback={<StatsCards loading={true} />}>
      <CardStatsWrapper />
    </Suspense>

    <Separator className="my-6" />
    <h2 className="text-4xl font-bold-col-span-2">Your Forms</h2>
    <Separator className="my-6" />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <CreateFormBtn />
      <Suspense fallback={[1, 2, 3, 4].map((el) => (
        <FormCardSkeleton key={el} />
      ))}>
        <FormCards />
      </Suspense>
    </div>

   


  </div>
}



async function CardStatsWrapper() {
  const stats = await GetFormStats();


  return <StatsCards loading={false} data={stats} />

}

interface StatsCardsProps {
  data?: Awaited<ReturnType<typeof GetFormStats>>;
  loading: boolean;
}

function StatsCards(props: StatsCardsProps) {
  const { data, loading } = props;
  return (
    <div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lf:grid-cols-4">
      <StatsCard
        title="Total Visits"
        icon={<LuView className="text-blue-600" />}
        value={data?.visits.toLocaleString() || ""}
        helperText="All item form visits"
        loading={loading}
        className="shadow-md shadow-blue-600"
      />

      <StatsCard
        title="Total Submissions"
        icon={<FaWpforms className="text-yellow-600" />}
        value={data?.submissions.toLocaleString() || ""}
        helperText="All time form submissions"
        loading={loading}
        className="shadow-md shadow-yellow-600"
      />

      <StatsCard
        title="Submissions Rate"
        icon={<HiCursorClick className="text-green-600" />}
        value={data?.submissionRate.toLocaleString() + "%" || ""}
        helperText="Visits that resulted in a submission"
        loading={loading}
        className="shadow-md shadow-green-600"
      />

      <StatsCard
        title="Bounce Rate"
        icon={<TbArrowBounce className="text-red-600" />}
        value={data?.bounceRate.toLocaleString() + "%" || ""}
        helperText="Visits that left without interacting"
        loading={loading}
        className="shadow-md shadow-red-600"
      />



    </div>


  );

}


function StatsCard({
  title,
  value,
  icon,
  helperText,
  loading, className,
}: {
  title: string;
  value: string;
  helperText: string;
  className: string;
  loading: boolean;
  icon: ReactNode;

}) {
  return <Card className={className}>
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className=" text-sm font-medium text-muted-foreground">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">
        {loading && (<Skeleton>
          <span className="opacity-0">0</span>
        </Skeleton>
        )}
        {!loading && value}
      </div>
      <p className="text-xs text-muted-foreground pt-1">{helperText}</p>
    </CardContent>
  </Card>
}


function FormCardSkeleton() {
  return <Skeleton className="border-2 border-primary-/20 h-[190px w-full" />
}

async function FormCards() {
  const forms = await GetForms();

  return (
    <>
      {forms.map((form) => (
        <FormCard key={form.id} form={form} />
      ))}

    </>
  );
}




function FormCard({ form }: {form: form}) {
  return <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2 justify-between">
        <span className="truncate font-bold" >{form.name}</span>
        {form.published && <Badge>Published</Badge>}
        {!form.published && <Badge variant={"destructive"}>Draft</Badge>}
      </CardTitle>
      <CardDescription className="flex items-center justify-between text-mutes-foreground text-sm">
        {formatDistance(form.createdAt, new Date(), { addSuffix: true, })}
        {form.published && (
          <span className="flex item-center gap-2">
            <LuView className="text-muted-foreground" />
            <span>{form.visits.toLocaleString()}</span>
            <FaWpforms className="text-muted-foreground" />
            <span>{form.submissions.toLocaleString()}</span>
          </span>
        )}
      </CardDescription>
    </CardHeader>

    <CardContent className="h-[20px] truncate text-sm text-muted-foreground">
      {form.description || "No description"}
    </CardContent>

    <CardFooter>
      {form.published && (
        <Button  asChild className="w-full mt-2 text-md gap-4">
          <Link href={`/forms/${form.id}`}>View Submissions<BiRightArrowAlt /></Link>
        </Button>
      )}

      {!form.published && (
        <Button asChild className="w-full mt-2 text-md gap-4" variant={"secondary"}>
          <Link href={`/forms/${form.id}`}>Edit Form<FaEdit /></Link>
        </Button>
      )}
    </CardFooter>
      
  </Card>
}