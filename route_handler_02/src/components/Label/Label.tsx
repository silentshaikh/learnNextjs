import { LabelType } from '@/utils/helper'
import React from 'react'

function Label({name}:LabelType) {
  return (
    <>
     <label htmlFor="">{name}</label> 
    </>
  )
}

export default Label
