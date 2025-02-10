import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';

import AdminLayout from './layouts/AdminLayout';
import MainLayout from './layouts/MainLayout';

import HomePage from './pages/HomePage';
import DashboardPage from './pages/admin/DashboardPage';
import AccountManagementPage from './pages/admin/AccountManagementPage';
import AccountManagementUpdatePage from './pages/admin/AccountManagementUpdatePage';
import OrderManagementPage from './pages/admin/OrderManagementPage';
import OrderUpdatePage from './pages/admin/OrderUpdatePage';
import ProductManagementPage from './pages/admin/ProductManagementPage';
import ProductCreateAndUpdatePage from './pages/admin/ProductCreateAndUpdatePage';
import SettingsPage from './pages/admin/SettingsPage';
import ItemViewPage from './pages/ItemViewPage';
import SignInPage from './pages/auth/SignInPage';
import SignUpPage from './pages/auth/SignUpPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<AdminLayout />}>
        <Route path="/admin/dashboard" element={<DashboardPage />} />
        <Route path="/admin/accounts" element={<AccountManagementPage />} />
        <Route path="/admin/accounts/:id" element={<AccountManagementUpdatePage />} />
        <Route path="/admin/orders" element={<OrderManagementPage />} />
        <Route path="/admin/orders/:id" element={<OrderUpdatePage />} />
        <Route path="/admin/products" element={<ProductManagementPage />} />
        <Route path="/admin/products/:id" element={<ProductCreateAndUpdatePage mode='update'/>} />
        <Route path="/admin/products/create" element={<ProductCreateAndUpdatePage mode='create'/>} />
        <Route path="/admin/settings" element={<SettingsPage />} />
      </Route>

      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/view/item/:id" element={<ItemViewPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Route>
    </>
  )
);

function App() {
  return <RouterProvider router={router} />
}

export default App
