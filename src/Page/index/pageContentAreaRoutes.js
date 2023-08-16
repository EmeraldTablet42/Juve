import React from 'react'
import { Route, Routes } from "react-router-dom";
import Join from "../contentPage/categorypage/join";
import Juice from "../contentPage/categorypage/juice";
import Loginbutton from "../contentPage/categorypage/loginbutton";
import Salad from "../contentPage/categorypage/salad";
import Sand from "../contentPage/categorypage/sand";
import HomePage from "../contentPage/homePage/homePage";

const PageContentAreaRoutes = () => {
  return (
    <div>
    <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/salad' element={<Salad />} />
            <Route path='/sand' element={<Sand />} />
            <Route path='/juice' element={<Juice />} />
            <Route path='/join' element={<Join />} />
            <Route path='/loginbutton' element={<Loginbutton />} />
        </Routes>
    </div>
  )
}

export default PageContentAreaRoutes