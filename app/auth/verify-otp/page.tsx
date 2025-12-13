import { VerifyOtpForm } from "@/components/auth/verify-otp-form";

export default function Page() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <VerifyOtpForm className="font-gabirato" />
      </div>
    </main>
  );
}
