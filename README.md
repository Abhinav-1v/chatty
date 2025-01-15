
# Chatty

Chatty is a real-time chat application built with the MERN stack, incorporating additional libraries for enhanced UI and state management.

## Features

- **Real-time messaging** using Socket.io
- **Responsive design** with Tailwind CSS and DaisyUI
- **Global state management** with Zustand
- **Notifications** using React Hot Toast

## Tech Stack

### Frontend
- **React.js**
- **Tailwind CSS**
- **DaisyUI**
- **Zustand**
- **React Hot Toast**

### Backend
- **Node.js**
- **Express.js**
- **Socket.io**

### Database
- **MongoDB**

## Deployment

The project has been deployed and can be accessed at: [Deployed Version](https://chatty-gammaa.vercel.app/)

## Installation for Local Development

If you wish to run the project locally, follow these steps:

### Clone the Repository

```bash
git clone https://github.com/Abhinav-1v/chatty.git
cd chatty
```

### Install Dependencies

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd ../frontend
npm install
```

### Set Up Environment Variables

#### Backend
Create a `.env` file in the `backend` directory with the following:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

#### Frontend
Create a `.env` file in the `frontend` directory if required for any environment-specific variables.

### Run the Application Locally

#### Start the Backend Server

```bash
cd backend
npm start
```

#### Start the Frontend Development Server

```bash
cd ../frontend
npm start
```

The backend server will run on `http://localhost:5000`, and the frontend on `http://localhost:3000`. Make sure to update any configurations as necessary to connect to the backend.

## Usage

- Open your browser and navigate to the deployed version or your local setup.
- Register or log in to start chatting in real-time.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.


## Acknowledgements

- [Tailwind CSS](https://tailwindcss.com/)
- [DaisyUI](https://daisyui.com/)
- [Zustand](https://github.com/pmndrs/zustand)
- [React Hot Toast](https://react-hot-toast.com/)
- [Socket.io](https://socket.io/)
