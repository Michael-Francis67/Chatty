import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import {BrowserRouter} from "react-router";
import {ThemeProvider} from "./components/theme-Provider.tsx";
import {Provider} from "react-redux";
import store from "./state/index.ts";
import {Toaster} from "sonner";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
            <Provider store={store}>
                <BrowserRouter>
                    <App />
                    <Toaster />
                </BrowserRouter>
            </Provider>
        </ThemeProvider>
    </StrictMode>
);
