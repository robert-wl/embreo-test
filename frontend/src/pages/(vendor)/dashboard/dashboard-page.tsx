import { Building2, Check, Clock, X } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card.tsx";
import { Label } from "@/components/ui/label.tsx";
import useAuth from "@/hooks/use-auth.ts";

export default function DashboardPage() {
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
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="transform transition-all hover:scale-[101%]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <h3 className="font-bold text-gray-700">Company Overview</h3>
            <Building2 className="w-5 h-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm text-gray-500">Name: {user?.company?.name}</Label>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="transform transition-all hover:scale-[101%]">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <Label className="text-3xl font-bold text-gray-900">1</Label>
                <h3 className="text-sm font-medium text-gray-600">Pending</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="transform transition-all hover:scale-[101%]">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Check className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <Label className="text-3xl font-bold text-gray-900">1</Label>
                <h3 className="text-sm font-medium text-gray-600">Accepted</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="transform transition-all hover:scale-[101%]">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-100 rounded-lg">
                <X className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <Label className="text-3xl font-bold text-gray-900">1</Label>
                <h3 className="text-sm font-medium text-gray-600">Rejected</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted md:min-h-min" />
    </>
  );
}
