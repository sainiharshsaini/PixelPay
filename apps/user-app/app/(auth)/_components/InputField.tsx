import { Input } from "@/components/ui/input";
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
            <label htmlFor={name} className="block mb-1 font-medium text-gray-800">
                {label}
            </label>
            <Input
                id={name}
                type={type}
                {...register(name)}
                {...rest}
                placeholder={placeholder}
                className={`w-full px-4 py-2 rounded-lg outline-none bg-white/70 backdrop-blur border transition-all duration-200 focus:ring-2 focus:ring-purple-400 focus:border-purple-500 ${error ? "border-red-500" : "border-gray-300"} disabled:bg-gray-100 disabled:cursor-not-allowed`}
            />
            {error && (
                <p className="text-red-500 text-xs mt-1" role="alert">
                    {error.message}
                </p>
            )}
        </div>
    )
}

export default InputField