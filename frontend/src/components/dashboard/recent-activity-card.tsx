import { Card, CardContent, CardHeader } from "@/components/ui/card.tsx";
import ActivityItem from "@/components/dashboard/activity-item.tsx";

const activities = [
  {
    id: 1,
    type: "request",
    title: "New Request Submitted",
    description: "Jane Smith submitted a new request for project approval",
    timestamp: "2 hours ago",
    status: "pending",
    user: {
      name: "Jane Smith",
      avatar: "JS",
    },
  },
  {
    id: 2,
    type: "approval",
    title: "Request Approved",
    description: "Mike Johnson approved request #1234",
    timestamp: "5 hours ago",
    status: "approved",
    user: {
      name: "Mike Johnson",
      avatar: "MJ",
    },
  },
  {
    id: 3,
    type: "document",
    title: "Document Updated",
    description: "Sarah Wilson updated the project documentation",
    timestamp: "1 day ago",
    status: "info",
    user: {
      name: "Sarah Wilson",
      avatar: "SW",
    },
  },
];

export default function RecentActivityCard() {
  return (
    <Card className="transform transition-all">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
          <p className="text-sm text-gray-500 mt-1">Track your team's latest updates</p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="divide-y divide-gray-100">
          {activities.map((activity) => (
            <ActivityItem
              key={activity.id}
              activity={activity}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
