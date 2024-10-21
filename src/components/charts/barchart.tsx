"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart"

const chartData = [
  { month: "January", value: 186, },
  { month: "February", value: 305 },
  { month: "March", value: 237, },
  { month: "April", value: 73, },
  { month: "May", value: 209, },
  { month: "June", value: 214, },
]

const chartConfig = {
  value: {
    label: "Sale",
    color: "#2563eb",
  },
} satisfies ChartConfig

export default function Barchart() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        {/* <CartesianGrid vertical={false} /> */}
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="value" fill="var(--color-value)" radius={4} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value?.slice(0, 3)}
        />
        <YAxis
          dataKey="value"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value}
        />
      </BarChart>
    </ChartContainer>
  )
}
