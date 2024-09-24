import React, { useEffect, useState } from 'react'
import { getAllUsers } from '../../services/user';
import { useNavigate } from 'react-router-dom';

const UsersList = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState<any>([]);
    const token = sessionStorage.getItem("token");
    const getAllUsersData = async () => {
        const response = await getAllUsers(token);
        console.log(response.users);
        setUsers(response.users);
    }
    const handleAddUser = () => {
        navigate('/addUser');
    };

    useEffect(() => {

        getAllUsersData();

    }, [])

    return <div className='wraper-container'>
        <div className='heading'>
            <h1>List Of Users</h1>

        </div>
        <div className='table-container'>
            <button className='btns' onClick={handleAddUser}>Add User</button>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Department</th>
                        <th>Email</th>
                        <th>PhoneNo</th>

                    </tr>
                </thead>
                <tbody>
                    {users.map((item: any, index: number) => {
                        return <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.department}</td>
                            <td>{item.email_id}</td>
                            <td>{item.phone_number}</td>

                        </tr>
                    })

                    }

                </tbody>
            </table>
        </div>
    </div>

}



export default UsersList