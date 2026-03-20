import css from './App.module.css';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '../../services/noteService';
// import { Note } from '../../types';
import Modal from '../Modal/Modal.tsx';
import NoteForm from '../NoteForm/NoteForm';
import NoteList from '../NoteList/NoteList';
import Pagination from '../Pagination/Pagination';
import SearchBox from '../SearchBox/SearchBox.tsx';


export default function App() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	const { data: notes, isSuccess, isLoading, error } = useQuery({
		queryKey: ['notes'],
		queryFn: () => fetchNotes(),
	});

	const handleSubmit = async (query: string) => {
		console.log('Search query:', query);
		// Implement search functionality here, e.g., refetch notes with the search query
	};

  return (
	<div className={css.app}>
		<header className={css.toolbar}>
			<SearchBox onSubmit={handleSubmit} />
			{isSuccess
				&& notes?.notes.length > 0 
				&& <Pagination 
					totalPages={notes.totalPages} 
					currentPage={1} 
					onPageChange={(nextPage) => console.log('Selected page:', nextPage)}
				 />}
			{isLoading && <strong className={css.message}>Loading...</strong>}
			{<button className={css.button} onClick={openModal}>
				Create note +
			</button>}
		</header>
		{isSuccess
			&& notes.notes.length > 0 
			? <NoteList notes={notes.notes} onDelete={(id) => console.log('Delete note with id:', id)}
			/>
			: <p className={css.message}>{error ? 'Error fetching notes' : 'No notes found'}</p>
		}

		{isModalOpen && (
			<Modal onClick={closeModal}>
				<NoteForm onClose={closeModal} onSuccess={(data) => console.log('Create note with data:', data)} />
			</Modal>
		)}
	</div>
  )}