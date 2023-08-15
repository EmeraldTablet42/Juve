import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../contentPage/homePage/homePage'
import Salad from '../contentPage/categorypage/salad'
import Sand from '../contentPage/categorypage/sand'
import Juice from '../contentPage/categorypage/juice'
import Join from '../contentPage/categorypage/join'
import Loginbutton from '../contentPage/categorypage/loginbutton'

const PageContentAreaRoutes = () => {
  return (
    <>
    <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/salad' element={<Salad />} />
            <Route path='/sand' element={<Sand />} />
            <Route path='/juice' element={<Juice />} />
            <Route path='/join' element={<Join />} />
            <Route path='/loginbutton' element={<Loginbutton />} />
        </Routes>
    </>
  )
}

export default PageContentAreaRoutes