import { Card, CardContent } from "@/components/ui/card.tsx";
import { Check, Clock, X } from "lucide-react";
import { Label } from "@/components/ui/label.tsx";
import { EventStatus } from "@/lib/model/entity/event.entity.ts";

interface Props {
  type: EventStatus;
  amount: number;
}

export default function EventStatsCard({ type, amount = 0 }: Props) {
  const StatsIcon = () => {
    switch (type) {
      case EventStatus.PENDING:
        return (
          <div className="p-3 bg-yellow-100 rounded-lg">
            <Clock className="w-6 h-6 text-yellow-600" />
          </div>
        );
      case EventStatus.APPROVED:
        return (
          <div className="p-3 bg-green-100 rounded-lg">
            <Check className="w-6 h-6 text-green-600" />
          </div>
        );
      case EventStatus.REJECTED:
        return (
          <div className="p-3 bg-red-100 rounded-lg">
            <X className="w-6 h-6 text-red-600" />
          </div>
        );
    }
  };

  return (
    <Card className="transform transition-all hover:scale-[101%]">
      <CardContent className="pt-6">
        <div className="flex items-center gap-4">
          <StatsIcon />
          <div>
            <Label className="text-3xl font-bold text-gray-900">{amount}</Label>
            <h3 className="text-sm font-medium text-gray-600 capitalize">{type}</h3>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
