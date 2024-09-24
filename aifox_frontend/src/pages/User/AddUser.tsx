import React, { useState } from 'react'
import "./style.css"
import { addUser } from '../../services/user';
const AddUser = () => {

    interface userInterface {
        "name": string,
        "password": string,
        "email_id": string,
        "department": string,
        "role": string,
        "phone_number": number
    }
    const userObject = {
        "name": "",
        "password": "",
        "email_id": "",
        "department": "",
        "role": "",
        "phone_number": 0
    }

    const [userData, setUserData] = useState<userInterface>(userObject);
    const handleAddUser = async () => {

        await addUser();
    };
    return <div className='outerContainer'>
        <div className='formContainer'>
            <h1>Fill Form</h1>
            <form className='form'>
                <div className='formElements'>
                    <label>Name:</label>
                    <input type='text' name='name' placeholder='enter your name' />
                </div>
                <div className='formElements'>
                    <label>Email:</label>
                    <input type='email' name='email' placeholder='enter your email' onChange={(e: any) => setUserData((prevData) => ({
                        ...prevData,
                        email_id: e.target.value
                    }))} />
                </div>
                <div className='formElements'>
                    <label>Phone No:</label>
                    <input type='number' name='phoneno' placeholder='enter your phoneno' onChange={(e: any) => setUserData((prevData) => ({
                        ...prevData,
                        phone_number: e.target.value
                    }))} />
                </div>
                <div className='formElements' >
                    <label>Department: </label>
                    <select id="department" name="department" onChange={(e: any) => setUserData((prevData) => ({
                        ...prevData,
                        department: e.target.value
                    }))}>
                        <option value="hr">Human Resources</option>
                        <option value="finance">Finance</option>
                        <option value="it">Information Technology</option>
                        <option value="marketing">Marketing</option>
                    </select>
                </div>
                <div className='formElements'>
                    <label>Username:</label>
                    <input type='text' name='username' placeholder='enter your name' onChange={(e: any) => setUserData((prevData) => ({
                        ...prevData,
                        name: e.target.value
                    }))} />
                </div>
                <div className='formElements'>
                    <label>Password:</label>
                    <input type='password' name='password' onChange={(e: any) => setUserData((prevData) => ({
                        ...prevData,
                        password: e.target.value
                    }))} />
                </div>
                <div><button className='adduserbtn' onClick={handleAddUser}>
                    Add User
                </button></div>
            </form>
        </div>
    </div>


}

export default AddUser;