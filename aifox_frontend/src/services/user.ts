import axios from "axios";
import { userInterface } from "../pages/User/AddUser";

export async function addUser(userData: userInterface, token: any) {
    const url = 'http://localhost:3000/auth/adduser';
    try {
        const response = await axios.post(url, userData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        console.log('User added successfully:', response.data);
    } catch (error) {
        console.error('Error adding user:');
    }
}



// Function to get all users
export async function getAllUsers(token: any) {
    try {
        const response = await axios.get('http://localhost:3000/auth/getAllUser', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        return response.data; // Return the user data
    } catch (error) {
        console.log("error: ", error)
    }
}




