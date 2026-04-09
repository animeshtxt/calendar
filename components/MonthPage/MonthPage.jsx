"use client";
import { MONTH_THEMES } from "@/lib/monthThemes";
import styles from "./MonthPage.module.css";
import HeroImage from "@/components/HeroImage/HeroImage";
import DateGrid from "@/components/DateGrid/DateGrid";
import NotesPanel from "@/components/NotesPanel/NotesPanel";

export default function MonthPage({
  year,
  month,
  getDayStatus,
  onDayClick,
  getNote,
  setNote,
  startDate,
  clearRange,
  onToday,
}) {
  const theme = MONTH_THEMES[month];
  const vars = {
    "--accent": theme.accent,
    "--color-accent": theme.accent,
    "--color-accent-soft": `color-mix(in srgb, ${theme.accent} 15%, transparent)`,
  };
  return (
    <div className={styles.monthPage} style={vars}>
      <HeroImage
        src={theme.heroSrc}
        month={month}
        year={year}
        gradient={theme.gradient}
        accent={theme.accent}
        onPrev={null}
        onNext={null}
      />
      <div className={styles.bottomRow}>
        <div className={styles.notesCol}>
          <div className={styles.notesWrapper}>
            <NotesPanel
              year={year}
              month={month}
              startDate={startDate}
              getNote={getNote}
              setNote={setNote}
              clearRange={clearRange}
            />
          </div>
        </div>
        <div className={styles.gridCol}>
          <DateGrid
            year={year}
            month={month}
            getDayStatus={getDayStatus}
            onDayClick={onDayClick}
            accent={theme.accent}
            onToday={onToday}
          />
        </div>
      </div>
    </div>
  );
}
