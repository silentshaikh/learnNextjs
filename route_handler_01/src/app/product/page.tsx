import { ImgList } from '@/utils/helper'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
const fetchProducts = async (productsApi:string) => {
   try {
    const fetchData = await fetch(productsApi);
    const dataIntoJson:ImgList[] = await fetchData.json();
    return dataIntoJson;
   } catch (error) {
    console.log(error);
   }
}
async function Product() {
    const productApiData:ImgList[] | undefined = await fetchProducts(`http://localhost:3000/api/product`);
    console.log(productApiData)
    
 if(productApiData?.length){
    return (
        <>
          <h1>Product List</h1>
        <section className='flex justify-evenly items-center flex-wrap'>
          {productApiData.map((e) => {
              return(
                <Link href={`/product/${e.id}`}>
                  <div key={e.id} className='border'>
                <Image
                height={300}
                width={300}
                src={`/images/${e.img}`}
                alt='product'
                />
                </div>
                </Link>
            )
        })}
        </section>
        </>
      )
 }else{
    return(
        <>
        <h1>No Product Available</h1>
        </>
    )
 }
}

export default Product
