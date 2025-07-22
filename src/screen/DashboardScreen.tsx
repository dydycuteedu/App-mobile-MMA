import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LineChart, BarChart } from "react-native-chart-kit";
import { useAdminStats } from "../hooks/useAdminStats";

export default function DashboardScreen() {
  const stats = useAdminStats();
  const navigation = useNavigation();
  const [revenueFilter, setRevenueFilter] = useState("month");
  const [orderFilter, setOrderFilter] = useState("day");

  if (!stats) return <Text>Loading...</Text>;

  const getRevenueData = () => {
    if (revenueFilter === "week") {
      const labels = stats.revenueByWeek.map((i: { day: string }) => i.day);
      const data = stats.revenueByWeek.map((i: { total: number }) => i.total);
      return { labels, data };
    }

    if (revenueFilter === "month") {
      const labels = Object.keys(stats.revenueByMonth);
      const data = Object.values(stats.revenueByMonth);
      return { labels, data };
    }

    if (revenueFilter === "year") {
      const labels = Object.keys(stats.revenueByYear);
      const data = Object.values(stats.revenueByYear);
      return { labels, data };
    }

    return { labels: [], data: [] };
  };

  const getOrderData = () => {
    if (orderFilter === "day") {
      const labels = stats.ordersByDay.map((i: { date: string }) => i.date);
      const data = stats.ordersByDay.map((i: { count: number }) => i.count);
      return { labels, data };
    }

    if (orderFilter === "week") {
      const labels = stats.ordersByWeek.map((i: { day: string }) => i.day);
      const data = stats.ordersByWeek.map((i: { count: number }) => i.count);
      return { labels, data };
    }

    if (orderFilter === "month") {
      const labels = Object.keys(stats.ordersByMonth);
      const data = Object.values(stats.ordersByMonth);
      return { labels, data };
    }

    return { labels: [], data: [] };
  };

  const revenueData = getRevenueData();
  const orderData = getOrderData();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Dashboard</Text>
      </View>

      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <Text style={styles.label}>🛒 Orders</Text>
          <Text style={styles.value}>{stats.orders}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.label}>👥 Users</Text>
          <Text style={styles.value}>{stats.users}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.label}>🍔 Foods</Text>
          <Text style={styles.value}>{stats.foods}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.label}>💰 Revenue</Text>
          <Text style={styles.value}>${stats.revenue.toFixed(2)}</Text>
        </View>
      </View>

      {/* REVENUE Chart */}
      <View style={styles.chartHeader}>
        <Text style={styles.revenueLabel}>REVENUE</Text>
        <View style={styles.filters}>
          {["week", "month", "year"].map((f) => (
            <TouchableOpacity
              key={f}
              onPress={() => setRevenueFilter(f)}
              style={[
                styles.filterButton,
                revenueFilter === f && styles.activeFilter,
              ]}
            >
              <Text
                style={[
                  styles.filterText,
                  revenueFilter === f && styles.activeFilterText,
                ]}
              >
                {f === "week" ? "Weekly" : f === "month" ? "Monthly" : "Yearly"}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <LineChart
        data={{
          labels: revenueData.labels,
          datasets: [{ data: revenueData.data }],
        }}
        width={Dimensions.get("window").width - 40}
        height={240}
        yAxisLabel="$"
        chartConfig={chartConfig}
        bezier
        style={styles.chart}
      />

      {/* Order List Button */}
      <TouchableOpacity
        style={styles.orderListButton}
        onPress={() => navigation.navigate("OrderManagement" as never)}
      >
        <Text style={styles.orderListButtonText}>Order List</Text>
      </TouchableOpacity>

      {/* ORDER Chart */}
      <View style={styles.chartHeader}>
        <Text style={styles.revenueLabel}>ORDERS</Text>
        <View style={styles.filters}>
          {["day", "week", "month"].map((f) => (
            <TouchableOpacity
              key={f}
              onPress={() => setOrderFilter(f)}
              style={[
                styles.filterButton,
                orderFilter === f && styles.activeFilter,
              ]}
            >
              <Text
                style={[
                  styles.filterText,
                  orderFilter === f && styles.activeFilterText,
                ]}
              >
                {f === "day" ? "Today" : f === "week" ? "Weekly" : "Monthly"}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <BarChart
        data={{
          labels: orderData.labels as string[],
          datasets: [{ data: orderData.data }],
        }}
        width={Dimensions.get("window").width - 40}
        height={240}
        yAxisLabel=""
        yAxisSuffix=""
        chartConfig={chartConfig}
        style={styles.chart}
        fromZero
        showBarTops
        showValuesOnTopOfBars
      />
    </ScrollView>
  );
}

const chartConfig = {
  backgroundColor: "#fff",
  backgroundGradientFrom: "#fdf3e1",
  backgroundGradientTo: "#ffe0b2",
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(255, 87, 34, ${opacity})`,
  labelColor: () => "#333",
  propsForDots: {
    r: "6",
    strokeWidth: "2",
    stroke: "#FF5722",
  },
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginBottom: 20,
  },
  backArrow: {
    fontSize: 24,
    color: "#FF5722",
    marginRight: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: "#f5cb58",
    borderRadius: 10,
    padding: 15,
    width: "45%",
    marginBottom: 15,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    color: "#fff",
  },
  value: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  chartHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
    alignItems: "center",
  },
  revenueLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF5722",
  },
  filters: {
    flexDirection: "row",
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    backgroundColor: "#eee",
  },
  activeFilter: {
    backgroundColor: "#FF5722",
  },
  filterText: {
    color: "#333",
    fontSize: 14,
  },
  activeFilterText: {
    color: "#fff",
    fontWeight: "bold",
  },
  chart: {
    marginTop: 16,
    borderRadius: 20,
    elevation: 4,
  },
  orderListButton: {
    backgroundColor: "#FF9800",
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 10,
    alignSelf: "flex-end",
  },
  orderListButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
