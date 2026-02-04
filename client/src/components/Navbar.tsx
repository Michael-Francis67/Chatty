import Logo from "./Logo";
import {ModeToggle} from "./ModeToggle";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {Avatar, AvatarFallback, AvatarImage} from "./ui/avatar";
import {useGetMeQuery, useSignOutMutation} from "@/state/services/authApi";
import {useNavigate} from "react-router";
import {toast} from "sonner";
import {Button} from "./ui/button";

export interface User {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    profilePic?: string;
    publicId?: string;
    secureUrl?: string;
}

const Navbar = () => {
    const {data: user} = useGetMeQuery();
    const [signOut] = useSignOutMutation();
    const navigate = useNavigate();

    const handleSignOut = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        try {
            await signOut().unwrap();
            toast.success("Signed out successfully");

            window.location.href = "/signin";
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    return (
        <div className="fixed top-0 left-0 right-0 w-full h-16 bg-gray-200 shadow-md backdrop-blur-xl mb-20">
            <div className="max-w-7xl mx-auto px-6 md:px-8 py-2 w-full h-full flex items-center justify-between">
                {/* Left side */}
                <Logo />

                {/* Right side */}
                <div className="flex gap-2 items-center">
                    <ModeToggle />
                    {/* user profile pic here */}
                    {user && (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant={"ghost"}
                                    className="flex items-center gap-2 rounded-full focus:outline-none outline-none p-0 bg-transparent hover:bg-transparent focus:bg-transparent"
                                >
                                    <Avatar className="w-8 h-8">
                                        <AvatarImage
                                            src={user?.profilePic || "/avatar.png"}
                                            alt={user ? `${user.firstName} ${user.lastName}` : "User Avatar"}
                                        />
                                        <AvatarFallback>{user?.email?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-fit px-4 py-2">
                                <div className="flex gap-4 justify-items-normal mb-3">
                                    <div className="w-16 h-16">
                                        <Avatar className="size-full">
                                            <AvatarImage
                                                src={user?.profilePic || "/avatar.png"}
                                                alt={user ? `${user.firstName} ${user.lastName}` : "User Avatar"}
                                            />
                                            <AvatarFallback>
                                                {user?.email?.charAt(0).toUpperCase() || "U"}
                                            </AvatarFallback>
                                        </Avatar>
                                    </div>
                                    <DropdownMenuLabel>
                                        <div className="flex flex-col space-y-1">
                                            <h3 className="text-xl font-bold">
                                                {user?.firstName} {user?.lastName}
                                            </h3>
                                            <span className="text-sm font-medium text-muted-foreground">
                                                {user?.email}
                                            </span>
                                        </div>
                                    </DropdownMenuLabel>
                                </div>
                                <DropdownMenuSeparator />

                                <DropdownMenuItem onClick={() => navigate("/profile")} className="cursor-pointer">
                                    Profile
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => navigate("/settings")} className="cursor-pointer">
                                    Settings
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <button
                                        onClick={handleSignOut}
                                        type="button"
                                        className="w-full cursor-pointer text-red-500 focus:text-red-600 flex justify-start"
                                    >
                                        Sign Out
                                    </button>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
