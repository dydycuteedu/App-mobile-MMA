import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { BarChart } from "react-native-chart-kit";
import axios from "axios";
import { format, subDays, subWeeks, parseISO } from "date-fns";

const BASE_URL = "http://10.12.66.89:3000";

export default function OrderChart() {
  const [filter, setFilter] = useState<"day" | "week" | "month">("week");
  const [chartData, setChartData] = useState<{
    labels: string[];
    data: number[];
  }>({
    labels: [],
    data: [],
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/orders`);
        const orders = res.data;

        let grouped: Record<string, number> = {};
        const now = new Date();

        if (filter === "day") {
          // thống kê 5 giờ gần đây
          for (let h = 0; h < 24; h += 6) {
            grouped[`${h}h`] = 0;
          }

          orders.forEach((order: any) => {
            const date = new Date(order.date);
            if (format(date, "yyyy-MM-dd") === format(now, "yyyy-MM-dd")) {
              const hour = date.getHours();
              const label = `${Math.floor(hour / 6) * 6}h`;
              if (grouped[label] !== undefined) {
                grouped[label]++;
              }
            }
          });
        }

        if (filter === "week") {
          for (let i = 6; i >= 0; i--) {
            const label = format(subDays(now, i), "EEE"); // Mon, Tue,...
            grouped[label] = 0;
          }

          orders.forEach((order: any) => {
            const date = new Date(order.date);
            const label = format(date, "EEE");
            if (grouped[label] !== undefined) {
              grouped[label]++;
            }
          });
        }

        if (filter === "month") {
          for (let d = 1; d <= 31; d++) {
            const label = d.toString();
            grouped[label] = 0;
          }

          orders.forEach((order: any) => {
            const date = new Date(order.date);
            if (date.getMonth() === now.getMonth()) {
              const day = date.getDate().toString();
              grouped[day]++;
            }
          });
        }

        const labels = Object.keys(grouped);
        const data = Object.values(grouped);

        setChartData({ labels, data });
      } catch (err) {
        console.error("Failed to load order chart", err);
      }
    };

    fetchOrders();
  }, [filter]);

  return (
    <View style={{ width: "100%", marginTop: 30 }}>
      <View style={styles.header}>
        <Text style={styles.title}>ORDERS</Text>
        <View style={styles.filters}>
          {["day", "week", "month"].map((item) => (
            <TouchableOpacity
              key={item}
              onPress={() => setFilter(item as any)}
              style={[
                styles.filterButton,
                filter === item && styles.activeFilter,
              ]}
            >
              <Text
                style={[
                  styles.filterText,
                  filter === item && styles.activeFilterText,
                ]}
              >
                {item === "day"
                  ? "1 Ngày"
                  : item === "week"
                  ? "1 Tuần"
                  : "1 Tháng"}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <BarChart
  data={{
    labels: chartData.labels,
    datasets: [
      {
        data: chartData.data,
      },
    ],
  }}
  width={Dimensions.get("window").width - 40}
  height={260}
  yAxisLabel=""
  yAxisSuffix="" // 🛠 Sửa lỗi ở đây
  chartConfig={{
    backgroundColor: "#fff",
    backgroundGradientFrom: "#f5f5f5",
    backgroundGradientTo: "#e0e0e0",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(255, 87, 34, ${opacity})`,
    labelColor: () => "#333",
    propsForBackgroundLines: {
      strokeDasharray: "", // dashed background lines
    },
  }}
  style={{
    marginVertical: 8,
    borderRadius: 16,
  }}

        verticalLabelRotation={filter === "month" ? 90 : 0}
        fromZero
        showValuesOnTopOfBars
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#E64A19",
  },
  filters: {
    flexDirection: "row",
    gap: 10,
  },
  filterButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    backgroundColor: "#eee",
  },
  activeFilter: {
    backgroundColor: "#E64A19",
  },
  filterText: {
    color: "#333",
    fontSize: 14,
  },
  activeFilterText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
