"use client";
import { supabase } from '@/app/lib/supabase';
import { Box, Button, Container, Typography, TextField } from '@mui/material';
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

export default function Login() {
    const router = useRouter();

    type FormValues = {
        email: string
        password: string
      }

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>();

    const onSubmit: SubmitHandler<FormValues> = async (formData) => {
        try {
            let { data, error } = await supabase
                .auth
                .signInWithPassword({
                    email: formData.email,
                    password: formData.password
                });

            if (data) {
                router.refresh();
            }

        } catch (error) {
            console.log(error)
        }
    };

    return (
        <Container className="flex flex-col justify-center items-center p-12">
            <Box className="flex flex-col w-full gap-4 p-6 rounded-xl shadow-2xl bg-gray-800 border border-gray-700">
                <Typography variant="h2">Log in</Typography>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full gap-4">
                    <TextField
                        id="email"
                        label="Email"
                        variant="outlined"
                        {...register("email", { required: true })}
                    />
                    {errors.email && <span>This field is required</span>}
                    <TextField
                        id="password"
                        type="password"
                        label="Password"
                        variant="outlined"
                        {...register("password", { required: true })}
                    />
                    {errors.password && <span>This field is required</span>}
                    <Button
                        type="submit"
                        variant="outlined"
                        size="large"
                        className="w-full rounded-full"
                    >
                        Sign in
                    </Button>
                </form>
            </Box>
        </Container>
    )
};

interface FormValues {
    loginEmail: string;
    loginPassword: string;
}
