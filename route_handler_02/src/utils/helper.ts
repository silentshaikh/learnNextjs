import { ChangeEvent, FormEvent } from "react";

export interface ClothList{
    id:number;
    img:string;
    name:string;
};
export interface InputType{
    type:string;
    place:string;
    accept:string
    name:string;
};
export interface InputValues{
    productId:string;
    productName:string;
    productImg:File|null;
};
export interface EditValues{
    editId:string;
    editName:string;
    editImg:File|string|null;
};
export interface LabelType{
    name:string;
};
export interface ContextType{
    inputValue:InputValues;
    onInputHandler:(name:string,value:string) => void;
    onHandleSubmit:(e:FormEvent) => void;
    onDrop:(e:File[]) => void;
    onEditDrop:(e:File[]) => void;
    preview:string|null;
    onHandleDelete:(id:number) => void;
    editValue:EditValues;
    openModal:(id:number,img:string|null,name:string)  => void;
    onEditHandler:(name:string,value:string) => void;
    onHandleEdit:(e:FormEvent) => void;
    setEditValue:(e:any) => void;
    setPreview:(e:string|null) => void
}
export const clothList:ClothList[] = [
    {
        id:1,
        img:'5bde2b8c90b5862623af87ac74593813bb5967f3.avif',
        name:"Cloth 1"
    },
    {
        id:2,
        img:'5c22f7d1c35a20534d564c93abb5f86279e2abd3.avif',
        name:"Cloth 2"
    },
    {
        id:3,
        img:'5d04b187d7f287ced245dca3994db5cda490c279.avif',
        name:"Cloth 3"
    },
    {
        id:4,
        img:'5e3824c420a0dd843113fa914e33b6ca39a38e76.avif',
        name:"Cloth 4"
    },
    {
        id:5,
        img:'5eba5a94ceec73c1345523a210c629a6993c2373.avif',
        name:"Cloth 5"
    },
    {
        id:6,
        img:'5ed9eba3f19c7ad00b59bae325c200766d8c4da0.avif',
        name:"Cloth 6"
    },
];