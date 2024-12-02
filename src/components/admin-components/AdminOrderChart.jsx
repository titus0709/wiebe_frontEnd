import React from "react";
import {
  ChartContainer,
  ChartTooltip,
  ChartLegend,
  ChartLegendContent,
  ChartTooltipContent,
} from "../ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
function AdminOrderChart() {
  const chartConfig = {
    orders: {
      label: "Orders",
      color: "#2563eb",
    },
    revenue: {
      label: "Total revenue",
      color: "#60a5fa",
    },
  };
  const chartData = [
    { month: "January", orders: 186, revenue: 80 },
    { month: "February", orders: 305, revenue: 200 },
    { month: "March", orders: 237, revenue: 120 },
    { month: "April", orders: 73, revenue: 190 },
    { month: "May", orders: 209, revenue: 130 },
    { month: "June", orders: 214, revenue: 140 },
  ];

  return (
    <div>
      <ChartContainer
        config={chartConfig}
        className="min-h-[200px] max-h-[200px] w-11/12 md:w-fit"
      >
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="orders" fill="var(--color-orders)" radius={0.5} />
          <Bar dataKey="revenue" fill="var(--color-revenue)" radius={0.5} />
        </BarChart>
      </ChartContainer>
    </div>
  );
}

export default AdminOrderChart;
