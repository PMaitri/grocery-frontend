import GlobalApi from '@/app/_utils/GlobalApi'
import React from 'react'
import TopCategoryList from '../_components/TopCategoryList';
import ProductList from '@/app/_components/ProductList';


async function ProductCategory({params}) {

  const productList = await GlobalApi.getProductsByCategory(params.categoryName);
  const categoryList = await GlobalApi.getCategoryList();
 // const productList = await GlobalApi.getAllProducts();  


  return (
    <div>
    <h2 className='p-2 mt-0 bg-primary text-white font-bold text-center text-2xl'>{params.categoryName}</h2>
     <TopCategoryList categoryList={categoryList}/>
     <div className='p-5 md:p-10'>
     <ProductList productList={productList}/>
     </div>

    </div>
  )
}

export default ProductCategory
