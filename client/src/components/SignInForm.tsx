import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import * as z from "zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";

import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Link} from "react-router";
import {toast} from "sonner";
import {useSignInMutation} from "@/state/services/authApi";
import Loader from "./Loader";

const formSchema = z.object({
    email: z.string().min(1, "Email is required").email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});

const SignInForm = () => {
    const [signin, {error: errorMessage, isLoading}] = useSignInMutation();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        try {
            console.log("Form submitted:", data);

            await signin(data)
            .unwrap()
            .then((user) => {
                console.log("Signin successful:", user);
            });

            form.reset();
            toast.success("Signed in successfully");

            window.location.href = "/";
        } catch (error) {
            const message = errorMessage && typeof errorMessage === "string" ? errorMessage : "An error occurred";
            toast.error(message);

            console.error("Signin error:", error);
            console.log("Error details:", errorMessage);
        }
    };

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-sm">
                    {/* EMAIL */}
                    <FormField
                        control={form.control}
                        name="email"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>

                                <FormControl>
                                    <Input placeholder="email@example.com" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* PASSWORD */}
                    <FormField
                        control={form.control}
                        name="password"
                        render={({field}) => (
                            <FormItem>
                                <div className="flex items-center w-full justify-between">
                                    <FormLabel>Password</FormLabel>
                                    <Link
                                        to="/auth/forgot-password"
                                        className="text-sm text-primary underline-offset-4 hover:underline"
                                    >
                                        Forgot Password?
                                    </Link>
                                </div>

                                <FormControl>
                                    <Input type="password" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="w-full">
                        {isLoading ? <Loader /> : "Sign In"}
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default SignInForm;
