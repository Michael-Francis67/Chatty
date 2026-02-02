import Logo from "./Logo";
import {ModeToggle} from "./ModeToggle";

const Navbar = () => {
    return (
        <div className="fixed top-0 left-0 right-0 w-full h-16 bg-gray-200 shadow-md backdrop-blur-xl mb-20">
            <div className="max-w-7xl mx-auto px-6 md:px-8 py-2 w-full h-full flex items-center justify-between">
                {/* Left side */}
                <Logo />

                {/* Right side */}
                <div className="">
                    <ModeToggle />
                    {/* user profile pic here */}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
