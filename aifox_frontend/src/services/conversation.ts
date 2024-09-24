import axios from "axios";
import { ChatEntry } from "../components/core/InputPrompt";
interface responseObject {
    response: string
}
const fakeAPI = (): Promise<string> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("good response");
        }, 500);
    });
};

export const callConversationAPI = async (pdfId: string | undefined, query: string): Promise<any> => {
    // return { "response": "api working" };
    const url = 'http://localhost:3000/conversations/conversation';

    const requestData = {
        userId: "66efc98daa36b7a795df7e6d",
        pdfId,
        userRole: "user",
        query
    };

    try {
        const response = await axios.post(url, requestData, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response;
    } catch (error) {
        console.log("Error hitting the API: ", error);
        throw error;
    }

    // const formData = new URLSearchParams();
    // formData.append('prompt', prompt);
    // formData.append('data', JSON.stringify([{}]))
    // try {
    //     const response = await axios.post(url, formData, {
    //         headers: {
    //             'Content-Type': 'application/x-www-form-urlencoded',
    //         },
    //     });
    //     // console.log(response.data)
    //     return response.data;
    // } catch (error) {
    //     console.error('Error hitting the API:', error);
    //     throw error;
    // }
};


export async function fetchChatHistory(pdfId: any) {
    try {
        let user = sessionStorage.getItem("user");
        if (user) {
            let userOb = JSON.parse(user);
            console.log(userOb.id)
            let userId = userOb.id;
            const response = await axios.post('http://localhost:3000/conversations/chatHistory', {
                userId,
                pdfId,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(response.data);
            return response.data;
        }

    } catch (error) {
        console.error('Error fetching chat history:', error);
        throw error; // Rethrow the error for further handling
    }
}

export async function deleteChatHistory(pdfId: any) {
    try {
        console.log("chat history called")
        const user = sessionStorage.getItem("user");
        console.log(user)
        if (user) {
            const userId = JSON.parse(user).id;
            const response = await axios.delete('http://localhost:3000/conversations/chatHistory', {
                headers: {
                    'Content-Type': 'application/json',
                },
                data: { // Pass the data in the body for DELETE requests
                    userId,
                    pdfId,
                },
            });

            return response.data;
        }

        // Return the data from the response
    } catch (error) {
        console.error('Error deleting chat history:', error);
        throw error; // Rethrow the error for further handling
    }
}
