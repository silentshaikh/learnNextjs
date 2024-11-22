import { ImgList } from '@/utils/helper';
import Image from 'next/image';
import React from 'react'

const fetchProductDetail = async (detailApi:string) => {
    try {
        const fetchDetail = await fetch(detailApi);
    const detailIntoJson = await fetchDetail.json();
    return detailIntoJson;
    } catch (error) {
        console.log(error);
    }
};
async function ProductDetail({params}:{params:{id:string}}) {
    const productDetail:ImgList | undefined = await fetchProductDetail(`http://localhost:3000/api/product/${params.id}`)
  if(productDetail){
    return (
        <>
          <h1>Product Detail</h1>
        <section>
          <div className=''>
            <h2>{productDetail.id}</h2>
            <Image
            height={400}
            width={400}
            src={`/images/${productDetail.img}`}
        alt='product-detail'
            />
          </div>
        </section>
        </>
      )
  }else{
    return(
        <>
        Product Not Available
        </>
    );
  }
}

export default ProductDetail
