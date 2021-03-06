import React from "react"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from "../screens/Home"
import Login from "../screens/Login"
import Orders from "../features/Orders"
import Products from "../features/BaseProduct/index"
import Region from "../features/Region/index"
import Category from '../features/Category/index'
import Auth from '../Auth'
import Vendor from '../features/Vendor/index'
import Product from '../features/product/index'

const Router = () => {
    return(
            <Routes >
            <Route path='/login' element={<Login />} />
                <Route element={<Auth />}>
                    <Route path='/category' element={<Category />} />
                    <Route path='/vendor' element={<Vendor />} />
                    <Route path='/product' element={<Product />} />
                    <Route path='/baseproducts' element={<Products />} />
                    <Route path='/region' element={<Region />} />
                    <Route path='/orders' element={<Orders />} />
                    <Route path='/' element={<Home />} />
                </Route>
            </Routes>
    ) 
}

export default Router