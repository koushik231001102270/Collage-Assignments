import React from "react";
import type { CurrentWeatherData } from "../weather";

interface CurrentWeatherProps {
  weather: CurrentWeatherData;
}

export const CurrentWeather: React.FC<
  CurrentWeatherProps
> = ({ weather }) => {
  return (
    <div
      style={{
        background: "var(--secondary)",
        borderRadius: "20px",
        display: "flex",
        alignItems: "center",
        gap: "16px",
        padding: "14px 18px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          minWidth: 0,
          flex: 1,
        }}
      >
        <div
          style={{
            width: "44px",
            height: "44px",
            flexShrink: 0,
            borderRadius: "50%",
            background: "var(--background)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <img
            src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
            alt={weather.description}
            draggable={false}
            style={{
              width: "44px",
              height: "44px",
              objectFit: "contain",
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "6px",
            minWidth: 0,
          }}
        >
          <span
            style={{
              fontSize: "16px",
              color: "var(--default)",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {weather.city} · {weather.country}
          </span>

          <span
            style={{
              fontSize: "12px",
              letterSpacing: "0.5px",
              color: "var(--subdued)",
              opacity: 0.7,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              textTransform: "uppercase",
            }}
          >
            {weather.condition} · {weather.description}
          </span>
        </div>
      </div>

      <div
        style={{
          flexShrink: 0,
          whiteSpace: "nowrap",
          textAlign: "right",
        }}
      >
        <span
          style={{
            fontSize: "16px",
            color: "var(--default)",
          }}
        >
          {Math.round(weather.temperature)}°C
        </span>

        <div
          style={{
            fontSize: "12px",
            letterSpacing: "0.5px",
            textTransform: "uppercase",
            color: "var(--subdued)",
            marginTop: "6px",
          }}
        >
          current
        </div>
      </div>
    </div>
  );
};