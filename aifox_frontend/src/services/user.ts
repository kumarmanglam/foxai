const axios = require('axios');

export async function addUser() {
    const url = 'http://localhost:3000/auth/adduser';

    const userData = {
        name: "Kumar Manglam",
        password: "password1234",
        email_id: "kumarmanglamemail1@gmail.com",
        department: "HR",
        role: "user",
        phone_number: 8448739538,
    };

    try {
        const response = await axios.post(url, userData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('User added successfully:', response.data);
    } catch (error) {
        console.error('Error adding user:', error.response ? error.response.data : error.message);
    }
}

