import { Control, FieldValues, Path } from "react-hook-form";

export interface InputProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  placeholder?: string;
  type?: string;
  control: Control<T>;
  required?: boolean;
  disabled?: boolean;
}
