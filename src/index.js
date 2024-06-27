import React from 'react';
import ReactDOM from 'react-dom/client';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { AuthProvider } from './AuthContext';
import UserPrivateRoute from './UserPrivateRoute';
import AdminPrivateRoute from './AdminPrivateRoute';
import { UserAboutPage, UserCart, UserCheckout, UserCreateReviews, UserCreateUserAddress, UserCreateUserDetails, UserFAQSection, UserHome, UserOrderReceipt, UserOrders, UserProduct, UserProducts, UserProfile, UserTermsConditions, UserUpdateReviews, UserUpdateUserAddress, UserUpdateUserDetails } from './pages/client';
import { Login, PageNotFound, Register } from './pages';
import { AdminDashboard, CreateProduct, EditDiscounts, EditSpecs, ProductList, UpdateProduct } from './pages/admin';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Routes>
            <Route path="/" element={<UserHome />} />
            <Route path="/about" element={<UserAboutPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/user/details" element={<UserPrivateRoute Component={UserProfile} />} />
            <Route path="/user/details/create" element={<UserPrivateRoute Component={UserCreateUserDetails} />} />
            <Route path="/user/details/update" element={<UserPrivateRoute Component={UserUpdateUserDetails} />} />
            <Route path="/user/address/create" element={<UserPrivateRoute Component={UserCreateUserAddress} />} />
            <Route path="/user/address/update" element={<UserPrivateRoute Component={UserUpdateUserAddress} />} />
            <Route path="/product" element={<UserProducts />} />
            <Route path="/product/:id" element={<UserProduct />} />
            <Route path="/checkout" element={<UserPrivateRoute Component={UserCheckout} />} />
            <Route path="/cart" element={<UserPrivateRoute Component={UserCart} />} />
            <Route path="/orders" element={<UserPrivateRoute Component={UserOrders} />} />
            <Route path="/orders/:orderId" element={<UserPrivateRoute Component={UserOrderReceipt} />} />
            <Route path="/orders/:orderId/reviews/:productId/orderItem/:orderItemId" element={<UserPrivateRoute Component={UserCreateReviews} />} />
            <Route path="/orders/:orderId/reviews/:productId/orderItem/:orderItemId/update/:reviewId" element={<UserPrivateRoute Component={UserUpdateReviews} />} />
            <Route path="/terms-conditions" element={<UserTermsConditions />} />
            <Route path="/faq" element={<UserFAQSection/>} />
            <Route path="/admin" element={<AdminPrivateRoute Component={AdminDashboard} />} />
            <Route path="/admin/products/show-products" element={<AdminPrivateRoute Component={ProductList} />} />
            <Route path="/admin/products/update-product/:id" element={<AdminPrivateRoute Component={UpdateProduct} />} />
            <Route path="/admin/products/:id/edit-specs/:category" element={<AdminPrivateRoute Component={EditSpecs} />} />
            <Route path="/admin/products/:id/edit-discounts" element={<AdminPrivateRoute Component={EditDiscounts} />} />
            <Route path="/admin/products/create" element={<AdminPrivateRoute Component={CreateProduct} />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </AuthProvider>
);
