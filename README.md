# Sound808 🎵

An application for managing songs, albums, genres, and artists. It allows viewing, adding, updating, and deleting records through a simple and interactive interface.

## 🌟 Features

- **Manage Songs, Albums, Genres, and Artists**: Add, edit, delete, and view information about songs, albums, genres, and artists.
- **Asynchronous Operations**: The application communicates with a backend API to efficiently perform CRUD operations.
- **Responsive Interface**: Adapts to different screen sizes for usability across devices.

## 🛠️ Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/t8ne/sound808.git
   ```

2. Navigate to the project directory:

   ```bash
   cd sound808
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Install `nodemon` globally:

   ```bash
   npm install -g nodemon
   ```

5. Run the API server with `nodemon`:

   ```bash
   nodemon server.js
   ```

6. To access the database, start XAMPP or MAMP and import the SQL code where the data for songs, albums, genres, and artists is stored.
7. Open a new terminal and go to the frontend directory:

   ```bash
   cd frontend
   ```

8. Run the Svelte development server:
   ```bash
   npm run dev
   ```

## 🔧 Configuration

- **Backend Connection**: Make sure the API URL in the code is correct and points to your local backend.
- **Database**: Ensure that XAMPP/MAMP is running and the database is properly set up for the application.

## 🌐 Supported Browsers

Tested and working on:

- Chrome
- Firefox
- Safari
- Edge

## 🙋‍♂️ Author

@t2ne

## 🎓 Academic Project

This project was developed as part of an academic assignment, demonstrating the construction of a web application for managing data with backend integration and API communication.
