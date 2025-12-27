import { BrowserRouter, Route } from "react-router-dom";
import { AppRoutes } from "./routes/appRoutes";
import PublicLayout from "./layouts/PublicLayout";
import RoutesWithNotFound from "./routes/RoutesWithNotFound";
import CatalogPage from "./pages/catalog/CatalogPage";
import AuthPage from "./pages/auth/AuthPage";
import CatalogItemDetail from "./pages/catalog/CatalogItemDetail";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <RoutesWithNotFound>
                <Route path={AppRoutes.home} element={<PublicLayout />}>
                    <Route path={AppRoutes.home} element={<CatalogPage />} />
                    <Route path={AppRoutes.auth} element={<AuthPage />} />
                    <Route path={AppRoutes.bookDetail} element={<CatalogItemDetail />} />
                </Route>
            </RoutesWithNotFound>
        </BrowserRouter>
    )
}