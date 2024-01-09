import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Alert, Button, FormControl, FormHelperText, Input, Snackbar, TextField } from "@mui/material";

import { cn } from "@/app/lib/utils";
import { signUpWithEmailAndPassword } from "../actions";
import React from "react";

const FormSchema = z
    .object({
        email: z.string().email(),
        password: z.string().min(6, {
            message: "Password is required.",
        }),
        confirm: z.string().min(6, {
            message: "Password is required.",
        }),
    })
    .refine((data) => data.confirm === data.password, {
        message: "Password did not match",
        path: ["confirm"],
    });
export default function RegisterForm() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
            password: "",
            confirm: "",
        },
    });

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        const [snackbarOpen, setSnackbarOpen] = React.useState(false);
        const [errorAlertOpen, setErrorAlertOpen] = React.useState(false);
        const [successAlertOpen, setSuccessAlertOpen] = React.useState(false);

        const result = await signUpWithEmailAndPassword(data);
        const { error } = JSON.parse(result);

        function handleSnackbarClose() {
            setSnackbarOpen(!snackbarOpen);
        };

        function handleErrorAlertClose() {
            setErrorAlertOpen(!errorAlertOpen);
        };

        function handleSuccessAlertClose() {
            setSuccessAlertOpen(!successAlertOpen);
        };

        if (error?.message) {
            return (
                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={6000}
                    onClose={handleSnackbarClose}
                >
                    <Alert
                        onClose={handleErrorAlertClose}
                        severity="error"
                        sx={{ width: '100%' }}
                    >
                        {error.message}
                    </Alert>
                </Snackbar>
            );
        } else {
            return (
                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={6000}
                    onClose={handleSnackbarClose}
                >
                    <Alert
                        onClose={handleSuccessAlertClose}
                        severity="success"
                        sx={{ width: '100%' }}
                    >
                        "Registered successfully!"
                    </Alert>
                </Snackbar>
            );
        }
    }

    return (
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
        >
            <FormControl>
                <TextField
                    label="Email"
                    placeholder="example@gmail.com"
                    {...form.register("email")}
                    type="email"
                />
                <FormHelperText>{form.formState.errors.email?.message}</FormHelperText>
            </FormControl>
            <FormControl>
                <TextField
                    label="Password"
                    placeholder="password"
                    {...form.register("password")}
                    type="password"
                />
                <FormHelperText>{form.formState.errors.password?.message}</FormHelperText>
            </FormControl>
            <FormControl>
                <TextField
                    label="Confirm Password"
                    placeholder="Confirm Password"
                    {...form.register("confirm")}
                    type="password"
                />
                <FormHelperText>{form.formState.errors.confirm?.message}</FormHelperText>
            </FormControl>
            <Button type="submit" className="w-full flex gap-2">
                Register
                <AiOutlineLoading3Quarters className={cn("animate-spin")} />
            </Button>
        </form>
    );
}
