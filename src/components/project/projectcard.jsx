import React from 'react'
import { Pencil, Trash2, Tags } from 'lucide-react'
const ProjectCard = ({ category, onEdit, handleDelete, project, onDelete }) => {



    return (
        <div className="bg-white shadow-lg rounded-2xl p-4 overflow-y-auto max-h-[200px] border text-black  w-[250px]">
            <div className="flex justify-between items-start">
                <div className="flex flex-col gap-2">
                    <div className="flex gap-3">
                        <Tags size={18} className=' text-blue-700' />
                        <h2 className="font-bold text-md">{project.capex_id}</h2></div>
                    <p className='text-sm p-4'>{project.description}</p>
                    <p className='text-sm p-4'>{project.requestedBy}</p>

                </div>


                <div className="flex gap-3 text-zinc-700">
                    <Pencil size={18} className="cursor-pointer" onClick={onEdit} />
                    <Trash2 size={18} className={`text-red-600 cursor-pointer `} onClick={onDelete} />
                </div>
            </div>



        </div>
    )
}

export default ProjectCard