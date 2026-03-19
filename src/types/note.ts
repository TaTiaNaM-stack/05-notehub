export interface Note {
  id: string;
  title: string;
  content: string;
  tag: "Todo" | "Work" | "Personal";
}

export interface CreateNoteData {
  title: string;
  content: string;
  tag: "Todo" | "Work" | "Personal";
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

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