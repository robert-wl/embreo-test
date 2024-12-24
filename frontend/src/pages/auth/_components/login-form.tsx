import { cn } from "@/lib/utils.ts";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { ComponentPropsWithoutRef, useEffect } from "react";
import useAuth from "@/hooks/use-auth.ts";
import { useForm } from "react-hook-form";
import { LoginDTO, loginSchema } from "@/lib/model/schema/auth/login.dto.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import EventEazyIcon from "@/components/icons/event-eazy-icon.tsx";
import ErrorField from "@/components/form/error-field.tsx";

export function LoginForm({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  const { user, login, loginError } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDTO>({
    resolver: zodResolver(loginSchema),
  });
  const navigate = useNavigate();

  const handleLogin = async (data: LoginDTO) => {
    await login(data);
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <div
      className={cn("flex flex-col gap-6", className)}
      {...props}>
      <Card>
        <CardContent className="flex w-full p-8">
          <div className="flex items-center gap-8 w-1/2">
            <img
              className="object-cover w-fit h-fit hover:scale-105 transition-transform"
              src="/images/login/image-1.png"
            />
          </div>
          <form
            onSubmit={handleSubmit(handleLogin)}
            className="flex flex-col w-1/2 h-[25rem]">
            <div className="flex w-full items-center justify-center gap-4">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-black text-white">
                <EventEazyIcon className="size-4" />
              </div>
              <h2 className="text-2xl text-center font-bold">EventEazy</h2>
            </div>
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
                <ErrorField error={errors.username?.message} />
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
                <ErrorField error={errors.password?.message} />
                <ErrorField error={loginError?.message} />
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
