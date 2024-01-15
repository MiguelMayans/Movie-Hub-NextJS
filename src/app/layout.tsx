import type { Metadata } from "next";
import "./globals.css";
import { passionOne } from "./ui/fonts";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import { UserContextProvider } from "../context/userContext";

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
      <UserContextProvider>
        <UserProvider>
          <body className={`${passionOne.className} antialised`}>
            <Header />
            {children}
            <Footer />
          </body>
        </UserProvider>
      </UserContextProvider>
    </html>
  );
}
