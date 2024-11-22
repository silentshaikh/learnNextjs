import React from 'react'
import { itemList } from '../../page'

function ProductDetail({params}:{params:{id:string}}) {
    let findProduct = itemList.find((e) => e.id === +params.id);
  return (
    <div>
      <h1>{findProduct?.id}</h1>
      <p>{findProduct?.value}</p>
    </div>
  );
};

export default ProductDetail
