"use client";

import { useState } from "react";

interface Note {
  id: string;
  title: string;
  content: string;
  created_at: string;
}

interface NotesPanelProps {
  entityId: string;
  entityType: "bill" | "legislator";
  notes: Note[];
  onAddNote: (title: string, content: string) => void;
  onEditNote: (id: string, title: string, content: string) => void;
  onDeleteNote: (id: string) => void;
}

export default function NotesPanel({ notes, onAddNote, onEditNote, onDeleteNote }: NotesPanelProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  const handleAddNote = () => {
    if (newTitle.trim() && newContent.trim()) {
      onAddNote(newTitle.trim(), newContent.trim());
      setNewTitle("");
      setNewContent("");
      setIsAdding(false);
    }
  };

  const handleEditNote = (id: string) => {
    if (newTitle.trim() && newContent.trim()) {
      onEditNote(id, newTitle.trim(), newContent.trim());
      setEditingId(null);
      setNewTitle("");
      setNewContent("");
    }
  };

  const startEdit = (note: Note) => {
    setEditingId(note.id);
    setNewTitle(note.title);
    setNewContent(note.content);
    setIsAdding(false);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setIsAdding(false);
    setNewTitle("");
    setNewContent("");
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Notes</h3>
        <button
          onClick={() => setIsAdding(true)}
          className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Add Note
        </button>
      </div>

      {/* Add/Edit Note Form */}
      {(isAdding || editingId) && (
        <div className="mb-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Note title..."
            className="w-full p-2 mb-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <textarea
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            placeholder="Note content..."
            rows={3}
            className="w-full p-2 mb-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <div className="flex space-x-2">
            <button
              onClick={editingId ? () => handleEditNote(editingId) : handleAddNote}
              className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
            >
              {editingId ? "Update" : "Save"}
            </button>
            <button
              onClick={cancelEdit}
              className="px-3 py-1 text-sm bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Notes List */}
      <div className="space-y-3">
        {notes.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No notes yet. Add your first note!</p>
        ) : (
          notes.map((note) => (
            <div key={note.id} className="border border-gray-200 rounded-lg p-3">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-gray-900">{note.title}</h4>
                <div className="flex space-x-1">
                  <button
                    onClick={() => startEdit(note)}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDeleteNote(note.id)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <p className="text-gray-700 text-sm">{note.content}</p>
              <p className="text-gray-500 text-xs mt-2">
                {new Date(note.created_at).toLocaleDateString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
