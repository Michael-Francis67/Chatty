import {Routes, Route} from "react-router";
import {Navigate} from "react-router";
import {useEffect} from "react";

import AuthLayout from "./components/AuthLayout";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import Navbar from "./components/Navbar";
import Loader from "./components/Loader";
import {useGetMeQuery} from "./state/services/authApi";
import HomePage from "./pages/HomePage";

function App() {
    const {data: user, isLoading} = useGetMeQuery();
    const isAuthenticated = Boolean(user);

    useEffect(() => {
        console.log("User data:", {user, isAuthenticated});
    }, [user, isAuthenticated]);

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className="w-full h-screen overflow-hidden">
            <Navbar />
            <Routes>
                <Route element={<AuthLayout />}>
                    <Route path="/signin" element={isAuthenticated ? <Navigate to={"/"} /> : <SignInPage />} />
                    <Route path="/signup" element={isAuthenticated ? <Navigate to={"/"} /> : <SignUpPage />} />
                </Route>

                <Route path="/" element={isAuthenticated ? <HomePage /> : <Navigate to={"/signin"} />} />
            </Routes>
        </div>
    );
}

export default App;
