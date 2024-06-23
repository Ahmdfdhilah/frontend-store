import React from 'react';
import { AdminNavbar, CategoryProductChart, PriceProductChart, InventoryProductCharts, TotalSalesOverTimeChart, TopSellingCharts, TopCustomersByPurchaseAmount, TotalSettledOrdersCard, TransactionStatusPieChart, OrdersByCityChart, Footer } from '../../components';
import '../../css/AdminDashboard.css';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <AdminNavbar />
      <div className="admin-content pb-5 pt-5">
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <div className="card mb-4">
                <div className="card-body">
                  <h2 className="card-title">Welcome in Dashboard, Admin!</h2>
                  <p className="card-text">Manage your products, orders, and users.</p>
                  <TotalSettledOrdersCard />
                </div>
              </div>
            </div>
          </div>

          <div className="row row-cols-1 row-cols-lg-2 g-4">
            <div className="col">
              <div className="card mb-4 h-100">
                <div className="card-body d-flex flex-column">
                  <CategoryProductChart />
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card mb-4 h-100">
                <div className="card-body d-flex flex-column">
                  <OrdersByCityChart />
                </div>
              </div>
            </div>
          </div>
          <br />
          <div className="row row-cols-1 row-cols-lg-2 g-4">
            <div className="col">
              <div className="card mb-4 h-100">
                <div className="card-body d-flex flex-column">
                  <PriceProductChart />
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card mb-4 h-100">
                <div className="card-body d-flex flex-column">
                  <InventoryProductCharts />
                </div>
              </div>
            </div>
          </div>
          <br />
          <div className="row row-cols-1 row-cols-lg-2 g-4">
            <div className="col">
              <div className="card mb-4 h-100">
                <div className="card-body d-flex flex-column">
                  <TopSellingCharts />
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card mb-4 h-100">
                <div className="card-body d-flex flex-column">
                  <TotalSalesOverTimeChart />
                </div>
              </div>
            </div>
          </div>
          <br />
          <div className="row row-cols-1 row-cols-lg-2 g-4">
            <div className="col">
              <div className="card mb-4 h-100">
                <div className="card-body d-flex flex-column">
                  <TopCustomersByPurchaseAmount />
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card mb-4 h-100">
                <div className="card-body d-flex flex-column">
                  <TransactionStatusPieChart />
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