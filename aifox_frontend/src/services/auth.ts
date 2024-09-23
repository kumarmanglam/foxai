import axios from "axios";

export const callLoginAPI = async (email: string, password: string): Promise<any> => {
    try {
        const response = await axios.post("http://localhost:3000/auth/login", {
            email_id: email,
            password: password
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log("callLoginAPI response: ", response.data);
        return response.data; // Return the response data
    } catch (error) {
        console.error("Error during login: ", error);
        throw error; // Rethrow the error for handling in the calling code
    }
};
