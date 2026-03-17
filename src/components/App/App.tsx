import css from './App.module.css';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getNotes } from '../../services/notes';
// import { Note } from '../../types';
import Modal from '../Modal/Modal';
import NoteForm from '../NoteForm/NoteForm';
import NoteList from '../NoteList/NoteList';
import Pagination from '../Pagination/Pagination';


export default function App() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	const { data: notes, isSuccess, error } = useQuery({
		queryKey: ['notes'],
		queryFn: () => getNotes(),
	});

  return (
<div className={css.app}>
	<header className={css.toolbar}>
		{/* Компонент SearchBox */}
		{isSuccess
	&& notes.length > 0 
	&& <Pagination pageCount={10} onPageChange={(selectedItem) => console.log('Selected page:', selectedItem.selected)} />}
		{<button className={css.button} onClick={openModal}>
			Create note +
		</button>}
    </header>
	{isSuccess
	&& notes.length > 0 
	&& <NoteList notes={notes || []} onDelete={(id) => console.log('Delete note with id:', id)}
	 />}

	{isModalOpen && (
		<Modal onClose={closeModal}>
			<NoteForm onSuccess={(data) => console.log('Create note with data:', data)} />
		</Modal>
	)}
</div>
  )}