import React from "react"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from "../screens/Home"
import Login from "../screens/Login"
import Orders from "../screens/Orders"
import Products from "../screens/Products"
import Auth from '../Auth'

const Router = () => {
    return(
        <BrowserRouter>
            <Routes >
            <Route path='/login' element={<Login />} />
                <Route element={<Auth />}>
                    <Route path='/products' element={<Products />} />
                    <Route path='/orders' element={<Orders />} />
                    <Route path='/' element={<Home />} />
                </Route>
            </Routes>
        </BrowserRouter>
    ) 
}

export default Router