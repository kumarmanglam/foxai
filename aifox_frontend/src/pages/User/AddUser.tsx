import React, { useState } from 'react'
import "./style.css"
import { addUser } from '../../services/user';
import { useNavigate } from 'react-router-dom';
export interface userInterface {
    "name": string,
    "password": string,
    "email_id": string,
    "department": string,
    "role": string,
    "phone_number": number
}
const AddUser = () => {

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isAddUserDisabled, setIsAddUserDisabled] = useState<boolean>(true);
    const userObject = {
        "name": "",
        "password": "",
        "email_id": "",
        "department": "HR",
        "role": "user",
        "phone_number": 0
    }

    const [userData, setUserData] = useState<userInterface>(userObject);


    function validateUserData(userData: userInterface) {
        // Check if the name is provided and is a valid string
        if (userData.name.length === 0) {
            return "Name is required.";
        }

        // Check if the password is provided and meets certain criteria (e.g., minimum length)
        if (userData.password.length < 6) {
            return "Password must be at least 6 characters long.";
        }

        // Check if the email is provided and is in a valid format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(userData.email_id)) {
            return "Invalid email address.";
        }

        const validDepartments = ["HR", "IT", "Finance", "Sales"];
        console.log(userData.department);
        if (!validDepartments.includes(userData.department)) {
            return "Invalid department.";
        }

        // Check if the role is valid
        const validRoles = ["user", "admin"];
        if (!validRoles.includes(userData.role)) {
            return "Invalid role.";
        }

        // Check if the phone number is valid (e.g., must be a positive number)
        if (userData.phone_number <= 0) {
            return "Phone number must be a positive number.";
        }

        // If all checks pass, return true
        return true;
    }

    // Example usage


    const handleAddUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const validationResponse = validateUserData(userData);

        if (validationResponse == true) {
            setIsLoading(true);
            setIsAddUserDisabled(false);
            const token = sessionStorage.getItem("token");
            console.log(token);

            await addUser(userData, token);
            setIsLoading(false);
            setIsAddUserDisabled(true);
            setUserData(userObject);
            navigate("/usersList");
            setIsAddUserDisabled(false);
            console.log("addUser...", userData);
        } else {
            alert(validationResponse);
        }

    };
    return <div className='outerContainer'>
        <div className='formContainer'>
            <h1>Fill Form</h1>
            <form className='form' onSubmit={(e) => handleAddUser(e)}>
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
                        <option value="HR">Human Resources</option>
                        <option value="Finance">Finance</option>
                        <option value="IT">Information Technology</option>
                        <option value="Marketing">Marketing</option>
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
                <div><button className='adduserbtn' type='submit' >
                    Add User
                </button></div>
            </form>
        </div>
    </div>


}

export default AddUser;