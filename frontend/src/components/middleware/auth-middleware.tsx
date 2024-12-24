import { Outlet, useNavigate } from "react-router";
import useAuth from "@/hooks/use-auth.ts";
import { useEffect, useState } from "react";

interface Props {
  required: boolean;
}

export default function AuthMiddleware({ required }: Props) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [hasCheckedAuth, setHasCheckedAuth] = useState(false);

  useEffect(() => {
    if (required && !user) {
      navigate("/auth");
    } else if (!required && user) {
      navigate("/");
    }
    setHasCheckedAuth(true);
  }, [user, required, navigate]);

  if (!hasCheckedAuth) return null;
  return <Outlet />;
}
