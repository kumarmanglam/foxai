import React from 'react'

const UsersList = () => {
    const users = [
        {
            name: "Alice Johnson",
            department: "Human Resources",
            email: "alice.johnson@example.com",
            phoneno: "123-456-7890"
        },
        {
            name: "Bob Smith",
            department: "Finance",
            email: "bob.smith@example.com",
            phoneno: "234-567-8901"
        },
        {
            name: "Carol White",
            department: "Information Technology",
            email: "carol.white@example.com",
            phoneno: "345-678-9012"
        },
        {
            name: "David Brown",
            department: "Marketing",
            email: "david.brown@example.com",
            phoneno: "456-789-0123"
        },
        {
            name: "Emily Davis",
            department: "Sales",
            email: "emily.davis@example.com",
            phoneno: "567-890-1234"
        },
        {
            name: "Frank Wilson",
            department: "Customer Service",
            email: "frank.wilson@example.com",
            phoneno: "678-901-2345"
        },
        {
            name: "Grace Miller",
            department: "Legal",
            email: "grace.miller@example.com",
            phoneno: "789-012-3456"
        },
        {
            name: "Henry Martinez",
            department: "Operations",
            email: "henry.martinez@example.com",
            phoneno: "890-123-4567"
        }]
    return <div className='wraper-container'>
        <div className='heading'>
            <h1>List Of Users</h1>

        </div>
        <div className='table-container'>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Department</th>
                        <th>Email</th>
                        <th>PhoneNo</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((item: any, index: number) => {

                        return <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.department}</td>
                            <td>{item.email}</td>
                            <td>{item.phoneno}</td>
                            <td><button className='openChatboxBtn'>Open ChatBox</button></td>
                        </tr>
                    })

                    }

                </tbody>
            </table>
        </div>
    </div>

}



export default UsersList