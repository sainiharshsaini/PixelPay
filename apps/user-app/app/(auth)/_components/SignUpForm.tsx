"use client";

import { zodResolver } from "@hookform/resolvers/zod"
import { SignUpSchema, SignUpSchemaType } from "@repo/validation-schemas"
import axios from "axios";
import { useForm } from "react-hook-form"
import toast from "react-hot-toast";
import InputField from "./InputField";
import { useState } from "react";

const formFields: {
  name: keyof SignUpSchemaType;
  label: string;
  type: string;
  placeholder: string;
  autoComplete?: string;
}[] = [
    { name: "name", label: "Full Name", type: "text", placeholder: "Enter your full name", autoComplete: "name" },
    { name: "email", label: "Email Address", type: "email", placeholder: "Enter your email", autoComplete: "email" },
    { name: "number", label: "Phone Number", type: "tel", placeholder: "Enter your phone number", autoComplete: "tel" },
    { name: "password", label: "Password", type: "password", placeholder: "Enter a strong password", autoComplete: "new-password" },
    { name: "confirmPassword", label: "Confirm Password", type: "password", placeholder: "Re-enter your password", autoComplete: "new-password" },
  ];

const SignUpForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpSchema)
  });

  const onSubmit = async (data: SignUpSchemaType) => {
    setIsSubmitting(true);
    const toastId = toast.loading('Creating your account...');

    try {
      await axios.post('/api/register', data)
      toast.success('User registered successfully!', { id: toastId });
      window.location.href = '/sign-in'
    } catch (error: any) {
      let errorMessage = 'An unexpected error occurred. Please try again.';
      if (axios.isAxiosError(error) && error.response) {
        errorMessage = error.response.data.message || 'Registration failed.';
      }

      toast.error(errorMessage, { id: toastId });
      console.error("Sign-up error:", error);
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full max-w-md p-8 mx-auto space-y-6 bg-white rounded-lg shadow-md">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800">
          Create an Account
        </h1>
        <p className="mt-2 text-gray-600">
          Get started with our service today!
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
        ))

        }

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Signing Up...' : 'Sign Up'}
        </button>
      </form>

      <div className="flex items-center justify-center w-full">
        <div className="flex-grow h-px bg-gray-300"></div>
        <span className="px-4 text-sm text-gray-500">
          or
        </span>
        <div className="flex-grow h-px bg-gray-300"></div>
      </div>

      <p className="mt-2 text-sm text-center text-gray-600">
        Already have an account?{' '}
        <a href="/sign-in" className="font-medium text-blue-600 hover:underline">
          Sign In
        </a>
      </p>
    </div>
  )
}

export default SignUpForm