# Cybernauts Backend – Interactive User Relationship & Hobby Network

## Overview

Backend for managing users, friendships, and hobbies. Built with **Node.js, Express, TypeScript, MongoDB**, fully modular and human-readable. Implements:

- CRUD for users
- Link/unlink friendships
- Popularity score calculation
- Circular friendship prevention
- Graph data endpoint for frontend

## Setup

1. Clone repo

```bash
git clone <repo-url>
cd cybernauts-backend


🛠️ User & Social Graph API Documentation
Base URL
http://localhost:5000/api

1️⃣ Users Endpoints
Create User

URL: /users

Method: POST

Body:

{
  "username": "Abhishek",
  "age": 22,
  "hobbies": ["coding", "reading"]
}


Description: Create a new user. friends array is empty by default, popularityScore = 0.

Response Example:

{
  "id": "1cb132fa-a58b-49cb-9eec-a54cb9c34e4a",
  "username": "Abhishek",
  "age": 22,
  "hobbies": ["coding", "reading"],
  "friends": [],
  "popularityScore": 0,
  "createdAt": "2025-10-16T06:40:21.865Z"
}

Get All Users

URL: /users

Method: GET

Description: Fetch all users with their details.

Response Example:

[
  {
    "id": "1cb132fa-a58b-49cb-9eec-a54cb9c34e4a",
    "username": "Abhishek",
    "age": 22,
    "hobbies": ["coding", "reading"],
    "friends": ["63b0c168-fb16-4f46-bd6c-5c0e3e5c96ac"],
    "popularityScore": 10
  }
]

Update User

URL: /users/:id

Method: PUT

Body (any fields to update):

{
  "username": "Abhishek Tiwari",
  "age": 23,
  "hobbies": ["coding", "gaming"]
}


Description: Update username, age, or hobbies of a user.

Response: Updated user object.

Delete User

URL: /users/:id

Method: DELETE

Description: Delete a user. Cannot delete if user has friends.

Response Example:

{
  "success": true,
  "message": "User deleted"
}

Link Users

URL: /users/:id/link

Method: POST

Body:

{
  "targetId": "target_user_id"
}


Description: Link a user with another user (make them friends).

Rules:

Cannot link self

Cannot link if already linked

Response Example:

{
  "success": true,
  "message": "Users linked"
}

Unlink Users

URL: /users/:id/unlink

Method: DELETE

Body:

{
  "targetId": "target_user_id"
}


Description: Remove friendship between two users.

Response Example:

{
  "success": true,
  "message": "Users unlinked"
}

2️⃣ Graph Endpoint
Get Social Graph

URL: /graph

Method: GET

Description: Returns all users as nodes and friendships as edges.

Response Example:

{
  "nodes": [
    {
      "id": "1cb132fa-a58b-49cb-9eec-a54cb9c34e4a",
      "username": "Abhishek",
      "age": 22,
      "hobbies": ["coding", "reading"],
      "popularityScore": 10,
      "createdAt": "2025-10-16T06:40:21.865Z"
    },
    {
      "id": "63b0c168-fb16-4f46-bd6c-5c0e3e5c96ac",
      "username": "Abhi Tiwari",
      "age": 28,
      "hobbies": ["gaming", "reading", "sports"],
      "popularityScore": 10,
      "createdAt": "2025-10-16T06:45:32.686Z"
    }
  ],
  "edges": [
    {
      "id": "e-1cb132fa-a58b-49cb-9eec-a54cb9c34e4a--63b0c168-fb16-4f46-bd6c-5c0e3e5c96ac",
      "source": "1cb132fa-a58b-49cb-9eec-a54cb9c34e4a",
      "target": "63b0c168-fb16-4f46-bd6c-5c0e3e5c96ac"
    }
  ]
}


✅ Tips:

id = unique user identifier

friends array stores ids of linked users

edges = friendship connections between users

Use POST /link to connect, DELETE /unlink to disconnect
```
