import { createContext, ReactNode, useState } from "react";
import { UserEntity } from "@/lib/model/entity/user.entity.ts";
import { Maybe, Nullable } from "@/lib/type/utils.ts";
import { useLocalStorage } from "usehooks-ts";

interface Props {
  children: ReactNode;
}

interface AuthContextType {
  user: Maybe<UserEntity>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
});

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useLocalStorage<Nullable<UserEntity>>("user", null);
  const [token, setToken] = useLocalStorage<Nullable<string>>("token", null);
  const [loading, setLoading] = useState(false);
}
