# DevVault

DevVault is a full-stack snippet management application built for developers to save, search, organize, and manage reusable code snippets in one place. The project combines a Node.js + Express backend with a React + Vite frontend and supports user authentication, secure JWT-based access, and MongoDB-backed persistence.

## Overview

This project allows users to:

- Sign up and log in securely
- Save code snippets with title, language, description, and tags
- Browse snippets by title or language
- Update and delete their saved snippets
- Keep their personal code vault protected behind authentication

## Tech Stack

- Frontend: React, Vite, JavaScript, Tailwind CSS, Monaco Editor
- Backend: Node.js, Express.js
- Database: MongoDB with Mongoose
- Authentication: JWT + bcrypt
- API Communication: Axios

## Project Structure

```bash
dev_vault/
├── Back_End/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── Front_End/
│   └── dev-vault-ui/
│       ├── src/
│       ├── interceptor/
│       ├── package.json
│       ├── vite.config.js
│       └── index.html
├── README.md
└── package-lock.json
```

## Features

- Secure sign-in and sign-up flow
- Personal snippet collection per authenticated user
- Search snippets by title or language
- Code editor support via Monaco Editor
- Create, update, and delete snippet actions
- JWT-based protected routes and API authorization

## Prerequisites

Before running the project, make sure you have:

- Node.js 18 or newer
- npm or yarn
- MongoDB running locally or a MongoDB Atlas connection string

## Backend Setup

1. Go to the backend folder:

```bash
cd Back_End
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the `Back_End` directory with the following values:

```env
PORT=7000
MONGO_URI=mongodb://localhost:27017/devvault
JWT_SECRET=your_jwt_secret_key
JWT_REFRESH=your_refresh_token_secret
```

4. Start the backend server:

```bash
node server.js
```

The backend will run on `http://localhost:7000`.

## Frontend Setup

1. Open a new terminal and go to the frontend folder:

```bash
cd Front_End/dev-vault-ui
```

2. Install dependencies:

```bash
npm install
```

3. Start the Vite development server:

```bash
npm run dev
```

4. Open the URL shown in the terminal, usually:

```bash
http://localhost:5173
```

## Authentication Flow

The app uses JWT tokens to protect snippet-related API routes. On successful login, the frontend stores the access token in session storage and uses it for authenticated requests.

## Main Routes

### Frontend

- `/login` - login and signup page
- `/snippets` - list of saved snippets
- `/add_snippet` - add a new snippet
- `/update_snippet/:name/:id` - edit an existing snippet

### Backend API

- `POST /dev-vault/auth/login`
- `POST /dev-vault/auth/signUp`
- `POST /dev-vault/snippet/addSnippet/:id`
- `GET /dev-vault/snippet/getAllSnippets/:id`
- `PUT /dev-vault/snippet/updateSnippetByID/:id`
- `DELETE /dev-vault/snippet/deleteSnippetByID/:id`

## Notes

- Each snippet is associated with a specific user ID.
- The app is designed to keep snippets private to the logged-in user.
- The frontend currently points to the backend at `http://localhost:7000`.

## Future Improvements

- Add search filters for tags and dates
- Add snippet categories or folders
- Add export/import support for code snippets
- Add unit and integration tests
- Add pagination for large snippet collections

## License

This project does not currently declare a license. If you plan to open it to the public, add a license file and update this section accordingly.

## Project Status

This is an active development project focused on building a personal developer snippet vault with a clean full-stack architecture.

