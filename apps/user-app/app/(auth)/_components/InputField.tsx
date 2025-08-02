import { FieldError, UseFormRegister } from "react-hook-form";

type InputFieldProps = {
    label: string;
    name: string;
    type?: string;
    placeholder?: string;
    register: UseFormRegister<any>;
    error?: FieldError;
}

const InputField = ({ label, name, type = "text", placeholder, register, error, ...rest }: InputFieldProps) => {
    return (
        <div className="mb-4">
            <label htmlFor={name} className="block mb-1 font-medium">
                {label}
            </label>
            <input
                id={name}
                type={type}
                {...register(name)}
                {...rest}
                placeholder={placeholder}
                className={`w-full px-4 py-2 border rounded outline-none ${error ? "border-red-500" : "border-gray-300"}`}
            />
            {error && (
                <p className="text-red-500 text-sm mt-1" role="alert">
                    {error.message}
                </p>
            )}
        </div>
    )
}

export default InputField