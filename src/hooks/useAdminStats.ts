import { useEffect, useState } from "react";
import axios from "axios";
import {
  subDays,
  subWeeks,
  format,
  parseISO,
  getDay,
  startOfWeek,
  addDays,
} from "date-fns";

const BASE_URL = "http://10.12.66.89:3000";

export function useAdminStats() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    const fetchStats = async () => {
      const [ordersRes, usersRes, foodsRes] = await Promise.all([
        axios.get(`${BASE_URL}/orders`),
        axios.get(`${BASE_URL}/users`),
        axios.get(`${BASE_URL}/foods`),
      ]);

      const orders = ordersRes.data;
      const users = usersRes.data;
      const foods = foodsRes.data;

      const revenue = orders.reduce((sum: number, o: any) => sum + o.total, 0);

      const revenueByMonth: Record<string, number> = {};
      const revenueByYear: Record<string, number> = {};
      const revenueByWeek: { label: string; total: number }[] = [];

      const ordersByDay: { date: string; count: number }[] = [];
      const ordersByWeek: { day: string; count: number }[] = [];
      const ordersByMonth: Record<string, number> = {};

      const today = new Date();
      const startWeek = startOfWeek(today, { weekStartsOn: 1 });

      for (let i = 0; i < 7; i++) {
        const day = format(subDays(today, i), "dd/MM");
        const count = orders.filter(
          (o: any) => format(parseISO(o.date), "dd/MM") === day
        ).length;
        ordersByDay.unshift({ date: day, count });
      }

      const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
      for (let i = 0; i < 7; i++) {
        const day = format(addDays(startWeek, i), "yyyy-MM-dd");
        const label = weekDays[i];
        const count = orders.filter(
          (o: any) => format(parseISO(o.date), "yyyy-MM-dd") === day
        ).length;
        ordersByWeek.push({ day: label, count });
      }

      orders.forEach((order: any) => {
        const date = parseISO(order.date);
        const month = format(date, "MMM");
        const year = format(date, "yyyy");

        revenueByMonth[month] = (revenueByMonth[month] || 0) + order.total;
        revenueByYear[year] = (revenueByYear[year] || 0) + order.total;

        const day = format(date, "EEE");
        const existing = revenueByWeek.find((r) => r.label === day);
        if (existing) {
          existing.total += order.total;
        } else {
          revenueByWeek.push({ label: day, total: order.total });
        }

        const monthKey = format(date, "MMM");
        ordersByMonth[monthKey] = (ordersByMonth[monthKey] || 0) + 1;
      });

      setStats({
        orders: orders.length,
        users: users.length,
        foods: foods.length,
        revenue,
        revenueByMonth,
        revenueByYear,
        revenueByWeek,
        ordersByDay,
        ordersByWeek,
        ordersByMonth,
      });
    };

    fetchStats();
  }, []);

  return stats;
}
