import { BrowserRouter, Route } from "react-router-dom";
import { AppRoutes } from "./routes/appRoutes";
import PublicLayout from "./layouts/PublicLayout";
import RoutesWithNotFound from "./routes/RoutesWithNotFound";
import CatalogPage from "./pages/catalog/CatalogPage";
import AuthPage from "./pages/auth/AuthPage";
import CatalogItemDetail from "./pages/catalog/CatalogItemDetail";
import CartPage from "./pages/cart/CartPage";
import CheckoutPage from "./pages/checkout/CheckoutPage";
import OrdersPage from "./pages/account/OrdersPage";
import AuthGuard from "./guard/AuthGuard";
import LandingPage from "./pages/landing/LandingPage";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <RoutesWithNotFound>
                <Route path={AppRoutes.landing} element={<LandingPage />} />
                <Route path={AppRoutes.home} element={<PublicLayout />}>
                    <Route path={AppRoutes.home} element={<CatalogPage />} />
                    <Route path={AppRoutes.auth} element={<AuthPage />} />
                    <Route path={AppRoutes.bookDetail} element={<CatalogItemDetail />} />
                    <Route path={AppRoutes.cart} element={<CartPage />} />
                    <Route element={<AuthGuard />}>
                        <Route path={AppRoutes.private.checkout} element={<CheckoutPage />} />
                        <Route path={AppRoutes.private.orders} element={<OrdersPage />} />
                    </Route>
                </Route>
            </RoutesWithNotFound>
        </BrowserRouter>
    )
}