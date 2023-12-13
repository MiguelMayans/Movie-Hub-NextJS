import type { Metadata } from "next";
import "./globals.css";
import { passionOne } from "./ui/fonts";
import { UserProvider } from "@auth0/nextjs-auth0/client";

export const metadata: Metadata = {
  title: "IMMMMDb",
  description: "Modest and Smallest Movie Database on the Internet",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <UserProvider>
        <body className={`${passionOne.className} antialised`}>{children}</body>
      </UserProvider>
    </html>
  );
}
