export type InputType = "email" | "password";

interface InputProps {
  type: InputType;
  onChange: (value: string) => void;
  value: string;
  required: boolean;
}

export function Input({
  type,
  onChange,
  value,
  required,
}: InputProps): JSX.Element {
  return (
    <input
      type={type}
      className="border rounded px-3 py-1"
      onChange={(e) => onChange(e.target.value)}
      value={value}
      required={required}
    />
  );
}

export default Input;
