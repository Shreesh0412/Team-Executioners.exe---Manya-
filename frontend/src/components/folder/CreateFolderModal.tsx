import { useState } from "react";

interface Props{

open:boolean;

onClose:()=>void;

onCreate:(name:string)=>Promise<void>;

}

export default function CreateFolderModal({

open,

onClose,

onCreate

}:Props){

const[name,setName]=useState("");

if(!open) return null;

return(

<div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">

<div className="bg-white rounded-3xl p-8 w-[420px]">

<h2 className="text-2xl font-bold">

Create Folder

</h2>

<input

value={name}

onChange={(e)=>setName(e.target.value)}

placeholder="Folder Name"

className="mt-6 border rounded-xl w-full p-3"

/>

<div className="flex justify-end gap-4 mt-8">

<button

onClick={onClose}

className="px-5 py-2"

>

Cancel

</button>

<button

className="bg-sky-500 text-white px-5 py-2 rounded-xl"

onClick={async()=>{

await onCreate(name);

setName("");

onClose();

}}

>

Create

</button>

</div>

</div>

</div>

)

}