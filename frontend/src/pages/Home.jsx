import React from 'react'
import Scroll from '../components/Scroll';
import FeaturedCat from '../components/FeaturedCat';
import Bestselling from '../components/Bestselling';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
const Home = () => {
  return (
    <div>
      <Navbar/>
      <Scroll/>
      <FeaturedCat/>
      <Bestselling/>
      <Footer/>
    </div>

  )
}

export default Home