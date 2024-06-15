import React from 'react'
import { Footer, Navbar, Product } from "../components"
import FloatingFAQButton from '../components/FAQButton'

const Products = () => {
  return (
    <>
      <Navbar />
      <Product />
      <Footer />
      <FloatingFAQButton />
    </>
  )
}

export default Products