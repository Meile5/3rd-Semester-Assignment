import {Route, Routes, useLocation} from "react-router-dom";
import React, {useEffect} from "react";
import {Toaster} from "react-hot-toast";
import {DevTools} from "jotai-devtools";
import {useAtom} from "jotai";
import {ThemeAtom} from "../atoms/ThemeAtom.tsx";
import Home from "./Home.tsx";
import CustomerPage from "../CustomerComponents/CustomerPage.tsx";
import CustomerHeader from "../CustomerComponents/CustomerHeader.tsx";
import CheckoutPage from "../CustomerComponents/CheckoutPage.tsx";
import OrderHistoryPage from "../CustomerComponents/OrderHistoryPage.tsx";
import Footer from "./Footer.tsx";
import AdminHeader from "../adminComponents/AdminHeader.tsx";
import AdminPage from "../adminComponents/AdminPage.tsx";
import OrderHistoryAdmin from "../adminComponents/OrderHistoryAdmin.tsx";
import CreatePaperModal from "../adminComponents/CreatePaperModal.tsx";


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
                    <Route path="/admin" element={
                        <>
                            <AdminHeader/>
                            <AdminPage />
                        </>
                    } />
                    <Route path="/adminHistory" element={
                        <>
                            <AdminHeader/>
                            <OrderHistoryAdmin />
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