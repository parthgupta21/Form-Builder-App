import { GetFormStats } from "@/actions/form";
import Image from "next/image";
import { LuView } from "react-icons/lu";
import { ReactNode, Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import { FaWpforms } from "react-icons/fa";
import { HiCursorClick } from "react-icons/hi";
import { TbArrowBounce } from "react-icons/tb";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return <div className="container pt-4">
    <Suspense fallback={<StatsCards loading={true} />}>
      <CardStatsWrapper />
    </Suspense>

    <Separator className="my-6" />
    <h2 className="text-4xl font-bold-col-span-2">Your Forms</h2>
    <Separator className="my-6" />

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
        value={data?.submissionRate.toLocaleString() + "%"|| ""}
        helperText="Visits that resulted in a submission"
        loading={loading}
        className="shadow-md shadow-green-600"
      />

      <StatsCard
        title="Bounce Rate"
        icon={<TbArrowBounce className="text-red-600" />}
        value={data?.bounceRate.toLocaleString() + "%"|| ""}
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