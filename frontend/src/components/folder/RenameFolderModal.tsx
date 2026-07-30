import { useState,useEffect } from "react";
import { Folder } from "../../types/folder";

interface Props{

folder:Folder|null;

open:boolean;

onClose:()=>void;

onSave:(id:number,name:string)=>Promise<void>;

}

export default function RenameFolderModal({

folder,

open,

onClose,

onSave

}:Props){

const[name,setName]=useState("");

useEffect(()=>{

if(folder){

setName(folder.name);

}

},[folder]);

if(!open||!folder)return null;

return(

<div className="fixed inset-0 bg-black/30 flex justify-center items-center">

<div className="bg-white rounded-3xl p-8 w-[420px]">

<h2 className="text-2xl font-bold">

Rename Folder

</h2>

<input

value={name}

onChange={(e)=>setName(e.target.value)}

className="border rounded-xl w-full mt-6 p-3"

/>

<div className="flex justify-end gap-4 mt-8">

<button onClick={onClose}>

Cancel

</button>

<button

className="bg-sky-500 text-white rounded-xl px-5 py-2"

onClick={async()=>{

await onSave(folder.id,name);

onClose();

}}

>

Save

</button>

</div>

</div>

</div>

)

}