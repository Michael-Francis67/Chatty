import {Routes, Route} from "react-router";
import AuthLayout from "./components/AuthLayout";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import Navbar from "./components/Navbar";
import Loader from "./components/Loader";

// import ErrorBanner from "./components/ErrorBanner";
import {Navigate, redirect} from "react-router";
import {useEffect} from "react";
import {useGetMeQuery} from "./state/services/authApi";

function App() {
    const {data: user, isLoading} = useGetMeQuery();

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

    console.log("App mounted", user);

    // if (isError) {
    //     return (
    //         <ErrorBanner message="Sorry, something went wrong while validating your session, Please try again later. Thank you." />
    //     );
    // }

    return (
        <div className="w-full h-screen overflow-hidden">
            <Navbar />
            <Routes>
                <Route element={<AuthLayout />}>
                    <Route path="/signin" element={<SignInPage />} />
                    <Route path="/signup" element={<SignUpPage />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
