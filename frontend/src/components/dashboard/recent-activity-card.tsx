import { Card, CardContent, CardHeader } from "@/components/ui/card.tsx";
import { ComponentProps, useMemo } from "react";
import { EventEntity, EventStatus } from "@/lib/model/entity/event.entity.ts";
import useAuth from "@/hooks/use-auth.ts";
import { Role } from "@/lib/model/entity/user.entity.ts";
import TextAvatar from "@/components/text-avatar.tsx";
import { timeAgo } from "@/lib/time/utils.ts";
import EventBadge from "@/components/event/event-badge.tsx";

interface Props extends ComponentProps<typeof Card> {
  data: EventEntity[];
}

interface Activity {
  title: string;
  description: string;
  status?: string;
  time: string;
  name: string;
}

export default function RecentActivityCard({ data, ...props }: Props) {
  const { user } = useAuth();

  const getRecentActivitiesCompany = () => {
    return data
      .flatMap((e) => {
        console.log(e.event_responses);
        return (
          e.event_responses?.map<Activity>((r) => {
            let descriptionText = "";

            switch (r.status) {
              case EventStatus.APPROVED:
                descriptionText = `Request approved by vendor ${e.approved_vendor?.name}`;
                break;
              case EventStatus.REJECTED:
                descriptionText = `Request rejected by vendor ${r.vendor?.name} with reason: ${r.remarks}`;
                break;
            }

            return {
              title: "New Response",
              description: descriptionText,
              status: r.status,
              time: timeAgo(r.created_at),
              name: r.vendor?.name ?? "",
            };
          }) ?? []
        );
      })
      .sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime())
      .slice(0, 8);
  };

  const getRecentActivitiesVendor = () => {
    return data
      .map<Activity>((e) => {
        let descriptionText = `A new event request has been made by company ${e.company?.name}`;

        return {
          title: "New Event Request",
          description: descriptionText,
          time: timeAgo(e.created_at),
          name: e.company?.name ?? "",
          vendorName: e.company?.name ?? "",
        };
      })
      .sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime())
      .slice(0, 8);
  };

  const activities = useMemo(() => {
    switch (user?.role) {
      case Role.COMPANY:
        return getRecentActivitiesCompany();
      case Role.VENDOR:
        return getRecentActivitiesVendor();
    }
    return [];
  }, [user, data]);

  return (
    <Card
      className="transform transition-all h-fit"
      {...props}>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
          <p className="text-sm text-gray-500 mt-1">Track the latest event updates</p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="divide-y divide-gray-100">
          {activities.map((activity, i) => (
            <div
              key={i}
              className="flex gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors">
              <TextAvatar text={activity.name} />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                    <p className="text-sm text-gray-500">{activity.description}</p>
                  </div>
                  {activity.status && (
                    <div className="flex items-center gap-2">
                      <EventBadge status={activity.status} />
                    </div>
                  )}
                </div>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
