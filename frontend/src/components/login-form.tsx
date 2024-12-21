import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ComponentPropsWithoutRef } from "react";

export function LoginForm({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn("flex flex-col gap-6", className)}
      {...props}>
      <Card>
        <CardContent className="flex w-full p-8">
          <div className="flex items-center gap-8 w-1/2">
            <img
              className="object-cover w-fit h-fit"
              src="./images/login/image-1.png"
            />
          </div>
          <form className="flex flex-col w-1/2 h-[20rem]">
            <h2 className="text-2xl w-full text-center font-bold">EventEase</h2>
            <div className="flex flex-col justify-center gap-6 h-full">
              <div className="grid gap-2">
                <Label
                  className="text-start"
                  htmlFor="email">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="account@gmail.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full">
                Login
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
