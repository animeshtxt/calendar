"use client";
import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "wall_calendar_notes";

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveToStorage(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    window.alert("Could not save notes to localStorage:", err);
    console.warn("Could not save notes to localStorage:", err);
  }
}

export function useNotes() {
  const [notes, setNotes] = useState({});

  useEffect(() => {
    setNotes(loadFromStorage());
  }, []);

  const setNote = useCallback((key, text) => {
    setNotes((prev) => {
      const updated = { ...prev, [key]: text };
      if (!text.trim()) {
        delete updated[key];
      }
      saveToStorage(updated);
      return updated;
    });
  }, []);

  const getNote = useCallback(
    (key) => {
      return notes[key] || "";
    },
    [notes],
  );

  const deleteNote = useCallback((key) => {
    setNotes((prev) => {
      const updated = { ...prev };
      delete updated[key];
      saveToStorage(updated);
      return updated;
    });
  }, []);

  return { notes, setNote, getNote, deleteNote };
}
