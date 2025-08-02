"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SignInSchema, SignInSchemaType } from "@repo/validation-schemas";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation"
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import InputField from "./InputField";

const formFields: {
  name: keyof SignInSchemaType;
  label: string;
  type: string;
  placeholder: string;
  autoComplete: string;
}[] = [
  { name: "credential", label: "Email or Phone", type: "text", placeholder: "you@example.com", autoComplete: "username" },
  { name: "password", label: "Password", type: "password", placeholder: "••••••••", autoComplete: "current-password" },
];


const SignInForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<SignInSchemaType>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      credential: "",
      password: ""
    }
  });

  const onSubmit: SubmitHandler<SignInSchemaType> = async (data: SignInSchemaType) => {
    const toastId = toast.loading('Signing in...');
    try {
      const response = await signIn('credentials', {
        ...data,
        redirect: false
      })

      if (response?.ok) {
        toast.success('Signed in successfully!', { id: toastId });
        window.location.href = '/dashboard';
      } else {
        toast.error(response?.error || "An unknown error occurred.", { id: toastId });
      }
    } catch (error) {
      console.error("Sign-in error:", error);
      toast.error("Failed to sign in. Please try again later.", { id: toastId })
    }
  }

  return (
    <div className="w-full max-w-md p-8 mx-auto space-y-6 bg-white rounded-lg shadow-lg">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Welcome Back!</h1>
        <p className="mt-2 text-gray-600">Sign in to continue to your dashboard.</p>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
        {formFields.map((field) => (
          <InputField
            key={field.name}
            label={field.label}
            name={field.name}
            type={field.type}
            placeholder={field.placeholder}
            register={register}
            error={errors[field.name]}
            disabled={isSubmitting}
            autoComplete={field.autoComplete}
          />
        ))}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-4 py-2.5 font-semibold text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-300"
        >
          {isSubmitting ? "Signing In..." : "Sign In"}
        </button>
      </form>

      <div className="flex items-center justify-center w-full">
        <div className="flex-grow h-px bg-gray-300"></div>
        <span className="px-4 text-sm text-gray-500">or</span>
        <div className="flex-grow h-px bg-gray-300"></div>
      </div>

      <p className="text-sm text-center text-gray-600">
        Don't have an account?{' '}
        {/* Replace Next.js Link with a standard anchor tag */}
        <a href="/sign-up" className="font-medium text-blue-600 hover:underline">
          Sign up
        </a>
      </p>
    </div>
  )
}


export default SignInForm