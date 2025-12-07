// App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import PrivateRoute from "./routes/PrivateRoute.jsx";
import DashboardLayout from "./layouts/DashboardLayout.jsx";
import Login from "./pages/auth/Login.jsx";
import {
  DashboardOverview,
  CategoriesPage,
  SubCategoriesPage,
  BrandsPage,
  ProductsPage,
  OrdersPage,
  ReviewsPage,
  CouponsPage,
  NotificationsPage,
  DeliveryPage,
  DriversPage,
  SettingsPage,
} from "./pages";

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Login Page */}
        <Route path="/login" element={<Login />} />

        {/* Protected Dashboard Routes */}
        <Route element={<PrivateRoute />}>
          <Route element={<DashboardLayout />}>
            <Route index element={<DashboardOverview />} />
            <Route path="categories" element={<CategoriesPage />} />
            <Route path="sub-categories" element={<SubCategoriesPage />} />
            <Route path="brands" element={<BrandsPage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="reviews" element={<ReviewsPage />} />
            <Route path="coupons" element={<CouponsPage />} />
            <Route path="notifications" element={<NotificationsPage />} />
            <Route path="delivery" element={<DeliveryPage />} />
            <Route path="drivers" element={<DriversPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
