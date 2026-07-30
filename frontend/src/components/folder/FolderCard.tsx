import { motion } from "framer-motion";
import { Folder } from "../../types/folder";
import {
    FolderOpen,
    MoreVertical,
    Pencil,
    Trash2
} from "lucide-react";
import { useState } from "react";

interface FolderCardProps {

    folder: Folder;

    onOpen:(folder:Folder)=>void;

    onRename:(folder:Folder)=>void;

    onDelete:(folder:Folder)=>void;

}

export default function FolderCard({

    folder,

    onOpen,

    onRename,

    onDelete

}:FolderCardProps){

    const [menuOpen,setMenuOpen]=useState(false);

    return(

<motion.div

whileHover={{
    y:-8,
    scale:1.03
}}

transition={{
    duration:.25
}}

className="relative rounded-3xl bg-white/40 backdrop-blur-lg shadow-xl border border-white/30 p-6 cursor-pointer hover:shadow-2xl transition-all"

onClick={()=>onOpen(folder)}

>

<div className="flex justify-between">

<FolderOpen

size={45}

className="text-sky-500"

/>

<button

onClick={(e)=>{

e.stopPropagation();

setMenuOpen(!menuOpen);

}}

>

<MoreVertical/>

</button>

</div>

<h2

className="mt-6 text-xl font-bold text-slate-700"

>

{folder.name}

</h2>

<p

className="text-sm mt-2 text-slate-500"

>

Created

<br/>

{new Date(folder.created_at).toLocaleDateString()}

</p>

{

menuOpen&&(

<div

className="absolute right-4 top-14 bg-white rounded-xl shadow-xl overflow-hidden z-20"

>

<button

onClick={(e)=>{

e.stopPropagation();

onRename(folder);

}}

className="flex items-center gap-2 px-4 py-3 hover:bg-sky-100 w-full"

>

<Pencil size={16}/>

Rename

</button>

<button

onClick={(e)=>{

e.stopPropagation();

onDelete(folder);

}}

className="flex items-center gap-2 px-4 py-3 hover:bg-red-100 text-red-600 w-full"

>

<Trash2 size={16}/>

Delete

</button>

</div>

)

}

</motion.div>

)

}