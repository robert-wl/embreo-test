import { LoginForm } from "@/components/auth/login-form.tsx";

export default function LoginPage() {
  return (
    <div className="flex h-screen w-screen bg-gradient-to-br from-blue-500 via-indigo-400 to-blue-300 items-center justify-center">
      <div className="w-full max-w-2xl">
        <LoginForm />
      </div>
    </div>
  );
}
