import React from "react";
import type { ForecastItem } from "../weather";
import { Title } from "../../components/Title";
import { ForecastCard } from "./ForecastCard";

interface ForecastListProps {
  forecasts: ForecastItem[];
}

export const ForecastList: React.FC<
  ForecastListProps
> = ({ forecasts }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      <Title>
        Forecast — {forecasts.length} days
      </Title>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "2px",
          width: "100%",
        }}
      >
        {forecasts.map((forecast, index) => (
          <ForecastCard
            key={forecast.id}
            date={forecast.date}
            condition={forecast.condition}
            icon={forecast.icon}
            high={forecast.high}
            low={forecast.low}
            index={index}
            total={forecasts.length}
          />
        ))}
      </div>
    </div>
  );
};