"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";

const verifyOtpSchema = z.object({
  otp: z.string().length(6, "Kode OTP harus 6 digit"),
});

type VerifyOtpFormData = z.infer<typeof verifyOtpSchema>;

export function VerifyOtpForm({
  className,
  email = "m@example.com",
  ...props
}: React.ComponentProps<"div"> & { email?: string }) {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<VerifyOtpFormData>({
    resolver: zodResolver(verifyOtpSchema),
    mode: "onChange",
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = (data: VerifyOtpFormData) => {
    console.log("OTP submitted:", data);
    // Handle OTP verification logic here
  };

  const handleResendOtp = () => {
    console.log("Resend OTP to:", email);
    // Handle resend OTP logic here
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div className="p-6 md:p-8">
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Verifikasi Kode OTP</h1>
                <p className="text-muted-foreground text-balance">
                  Kami telah mengirimkan kode verifikasi ke email{" "}
                  <strong>{email}</strong>
                </p>
              </div>

              <Field>
                <FieldLabel htmlFor="otp" className="text-center block">
                  Masukkan Kode OTP
                </FieldLabel>
                <Controller
                  name="otp"
                  control={control}
                  render={({ field }) => (
                    <InputOTP
                      maxLength={6}
                      value={field.value}
                      onChange={field.onChange}
                      pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                    >
                      <InputOTPGroup className="mx-auto">
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  )}
                />
                {errors.otp && (
                  <p className="text-sm text-red-500 text-center">
                    {errors.otp.message}
                  </p>
                )}
              </Field>

              <Field>
                <Button
                  type="button"
                  className="w-full"
                  disabled={!isValid}
                  onClick={handleSubmit(onSubmit)}
                >
                  Verifikasi
                </Button>
              </Field>

              <FieldDescription className="text-center">
                Tidak menerima kode?{" "}
                <button
                  type="button"
                  onClick={handleResendOtp}
                  className="font-medium hover:underline cursor-pointer"
                >
                  Kirim ulang
                </button>
              </FieldDescription>
            </FieldGroup>
          </div>
          <div className="bg-muted relative hidden md:block">
            <img
              src="/placeholder.svg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}
