import { FolderSearch } from "lucide-react";

export default function EmptyFolder(){

return(

<div

className="flex flex-col items-center justify-center py-32"

>

<FolderSearch

size={80}

className="text-sky-400"

/>

<h2

className="text-3xl mt-6 font-bold text-slate-600"

>

No folders yet

</h2>

<p

className="mt-3 text-slate-500"

>

Create your first study folder.

</p>

</div>

)

}