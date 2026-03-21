import css from './SearchBox.module.css'

interface SearchBoxProps {
    onSubmit: (value: string) => Promise<void>; 
    searchQuery: string; 
}

export default function SearchBox({ onSubmit, searchQuery }: SearchBoxProps ) {
  const handleSubmit: (formData: FormData) => Promise<void> = async (formData: FormData) => {
        const query = (formData.get('query') as string).trim();
        await onSubmit(query);
      };
const handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void = (e) => {
        onSubmit(e.target.value);
      }

  return (
    <form action={handleSubmit}>
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      defaultValue={searchQuery}
      onChange={handleChange}
    />
  </form>
  )
}