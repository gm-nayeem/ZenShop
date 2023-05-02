import React from 'react'
import './app.scss'
import {
  BrowserRouter as Router,
  Routes, Route, Navigate
} from 'react-router-dom';

// pages
import Home from './pages/home/Home'
import List from './pages/list/List'
import User from './pages/user/User'
import Product from './pages/product/Product'
import NewUser from './pages/newUser/NewUser'
import NewProduct from './pages/newProduct/NewProduct'
import Order from './pages/order/Order';
import Category from './pages/category/Category';
import NewCategory from './pages/newCategory/NewCategory';
import SubCategory from './pages/subCategory/SubCategory';
import NewSubCategory from './pages/newSubCategory/NewSubCategory';
import Navbar from './common/navbar/Navbar';
import Sidebar from './common/sidebar/Sidebar'
import Login from './pages/login/Login'
// import Error from "./pages/error/Error"

import { useSelector } from 'react-redux';
import {
  userColumns, productColumns, orderColumns,
  categoryColumns, subCategoryColumns
} from './datatableSource';

const App = () => {
  const admin = useSelector((state) => state.admin.currentUser?.user.isAdmin);
  const currentUser = useSelector(state => state.admin.currentUser);

  return (
    <Router>
      <Routes>
        <Route
          path='/login'
          element={(currentUser && admin) ? <Navigate to="/" replace /> : <Login />}
        />
      </Routes>
      {
        admin ? (
          <>
            <Navbar />
            <div className="container">
              <Sidebar />
              <Routes>
                <Route exact path='/' element={<Home />} />
                <Route
                  path='/users'
                  element={<List columns={userColumns} />}
                />
                <Route path='/users/:userId' element={<User />} />
                <Route
                  path='/users/new'
                  element={<NewUser />}
                />
                
                <Route
                  path='/products'
                  element={<List columns={productColumns} />}
                />
                <Route path='/products/:productId' element={<Product />} />
                <Route path='/products/new' element={<NewProduct />} />

                <Route
                  path='/orders'
                  element={<List columns={orderColumns} />}
                />
                <Route path='/orders/:orderId' element={<Order />} />

                <Route
                  path='/categories'
                  element={<List columns={categoryColumns} />}
                />
                <Route path='/categories/:categoryId' element={<Category />} />
                <Route path='/categories/new' element={<NewCategory />} />

                <Route
                  path='/subcategories'
                  element={<List columns={subCategoryColumns} />}
                />
                <Route path='/subcategories/:subCategoryId' element={<SubCategory />} />
                <Route path='/subcategories/new' element={<NewSubCategory />} />

              </Routes>
            </div>
          </>
        ) : (
          <Routes>
            <Route path='/' element={<Navigate to="/login" replace />} />
          </Routes>
        )
      }
      {/* <Routes>
        <Route
          path='*'
          element={admin ? <Error /> : <Navigate to="/login" replace />}
        />
      </Routes> */}
    </Router>
  )
}

export default App;