"use client";

import { useState, useEffect } from "react";

type Currency = "PLN" | "EUR" | "JPY";

const RATES: Record<Currency, Record<Currency, number>> = {
  EUR: { EUR: 1, JPY: 162, PLN: 4.3 },
  PLN: { PLN: 1, JPY: 37, EUR: 1 / 4.3 },
  JPY: { JPY: 1, PLN: 1 / 37, EUR: 1 / 162 },
};

const SYMBOLS: Record<Currency, string> = {
  PLN: "zl",
  EUR: "\u20AC",
  JPY: "\u00A5",
};

const CURRENCIES: Currency[] = ["PLN", "EUR", "JPY"];

export function CurrencyConverter() {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("100");
  const [from, setFrom] = useState<Currency>("EUR");
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("mobile-menu-close", close);
    return () => window.removeEventListener("mobile-menu-close", close);
  }, []);

  if (!mounted) return null;

  const numAmount = parseFloat(amount) || 0;
  const others = CURRENCIES.filter((c) => c !== from);

  const convert = (to: Currency) => {
    const rate = RATES[from][to];
    return (numAmount * rate).toFixed(to === "JPY" ? 0 : 2);
  };

  return (
    <>
      <button
        className="ui-toggle cc-toggle"
        onClick={() => setOpen(!open)}
        title="Currency converter"
      >
        {open ? "\u2715" : "\u00A5"}
      </button>

      {open && (
        <div className="cc-panel">
          <div className="cc-header">
            <span className="cc-title">Currency</span>
          </div>

          <div className="cc-input-row">
            <input
              className="cc-input"
              type="number"
              inputMode="decimal"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount"
            />
            <select
              className="cc-select"
              value={from}
              onChange={(e) => setFrom(e.target.value as Currency)}
            >
              {CURRENCIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="cc-results">
            {others.map((c) => (
              <div key={c} className="cc-result-row">
                <span className="cc-result-currency">{c}</span>
                <span className="cc-result-value">
                  {SYMBOLS[c]} {convert(c)}
                </span>
              </div>
            ))}
          </div>

          <div className="cc-footer">
            <span className="cc-rate-note">
              1 EUR = 162 JPY | 1 EUR = 4.3 PLN
            </span>
          </div>
        </div>
      )}
    </>
  );
}
