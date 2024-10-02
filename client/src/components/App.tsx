import {Route, Routes} from "react-router-dom";
import React, {useEffect} from "react";
import {Toaster} from "react-hot-toast";
import {DevTools} from "jotai-devtools";
import {useAtom} from "jotai";
import {ThemeAtom} from "../atoms/ThemeAtom.tsx";
import Home from "./Home.tsx";
import CustomerPage from "./CustomerPage.tsx";
import CustomerHeader from "./CustomerHeader.tsx";
import CheckoutPage from "./CheckoutPage.tsx";
import OrderHistoryPage from "./OrderHistoryPage.tsx";
import Footer from "./Footer.tsx";


const App = () => {
    const [theme, setTheme] = useAtom(ThemeAtom);

    useEffect(() => {
        localStorage.setItem('theme', theme);
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    return (
        <div className="flex flex-col min-h-screen"> {/* Ensures the full viewport height */}
            <Toaster position={"bottom-center"} />
            <div className="flex-grow"> {/* Takes up remaining space */}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/papers" element={
                        <>
                            <CustomerHeader />
                            <CustomerPage />
                        </>
                    } />
                    <Route path="/checkout" element={
                        <>
                            <CustomerHeader />
                            <CheckoutPage />
                        </>
                    } />
                    <Route path="/order-history" element={
                        <>
                            <CustomerHeader />
                            <OrderHistoryPage />
                        </>
                    } />
                </Routes>
            </div>
            <Footer /> {/* Footer stays at the bottom */}
            <DevTools />
        </div>
    );
};

export default App;