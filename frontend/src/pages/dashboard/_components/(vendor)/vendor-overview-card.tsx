import { Card, CardContent, CardHeader } from "@/components/ui/card.tsx";
import { Building2 } from "lucide-react";
import { Label } from "@/components/ui/label.tsx";
import { UserEntity } from "@/lib/model/entity/user.entity.ts";
import { Maybe } from "@/lib/type/utils.ts";

interface Props {
  user: Maybe<UserEntity>;
}

export default function VendorOverviewCard({ user }: Props) {
  return (
    <Card className="transform transition-all hover:scale-[101%]">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <h3 className="font-bold text-gray-700">Vendor Overview</h3>
        <Building2 className="w-5 h-5 text-blue-600" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-sm text-gray-500">Name: {user?.vendor?.name}</Label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
