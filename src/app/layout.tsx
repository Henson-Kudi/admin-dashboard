import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Inter } from "next/font/google";
import '@/styles/globals.css'
import { cn } from "@/lib/utils"
import PageHeader from "@/components/page-header";
import { Sidebar } from "@/components/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ReactQueryProvider } from "./providers";
import { ThemeProvider } from "@/components/theme-provider";
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from "@/components/ui/toaster";
import AuthenticatedLayout from "./authenticated-layout";
import NonAuthenticatedLayout from "./non-auth-layout";
import { getUser } from "./actions";
 
const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({children}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser()

  return (
    <html lang="en" suppressHydrationWarning>
      <head />
        <body>
          <NextTopLoader />
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <ReactQueryProvider>
                <div
                  className={cn(
                    "min-h-screen overflow-hidden bg-background font-sans antialiased flex start-0 justify-start",
                    fontSans.variable
                  )}
                >

                  {
                    user ? <AuthenticatedLayout children={children} /> : <NonAuthenticatedLayout children={children} />
                  }

                </div>
                  
                
                
            </ReactQueryProvider>
            <Toaster />
          </ThemeProvider>
        </body>
    </html>
  )
}
