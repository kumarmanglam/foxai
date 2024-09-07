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

export const callConversationAPI = async (prompt: string): Promise<any> => {
    // return { "response": "api working" };
    const url = 'http://172.16.21.248:3000/conversation/';

    const formData = new URLSearchParams();
    formData.append('prompt', prompt);
    formData.append('data', JSON.stringify([{}]))
    try {
        const response = await axios.post(url, formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        // console.log(response.data)
        return response.data;
    } catch (error) {
        console.error('Error hitting the API:', error);
        throw error;
    }
};

export const getChatHistoryAPI = async (): Promise<ChatEntry[]> => {
    const response = await axios.get<ChatEntry[]>('http://172.16.21.248:3000/conversation/chatHistory');
    console.log(response);
    return response.data;
};