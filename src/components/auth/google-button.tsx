"use client";

import Script from "next/script";
import { useRouter } from "next/navigation";
import { authApi } from "@/services/auth";

declare global {
  interface Window {
    google: any;
  }
}

export function GoogleButton() {
  const router = useRouter();

  async function handleGoogleResponse(
    response: any
  ) {
    try {
      const result =
        await authApi.googleLogin(
          response.credential
        );

      localStorage.setItem(
        "access_token",
        result.access_token
      );

      localStorage.setItem(
        "current_user",
        JSON.stringify(result.user)
      );

      router.push("/products");
    } catch (error) {
      console.error(
        "Google login failed:",
        error
      );
    }
  }

  function initializeGoogle() {
    if (!window.google) return;

    window.google.accounts.id.initialize({
      client_id:
        process.env
          .NEXT_PUBLIC_GOOGLE_CLIENT_ID,

      callback: handleGoogleResponse,
    });

    window.google.accounts.id.renderButton(
      document.getElementById(
        "google-signin-button"
      ),

      {
        theme: "outline",
        size: "large",
        width: 350,
        text: "continue_with",
      }
    );
  }

  return (
    <>
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
        onLoad={initializeGoogle}
      />

      <div
        id="google-signin-button"
        className="flex justify-center"
      />
    </>
  );
}