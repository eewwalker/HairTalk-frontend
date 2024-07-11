'use client';
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form";
import { loginSchema, LoginSchema } from "@/src/lib/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";


const LoginForm = () => {
  const {register, handleSubmit, formState: {errors, isValid}} = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: 'onTouched'
  });

  const onSubmit = (data:LoginSchema) => {
    console.log(data)
  }

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-1 xl:min-h-[800px]">
    <div className="flex items-center justify-center py-12">
      <div className="mx-auto grid w-[350px] gap-6">
        <div className="grid gap-2 text-center">
          <h1 className="text-5xl font-bold text-[#66ffec]">login</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <div className="grid gap-2 text-[#66ffec]">
            <Label htmlFor="username">username</Label>
            <Input
              className="text-[#0c6999]"
              id="username"
              type="text"
              required
              autoComplete="username"
              {...register('username')}
              />
              {errors.username?.message && <p>{errors.username?.message}</p>}
          </div>
          <input type="hidden" {...register('username')} name="username" value="preKnownUsername"/>
          <div className="grid gap-2 text-[#66ffec]">
            <div className="flex items-center">
              <Label htmlFor="password">password</Label>
            </div>
            <Input
              className="text-[#0c6999]"
              id="password"
              type="password"
              required
              {...register('password')}
              autoComplete="current-password"
              />
              {errors.password?.message && <p>{errors.password?.message}</p>}
          </div>
          <Button
            disabled={!isValid}
            type="submit"
            className="w-full hover:bg-[#2584b3] hover:text-[#66ffec] rounded-full bg-[#c1f5fe] text-[#0c6999]">
            login
          </Button>
        </div>
        </form>
        <div className="mt-4 text-center text-sm text-[#66ffec]">
          don&apos;t have an account?{" "}
          <Link href="/register" className="text-decoration-none">
            register
          </Link>
        </div>
      </div>
    </div>
  </div>
  )
}
export default LoginForm