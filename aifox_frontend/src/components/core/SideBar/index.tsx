import React, { useState } from 'react'
import deleteicon from "../../../assets/icons/delete.png"
import { getAllDocs } from '../../../services/document';
const SideBar = () => {
    const [docs, setDocs] = useState<any>([]);
    const allDocs = async () => {
        const response = await getAllDocs();
        console.log(response);
        setDocs(response);
    }
    const handleDeletePdf = (id: any) => {

    }
    return (
        <div className="sidebarContainer">
            {docs.map((item: any) => {
                <div className="sidebarElement">
                    <div className="sidebarElementTitle">{item.docs_name}</div>
                    <div className="sidebarDeleteIcon"><img src={deleteicon} alt="delete" onClick={() => handleDeletePdf(item._id)} /></div>
                </div>
            })}
        </div>
    )
}

export default SideBar
