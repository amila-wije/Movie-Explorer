import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // validation
    const validUsername = "admin";
    const validPassword = "1234";

    if (username === validUsername && password === validPassword) {
      setError("");
      navigate("/home");
    } else {
      setError("Invalid username or password");
    }
  };

  const [backgroundImage, setBackgroundImage] = useState(
    "url('https://element-assets.nyc3.cdn.digitaloceanspaces.com/Element_Favorites_14_Creative_Films_You_Need_to_Watch_5b8e35d510.jpg')"
  );

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setBackgroundImage(
        "url('https://static.vecteezy.com/system/resources/previews/044/514/545/non_2x/background-a-movie-theater-where-love-stories-are-unfolding-on-the-big-screen-and-the-smell-of-popcorn-fills-the-air-photo.jpg')"
      );
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="login flex flex-col items-center justify-center min-h-screen bg-gray-100"
      style={{
        backgroundImage: backgroundImage,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        backgroundBlendMode: "overlay",
      }}
    >
      <h1 className="text-3xl font-bold mb-6 animate-pulse bg-gradient-to-tl from-blue-500 to-purple-500 text-transparent bg-clip-text">
        <span className="text-center flex flex-col items-center text-4xl font-bold text-gray-1000">
          Movie Explorer
        </span>
        <br /> Discover Your Favorite Films
      </h1>
      <form
        className="bg-white p-6 rounded-lg shadow-md w-80"
        onSubmit={handleSubmit}
      >
        <h1 className="text-4xl font-bold mb-6 text-gray-800 text-center">
          Login
        </h1>
        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-4 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Button
          type="submit"
          variant="outlined"
          size="medium"
          className="w-full text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white"
        >
          SUBMIT
        </Button>
      </form>
    </div>
  );
}

export default Login;
