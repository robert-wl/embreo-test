import { Card, CardContent, CardHeader } from "@/components/ui/card.tsx";
import EventTable from "@/pages/dashboard/_components/event-table.tsx";
import { ComponentProps } from "react";
import RegisterEventModal from "@/pages/dashboard/_components/(company)/register-event-modal.tsx";
import { getEvents } from "@/service/event-service.ts";
import useAuth from "@/hooks/use-auth.ts";
import { Role } from "@/lib/model/entity/user.entity.ts";

export default function EventOverviewCard({ ...props }: ComponentProps<typeof Card>) {
  const { user } = useAuth();
  const { data } = getEvents({});
  return (
    <Card
      className="transform transition-all col-span-3"
      {...props}>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Event Overview</h2>
          <p className="text-sm text-gray-500 mt-1">Track your company's events</p>
        </div>
        {user?.role === Role.COMPANY && <RegisterEventModal />}
      </CardHeader>
      <CardContent>
        <EventTable data={data ?? []} />
      </CardContent>
    </Card>
  );
}
