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
import Topbar from './common/topbar/Topbar'
import Sidebar from './common/sidebar/Sidebar'
import Login from './pages/login/Login'
import Error from "./pages/error/Error"

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
            <Topbar />
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
                <Route
                  path='/categories'
                  element={<List columns={categoryColumns} />}
                />
                <Route
                  path='/subcategories'
                  element={<List columns={subCategoryColumns} />}
                />
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