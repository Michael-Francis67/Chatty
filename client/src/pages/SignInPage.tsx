import SignInForm from "@/components/SignInForm";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Link} from "react-router";
const SignInPage = () => {
    return (
        <div className="w-full h-full flex justify-center items-center">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Login in to your account</CardTitle>
                    <CardDescription>Enter your email and password below to login to your account</CardDescription>
                </CardHeader>
                <CardContent>
                    <SignInForm />
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <div className="text-sm text-muted-foreground">
                        Don't have an account?{" "}
                        <Link to="/signup" className="text-primary underline-offset-4 hover:underline">
                            Sign Up
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
};

export default SignInPage;
