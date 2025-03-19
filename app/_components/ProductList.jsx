import React from 'react'
import Productitem from './Productitem'

function ProductList({ productList }) { 
  return (
    <div className='mt-10'>
      <h2 className="text-primary font-bold text-3xl h-20 mt-20">Our Popular Products</h2>

      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
        {productList.map((product, index) => 
          index < 8 && (
            <Productitem key={product.id || index} product={product} /> // Add key here
          )
        )}
      </div>
    </div>
  )
}

export default ProductList
