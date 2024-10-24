import type { Metadata } from "next";
import { Inter } from "next/font/google";
import '@/styles/globals.css'
import { cn } from "@/lib/utils"
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
  title: "HK Solutions",
  description: "HK solutions ecommerce application",
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
            defaultTheme="dark"
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
                    user ? <AuthenticatedLayout>{children}</AuthenticatedLayout> : <NonAuthenticatedLayout>{children}</NonAuthenticatedLayout>
                  }

                </div>
                  
                
                
            </ReactQueryProvider>
            <Toaster />
          </ThemeProvider>
        </body>
    </html>
  )
}
