import React from 'react';
import ReactDOM from 'react-dom/client';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { AuthProvider } from './AuthContext';
import { Home, Product, Products, AboutPage, ContactPage, Cart, Login, TermsConditions, Register, Checkout, UpdateUserAddress, CreateUserAddress, PageNotFound, ShowUserDetails, CreateUserDetails, UpdateUserDetails } from "./pages";
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
            <Route path="/user/details" element={<ShowUserDetails />} />
            <Route path="/user/details/create" element={<CreateUserDetails />} />
            <Route path="/user/details/update" element={<UpdateUserDetails />} />
            <Route path="/user/address/create" element={<CreateUserAddress />} />
            <Route path="/user/address/update" element={<UpdateUserAddress />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/terms-conditions" element={<TermsConditions />} />
            {/* <Route path="/cart" element={<Cart />} /> */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/product" element={<Products />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/checkout" element={<PrivateRoute Component={Checkout} />} />
            <Route path="/cart" element={<PrivateRoute Component={Cart} />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </AuthProvider>
);
