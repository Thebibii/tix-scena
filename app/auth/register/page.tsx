import { RegisterForm } from "@/components/auth/register-form";

export default function Page() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <RegisterForm className="font-gabirato" />
      </div>
    </main>
  );
}
