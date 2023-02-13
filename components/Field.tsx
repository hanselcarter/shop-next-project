import { InputType, Input } from "./Input";

interface FieldProps {
  type: InputType;
  label: string;
  onChange: (value: string) => void;
  value: string;
  required: boolean;
}

function Field({
  type,
  label,
  onChange,
  value,
  required,
}: FieldProps): JSX.Element {
  return (
    <label className="block m-4">
      <span className="block text-sm text-gray-600"> {label}</span>
      <Input
        type={type}
        onChange={onChange}
        value={value}
        required={required}
      />
    </label>
  );
}

export default Field;
