interface InputProps {
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function Input({ value, onChange }: InputProps) {
	return (
		<input
			className="tasks-search"
			type="text"
			name="search"
			id="search"
			placeholder="Search task by title, tags"
			value={value}
			onChange={onChange}
		/>
	);
}

export default Input;
