"use client";

import { getAdminTotalSales } from "@/data/admin";
import { numberShortener } from "@/lib/formatter";
import { AdminTotalSalesResponse } from "@/types/admin";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Bar,
  BarChart,
} from "recharts";
import { toast } from "sonner";
import Cookie from "js-cookie";
import { formatDate, subDays } from "date-fns";

const TotalRevenueChart: React.FC = () => {
  const searchParams = useSearchParams();
  const [data, setData] = React.useState<AdminTotalSalesResponse[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const token = Cookie.get("admin-tkn");
        if (!token) return;

        const startDate =
          searchParams.get("revenue_from") ??
          formatDate(subDays(new Date(), 7), "yyyy-MM-dd");

        const endDate =
          searchParams.get("revenue_to") ??
          formatDate(new Date(), "yyyy-MM-dd");

        const res = await getAdminTotalSales(token, { startDate, endDate });
        const newRes = res.result.map((item) => {
          return {
            revenue: item.revenue,
            date: formatDate(item.date, "yyyy-MM-dd"),
          };
        });

        setData(newRes);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data.message);
        }
      }
    };

    getData();
  }, [searchParams]);

  return (
    <ResponsiveContainer width="100%" height={210}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
        <XAxis
          dataKey="date"
          tickFormatter={(value) => formatDate(value, "yyyy-MM-dd")}
        />
        <YAxis tickFormatter={(value) => numberShortener(value as number)} />
        <Tooltip
          formatter={(value) => numberShortener(value as number)}
          cursor={{ fill: "hsl(var(--muted))" }}
        />
        <Bar
          dataKey="revenue"
          fill="hsl(var(--primary))"
          name="Total Revenue"
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default TotalRevenueChart;
