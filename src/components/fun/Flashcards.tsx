"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { type Flashcard, categories } from "@/data/flashcards";

interface FlashcardsProps {
  cards: Flashcard[];
}

type CategoryFilter = Flashcard["category"] | "all";

const STORAGE_KEY = "jpn-flashcard-mastery";

function loadMastery(): Record<number, "got" | "study"> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveMastery(m: Record<number, "got" | "study">) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(m));
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function Flashcards({ cards }: FlashcardsProps) {
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [flipped, setFlipped] = useState(false);
  const [index, setIndex] = useState(0);
  const [mastery, setMastery] = useState<Record<number, "got" | "study">>({});
  const [deck, setDeck] = useState<Flashcard[]>(cards);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  // Load mastery on mount
  useEffect(() => {
    setMastery(loadMastery());
  }, []);

  // Filter + reset when category changes
  const filtered = useMemo(() => {
    if (category === "all") return deck;
    return deck.filter((c) => c.category === category);
  }, [category, deck]);

  const current = filtered[index] || filtered[0];
  const total = filtered.length;

  const go = useCallback(
    (dir: 1 | -1) => {
      setFlipped(false);
      setIndex((prev) => {
        const next = prev + dir;
        if (next < 0) return total - 1;
        if (next >= total) return 0;
        return next;
      });
    },
    [total],
  );

  const handleShuffle = () => {
    setFlipped(false);
    setIndex(0);
    setDeck(shuffle(cards));
  };

  const handleReset = () => {
    setMastery({});
    saveMastery({});
  };

  const markCard = (status: "got" | "study") => {
    if (!current) return;
    const next = { ...mastery, [current.id]: status };
    setMastery(next);
    saveMastery(next);
    go(1);
  };

  // Keyboard nav
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        setFlipped((f) => !f);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [go]);

  // Swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const diff = e.changedTouches[0].clientX - touchStart;
    if (Math.abs(diff) > 50) {
      go(diff < 0 ? 1 : -1);
    }
    setTouchStart(null);
  };

  const gotCount = Object.values(mastery).filter((v) => v === "got").length;
  const studyCount = Object.values(mastery).filter((v) => v === "study").length;

  if (!current) return null;

  return (
    <div className="fc-container">
      {/* Category pills */}
      <div className="fc-pills">
        {categories.map((cat) => (
          <button
            key={cat.key}
            className={`fc-pill ${category === cat.key ? "fc-pill-active" : ""}`}
            onClick={() => {
              setCategory(cat.key);
              setIndex(0);
              setFlipped(false);
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Progress + score */}
      <div className="fc-meta">
        <span className="fc-progress">
          {index + 1} / {total}
        </span>
        <span className="fc-score">
          <span className="fc-score-got">{gotCount} learned</span>
          <span className="fc-score-study">{studyCount} studying</span>
        </span>
      </div>

      {/* Progress bar */}
      <div className="fc-bar">
        <div className="fc-bar-fill" style={{ width: `${((index + 1) / total) * 100}%` }} />
      </div>

      {/* Card */}
      <div
        className={`fc-card ${flipped ? "fc-card-flipped" : ""}`}
        onClick={() => setFlipped((f) => !f)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="fc-card-inner">
          {/* Front: Japanese */}
          <div className="fc-face fc-front">
            <span className="fc-category-badge">{current.category}</span>
            <div
              className="fc-japanese"
              dangerouslySetInnerHTML={{ __html: current.furigana }}
            />
            <p className="fc-hint">Tap to reveal</p>
            {mastery[current.id] && (
              <span className={`fc-mastery-badge fc-mastery-${mastery[current.id]}`}>
                {mastery[current.id] === "got" ? "Learned" : "Studying"}
              </span>
            )}
          </div>

          {/* Back: English + romaji */}
          <div className="fc-face fc-back">
            <span className="fc-category-badge">{current.category}</span>
            <p className="fc-english">{current.english}</p>
            <p className="fc-romaji">{current.romaji}</p>
            <p className="fc-kanji-small">{current.japanese}</p>
          </div>
        </div>
      </div>

      {/* Mastery buttons */}
      {flipped && (
        <div className="fc-actions">
          <button className="fc-btn fc-btn-study" onClick={() => markCard("study")}>
            Study more
          </button>
          <button className="fc-btn fc-btn-got" onClick={() => markCard("got")}>
            Got it
          </button>
        </div>
      )}

      {/* Nav arrows */}
      <div className="fc-nav">
        <button className="fc-arrow" onClick={() => go(-1)} title="Previous card">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button className="fc-shuffle" onClick={handleShuffle} title="Shuffle cards">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="16 3 21 3 21 8" />
            <line x1="4" y1="20" x2="21" y2="3" />
            <polyline points="21 16 21 21 16 21" />
            <line x1="15" y1="15" x2="21" y2="21" />
            <line x1="4" y1="4" x2="9" y2="9" />
          </svg>
        </button>
        {(gotCount > 0 || studyCount > 0) && (
          <button className="fc-reset" onClick={handleReset} title="Reset progress">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12a9 9 0 1 1 9 9 9.75 9.75 0 0 1-6.74-2.74L3 21" />
              <path d="M3 16v5h5" />
            </svg>
          </button>
        )}
        <button className="fc-arrow" onClick={() => go(1)} title="Next card">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
