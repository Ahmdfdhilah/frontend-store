import React from 'react';
import ReactDOM from 'react-dom/client';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { AuthProvider } from './AuthContext';
import { Home, Product, Products, AboutPage, Cart, Login, TermsConditions, Register, Checkout, UpdateUserAddress, CreateUserAddress, PageNotFound, Profile, FAQSection, CreateUserDetails, UpdateUserDetails, Orders, OrderReceipt, CreateReviews,  UpdateReviews } from "./pages";
import PrivateRoute from './PrivateRoute';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/user/details" element={<PrivateRoute Component={Profile} />} />
            <Route path="/user/details/create" element={<PrivateRoute Component={CreateUserDetails} />} />
            <Route path="/user/details/update" element={<PrivateRoute Component={UpdateUserDetails} />} />
            <Route path="/user/address/create" element={<PrivateRoute Component={CreateUserAddress} />} />
            <Route path="/user/address/update" element={<PrivateRoute Component={UpdateUserAddress} />} />
            <Route path="/product" element={<Products />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/checkout" element={<PrivateRoute Component={Checkout} />} />
            <Route path="/cart" element={<PrivateRoute Component={Cart} />} />
            <Route path="/orders" element={<PrivateRoute Component={Orders} />} />
            <Route path="/orders/:orderId" element={<PrivateRoute Component={OrderReceipt} />} />
            <Route path="/orders/:orderId/reviews/:productId/orderItem/:orderItemId" element={<PrivateRoute Component={CreateReviews} />} />
            <Route path="/orders/:orderId/reviews/:productId/orderItem/:orderItemId/update/:reviewId" element={<PrivateRoute Component={UpdateReviews} />} />
            <Route path="/terms-conditions" element={<TermsConditions />} />
            <Route path="/faq" element={<FAQSection/>} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </AuthProvider>
);
