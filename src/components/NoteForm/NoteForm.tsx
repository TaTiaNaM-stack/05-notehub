import type { FetchNotesResponse } from '../../types/note';
import {createNote} from '../../services/noteService';
import css from './NoteForm.module.css'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { object, string } from 'yup';
import {useMutation} from '@tanstack/react-query';

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
  onSuccess: (data: FetchNotesResponse) => void;
  onClose: () => void;
}

export default function NoteForm({ onSuccess, onClose }: NoteFormProps) {
  const { mutate } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      onSuccess();
      onError: (error) => {
        console.error(error)
      };
}})


  return (
    <Formik
      initialValues={{
        title: '',
        content: '',
        tag: 'Todo'
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        onSuccess(values as FetchNotesResponse);
        setSubmitting(false);
      }}
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