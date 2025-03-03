import { Public_Sans } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import QueryProvider from "@/lib/QueryProvider";
import StyledComponentsRegistry from "@/lib/StyledCompnnets";


const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});
export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  // Also supported by less commonly used
  // interactiveWidget: 'resizes-visual',
}

export default function RootLayout({ children }) {
    return (
        <ClerkProvider
        appearance={{
          signIn: {
            variables: { colorPrimary: "#F9AA11" },
          },
          signUp: {
            variables: { colorPrimary: "#F9AA11" },
          },
        }}
      >
        <html lang="en">

            <body className={` max-w-[100vw] overflow-x-hidden  ${publicSans.className}`}>
                <QueryProvider>
                    <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
                </QueryProvider>
            </body>

        </html>
        </ClerkProvider>

    );
}
