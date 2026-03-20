import css from './SearchBox.module.css'

interface SearchBoxProps {
    onSubmit: (query: string) => Promise<void>;  
}

export default function SearchBox({ onSubmit }: SearchBoxProps ) {
  const handleSubmit: (formData: FormData) => Promise<void> = async (formData: FormData) => {
        const query = (formData.get('query') as string).trim();
        await onSubmit(query);
      };
  return (
    <form action={handleSubmit}>
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
    />
  </form>
  )
}