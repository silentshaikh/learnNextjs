import { FcEditImage } from "react-icons/fc";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { useCrudHook } from "@/Context/Context";
import { useDropzone } from "react-dropzone";
import { EditValues } from "@/utils/helper";



export function EditForm({prodId,prodName,prodImg}:{prodId:number,prodName:string,prodImg:string}) {
  const {onEditDrop,preview,onEditHandler,editValue,onHandleEdit,openModal,setEditValue,setPreview} = useCrudHook();
  // const onDrop = onEditDrop();
  const onDrop = (files: File[]) => {
    const file = files[0];
    if (file) {
        setEditValue((prev:EditValues) => ({ ...prev, editImg: file }));
        const previewUrl = URL.createObjectURL(file);
        setPreview(previewUrl);
    };
};
  const {getRootProps,getInputProps} = useDropzone({onDrop,accept:{'image/*':[]}})
  return (
    <Dialog >
      <DialogTrigger asChild>
        <button onClick={() => openModal(prodId,prodImg,prodName)} className="py-2 px-4 bg-teal-200 text-white rounded-full"><FcEditImage />        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] font-mono">
        <DialogHeader >
          <DialogTitle >Edit Product</DialogTitle>
          <DialogDescription >
            Make changes to your product here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form  className="grid gap-4 py-4" onSubmit={(e) => onHandleEdit(e)}>
          {/* <div className="grid grid-cols-4 items-center gap-4 font-mono">
            <label htmlFor="name" className="text-right">
              Id:
            </label>
            <input
              name="editId"
              type="text"
            //   defaultValue="Pedro Duarte"
              className="py-2 w-[150px] px-4"
              placeholder="Enter the Id"
              required
              value={editValue.editId}
              onChange={(e) => onEditHandler(e.target.name,e.target.value)}
            />
          </div> */}
          <div className="grid grid-cols-4 items-center gap-4 font-mono">
            <label htmlFor="username" className="text-right">
              Name:
            </label>
            <input
              name="editName"
              type="text"
            //   defaultValue="@peduarte"
              className="py-2 w-[200px] px-4"
              placeholder="Enter the Name"
              value={editValue.editName}
              required
              onChange={(e) => onEditHandler(e.target.name,e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4 font-mono">
            <label htmlFor="username" className="text-right">
              Image:
            </label>
            <div {...getRootProps({ className: 'dropzone' })} style={{ border: '1px dashed gray', padding: '10px' ,width:'200px'}}>
          <input {...getInputProps()} />
          {preview ? (
            <img src={preview} alt="Preview" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
          ) : (
            <p>Drag 'n' drop an image here, or click to select one</p>
          )}
        </div>
          </div>
          <DialogFooter >
          <button >Save changes</button>
        </DialogFooter>
        </form>
      
      </DialogContent>
    </Dialog>
  )
}
