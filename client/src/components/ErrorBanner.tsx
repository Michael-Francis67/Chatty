import {Alert, AlertTitle, AlertDescription} from "@/components/ui/alert";
import {AlertCircle} from "lucide-react";

function ErrorBanner({message}: {message: string}) {
    return (
        <Alert variant="destructive" className="fixed top-0 left-0 right-0 z-50 rounded-none">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
        </Alert>
    );
}

export default ErrorBanner;
