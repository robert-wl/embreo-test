import useAuth from "@/hooks/use-auth.ts";
import RecentActivityCard from "@/components/dashboard/recent-activity-card.tsx";
import EventOverviewCard from "@/pages/dashboard/_components/event-overview-card.tsx";
import VendorOverviewCard from "@/pages/dashboard/_components/(vendor)/vendor-overview-card.tsx";
import { Role } from "@/lib/model/entity/user.entity.ts";
import CompanyOverviewCard from "@/pages/dashboard/_components/(company)/company-overview-card.tsx";
import { getEvents } from "@/service/event-service.ts";
import EventStatsSection from "@/pages/dashboard/_components/event-stats-section.tsx";

export default function DashboardPage() {
  const { data } = getEvents({});
  const { user } = useAuth();

  return (
    <>
      <div className="flex">
        <img
          src="/images/dashboard/image-1.png"
          alt="Hello"
          className="w-64 h-64"
        />
        <div className="flex flex-col justify-center gap-4">
          <h1 className="text-4xl font-bold">Hello, {user?.username}</h1>
          <p className="text-lg font-medium text-gray-500">Welcome to your dashboard. Here you can manage your account and view your stats.</p>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {user?.role === Role.COMPANY ? <CompanyOverviewCard user={user} /> : <VendorOverviewCard user={user} />}

        <EventStatsSection data={data ?? []} />

        <RecentActivityCard data={data ?? []} />
        <EventOverviewCard data={data ?? []} />
      </div>
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted md:min-h-min" />
    </>
  );
}
