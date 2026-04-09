"use client";
import { useState, useCallback } from "react";
import { compareDates } from "@/lib/dateUtils";

function adj(year, month, delta) {
  let m = month + delta,
    y = year;
  if (m > 11) {
    m -= 12;
    y++;
  }
  if (m < 0) {
    m += 12;
    y--;
  }
  return { year: y, month: m };
}

export function useCalendarState() {
  const today = new Date();
  const [cur, setCur] = useState({
    year: today.getFullYear(),
    month: today.getMonth(),
  });
  const [flipDir, setFlipDir] = useState(null);
  const [startDate, setStartDate] = useState(null);

  const prev = adj(cur.year, cur.month, -1);
  const next = adj(cur.year, cur.month, +1);

  const goNext = useCallback(() => {
    if (!flipDir) setFlipDir("next");
  }, [flipDir]);
  const goPrev = useCallback(() => {
    if (!flipDir) setFlipDir("prev");
  }, [flipDir]);

  const goToToday = useCallback(() => {
    if (flipDir) return;
    const t = new Date();
    setCur({ year: t.getFullYear(), month: t.getMonth() });
    setStartDate(null);
  }, [flipDir]);

  const onFlipDone = useCallback(() => {
    setCur(flipDir === "next" ? next : prev);
    setFlipDir(null);
    setStartDate(null);
  }, [flipDir, next, prev]);

  const handleDayClick = useCallback(
    (year, month, day) => {
      const clicked = { year, month, day };
      setStartDate((prev) => {
        if (
          prev &&
          prev.year === year &&
          prev.month === month &&
          prev.day === day
        ) {
          return null; // deselect
        }
        return clicked;
      });
    },
    [],
  );

  const clearRange = useCallback(() => {
    setStartDate(null);
  }, []);

  const getDayStatus = useCallback(
    (year, month, day) => {
      if (!startDate) return null;
      const cell = { year, month, day };
      const cmpStart = compareDates(cell, startDate);
      if (cmpStart === 0) return "selected";
      return null;
    },
    [startDate],
  );


  return {
    cur,
    prev,
    next,
    flipDir,
    goNext,
    goPrev,
    goToToday,
    onFlipDone,
    startDate,
    handleDayClick,
    getDayStatus,
    clearRange,
  };
}
