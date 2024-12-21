import { useContext } from "react";
import { AuthContext } from "@/context/auth-context.tsx";

export default function useAuth() {
  return useContext(AuthContext);
}
