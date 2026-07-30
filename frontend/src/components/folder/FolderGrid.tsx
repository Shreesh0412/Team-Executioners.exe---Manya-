import FolderCard from "./FolderCard";
import { Folder } from "../../types/folder";

interface Props{

folders:Folder[];

onOpen:(folder:Folder)=>void;

onRename:(folder:Folder)=>void;

onDelete:(folder:Folder)=>void;

}

export default function FolderGrid({

folders,

onOpen,

onRename,

onDelete

}:Props){

return(

<div

className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"

>

{

folders.map(folder=>(

<FolderCard

key={folder.id}

folder={folder}

onOpen={onOpen}

onRename={onRename}

onDelete={onDelete}

/>

))

}

</div>

)

}