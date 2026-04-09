"use client";
import { useState } from "react";
import styles from "./NotesPanel.module.css";
import { toDateKey, toMonthKey, MONTH_NAMES } from "@/lib/dateUtils";
import { getHoliday } from "@/lib/holidays";

function isToday(year, month, day) {
  const t = new Date();
  return (
    t.getFullYear() === year && t.getMonth() === month && t.getDate() === day
  );
}

function NoteBlock({
  id,
  label,
  noteKey,
  initialValue,
  getNote,
  setNote,
  onDelete,
}) {
  const [draft, setDraft] = useState(initialValue);
  const [saved, setSaved] = useState(false);

  const isDirty = draft !== getNote(noteKey);

  const handleSave = () => {
    setNote(noteKey, draft);
    setSaved(true);
    setTimeout(() => setSaved(false), 1600);
  };

  const handleDelete = () => {
    setDraft("");
    setNote(noteKey, "");
    if (onDelete) onDelete();
  };

  return (
    <div className={styles.noteBlock}>
      <div className={styles.noteBlockHeader}>
        <label htmlFor={id} className={styles.textareaLabel}>
          {label}
        </label>
        {(draft || getNote(noteKey)) && (
          <button
            className={styles.deleteBtn}
            onClick={handleDelete}
            title="Delete note"
            aria-label="Delete note"
          >
            🗑
          </button>
        )}
      </div>
      <textarea
        id={id}
        className={styles.textarea}
        placeholder="Write a note…"
        value={draft}
        onChange={(e) => {
          setDraft(e.target.value);
          setSaved(false);
        }}
        rows={3}
      />
      <div className={styles.noteActions}>
        {isDirty && (
          <button className={styles.saveBtn} onClick={handleSave}>
            Save
          </button>
        )}
        {saved && <span className={styles.savedTick}>✓ Saved</span>}
      </div>
    </div>
  );
}

export default function NotesPanel({
  year,
  month,
  startDate,
  getNote,
  setNote,
  clearRange,
}) {
  const monthKey = toMonthKey(year, month);

  const focusedDateKey = startDate
    ? toDateKey(startDate.year, startDate.month, startDate.day)
    : null;

  const todaySelected =
    startDate && isToday(startDate.year, startDate.month, startDate.day);

  const selectedHoliday = startDate
    ? getHoliday(startDate.month, startDate.day)
    : null;

  return (
    <aside className={styles.panel}>
      <div className={styles.heading}>
        <span>📝</span> Notes
      </div>
      {isToday(year, month, new Date().getDate()) && (
        <div className={styles.todayBanner}>
          📅 Today is{" "}
          <strong>
            {MONTH_NAMES[month]} {new Date().getDate()}, {year}
          </strong>
        </div>
      )}

      <NoteBlock
        id="monthly-note"
        label={`${MONTH_NAMES[month]} — general`}
        noteKey={monthKey}
        initialValue={getNote(monthKey)}
        getNote={getNote}
        setNote={setNote}
      />

      {focusedDateKey && (
        <div className={styles.dateNoteBlock}>
          <div className={styles.dateNoteHeader}>
            <div className={styles.dateLabelRow}>
              <label
                htmlFor="date-note"
                className={`${styles.dateNoteLabel} ${todaySelected ? styles.todayLabel : ""}`}
              >
                {todaySelected && "📅 Today · "}
                {MONTH_NAMES[startDate.month]} {startDate.day}
              </label>
              {selectedHoliday && (
                <span className={styles.holidayBadge}>
                  🎉 {selectedHoliday}
                </span>
              )}
            </div>
            <button
              className={styles.clearBtn}
              onClick={clearRange}
              aria-label="Clear selection"
              title="Clear selection"
            >
              ×
            </button>
          </div>

          <NoteBlock
            id="date-note"
            label=""
            noteKey={focusedDateKey}
            initialValue={getNote(focusedDateKey)}
            getNote={getNote}
            setNote={setNote}
            onDelete={clearRange}
          />
        </div>
      )}

      <SavedNotesList
        year={year}
        month={month}
        getNote={getNote}
        setNote={setNote}
      />
    </aside>
  );
}

function SavedNotesList({ year, month, getNote, setNote }) {
  const [open, setOpen] = useState(false);
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const items = [];
  for (let d = 1; d <= daysInMonth; d++) {
    const key = toDateKey(year, month, d);
    const text = getNote(key);
    if (text && text.trim()) items.push({ day: d, key, text });
  }

  if (!items.length) return null;

  return (
    <div className={styles.savedSection}>
      <button
        className={styles.savedToggle}
        onClick={() => setOpen((p) => !p)}
        aria-expanded={open}
      >
        {open ? "▾" : "▸"} {items.length} saved note
        {items.length !== 1 ? "s" : ""}
      </button>
      {open && (
        <ul className={styles.savedList}>
          {items.map(({ day, key, text }) => (
            <li
              key={day}
              className={`${styles.savedItem} ${isToday(year, month, day) ? styles.savedToday : ""}`}
            >
              <span className={styles.savedDay}>{day}</span>
              <span className={styles.savedText}>{text}</span>
              <button
                className={styles.savedDeleteBtn}
                onClick={() => setNote(key, "")}
                title="Delete"
                aria-label={`Delete note for day ${day}`}
              >
                🗑
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
