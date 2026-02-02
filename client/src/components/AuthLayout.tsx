import {Outlet} from "react-router";
import Logo from "./Logo";

const AuthLayout = () => {
    return (
        <div className="h-full w-full flex flex-col gap-4 max-w-7xl mx-auto justify-center items-center">
            <div className="w-full px-4 md:px-0 flex flex-col gap-4 md:gap-8 items-center">
                <Logo />
                <Outlet />
            </div>
        </div>
    );
};

export default AuthLayout;
