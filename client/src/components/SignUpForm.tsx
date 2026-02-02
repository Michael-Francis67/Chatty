import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import * as z from "zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";

import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {redirect} from "react-router";
import {useSignupMutation} from "@/state/api";
import Loader from "./Loader";
import {toast} from "sonner";

const formSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().min(1, "Email is required").email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});

export interface formSchemaType {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

const SignUpForm = () => {
    const [signup, {isLoading}] = useSignupMutation();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
        },
    });

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        try {
            console.log("Form submitted:", data);

            signup(data);
            form.reset();

            toast.success("Account created successfully");
            redirect("/");
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "An error occurred");

            console.error("Signup error:", error);
        }
    };

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-sm">
                    {/* FIRST NAME */}
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>First Name</FormLabel>

                                <FormControl>
                                    <Input placeholder="John" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* LAST NAME */}
                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Last Name</FormLabel>

                                <FormControl>
                                    <Input placeholder="Doe" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

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
                                <FormLabel>Password</FormLabel>

                                <FormControl>
                                    <Input type="password" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="w-full">
                        {isLoading ? <Loader /> : "Sign Up"}
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default SignUpForm;
