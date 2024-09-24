import React, { useState } from 'react'
import "./style.css"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { uploadDocs } from '../../services/document';

const Upload = () => {

    const [file, setFile] = useState<File | null>(null);
    const [isValidType, setIsValidType] = useState<Boolean>(true);
    const navigate = useNavigate();
    const [department, setDepartment] = useState<any>('HR');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isButtonDisabled, setButtonDisabled] = useState<boolean>(true);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];

        if (selectedFile) {
            if (selectedFile.type === 'application/pdf') {
                setIsValidType(true);
                setFile(selectedFile);
                setButtonDisabled(false);
            } else {
                setIsValidType(false);
            }
        }
    }

    const handleChange = (event: any) => {
        setDepartment(event.target.value);
        console.log("department is....", event.target.value);
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        if (isValidType && file) {
            try {
                const formData = new FormData();
                formData.append('pdf', file);
                formData.append('department', department);
                console.log(department)

                const response = await uploadDocs(formData);

                setIsLoading(true);
                // let response = { data: "adsfasd" };
                console.log("response.data...", response.data);

                toast('📄 Document uploaded successfully!', {
                    position: "top-right",
                    autoClose: 2000,
                    closeOnClick: true,
                    theme: "light",
                });

                navigate("/home");

            } catch (error) {
                // Handle error response
                console.error('Error uploading document:', error);
                toast('❌ Failed to upload document!', {
                    position: "top-right",
                    autoClose: 2000,
                    closeOnClick: true,
                    theme: "light",
                });
                setIsLoading(false);
            }
        } else {
            toast('❌ Please select a valid PDF file!', {
                position: "top-right",
                autoClose: 2000,
                closeOnClick: true,
                theme: "light",
            });

        }
    }



    return <div className='upload-container'>
        <ToastContainer
            position="top-right"
            autoClose={5000}
            theme="light"
        />
        <form className='upload-form' onSubmit={handleSubmit}>
            <div className='input-group'>
                <label htmlFor='file-upload'>Choose File:</label>
                <input id="file-upload" type='file' accept='.pdf' onChange={handleFileChange} />
            </div>

            <div>{!isValidType && <p>File type should be PDF</p>}</div>



            <label htmlFor="department">Choose a department:</label>
            <select id="department" name="department" value={department} onChange={handleChange}>
                <option value="HR">Hr</option>
                <option value="Sales">Sales</option>
                <option value="Marketing">Marketing</option>
                <option value="Management">Management</option>
                <option value="Finance">Finance</option>
            </select>

            <div className='upload-action'  >
                <button className={`upload-button ${isButtonDisabled || isLoading ? 'button-disabled' : ''}`} disabled={isButtonDisabled || isLoading} type='submit'>
                    {
                        isLoading ? "Uploading and Processing" : "Upload"
                    }
                </button>
            </div>
        </form>
    </div>
}

export default Upload;