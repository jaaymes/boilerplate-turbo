import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@package/ui/components/form";
import { Input as ShadcnInput } from "@package/ui/components/input";
import { cn } from "@package/ui/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { FieldValues, useController } from "react-hook-form";
import type { InputProps } from "./types";

export function Input<T extends FieldValues>({
  name,
  label,
  placeholder,
  type = "text",
  control,
  required = false,
  disabled = false,
}: InputProps<T>) {
  const { field } = useController({ name, control });
  const inputId = `input-${name}`;
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem>
          <FormLabel htmlFor={inputId}>
            {required && <span className="text-destructive mr-0.5">*</span>}
            {label}
          </FormLabel>
          <FormControl>
            <div className="relative">
              <ShadcnInput
                id={inputId}
                type={inputType}
                placeholder={placeholder}
                disabled={disabled}
                className={cn(isPassword && "pr-10")}
                data-testid="input-field"
                value={field.value ?? ""}
                onChange={field.onChange}
                onBlur={field.onBlur}
                name={field.name}
                ref={field.ref}
              />
              {isPassword && (
                <button
                  type="button"
                  data-testid="password-toggle"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-secondary"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
