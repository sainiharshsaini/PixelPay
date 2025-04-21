"use client";

import { zodResolver } from "@hookform/resolvers/zod"
import z, { signUpSchema } from "@repo/validation-schemas"
import axios from "axios";
import { useForm } from "react-hook-form"
import toast from "react-hot-toast";
import Link from "next/link";
import InputField from "./InputField";
import { useRouter } from "next/navigation";

const SignUpForm = () => {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof signUpSchema>>({ resolver: zodResolver(signUpSchema) });

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    try {
      await axios.post('/api/sign-up', data)
      // alert('User registered successfully!');
      toast.success('User registered successfully!')
      router.push('/sign-in');
    } catch (error: any) {
      const message = error.response?.data?.message || 'Something went wrong';
      // alert(message);
      toast.error(message)
      // const status = error.response?.status || 'Something went wrong'; //to get the status
      // alert(status);
    }
    // const res = await fetch('/api/sign-up', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data),
    // });

    // if (res.ok) {
    //   alert('User registered successfully!');
    // } else {
    //   const error = await res.json();
    //   alert(error.message);
    // }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto space-y-4 pt-4">
        <InputField type="text" label="Name" name="name" placeholder="Enter your name" register={register} error={errors.name}/>
        <InputField type="email" label="Email" name="email" placeholder="Enter your email" register={register} error={errors.email}/>
        <InputField type="tel" label="Phone" name="phone" placeholder="Enter your phone number" register={register} error={errors.phone}/>
        <InputField type="password" label="Password" name="password" placeholder="Enter your password" register={register} error={errors.password}/>
        <InputField type="password" label="Confirm Password" name="confirmPassword" placeholder="Re-enter your password" register={register} error={errors.confirmPassword}/>
        
        
        {/* <input type="text" placeholder='Name' {...register('name')} className="w-full border rounded p-2 outline-none border-gray-400" />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

        <input type="email" placeholder='Email' {...register('email')} className="border rounded p-2 outline-none border-gray-400" />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

        <input type="tel" placeholder='Phone' {...register('phone')} className="border rounded p-2 outline-none border-gray-400" />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}

        <input type="password" placeholder='Password' {...register('password')} className="border rounded p-2 outline-none border-gray-400" />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

        <input type="password" placeholder='Confirm Password' {...register('confirmPassword')} className="border rounded p-2 outline-none border-gray-400" />
        {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>} */}

        <button type="submit" className="w-full bg-blue-600 rounded py-2 text-white cursor-pointer hover:bg-blue-700">Sign Up</button>
      </form>
      <div className='mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400'>
        or
      </div>
      <p className='text-center text-sm text-gray-600 mt-2'>
        If you already have an account, please&nbsp;
        <Link className='text-blue-500 hover:underline' href='/sign-in'>
          Sign in
        </Link>
      </p>
    </div>
  )
}

export default SignUpForm