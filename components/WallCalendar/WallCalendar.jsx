"use client";
import { useCalendarState } from "@/hooks/useCalendarState";
import { useNotes } from "@/hooks/useNotes";
import { MONTH_THEMES } from "@/lib/monthThemes";
import CalendarLayer from "../CalendarLayer/CalendarLayer";
import styles from "./WallCalendar.module.css";

export default function WallCalendar() {
  const cal = useCalendarState();
  const { getNote, setNote } = useNotes();

  const { cur, prev, next, flipDir, goNext, goPrev, goToToday, onFlipDone } =
    cal;
  const curTheme = MONTH_THEMES[cur.month];
  const belowTheme = MONTH_THEMES[prev.month];
  const flipperTheme = MONTH_THEMES[cur.month];

  const staticHandlers = {
    getDayStatus: () => null,
    onDayClick: () => {},
    clearRange: () => {},
    getNote: () => "",
    setNote: () => {},
    startDate: null,
  };

  const belowData = flipDir === "prev" ? cur : next;
  const flipperData = flipDir === "prev" ? prev : cur;

  const flipperZ = flipDir === "prev" ? 3 : 2;

  const flipClass =
    flipDir === "next"
      ? styles.flipNext
      : flipDir === "prev"
        ? styles.flipPrev
        : "";

  return (
    <div className={styles.pageContainer}>
      <main className={styles.cardWrapper}>
        <div
          className={styles.card}
          style={{
            "--accent": curTheme.accent,
            "--color-accent": curTheme.accent,
            "--color-accent-soft": `color-mix(in srgb, ${curTheme.accent} 15%, transparent)`,
          }}
        >
          <div className={styles.coils}>
            <img
              src="/hanger/coils.png"
              alt="coil"
              className={styles.hangerImg}
            />
            <img src="/hanger/nail.png" alt="nail" className={styles.nailImg} />
          </div>

          <div className={styles.scene}>
            {flipDir && (
              <CalendarLayer
                className={styles.layerBelow}
                style={{ zIndex: 1 }}
                data={belowData}
                theme={belowTheme}
                handlers={staticHandlers}
                navDisabled
                onPrev={goPrev}
                onNext={goNext}
                onToday={goToToday}
              />
            )}

            <div
              className={`${styles.flipper} ${flipClass}`}
              style={{ zIndex: flipperZ }}
              onAnimationEnd={(e) => {
                if (e.target === e.currentTarget) onFlipDone();
              }}
            >
              <CalendarLayer
                className={styles.flipFront}
                data={flipperData}
                theme={flipperTheme}
                navDisabled={!!flipDir}
                onPrev={goPrev}
                onNext={goNext}
                handlers={{
                  getDayStatus: cal.getDayStatus,
                  onDayClick: cal.handleDayClick,
                  startDate: cal.startDate,
                  clearRange: cal.clearRange,
                  getNote: getNote,
                  setNote: setNote,
                  onToday: goToToday,
                }}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
