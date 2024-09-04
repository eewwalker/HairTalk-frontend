
'use client';
import { useState } from 'react';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { loginSchema, LoginSchema } from "@/src/lib/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import OverlayComponent from "@/src/components/OverlayComponent";

const LoginForm = () => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const router = useRouter();
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors, isValid, isSubmitting } } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: 'onTouched'
  });

  const onSubmit = async (data: LoginSchema) => {
    const result = await signIn('credentials', {
      username: data.username,
      password: data.password,
      redirect: false
    });

    if (result && !result.error) {
      router.push('/');
    } else {
      toast({
        description: "Invalid Credentials"
      });
      console.log(result?.error);
    }
  };

  const toggleOverlay = () => {
    setIsOverlayOpen(!isOverlayOpen);
  };

  return (
    <div className="relative">
      <div className={`fixed top-10 right-5 ${isOverlayOpen ? 'hidden' : ''}`}>
        <Button onClick={toggleOverlay} className="bg-inherit rounded-full hover:opacity-0"></Button>
      </div>
      {isOverlayOpen && <OverlayComponent onClose={toggleOverlay} />}

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
                    required
                    autoComplete="username"
                    {...register('username')}
                  />
                  {errors.username?.message && <p>{errors.username?.message}</p>}
                </div>
                <div className="grid gap-2 text-[#66ffec]">
                  <div className="flex items-center">
                    <Label htmlFor="password">password</Label>
                  </div>
                  <Input
                    className="text-[#0c6999]"
                    id="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    {...register('password')}
                  />
                  {errors.password?.message && <p>{errors.password?.message}</p>}
                </div>
                <Button
                  disabled={!isValid || isSubmitting}
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
    </div>
  );
};

export default LoginForm;
