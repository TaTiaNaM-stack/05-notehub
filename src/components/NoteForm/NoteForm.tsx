import type { Note } from '../../types/note';
import {createNote} from '../../services/noteService';
import css from './NoteForm.module.css'
import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from 'formik';
import { object, string } from 'yup';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import type {CreateNoteData} from '../../types/note';

const validationSchema = object({
  title: string()
  .min(3, 'Title must be at least 3 characters')
  .max(50, 'Title must be at most 50 characters')
  .required('Title is required'),
  content: string()
  .max(500, 'Content must be at most 500 characters'),
  tag: string().oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'], 'Invalid tag')
  .required('Tag is required'),
});

interface NoteFormProps {
  onSuccess: (data: Note) => void;
  onClose: () => void;
}

export default function NoteForm({ onSuccess, onClose }: NoteFormProps) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: createNote,
    onSuccess: (data: Note) => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      onSuccess(data);
      onClose();
    },
    onError: (error) => {
      console.error('Error creating note:', error);
      }
  });

  const button = document.getElementById('create');
  if (button) {
    button.addEventListener('click', onClose);
  }

  const handleSubmit = (values: CreateNoteData, actions: FormikHelpers<CreateNoteData>, e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      mutate(values);
      actions.resetForm();
    };

  return (
    <Formik
      initialValues={{
        title: '',
        content: '',
        tag: 'Todo'
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>     
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <input id="title" type="text" name="title" className={css.input} />
          <ErrorMessage component="span" name="title" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="content">Content</label>
          <Field
            as="textarea"
            id="content"
            name="content"
            rows={8}
            className={css.textarea}
          />
          <ErrorMessage component="span" name="content" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="tag">Tag</label>
          <Field
            as="select"
            id="tag"
            name="tag"
            className={css.select}
          >
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage 
            component="span"
            name="tag" 
            className={css.error} 
          />
        </div>

        <div className={css.actions}>
          <button type="button" className={css.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button
            type="submit"
            id="create"
            className={css.submitButton}
            disabled={false}
            onClick={onClose}
          >
            Create note
          </button>
        </div>
      </Form>
    </Formik>
  )
}