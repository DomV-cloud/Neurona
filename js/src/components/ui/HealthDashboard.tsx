"use client";

import { useState } from "react";
import { Activity, Calendar, TrendingUp } from "lucide-react";

interface HealthMetric {
  date: string;
  value: number;
  status: "normal" | "elevated" | "high";
}

interface HealthDashboardProps {
  title: string;
  metrics: HealthMetric[];
  unit: string;
  normalRange: { min: number; max: number };
}

export default function HealthDashboard({
  title,
  metrics,
  unit,
  normalRange,
}: HealthDashboardProps) {
  const [selectedMetric, setSelectedMetric] = useState<HealthMetric | null>(
    null
  );

  if (!metrics || metrics.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Activity className="w-5 h-5 mr-2 text-blue-600" />
          {title}
        </h3>
        <div className="text-center py-8 text-gray-500">
          No health data available
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "normal":
        return "bg-emerald-500";
      case "elevated":
        return "bg-amber-500";
      case "high":
        return "bg-rose-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "normal":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "elevated":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "high":
        return "bg-rose-100 text-rose-800 border-rose-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "normal":
        return "Normal Cognition";
      case "elevated":
        return "Mild Cognitive Decline";
      case "high":
        return "Significant Decline";
      default:
        return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };

  const latestMetric = metrics[metrics.length - 1];
  const previousMetric = metrics[metrics.length - 2];
  const trend = previousMetric ? latestMetric.value - previousMetric.value : 0;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <Activity className="w-5 h-5 mr-2 text-blue-600" />
          {title}
        </h3>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusBadgeColor(
            latestMetric.status
          )}`}
        >
          {getStatusLabel(latestMetric.status)}
        </span>
      </div>

      {/* Current Value Display */}
      <div className="text-center mb-6">
        <div className="text-4xl font-bold text-gray-900 mb-2">
          {latestMetric.value}
          {unit}
        </div>
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>
            Latest: {new Date(latestMetric.date).toLocaleDateString()}
          </span>
        </div>
        {trend !== 0 && (
          <div
            className={`flex items-center justify-center space-x-1 mt-2 text-sm ${
              trend > 0 ? "text-red-600" : "text-green-600"
            }`}
          >
            <TrendingUp
              className={`w-4 h-4 ${trend < 0 ? "rotate-180" : ""}`}
            />
            <span>
              {trend > 0 ? "+" : ""}
              {trend}
              {unit} from previous reading
            </span>
          </div>
        )}
      </div>

      {/* Cognitive Score Range Indicator */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Cognitive Assessment Range</span>
          <span>
            {normalRange.min} - {normalRange.max}
            {unit}
          </span>
        </div>
        <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="absolute h-full bg-green-400 rounded-full"
            style={{
              left: "20%",
              width: "60%",
            }}
          />
          <div
            className="absolute w-3 h-3 bg-blue-600 rounded-full border-2 border-white shadow-md transform -translate-y-0"
            style={{
              left: `${Math.min(
                Math.max(
                  ((latestMetric.value - normalRange.min) /
                    (normalRange.max - normalRange.min)) *
                    60 +
                    20,
                  5
                ),
                95
              )}%`,
              transform: "translateX(-50%)",
            }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>Severe (0-17)</span>
          <span>Normal (24-30)</span>
          <span>Mild (18-23)</span>
        </div>
      </div>

      {/* Recent History */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">
          Recent History
        </h4>
        <div className="space-y-2 max-h-32 overflow-y-auto">
          {metrics
            .slice(-5)
            .reverse()
            .map((metric, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedMetric?.date === metric.date
                    ? "bg-blue-50 border border-blue-200"
                    : "bg-gray-50 hover:bg-gray-100"
                }`}
                onClick={() =>
                  setSelectedMetric(
                    selectedMetric?.date === metric.date ? null : metric
                  )
                }
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-3 h-3 rounded-full ${getStatusColor(
                      metric.status
                    )}`}
                  />
                  <span className="text-sm text-gray-700">
                    {new Date(metric.date).toLocaleDateString()}
                  </span>
                </div>
                <div className="text-sm font-medium text-gray-900">
                  {metric.value}
                  {unit}
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Selected Metric Detail */}
      {selectedMetric && (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-900">
                {new Date(selectedMetric.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="text-lg font-bold text-blue-900">
                {selectedMetric.value}
                {unit}
              </p>
            </div>
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusBadgeColor(
                selectedMetric.status
              )}`}
            >
              {getStatusLabel(selectedMetric.status)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
