'use client';
import { ContextType, EditValues, InputValues } from '@/utils/helper';
import React, { createContext, FormEvent, ReactNode, useContext, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const CrudCont = createContext<ContextType | null>(null);

function Context({ children }: { children: ReactNode }) {
    const [inputValue, setInputValue] = useState<InputValues>({
        productId: '',
        productName: '',
        productImg: null as File | null,
    });

    //edit product input
    const [editValue, setEditValue] = useState<EditValues>({
        editId: '',
        editName: '',
        editImg: null as File | null,
    });
    const [preview, setPreview] = useState<string | null>(null);

    // handle input values
    const onInputHandler = (name: string, value: string) => {
        setInputValue((prev) => ({ ...prev, [name]: value }));
    };

    // Handle file drop
    const onDrop = (files: File[]) => {
        const file = files[0];
        if (file) {
            setInputValue((prev) => ({ ...prev, productImg: file }));
            const previewUrl = URL.createObjectURL(file);
            setPreview(previewUrl);
        };
    };

     // Handle edit file drop
     const onEditDrop = (files: File[]) => {
        const file = files[0];
        if (file) {
            setEditValue((prev) => ({ ...prev, editImg: file }));
            const previewUrl = URL.createObjectURL(file);
            setPreview(previewUrl);
        };
    };
    // Handle form submission
    const onHandleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        console.log(formData)
        formData.set('id', inputValue.productId);
        formData.set('name', inputValue.productName);

        if (inputValue.productImg) {
            formData.set('img', inputValue.productImg);
        }

        try {
            const response = await fetch('/api/product', {
                method: 'POST',
                body: formData, // FormData handles multipart/form-data
            });
            console.log(response)

            if (response.ok) {
                alert('Product added successfully');
                setInputValue({ productId: '', productName: '', productImg: null });
                setPreview(null);
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.error}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to submit the form. Please try again.');
        }
    };

    //Delete Product
    const onHandleDelete =async  (id:number) => {
         alert(`Delete-${id}`)
        const resp = await fetch(`/api/product/${id}`,{
            method:'DELETE',
        });
        if(resp.ok){
            alert("Product Delete");
        }else{
            alert("Product can't be delete");
        }
    }

    //when modal will open
    // const openModal = (id:number,img:string|null,name:string)  => {
    //     setEditValue({
    //         editId:id.toString(),
    //         editName:name,
    //         editImg:img ? new File([],img) : null,            
    //     });
    //     if(img){
    //         setPreview(`/images/${img}`);
    //     };
    // };
    const openModal = async (id: number, img: string | null, name: string) => {
        let file = null;
        if (img) {
            try {
                const response = await fetch(`/images/${img}`);
                const blob = await response.blob();
                file = new File([blob], img, { type: blob.type });
            } catch (error) {
                console.error("Failed to fetch the existing image:", error);
            }
        }
    
        setEditValue({
            editId: id.toString(),
            editName: name,
            editImg: file, // Pass the fetched File object
        });
    
        setPreview(img ? `/images/${img}` : null);
    };
    

    //Edit Product Input
    const onEditHandler = (name:string,value:string) => {
        setEditValue((prev) => ({...prev,[name]:value}));
        // console.log(value)
    };

    //Edit Form 
    const onHandleEdit = async (e:FormEvent) => {
        e.preventDefault();
        const editForm = new FormData();
        editForm.set('editid',editValue.editId);
        editForm.set('editname',editValue.editName);
        if (editValue.editImg) {
            // if (editValue.editImg instanceof File) {
                // New file upload
                editForm.set('editimg', editValue.editImg);
                console.log(editForm)
            // } else {
                // Existing image filename
                // editForm.set('existingImg', editValue.editImg); // Send as existingImg
            // }
        }
        try {
            const editResponse = await fetch(`api/product/${editValue.editId}`,{
                method:"PUT",
                body:editForm
            });
            if(editResponse.ok){
                alert("Product edited successfully")
                setEditValue({editId:'',editName:'',editImg:null});
                setPreview(null);
            }else{
                const errMessage = await editResponse.json();
                alert(`Error: ${errMessage.error}`)
            }
        } catch (error) {
            alert("Product is not edit");   
        }
        
    };

    return (
        <CrudCont.Provider value={{ inputValue, onInputHandler, onHandleSubmit, onDrop,onEditDrop, preview, onHandleDelete,editValue, onEditHandler,onHandleEdit,openModal,setEditValue,setPreview}}>
            {children}
        </CrudCont.Provider>
    );
}

export default Context;

export const useCrudHook = () => {
    const crudHook = useContext(CrudCont);
    if (!crudHook) {
        throw new Error('useCrudHook must be used within a CrudContext.Provider');
    }
    return crudHook;
};
