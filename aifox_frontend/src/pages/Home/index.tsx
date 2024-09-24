import React, { useEffect, useState } from 'react'
import "./style.css"
import { selectUserDepartment } from '../../store/selectors/userSelector'
import { deleteDocument, getAllDocs, getDocsByDept } from '../../services/document'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setUserDepartment } from '../../store/reducers/userSlice'
import { setChatHistory } from '../../store/reducers/chatSlice'
const Home = () => {
    const department = sessionStorage.getItem("department");
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isDeleting, setIsDeleting] = useState<boolean>(false);

    useEffect(() => {
        console.log(department);
        setIsAdmin(department == "Director");
        setTableData();

    }, [])
    const [data, setData] = useState<any>([]);

    const callDocsByDeptAPI = async (department: any) => {
        const response = await getDocsByDept(department);
        setData(response);
    }

    const callgetAllDocsAPI = async () => {
        const response = await getAllDocs();
        setData(response);
    }
    const setTableData = () => {
        if (department == "Director") {
            callgetAllDocsAPI();
        } else {
            callDocsByDeptAPI(department);
        }
    }

    const handleUploadDoc = () => {
        navigate('/upload');
    }

    const handleAddUser = () => {
        navigate('/addUser');
    }
    const token = sessionStorage.getItem("token");
    const [count, setCount] = useState<number>(0);

    useEffect(() => {
        setTableData();
    }, [count])

    useEffect(() => {
        setTableData();
        dispatch(setChatHistory([]));
    }, []);

    const handleDeleteDocument = async (document_id: Number, token: any) => {
        const isConfirm = window.confirm("Do you want to delete this pdf ?");
        setCount(count + 1);
        setIsDeleting(true);
        if (isConfirm) {
            await deleteDocument(document_id, token);
            setTableData();
        }

    }

    const handleOpenChatBox = (item_id: any, document_name: any) => {
        navigate(`/foxai/${item_id}`);
        sessionStorage.setItem("document_name", document_name);

    }

    return <div className='wraper-container'>
        {isAdmin ? <div className='btn-container'>
            <button className='btns' onClick={handleAddUser}>Add User</button>
            <button className='btns' onClick={handleUploadDoc}>Upload Doc</button>
            <button className='btns' onClick={() => navigate('/usersList')}>All Users</button>
        </div> : null}
        <div className='table-container'>
            <table className='table'>
                <thead>
                    <tr>
                        <th>DocFileName</th>
                        <th>Department</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item: any, index: number) => {
                        return <tr key={index}>
                            <td>{item.docs_name}</td>
                            <td>{item.department}</td>
                            <td><div className='btnContainer'>

                                <button className='deleteBtn' onClick={() => handleDeleteDocument(item._id, token)}>Delete Document</button>
                                <button className='openChatboxBtn' onClick={() => handleOpenChatBox(item._id, item.docs_name)}>Open ChatBox</button></div></td>
                        </tr>
                    })

                    }

                </tbody>
            </table>
        </div>
    </div>

}

export default Home;