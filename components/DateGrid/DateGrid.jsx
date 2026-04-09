import styles from "./DateGrid.module.css";
import {
  getDaysInMonth,
  getFirstDayOfMonth,
  isToday,
  DAY_LABELS,
} from "@/lib/dateUtils";
import { getHoliday } from "@/lib/holidays";

export default function DateGrid({
  year,
  month,
  getDayStatus,
  onDayClick,
  accent,
  onToday,
}) {
  const totalDays = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const t = new Date();
  const isThisMonth = t.getFullYear() === year && t.getMonth() === month;

  const cells = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: totalDays }, (_, i) => i + 1),
  ];

  return (
    <div className={styles.gridWrapper}>
      <div>
        <div className={styles.dayHeaders}>
          {DAY_LABELS.map((label) => (
            <div
              key={label}
              className={`${styles.dayHeader} ${label === "Sun" ? styles.sunday : ""} ${label === "Sat" ? styles.saturday : ""}`}
            >
              {label}
            </div>
          ))}
        </div>

        <div className={styles.grid}>
          {cells.map((day, idx) => {
            if (!day)
              return <div key={`blank-${idx}`} className={styles.blank} />;

            const colIndex = (firstDay + day - 1) % 7; // 0=Mon … 6=Sun
            const isSun = colIndex === 6; // Sunday is last column
            const isSat = colIndex === 5; // Saturday is second-to-last
            const todayMark = isToday(year, month, day);
            const status = getDayStatus(year, month, day);
            const holiday = getHoliday(month, day);

            const cellClasses = [
              styles.dayCell,
              isSun && styles.isSunday,
              isSat && styles.isSaturday,
              status === "selected" && styles.selected,
              todayMark && styles.today,
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <div
                key={day}
                role="button"
                tabIndex={0}
                id={`day-${year}-${month + 1}-${day}`}
                className={cellClasses}
                onClick={() => onDayClick(year, month, day)}
                onKeyDown={(e) =>
                  (e.key === "Enter" || e.key === " ") &&
                  onDayClick(year, month, day)
                }
                style={{ "--accent": accent }}
                title={holiday ? `🎉 ${holiday}` : undefined}
                aria-label={`${day}${holiday ? `, ${holiday}` : ""}${todayMark ? ", today" : ""}`}
              >
                <span className={styles.dayNum}>{day}</span>
                {todayMark && (
                  <span className={styles.todayDot} aria-hidden="true" />
                )}
                {holiday && (
                  <span className={styles.holidayDot} aria-hidden="true" />
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.todayBtnContainer}>
        <button
          className={styles.todayBtn}
          onClick={onToday}
          disabled={isThisMonth || !onToday}
          title={isThisMonth ? "Already on today's month" : "Go to today"}
        >
          Today
        </button>
      </div>
    </div>
  );
}
