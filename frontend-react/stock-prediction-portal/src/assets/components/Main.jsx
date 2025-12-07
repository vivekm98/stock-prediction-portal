import React from 'react'
import Button from './Button'
import Header from './Header'
import Footer from './Footer'

const Main = () => {
  return (
    <>
   
     <div className="container">
      <div className='p-5 text-center bg-light-dark rounded'>
        <h1 className='text-light'> Stock Prediction Portal</h1>
        <p className='text-light lead'>Stock Market Prediction Portal provides users with data-driven insights to help make smarter investment decisions. By analyzing historical market data, trends, and financial indicators, the system predicts potential stock movements with improved accuracy. The platform combines advanced machine learning algorithms and real-time market updates to deliver actionable forecasts and intuitive visualizations. Whether you're a beginner exploring the market or an experienced trader, this portal offers valuable tools to support informed and strategic trading decisions.</p>
        <Button text ="Login" class ="btn-outline-info" />
      </div>
     </div>

 
    </>
  )
}

export default Main