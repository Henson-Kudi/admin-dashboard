import AnalyticsDashboard from "@/components/dashboard/AnalyticsDashboard";
import OverviewDashboard from "@/components/dashboard/OverviewDashboard";
import ReportsDashboard from "@/components/dashboard/ReportsDashboard";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import Link from "next/link";

const allowedTabs = ['overview', 'analytics', 'reports']

export default function Home({params, searchParams}: any) {
  const selectedTab = searchParams?.tab

  return (
    <main className="min-h-screen">
      <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-4xl py-4">
        Dashboard
      </h1>

      <Tabs defaultValue={allowedTabs.includes(selectedTab) ? selectedTab : allowedTabs[0]}>
        <TabsList>
          <TabsTrigger value="overview"><Link href={'/?tab=overview'} replace={!!(selectedTab)}>Overview</Link></TabsTrigger>
          <TabsTrigger value="analytics"><Link href={'/?tab=analytics'} replace={!!(selectedTab)}>Analytics</Link></TabsTrigger>
          <TabsTrigger value="reports"><Link href={'/?tab=reports'} replace={!!(selectedTab)}>Reports</Link></TabsTrigger>
        </TabsList>
        <TabsContent value="overview"  className="my-4">
          <OverviewDashboard />
        </TabsContent>
        <TabsContent value="reports" className="my-4">
          <ReportsDashboard />
        </TabsContent>
        <TabsContent value="analytics" className="my-4">
          <AnalyticsDashboard />
        </TabsContent>
      </Tabs>
    </main>
  );
}
