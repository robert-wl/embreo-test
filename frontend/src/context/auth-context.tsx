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
  isLoading: boolean;
  loginError: Maybe<Error>;
  getCurrentUserError: Maybe<Error>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  logout: async () => {},
  isLoading: true,
  loginError: null,
  getCurrentUserError: null,
});

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useLocalStorage<Maybe<UserEntity>>(constant.USER_KEY, null);
  const [token, setToken] = useLocalStorage<Nullable<string>>(constant.TOKEN_KEY, null);
  const {
    data,
    refetch,
    isLoading,
    error: getCurrentUserError,
  } = getCurrentUser({
    enabled: !!token,
  });
  const { mutate, error: loginError } = useLogin({
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

  useEffect(() => {
    if (token) {
      refetch().then(({ data }) => setUser(data));
    }
  }, [token]);

  return <AuthContext.Provider value={{ user, login, logout, isLoading, getCurrentUserError, loginError }}>{children}</AuthContext.Provider>;
}
