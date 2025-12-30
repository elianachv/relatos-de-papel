import AppRouter from "./AppRouter";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { ReviewsProvider } from "./context/ReviewsContext";

function AppHookContainer() {
    return (
        <AuthProvider>
            <CartProvider>
                <ReviewsProvider>
                    <AppRouter />
                </ReviewsProvider>
            </CartProvider>
        </AuthProvider>
    )
}

export default AppHookContainer;