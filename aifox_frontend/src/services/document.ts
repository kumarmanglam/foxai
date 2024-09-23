import axios from "axios";

export async function getAllDocs() {
    try {
        const response = await axios.get('http://localhost:3000/documents/getAllDocs');
        console.log(response.data);
        return response.data;

    } catch (error) {
        console.error('Error fetching documents:', error);
    }
}


export async function getDocsByDept(department: string) {
    try {
        const response = await axios.get('http://localhost:3000/documents/getDocsByDept', {
            headers: {
                'Content-Type': 'application/json',
            },
            params: {
                department: department,
            },
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching documents by department:', error);
    }
}




export async function deleteDocument(documentId: Number, token: any) {
    try {
        const response = await axios.delete(`http://localhost:3000/documents/deleteDocs?documentId=${documentId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        console.log('Document deleted successfully:', response.data);
        return response.data;

    } catch (error) {
        console.error('Error deleting document:', error);
    }
}




