MovieExplorer
MovieExplorer is a React-based web application that allows users to browse movies using the TMDb (The Movie Database) API. It features a horizontal slideshow for trending movies, a search functionality, infinite scrolling for popular or searched movies, dark mode support, and a detailed movie dialog with trailer links.
Features

Trending Movies Slideshow: Displays a horizontally scrollable list of trending movies with navigation arrows.
Search Movies: Search for movies by title, with results displayed in a responsive grid.
Infinite Scrolling: Load more popular or searched movies as the user scrolls.
Dark Mode: Toggle between light and dark themes for better accessibility and user experience.
Movie Details Dialog: View detailed information about a movie, including poster, overview, release date, certification, user rating, and a YouTube trailer link (if available).
Responsive Design: Optimized for mobile, tablet, and desktop devices.

Prerequisites

Node.js: Version 14.x or higher.
npm: Version 6.x or higher.
TMDb API Key: Obtain a free API key from TMDb.

Installation

Clone the Repository:
git clone <repository-url>
cd movie-explorer

Install Dependencies:
npm install

Set Up Environment Variables:Create a .env file in the project root and add your TMDb API key:
VITE_API_KEY=your_tmdb_api_key_here

Run the Application:
npm run dev

The app will be available at http://localhost:5173 (or another port if specified).

Dependencies

React: JavaScript library for building user interfaces.
@mui/material: Material-UI components for styling and UI elements.
@mui/icons-material: Material-UI icons for navigation arrows.
@emotion/react & @emotion/styled: For styled components in Material-UI.
Vite: Build tool and development server.

Install dependencies using:
npm install react @mui/material @mui/icons-material @emotion/react @emotion/styled

Project Structure
movie-explorer/
├── src/
│ ├── components/
│ │ ├── Search.jsx # Search bar component
│ │ ├── navbar.jsx # Navigation bar with theme toggle
│ ├── App.jsx # Main app component
│ ├── home.jsx # Main movie browsing component
├── .env # Environment variables (e.g., API key)
├── package.json # Project metadata and dependencies
├── README.md # This file

Usage

Browse Trending Movies: On the homepage, view a horizontal slideshow of trending movies for the week. Use the left/right arrows to navigate or scroll manually.
Search Movies: Enter a movie title in the search bar to find specific movies.
Load More Movies: Scroll down or click "Load More" to fetch additional popular or searched movies.
View Movie Details: Click on a movie poster to open a dialog with detailed information, including a trailer link (if available).
Toggle Dark Mode: Use the theme switch in the navbar to toggle between light and dark modes.

Configuration

TMDb API: Ensure the VITE_API_KEY in .env is valid. Without it, API requests will fail.
Styling: Customize the MovieExplorer.jsx file to adjust card sizes, colors, or scrollbar styles.
Navigation Arrows: Modify the scrollBy value (currently 300) in MovieExplorer.jsx to change the scroll distance.

Known Issues

API Rate Limits: TMDb has rate limits. Heavy usage may require handling rate-limiting errors.
Missing Trailers: Some movies may not have YouTube trailers, displaying "Not available" in the dialog.
Scrollbar Visibility: The scrollbar is styled but visible. To hide it, update the CSS in MovieExplorer.jsx to &::-webkit-scrollbar: { display: "none" }.

Fork the repository.
Create a feature branch (git checkout -b feature/your-feature).
Commit your changes (git commit -m 'Add your feature').
Push to the branch (git push origin feature/your-feature).
Open a pull request.

License
This project is licensed under the MIT License.
Acknowledgments

TMDb API for movie data.
Material-UI for UI components and styling.
