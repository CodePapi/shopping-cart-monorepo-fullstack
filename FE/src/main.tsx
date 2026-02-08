import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router';
import App from './App';
import { AuthProvider, CartProvider } from './context';
import {
  AdminDashboard,
  CartPage,
  CreateProductForm,
  LoginPage,
  NotFound,
  OrderConfirmationPage,
  RegisterPage,
  ShopPage,
} from './pages';
import { RequireAdmin } from './components';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <ShopPage />,
      },


      {
        path: 'admin',
        element: (
          <RequireAdmin>
            <AdminDashboard />
          </RequireAdmin>
        ),
      },
      {
        path: 'admin/new',
        element: (
          <RequireAdmin>
            <CreateProductForm />
          </RequireAdmin>
        ),
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },

      {
        path: 'orders/:orderId',
        element: <OrderConfirmationPage />,
      },
      {
        path: 'cart',
        element: <CartPage />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </AuthProvider>
  </StrictMode>,
);
