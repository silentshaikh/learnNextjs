'use client';
import React from 'react'
import Label from '../Label/Label'
import { useCrudHook } from '@/Context/Context';
import { useDropzone } from 'react-dropzone';


function Form() {
  const {inputValue,preview,onInputHandler,onHandleSubmit,onDrop} = useCrudHook();
  const {getRootProps,getInputProps} = useDropzone({onDrop,accept:{'image/*':[]}})
  return (
    <>
     <form action="/api/product" method="POST" encType='multipart/form-data' onSubmit={(e) => onHandleSubmit(e)} className=' py-10 flex flex-col gap-8'>
        <Label name='Product ID'/>
        {/* <Input type='number' place='Id' accept='' name='productId'/> */}
        <input className='shadow w-[30vw] px-2 py-3' type="text" name="productId" id="" value={inputValue.productId} placeholder='Enter Product Id' required onChange={(e) => onInputHandler(e.target.name,e.target.value)}/>
        <Label name='Product Name'/>
        {/* <Input type='text' place='Name' accept='' name='productName'/> */}
        <input className='shadow w-[30vw] px-2 py-3' type="text" name="productName" id="" value={inputValue.productName} placeholder='Enter Product Name' required onChange={(e) => onInputHandler(e.target.name,e.target.value)}/>
        <Label name='Product Image'/>
      {/* <Input type='file' place='Image' accept='.jpg,.jpeg,.webp,.png' name='productImg'/> */}
      {/* <input className='shadow w-[30vw] px-2 py-3' type="file" name="productImg" id="" required /> */}
      <div {...getRootProps({ className: 'dropzone' })} style={{ border: '1px dashed gray', padding: '10px' }}>
          <input {...getInputProps()} />
          {preview ? (
            <img src={preview} alt="Preview" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
          ) : (
            <p>Drag 'n' drop an image here, or click to select one</p>
          )}
        </div>

        <button className='bg-sky-400 w-24 py-3 rounded-full text-white'>Submit</button>
      </form> 
    </>
  )
}

export default Form
