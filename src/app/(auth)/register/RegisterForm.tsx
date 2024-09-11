"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { RegisterSchema, registerSchema } from "@/src/lib/schemas/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { createNewUser } from "@/src/lib/api";
import { useRouter } from "next/navigation";
import MapBoxAutoComplete from "@/src/components/MapboxAutoComplete";

const RegisterForm = () => {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors }, control } = useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema),
        mode: 'onTouched',
        defaultValues: {
            username: '',
            password: '',
            location: ''
        }
    });

    const onSubmit = async (data: RegisterSchema) => {
        const {username, password, location} = data;
        const resp = await createNewUser(username, password,location);
        console.log('resp', resp)
        router.push('/login');
    };

    return (
        <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-1 xl:min-h-[800px]">
            <div className="flex items-center justify-center py-12">
                <div className="mx-auto grid w-[350px] gap-6">
                    <div className="grid gap-2 text-center">
                        <h1 className="text-4xl font-bold text-[#66ffec]">create an account</h1>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid gap-4">
                            <div className="grid gap-2 text-[#66ffec]">
                                <Label htmlFor="username">username</Label>
                                <Input
                                    className="text-[#0c6999]"
                                    autoComplete="username"
                                    id="username"
                                    type="text"
                                    {...register('username')}
                                />
                                {errors.username?.message && <p>{errors.username?.message}</p>}
                            </div>
                            <div className="grid gap-2 text-[#66ffec]">
                                <div className="flex items-center">
                                    <Label htmlFor="password">password</Label>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    {...register('password')}
                                    autoComplete="new-password"
                                />
                                {errors.password?.message && <p>{errors.password?.message}</p>}
                            </div>
                            <div className="grid gap-2 text-[#66ffec]">
                                <Label htmlFor="location">location</Label>
                                <MapBoxAutoComplete
                                    control={control}
                                    name="location"
                                    className="text-[#0c6999]"
                                    // autoComplete="location"
                                    // id="location"
                                    // type="text"
                                    // {...register('location')}
                                />
                                {errors.location?.message && <p>{errors.location?.message}</p>}
                            </div>
                            <Button
                                type="submit"
                                className="w-full hover:bg-[#2584b3] hover:text-[#66ffec] rounded-full bg-[#c1f5fe] text-[#0c6999]">
                                register
                            </Button>
                        </div>
                    </form>
                    <div className="mt-4 text-center text-sm text-[#66ffec]">
                        already have an account?{" "}
                        <Link href="/login" className="text-decoration-none">
                            login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default RegisterForm;