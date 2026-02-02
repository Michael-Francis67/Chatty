import {Routes, Route} from "react-router";
import AuthLayout from "./components/AuthLayout";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import Navbar from "./components/Navbar";
import {useCheckAuthQuery} from "./state/api";
import Loader from "./components/Loader";
import ErrorBanner from "./components/ErrorBanner";
import {Navigate, redirect} from "react-router";
import {useEffect} from "react";
import HomePage from "./pages/HomePage";

function App() {
    const {data: user, isLoading, isError} = useCheckAuthQuery({});

    useEffect(() => {
        document.title = "Chatty - Connect and Chat Seamlessly";
    }, []);

    if (isLoading) {
        return <Loader />;
    }

    if (user) {
        return redirect("/");
    } else {
        redirect("/auth/signin");
    }

    // if (isError) {
    //     return (
    //         <ErrorBanner message="Sorry, something went wrong while validating your session, Please try again later. Thank you." />
    //     );
    // }

    return (
        <div className="w-full h-screen overflow-hidden">
            <div className="w-full h-full overflow-auto">
                <Navbar />
                <Routes>
                    <Route element={<AuthLayout />}>
                        <Route path="/auth/signin" element={user ? <Navigate to="/" /> : <SignInPage />} />
                        <Route path="/auth/signup" element={user ? <Navigate to="/" /> : <SignUpPage />} />
                    </Route>

                    <Route index element={<HomePage />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
