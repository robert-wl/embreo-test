import { Check, Clock, FileText, MoreVertical } from "lucide-react";

export default function ActivityItem({ activity }: { activity: any }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case "request":
        return <FileText className="w-5 h-5" />;
      case "approval":
        return <Check className="w-5 h-5" />;
      case "document":
        return <FileText className="w-5 h-5" />;
      default:
        return <Clock className="w-5 h-5" />;
    }
  };

  return (
    <div className="flex gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors">
      <div className="flex-shrink-0">
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">{activity.user.avatar}</div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-gray-900">{activity.title}</p>
            <p className="text-sm text-gray-500">{activity.description}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(activity.status)}`}>{activity.status}</span>
          </div>
        </div>
        <div className="mt-1 flex items-center gap-2">
          <span className="text-xs text-gray-500">{activity.timestamp}</span>
          <span className="text-xs text-gray-400">•</span>
          <span className="text-xs text-gray-500">{activity.user.name}</span>
        </div>
      </div>
    </div>
  );
}
