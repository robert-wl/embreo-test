import { Role } from "@/lib/model/entity/user.entity.ts";
import EventStatsCard from "@/pages/dashboard/_components/event-stats-card.tsx";
import useAuth from "@/hooks/use-auth.ts";
import { EventEntity, EventStatus } from "@/lib/model/entity/event.entity.ts";
import { useMemo } from "react";

const showStatus = {
  [Role.VENDOR]: [EventStatus.PENDING, EventStatus.APPROVED, EventStatus.REJECTED],
  [Role.COMPANY]: [EventStatus.PENDING, EventStatus.APPROVED],
};

interface Props {
  data: EventEntity[];
}

export default function EventStatsSection({ data }: Props) {
  const { user } = useAuth();

  const counter = useMemo(() => {
    return data.reduce<Record<EventStatus, number>>(
      (acc, event) => {
        acc[event.status] = (acc[event.status] ?? 0) + 1;
        return acc;
      },
      { approved: 0, pending: 0, rejected: 0 },
    );
  }, [data]);

  if (user?.role === Role.VENDOR) {
    return (
      <div className="col-span-2 grid grid-cols-3 gap-6">
        {showStatus[Role.VENDOR].map((v) => {
          return (
            <EventStatsCard
              key={v}
              type={v}
              amount={counter[v]}
            />
          );
        })}
      </div>
    );
  }

  if (user?.role === Role.COMPANY) {
    return showStatus[Role.COMPANY].map((v) => {
      return (
        <EventStatsCard
          key={v}
          type={v}
          amount={counter[v]}
        />
      );
    });
  }
}
