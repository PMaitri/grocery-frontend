"use client";  // Ensure it's a Client Component

import { useEffect, useState } from "react";
import Image from "next/image";
import Slider from "./_components/Slider";
import GlobalApi from "./_utils/GlobalApi";
import CategoryList from "./_components/CategoryList";
import ProductList from "./_components/ProductList";
import Footer from "./_components/Footer";
import Features from "./_components/Features";

export default function Home() {
  const [sliderList, setSliderList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const sliders = await GlobalApi.getSliders();
        const categories = await GlobalApi.getCategoryList();
        const products = await GlobalApi.getAllProducts();
        setSliderList(sliders);
        setCategoryList(categories);
        setProductList(products);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="p-5 md:p-5 px-25">
      {/* Sliders */}
      <Slider sliderList={sliderList} />

      {/* Features */}
      <Features />

      {/* Category List */}
      <CategoryList categoryList={categoryList} />

      {/* Product List */}
      <ProductList productList={productList} />

      {/* Banner */}
      <Image src="/banner.png" width={1000} height={300} alt="banner" className="w-full h-[400px] object-contain" />

      {/* Footer */}
      <Footer />
    </div>
  );
}
