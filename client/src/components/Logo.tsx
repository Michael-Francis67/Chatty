import {MessageSquareMoreIcon} from "lucide-react";
import {Link} from "react-router";

const Logo = () => {
    return (
        <div>
            <Link to={"/"} className="flex items-center gap-2">
                <MessageSquareMoreIcon className="size-8 text-green-500" />
                <span className="text-2xl font-bold text-green-500">Chatty</span>
            </Link>
        </div>
    );
};

export default Logo;
