import React from "react"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from "../screens/Home"
import Login from "../screens/Login"
import Orders from "../screens/Orders"
import Products from "../screens/Products"

const Router = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/products' element={<Products />} />
                <Route path='/orders' element={<Orders />} />
            </Routes>
        </BrowserRouter>
    ) 
}

export default Router