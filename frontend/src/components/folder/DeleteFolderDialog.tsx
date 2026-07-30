import { Folder } from "../../types/folder";

interface Props{

folder:Folder|null;

open:boolean;

onClose:()=>void;

onDelete:(id:number)=>Promise<void>;

}

export default function DeleteFolderDialog({

folder,

open,

onClose,

onDelete

}:Props){

if(!open||!folder)return null;

return(

<div className="fixed inset-0 bg-black/40 flex justify-center items-center">

<div className="bg-white rounded-3xl p-8 w-[400px]">

<h2 className="text-2xl font-bold">

Delete Folder?

</h2>

<p className="mt-4">

This action cannot be undone.

</p>

<div className="flex justify-end mt-8 gap-4">

<button onClick={onClose}>

Cancel

</button>

<button

className="bg-red-500 text-white px-5 py-2 rounded-xl"

onClick={async()=>{

await onDelete(folder.id);

onClose();

}}

>

Delete

</button>

</div>

</div>

</div>

)

}