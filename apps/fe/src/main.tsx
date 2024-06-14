import ReactDOM from "react-dom/client";
import { appLoader } from "./App.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./login/Login.tsx";
import { Main, MainPage, mainLoader } from "./main/Main.tsx";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import About from "./main/about/About.tsx";
import Php from "./main/php/Php.tsx";
import JsPage from "./main/js/JsPage.tsx";
import Calendar from "./main/calendar/Calendar.tsx";

const queryClient = new QueryClient({
    defaultOptions: { queries: { staleTime: 1000 * 10 } },
});

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
        loader: appLoader,
    },
    {
        path: "/main",
        element: <Main />,
        loader: mainLoader,
        children: [
            {
                path: "about",
                element: <About />,
            },
             {
                path: "php",
                element: <Php />,
            },
           {
                path: "calendar",
                element: <Calendar />,
            },
            {
                path: "mainpage",
                element: <MainPage />,
            },
            {
                path: "js",
                element: <JsPage />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    // <React.StrictMode>
    <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
    </QueryClientProvider>
    // </React.StrictMode>
);
