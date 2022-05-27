import React, { useEffect } from 'react'
import { Routes, Route } from "react-router-dom";
import { useDispatch } from 'react-redux'

import PageRender from './PageRender';
import Header from './components/global/Header';
import Footer from "./components/global/Footer";

import { Alert } from './components/alert/Alert';

import { refreshToken } from "./redux/actions/authAction"
import { getCategories } from './redux/actions/categoryAction'


const App = () => {
  const dispatch = useDispatch<any>()

  useEffect(() => {
    dispatch(refreshToken())
    dispatch(getCategories())
  }, [dispatch])

  return (
    <div className='container'>
      <Alert />
      <Header />


      <Routes>
        <Route path="/" element={<PageRender />} />
        <Route path="/:page" element={<PageRender />} />
        <Route path="/:page/:slug" element={<PageRender />} />
      </Routes>

      <Footer />
    </div>
  )
}

export default App