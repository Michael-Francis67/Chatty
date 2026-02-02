import SignUpForm from "@/components/SignUpForm";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Link} from "react-router";

const SignUpPage = () => {
    return (
        <div className="w-full h-full flex justify-center items-center">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Create a new account</CardTitle>
                    <CardDescription>Enter your details below to create a new account</CardDescription>
                </CardHeader>
                <CardContent>
                    <SignUpForm />
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <div className="text-sm text-muted-foreground">
                        Already have an account?{" "}
                        <Link to="/auth/signin" className="text-primary underline-offset-4 hover:underline">
                            Sign In
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
};

export default SignUpPage;
