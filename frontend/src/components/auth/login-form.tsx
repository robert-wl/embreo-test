import { cn } from "@/lib/utils.ts";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { ComponentPropsWithoutRef } from "react";
import useAuth from "@/hooks/use-auth.ts";
import { useForm } from "react-hook-form";
import { LoginDTO, loginSchema } from "@/lib/model/schema/auth/login.dto.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";

export function LoginForm({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  const { login } = useAuth();
  const { register, handleSubmit } = useForm<LoginDTO>({
    resolver: zodResolver(loginSchema),
  });
  const navigate = useNavigate();

  const handleLogin = async (data: LoginDTO) => {
    await login(data);
    navigate("/");
  };

  return (
    <div
      className={cn("flex flex-col gap-6", className)}
      {...props}>
      <Card>
        <CardContent className="flex w-full p-8">
          <div className="flex items-center gap-8 w-1/2">
            <img
              className="object-cover w-fit h-fit hover:scale-105 transition-transform"
              src="./images/login/image-1.png"
            />
          </div>
          <form
            onSubmit={handleSubmit(handleLogin)}
            className="flex flex-col w-1/2 h-[20rem]">
            <h2 className="text-2xl w-full text-center font-bold">EventEazy</h2>
            <div className="flex flex-col justify-center gap-6 h-full">
              <div className="grid gap-2">
                <Label
                  className="text-start"
                  htmlFor="username">
                  Username
                </Label>
                <Input
                  id="username"
                  type="username"
                  placeholder="username"
                  required
                  {...register("username")}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="password"
                  required
                  {...register("password")}
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
