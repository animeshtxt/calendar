"use client";
import MonthPage from "../MonthPage/MonthPage";
import { MONTH_NAMES } from "@/lib/dateUtils";
import styles from "./CalendarLayer.module.css";

const todayObj = new Date();

export default function CalendarLayer({
  className,
  style,
  data,
  theme,
  handlers,
  navDisabled = true,
  onPrev,
  onNext,
  onToday,
}) {
  const isCurrentMonth =
    data.year === todayObj.getFullYear() && data.month === todayObj.getMonth();

  return (
    <div className={className} style={style}>
      <div className={styles.navBar} style={{ background: theme.accent }}>
        <button
          className={styles.navBtn}
          onClick={onPrev}
          disabled={navDisabled}
          aria-label="Previous month"
        >
          ‹
        </button>

        <div className={styles.centerGroup}>
          <div className={styles.monthLabel}>
            <span className={styles.navYear}>{data.year}</span>
            <span className={styles.navMonth}>
              {MONTH_NAMES[data.month].toUpperCase()}
            </span>
          </div>

          {!isCurrentMonth && onToday && !navDisabled && (
            <button
              className={styles.todayBtn}
              onClick={onToday}
              aria-label="Jump to today"
              title="Go to today"
            >
              Today
            </button>
          )}
        </div>

        <button
          className={styles.navBtn}
          onClick={onNext}
          disabled={navDisabled}
          aria-label="Next month"
        >
          ›
        </button>
      </div>

      <MonthPage year={data.year} month={data.month} {...handlers} />
    </div>
  );
}
