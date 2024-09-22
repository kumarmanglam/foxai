import React from 'react'
import "./style.css"
const AddUser = () => {
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
                    <input type='email' name='email' placeholder='enter your email' />
                </div>
                <div className='formElements'>
                    <label>Phone No:</label>
                    <input type='number' name='phoneno' placeholder='enter your phoneno' />
                </div>
                <div className='formElements'>
                    <label>Department: </label>
                    <select id="department" name="department">
                        <option value="hr">Human Resources</option>
                        <option value="finance">Finance</option>
                        <option value="it">Information Technology</option>
                        <option value="marketing">Marketing</option>
                    </select>
                </div>
                <div className='formElements'>
                    <label>Username:</label>
                    <input type='text' name='username' placeholder='enter your name' />
                </div>
                <div className='formElements'>
                    <label>Password:</label>
                    <input type='password' name='password' />
                </div>
                <div><button className='adduserbtn'>
                    Add User
                </button></div>
            </form>
        </div>
    </div>


}

export default AddUser;