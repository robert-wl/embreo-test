import { createContext, ReactNode, useEffect } from "react";
import { UserEntity } from "@/lib/model/entity/user.entity.ts";
import { Maybe, Nullable } from "@/lib/type/utils.ts";
import { useLocalStorage } from "usehooks-ts";
import constant from "@/lib/constant/constant.ts";
import { getCurrentUser, useLogin } from "@/service/auth-service.ts";
import { LoginDTO } from "@/lib/model/schema/auth/login.dto.ts";

interface Props {
  children: ReactNode;
}

interface AuthContextType {
  user: Maybe<UserEntity>;
  login: (dto: LoginDTO) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  logout: async () => {},
});

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useLocalStorage<Nullable<UserEntity>>(constant.USER_KEY, null);
  const [token, setToken] = useLocalStorage<Nullable<string>>(constant.TOKEN_KEY, null);
  const { data } = getCurrentUser({
    enabled: !!token,
  });
  const { mutate } = useLogin({
    onSuccess: (data) => {
      setToken(data.access_token);
    },
  });

  const logout = async () => {
    setToken(null);
    setUser(null);
  };

  const login = async (body: LoginDTO) => {
    mutate(body);
  };

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data]);

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}
