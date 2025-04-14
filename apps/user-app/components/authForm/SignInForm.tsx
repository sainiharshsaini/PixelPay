"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import z, { signInSchema } from "@repo/validation-schemas";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Link from "next/link";


const SignInForm = () => {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof signInSchema>>({resolver: zodResolver(signInSchema)});

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    const response = await signIn('credentials', {
      ...data,
      redirect: false
    })

    if (response?.ok) {
      router.refresh();
      router.push('/dashboard');
      toast.success('User signin successfully!')
    } else {
      toast.error('Invalid credentials')
    }
  }    

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto mt-10 space-y-4 p-4 border rounded-md">
        <div>
          <label htmlFor="credential">Email or Phone</label>
          <input id="credential" type="text" className="w-full border px-3 py-2 rounded" {...register('credential')} placeholder="Enter email or phone"/>
          {errors.credential && <p className="text-red-500 text-sm">{errors.credential.message}</p>}
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input type="password" className="w-full border px-3 py-2 rounded" {...register('password')} placeholder="Enter password"/>
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Sign In</button>
      </form>
      <div className='mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400'>
        or
      </div>
      <p className='text-center text-sm text-gray-600 mt-2'>
        If you don&apos;t have an account, please&nbsp;
        <Link className='text-blue-500 hover:underline' href='/sign-up'>
          Sign up
        </Link>
      </p>
    </div>
  )
}


export default SignInForm