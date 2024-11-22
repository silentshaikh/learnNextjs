import { imgList } from '@/app/page'
import Image from 'next/image';
import React from 'react'

function ProductDetail({params}:{params:{id:string}}) {
    const findProd = imgList.find((e) => e.id == +params.id);
  return (
    <>
    <h1>{findProd?.id}</h1>
    <Image
    src={`/images/${findProd?.img}`}
    alt='imgDeatil'
    height={300}
    width={300}
    />
    </>
  )
}

export default ProductDetail;