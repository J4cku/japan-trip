"use client";

import { useEffect, useState, useCallback } from "react";
import { weatherMap } from "@/data/weather";
import type { DayWeather } from "@/data/weather";

export function WeatherOverlay() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [visible, setVisible] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("weather-overlay") !== "off";
    }
    return true;
  });

  // Track current slide via IntersectionObserver
  useEffect(() => {
    const container = document.getElementById("snap-root");
    if (!container) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = parseInt(e.target.id.replace("slide-", ""));
            if (!isNaN(idx)) setCurrentSlide(idx);
          }
        });
      },
      { root: container, threshold: 0.5 }
    );

    container.querySelectorAll(".slide").forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const toggleVisible = useCallback(() => {
    setVisible((v) => {
      const next = !v;
      localStorage.setItem("weather-overlay", next ? "on" : "off");
      if (!next) setExpanded(false);
      return next;
    });
  }, []);

  // Day slides are slide-1 through slide-14 (index + 1)
  const dayNumber = currentSlide; // slide-1 = day 1, etc.
  const weather: DayWeather | undefined = weatherMap[dayNumber];

  // Hide on hero (slide-0) and closing slide, or when no weather data
  const isHeroOrClosing = currentSlide === 0 || !weather;

  return (
    <>
      {/* Toggle button -- always visible */}
      <button
        className="ui-toggle weather-toggle"
        onClick={toggleVisible}
        title={visible ? "Hide weather" : "Show weather"}
        aria-label={visible ? "Hide weather overlay" : "Show weather overlay"}
      >
        {visible ? "\uD83C\uDF21\uFE0F" : "\uD83C\uDF21\uFE0F"}
        {!visible && <span className="weather-toggle-off" />}
      </button>

      {/* Weather badge */}
      {visible && !isHeroOrClosing && weather && (
        <div
          className={`weather-overlay ${expanded ? "weather-overlay--expanded" : ""} weather-condition--${weather.condition}`}
          onClick={() => setExpanded((e) => !e)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setExpanded((v) => !v);
            }
          }}
        >
          <div className="weather-badge">
            <span className="weather-badge-icon">{weather.icon}</span>
            <span className="weather-badge-temp">
              {weather.highC}&deg; / {weather.lowC}&deg;
            </span>
            <span className="weather-badge-rain">
              <span className="weather-rain-drop">{"\uD83D\uDCA7"}</span>
              {weather.rainChance}%
            </span>
          </div>

          <div className="weather-expanded">
            <div className="weather-expanded-location">{weather.location}</div>

            <div className="weather-detail-row">
              <span className="weather-detail-label">Condition</span>
              <span className="weather-detail-value">
                {weather.icon} {weather.condition.replace("-", " ")}
              </span>
            </div>
            <div className="weather-detail-row">
              <span className="weather-detail-label">Humidity</span>
              <span className="weather-detail-value">{weather.humidity}%</span>
            </div>
            <div className="weather-detail-row">
              <span className="weather-detail-label">Sunrise</span>
              <span className="weather-detail-value">{weather.sunrise}</span>
            </div>
            <div className="weather-detail-row">
              <span className="weather-detail-label">Sunset</span>
              <span className="weather-detail-value">{weather.sunset}</span>
            </div>

            <div className="weather-tip">{weather.tip}</div>
          </div>
        </div>
      )}
    </>
  );
}
