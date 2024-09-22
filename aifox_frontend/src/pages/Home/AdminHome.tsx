import React from 'react'
import "./style.css"
const AdminHome = () => {
    const data = [
        { filename: "file1", department: "dept1" },
        { filename: "file2", department: "dept2" },
        { filename: "file3", department: "dept1" },
        { filename: "file4", department: "dept3" },
        { filename: "file5", department: "dept2" },
        { filename: "file6", department: "dept1" },
        { filename: "file7", department: "dept4" },
        { filename: "file8", department: "dept3" },
        { filename: "file9", department: "dept2" },
        { filename: "file10", department: "dept4" }
    ]
    return <div className='wraper-container'>
        <div className='btn-container'>
            <button className='btns'>Add User</button>
            <button className='btns'>Upload Doc</button>
        </div>
        <div className='table-container'>
            <table className='table'>
                <thead>
                    <tr>
                        <th>DocFileName</th>
                        <th>Department</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item: any, index: number) => {

                        return <tr key={index}>
                            <td>{item.filename}</td>
                            <td>{item.department}</td>
                            <td><button className='openChatboxBtn'>Open ChatBox</button></td>
                        </tr>
                    })

                    }

                </tbody>
            </table>
        </div>
    </div>

}

export default AdminHome;