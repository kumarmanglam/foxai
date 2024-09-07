## Stage 1: Without PDF Context

### Conversation
#### POST `/conversation/prompt`
**Description**: Send a user query and chat history for conversation.

**Request Body**:
```json
{
    "message": {
        "query": "tell me about tricon",
        "chatHistory": [
            {
                "Human": "Hi",
                "AI": "Hello! How can I assist you today?"
            },
            {
                "Human": "how are you?",
                "AI": "I'm just a computer program, so I don't have feelings, but I'm here and ready to help you with whatever you need! How can I assist you today?"
            }
        ]
    }
}
```

#### GET `/conversation/chatHistory`
**Description**: Retrieve chat history.

### Document
#### POST `/document/upload`
**Description**: Upload a document.

#### GET `/document/documents`
**Description**: Get a list of all documents.

### Profile
#### POST `/profile/login`
**Description**: Login to the system.

**Request Body**:
```json
{
    "username": "",
    "password": "",
    "role": "admin/user"
}
```

#### POST `/profile/adduser`
**Description**: Add a new user.

#### GET `/profile/users`
**Description**: Get a list of all users.

#### GET `/profile/profilebyid`
**Description**: Retrieve a user's profile by ID.

#### DELETE `/user/deleteuser`
**Description**: Delete a user.

#### UPDATE `/user/updateuser`
**Description**: Update a user's profile.

---

## Stage 2: With PDF Context

### Conversation
#### POST `/conversation/prompt`
**Description**: Send a user query, chat history, and associated PDF document ID.

**Request Body**:
```json
{
    "message": {
        "query": "tell me about tricon",
        "chatHistory": [
            {
                "Human": "Hi",
                "AI": "Hello! How can I assist you today?"
            },
            {
                "Human": "how are you?",
                "AI": "I'm just a computer program, so I don't have feelings, but I'm here and ready to help you with whatever you need! How can I assist you today?"
            }
        ]
    },
    "pdf_id": 1
}
```

### Schema for `chatHistory`
```json
{
    "userid": number,
    "chatHistory": [
        {
            "Human": string,
            "AI": string
        }
    ]
}
```


http://172.16.21.248:3000/conversation/

curl --location 'http://localhost:3000/conversation/' \  
--header 'Content-Type: application/x-www-form-urlencoded' \  
--data-urlencode 'prompt=Who is president of India'

curl --location --request POST 'http://localhost:3000/conversation/chatHistory'