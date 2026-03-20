export interface Note {
  id: string;
  title: string;
  content: string;
  tag: NoteTag;
  createdAt: string;
  updatedAt: string;
}

export interface CreateNoteData {
  title: string;
  content: string;
  tag: NoteTag;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
  page: number;
  perPage: number;
}

export type NoteTag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";

// export interface NoteListProps {
//   notes: Note[];
//   onEdit: (note: Note) => void;
//   onDelete: (id: string) => void;
// }

export interface UpdateNoteData {
  id: string;
  title: string;
  content: string;
}