"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface Note {
  id: string;
  title: string;
  content: string;
  created_at: string;
}

interface AppContextType {
  // Tracked items
  trackedBills: string[];
  trackedLegislators: string[];
  toggleBillTracking: (billId: string) => void;
  toggleLegislatorTracking: (legislatorId: string) => void;
  
  // Notes
  notes: Record<string, Note[]>;
  addNote: (entityId: string, title: string, content: string) => void;
  editNote: (entityId: string, noteId: string, title: string, content: string) => void;
  deleteNote: (entityId: string, noteId: string) => void;
  getNotesForEntity: (entityId: string) => Note[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [trackedBills, setTrackedBills] = useState<string[]>(["hr1234-118"]); // Start with one tracked bill from mock data
  const [trackedLegislators, setTrackedLegislators] = useState<string[]>(["p001"]); // Start with one tracked legislator from mock data
  const [notes, setNotes] = useState<Record<string, Note[]>>({
    "hr1234-118": [
      {
        id: "n001",
        title: "Carbon reduction section",
        content: "Need to review section 4 for feasibility",
        created_at: new Date().toISOString(),
      }
    ]
  });

  const toggleBillTracking = (billId: string) => {
    setTrackedBills(prev => 
      prev.includes(billId) 
        ? prev.filter(id => id !== billId)
        : [...prev, billId]
    );
  };

  const toggleLegislatorTracking = (legislatorId: string) => {
    setTrackedLegislators(prev => 
      prev.includes(legislatorId) 
        ? prev.filter(id => id !== legislatorId)
        : [...prev, legislatorId]
    );
  };

  const addNote = (entityId: string, title: string, content: string) => {
    const newNote: Note = {
      id: `note-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title,
      content,
      created_at: new Date().toISOString(),
    };

    setNotes(prev => ({
      ...prev,
      [entityId]: [...(prev[entityId] || []), newNote]
    }));
  };

  const editNote = (entityId: string, noteId: string, title: string, content: string) => {
    setNotes(prev => ({
      ...prev,
      [entityId]: (prev[entityId] || []).map(note =>
        note.id === noteId ? { ...note, title, content } : note
      )
    }));
  };

  const deleteNote = (entityId: string, noteId: string) => {
    setNotes(prev => ({
      ...prev,
      [entityId]: (prev[entityId] || []).filter(note => note.id !== noteId)
    }));
  };

  const getNotesForEntity = (entityId: string) => {
    return notes[entityId] || [];
  };

  return (
    <AppContext.Provider value={{
      trackedBills,
      trackedLegislators,
      toggleBillTracking,
      toggleLegislatorTracking,
      notes,
      addNote,
      editNote,
      deleteNote,
      getNotesForEntity,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
