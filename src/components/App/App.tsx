import css from './App.module.css';
import { useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchNotes } from '../../services/noteService';
import { useDebouncedCallback } from 'use-debounce';
import Modal from '../Modal/Modal.tsx';
import NoteForm from '../NoteForm/NoteForm';
import NoteList from '../NoteList/NoteList';
import Pagination from '../Pagination/Pagination';
import SearchBox from '../SearchBox/SearchBox.tsx';


export default function App() {
	const [searchQuery, setSearchQuery] = useState('');
	const [currentPage, setCurrentPage] = useState(1);

	const [isModalOpen, setIsModalOpen] = useState(false);
	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	const { data: notes, isSuccess, isLoading, error } = useQuery({
		queryKey: ['notes', currentPage, searchQuery],
		queryFn: () => fetchNotes(searchQuery, currentPage),
		placeholderData: keepPreviousData,
	});

	const debouncedSearch = useDebouncedCallback ((value: string) => {
		setSearchQuery(value);
		setCurrentPage(1);
	}, 1000);
	
  return (
	<div className={css.app}>
		<header className={css.toolbar}>
			<SearchBox searchQuery={searchQuery} onChange={debouncedSearch} />
			{isSuccess
				&& notes?.notes.length > 0 
				&& <Pagination 
					totalPages={notes.totalPages} 
					currentPage={currentPage} 
					onPageChange={( selected ) => setCurrentPage(selected)}
				 />}
			{isLoading && <strong className={css.message}>Loading...</strong>}
			{<button className={css.button} onClick={openModal}>
				Create note +
			</button>}
		</header>
		{isSuccess 
			&& notes.notes.length > 0 
			? <NoteList notes={notes.notes} />
			: <p className={css.message}>{error ? 'Error fetching notes' : 'No notes found'}</p>
		}

		{isModalOpen && (
			<Modal onClose={closeModal}>
				<NoteForm onClose={closeModal} />
			</Modal>
		)}
	</div>
  )}