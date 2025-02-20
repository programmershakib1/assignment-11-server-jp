# Task Management API (Server Side)

## Short Description

This is the backend API for the Task Management application. It provides functionalities for managing tasks with features like task creation, deletion, updating, categorization, and task order management. The server is built using Node.js, Express.js, and MongoDB. It supports authentication via Firebase and ensures secure and efficient task management through API endpoints.

## Live Link

You can check out the live demo of the application here:  
[Live Application](https://tasks-management-org.netlify.app)

## Technologies Used

The following technologies are used in the server-side of the project:

- **Express.js**: A fast, unopinionated web framework for Node.js to handle routing and server-side logic.
- **MongoDB**: A NoSQL database used for storing and managing application data.
- **JWT (JSON Web Token)**: For secure authentication and authorization.
- **Cors**: A package used to enable Cross-Origin Resource Sharing (CORS) in the server.
- **dotenv**: Loads environment variables from a `.env` file into `process.env` for configuration management.

## Dependencies

The following dependencies are used in this project:

- **cors**: ^2.8.5 - Middleware to enable Cross-Origin Resource Sharing.
- **dotenv**: ^16.4.7 - Loads environment variables from a `.env` file into `process.env`.
- **express**: ^4.21.2 - A web framework for Node.js to handle routing and HTTP requests.
- **jsonwebtoken**: ^9.0.2 - Used for secure JWT authentication.
- **mongodb**: ^6.13.0 - MongoDB client for interacting with the MongoDB database.

## Installation Steps

To get this project up and running on your local machine, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/programmershakib1/assignment-11-server-jp.git
   cd assignment-11-server-jp
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure the environment variables:

   - Create a `.env` file in the root directory.
   - Add the necessary variables for MongoDB, JWT.
   - 🚨 **Important:** Never expose your `.env` file in public repositories. Use `.gitignore` to keep it secure.

4. Start the server:

   ```bash
   node index.js
   ```

---

## 🔗 Live Project & Resources

🌍 **Live Site:** [Live Application](https://tasks-management-org.netlify.app)

📂 **GitHub Repository:** [GitHub Link](https://github.com/programmershakib1/assignment-11-server-jp)

---

Thank you for Exploring the Tasks Management! 🚀
