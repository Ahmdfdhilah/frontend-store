import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUsers,
  faDollarSign,
  faShoppingCart,
  faChartBar,
  faChartPie,
  faMapMarkerAlt,
  faClipboardCheck
} from '@fortawesome/free-solid-svg-icons';
import {
  AdminNavbar,
  CategoryProductChart,
  PriceProductChart,
  InventoryProductCharts,
  TotalSalesOverTimeChart,
  TopSellingCharts,
  TopCustomersByPurchaseAmount,
  TotalSettledOrdersCard,
  TransactionStatusPieChart,
  OrdersByCityChart,
  Footer
} from '../../components';
import '../../css/AdminDashboard.css';

const AdminDashboard = () => {
  return (
    <div className="custom-admin-dashboard">
      <AdminNavbar />
      <div className="custom-admin-content pb-5 pt-5">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="card mb-4 custom-welcome-card">
                <div className="card-body">
                  <h1 className="h3 mb-3 text-white"><strong><FontAwesomeIcon icon={faChartBar} className="me-2" /> Analytics</strong> Dashboard</h1>
                  <h2 className="card-title">Welcome to the Analytics Dashboard, Admin!</h2>
                  <p className="card-text">Manage your products, orders, and users.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="row g-4">
            <div className="col-md-8">
              <div className="card mb-4 custom-large-card h-100">
                <div className="card-body d-flex flex-column align-items-center justify-content-center">
                  <OrdersByCityChart />
                  <div className="mt-3">
                    <p className="text-center mb-0"><FontAwesomeIcon icon={faMapMarkerAlt} className="align-middle me-1" /> Orders by City</p>
                    <h4 className="text-center mb-1">Count Customer Based on City</h4>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card mb-4 custom-small-card h-100">
                <div className="card-body d-flex flex-column align-items-center justify-content-center">
                  <CategoryProductChart />
                </div>
              </div>
            </div>
          </div>
          <br />
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card mb-4 custom-medium-card h-100">
                <div className="card-body d-flex flex-column align-items-center justify-content-center">
                  <InventoryProductCharts />
                  <div className="mt-3">
                    <p className="text-center mb-0"><FontAwesomeIcon icon={faShoppingCart} className="align-middle me-1" /> Inventory</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <div className="card mb-4 custom-large-card h-100">
                <div className="card-body d-flex flex-column align-items-center justify-content-center">
                  <PriceProductChart />
                </div>
              </div>
            </div>
          </div>
          <br />
          <div className="row g-4">
            <div className="col-md-8">
              <div className="card mb-4 custom-large-card h-100">
                <div className="card-body d-flex flex-column align-items-center justify-content-center">
                  <TotalSalesOverTimeChart />
                  <div className="mt-3">
                    <p className="text-center mb-0"><FontAwesomeIcon icon={faChartBar} className="align-middle me-1" /> Total Sales</p>
                    <h4 className="text-center mb-1">Current Month</h4>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card mb-4 custom-medium-card h-100">
                <div className="card-body d-flex flex-column align-items-center justify-content-center">
                  <div className="mt-3">
                    <p className="text-center mb-0"><FontAwesomeIcon icon={faDollarSign} className="align-middle me-1" /> Revenue</p>
                    <h4 className="text-center mb-1">From Total Orders Success</h4>
                    <p className="text-center mb-0 text-success">Rp.  < TotalSettledOrdersCard /></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />
          <div className="row g-4">
            <div className="col-lg-12">
              <div className="card mb-4 custom-large-card h-100">
                <div className="card-body d-flex flex-column align-items-center justify-content-center">
                  <div className="mt-3">
                    <p className="text-center mb-0"><FontAwesomeIcon icon={faClipboardCheck} className="align-middle me-1" /> Top Selling</p>
                  </div>
                  <TopSellingCharts />
                </div>
              </div>
            </div>
          </div>
          <br />
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card mb-4 custom-medium-card h-100">
                <div className="card-body d-flex flex-column align-items-center justify-content-center">
                  <TransactionStatusPieChart />
                  <div className="mt-3">
                    <p className="text-center mb-0"><FontAwesomeIcon icon={faChartPie} className="align-middle me-1" /> Transactions</p>
                    <h4 className="text-center mb-1">Completed</h4>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <div className="card mb-4 custom-large-card h-100">
                <div className="card-body d-flex flex-column align-items-center justify-content-center">
                  <TopCustomersByPurchaseAmount />
                  <div className="mt-3">
                    <p className="text-center mb-0"><FontAwesomeIcon icon={faUsers} className="align-middle me-1" /> Top Customers</p>
                    <h4 className="text-center mb-1">Customers</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;