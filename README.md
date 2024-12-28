# Frontend for Note-Taking Application

This repository contains the frontend of a note-taking application built with React and TypeScript. The application allows users to create, view, and delete notes. It also includes features like user authentication, soft delete functionality for notes, and responsiveness.

## Features

- User authentication (Login/Logout)
- Create, view, and delete notes
- Soft delete functionality for notes
- Responsive design

## Prerequisites

Before setting up the frontend, ensure you have the following installed:

- Node.js (v16 or above)
- npm or yarn

## Getting Started

Follow these steps to set up the project locally:

### 1. Clone the repository
```bash
git clone <repository-url>
cd frontend
```

### 2. Install dependencies
```bash
npm install
# or
yarn install
```

### 3. Set up environment variables

Create a `.env` file in the root directory and add the following variables:

```env
VITE_USER_API_ENDPOINT=<backend_user_api_endpoint>
VITE_NOTE_API_ENDPOINT=<backend_note_api_endpoint>
```

Replace `<backend_user_api_endpoint>` and `<backend_note_api_endpoint>` with the respective API endpoints from your backend setup.

### 4. Run the application
```bash
npm run dev
# or
yarn dev
```

Open the application in your browser at `http://localhost:5173`.

## Folder Structure

```plaintext
src/
├── assets/             # Images, icons, and other static assets
├── components/         # Reusable React components (e.g., Dashboard, Notes, etc.)
├── hooks/              # Custom React hooks (e.g., useGetUserNotes)
├── pages/              # Page components for routing (e.g., SignIn, Dashboard)
├── redux/              # Redux store, slices, and actions
├── styles/             # Global and modular CSS/SCSS files
├── App.tsx             # Root component
├── main.tsx            # Entry point of the application
└── vite.config.ts      # Vite configuration file
```

## Soft Delete Functionality

The soft delete functionality ensures that notes are not permanently removed from the database when a user deletes them. Instead, the notes are marked as deleted and can be restored or permanently deleted later. This feature enhances data safety and user experience.

## API Integration

The frontend communicates with the backend using Axios for making HTTP requests. API endpoints are configured using environment variables for flexibility.

### Example Endpoints

1. **Sign In**  
   Endpoint: `/signin`
   Method: `POST`

2. **Create Note**  
   Endpoint: `/createnote`
   Method: `POST`

3. **Get Notes**  
   Endpoint: `/getnotes`
   Method: `GET`

4. **Delete Note**  
   Endpoint: `/deletenote/:id`
   Method: `DELETE`

## Technologies Used

- **React** for building the user interface
- **TypeScript** for type safety
- **Redux** for state management
- **Axios** for HTTP requests
- **Vite** for fast development and build tooling
- **Tailwind CSS** for styling

## Scripts

- `npm run dev`: Starts the development server
- `npm run build`: Builds the application for production
- `npm run preview`: Serves the production build locally
## Contributing

Contributions are welcome!

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Push to your fork.
5. Submit a pull request.

---

## Contact

For any issues or inquiries, please contact:
- **Author**: Vishal Mishra
- **Email**: vm069713@gmail.com

