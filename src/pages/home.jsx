import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import {
  Typography,
  Box,
  CircularProgress,
  Grid,
  Button,
  FormGroup,
  FormControlLabel,
  Switch,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Link,
} from "@mui/material";
import Search from "../components/Search";
import Navbar from "../components/navbar";

const MaterialUISwitch = styled(Switch)(() => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& + .MuiSwitch-track": {
        backgroundColor: "#8796A5",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: "#001e3c",
    width: 32,
    height: 32,
  },
  "& .MuiSwitch-track": {
    backgroundColor: "#aab4be",
    borderRadius: 10,
  },
}));

export default function MovieExplorer() {
  const [darkMode, setDarkMode] = useState(false);
  const [movies, setMovies] = useState([]);
  const [trending, setTrending] = useState([]);
  const [loadingMovies, setLoadingMovies] = useState(true);
  const [loadingTrending, setLoadingTrending] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? "#1F2937" : "#F3F4F6";
    document.body.style.color = darkMode ? "#ffffff" : "#000000";
  }, [darkMode]);

  // Fetch popular or searched movies
  const fetchMovies = async (page, query = "") => {
    setLoadingMovies(true);
    try {
      const endpoint = query
        ? `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
            query
          )}&page=${page}`
        : `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}`;
      const res = await fetch(endpoint);
      const data = await res.json();
      if (data.results?.length) {
        const withCert = await Promise.all(
          data.results.map(async (m) => ({
            ...m,
            certification: await fetchCertification(m.id),
          }))
        );
        setMovies((prev) => (page === 1 ? withCert : [...prev, ...withCert]));
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingMovies(false);
    }
  };

  // Fetch trending movies
  const fetchTrending = async () => {
    setLoadingTrending(true);
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
      );
      const data = await res.json();
      setTrending(data.results || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingTrending(false);
    }
  };

  const fetchCertification = async (id) => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/release_dates?api_key=${API_KEY}`
      );
      const data = await res.json();
      const us = data.results.find((r) => r.iso_3166_1 === "US");
      return us?.release_dates?.[0]?.certification || "Not Rated";
    } catch {
      return "Not Rated";
    }
  };

  const fetchTrailer = async (id) => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`
      );
      const data = await res.json();
      const tr = data.results.find(
        (v) => v.type === "Trailer" && v.site === "YouTube"
      );
      return tr ? `https://www.youtube.com/watch?v=${tr.key}` : "";
    } catch {
      return "";
    }
  };

  // Effects
  useEffect(() => {
    fetchTrending();
  }, []);

  useEffect(() => {
    fetchMovies(page, searchQuery);
  }, [page, searchQuery]);

  const handleSearch = (q) => {
    setSearchQuery(q);
    setPage(1);
    setHasMore(true);
  };
  const handleThemeChange = (e) => setDarkMode(e.target.checked);
  const loadMore = () => setPage((p) => p + 1);
  const openDetails = async (m) => {
    setSelectedMovie(m);
    setTrailerUrl(await fetchTrailer(m.id));
    setOpen(true);
  };
  const closeDetails = () => {
    setOpen(false);
    setSelectedMovie(null);
    setTrailerUrl("");
  };

  return (
    <Box className={darkMode ? "bg-gray-800" : "bg-gray-100"}>
      <Navbar darkMode={darkMode} onThemeChange={handleThemeChange} />

      {/* Trending Section */}
      <Box sx={{ pt: 20, px: 4, pb: 4 }}>
        <Typography
          variant="h5"
          sx={{
            mb: 2,
            textAlign: "center",
            color: darkMode ? "white" : "grey.900",
          }}
        >
          Trending in This Week
        </Typography>
        {loadingTrending ? (
          <Box className="flex justify-center my-4">
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={2}>
            {trending.map((movie) => (
              <Grid item xs={6} sm={4} md={3} lg={2} key={movie.id}>
                <Box
                  onClick={() => openDetails(movie)}
                  sx={{
                    cursor: "pointer",
                    borderRadius: 2,
                    overflow: "hidden",
                    boxShadow: 3,
                  }}
                >
                  <Box
                    component="img"
                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                    alt={movie.title}
                    sx={{ width: "100%", height: 200, objectFit: "cover" }}
                  />
                  <Typography
                    variant="subtitle2"
                    sx={{
                      p: 1,
                      color: darkMode ? "grey.100" : "grey.900",
                      fontWeight: "bold",
                    }}
                  >
                    {movie.title}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      {/* Search & Popular Section */}
      <Box className="px-4 sm:px-6 lg:px-8">
        <Box sx={{ my: 4, display: "flex", justifyContent: "center" }}>
          <Search onSearch={handleSearch} darkMode={darkMode} />
        </Box>
        <Grid container spacing={4}>
          {movies.map((movie) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
              <Box
                onClick={() => openDetails(movie)}
                className={`p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 cursor-pointer ${
                  darkMode ? "bg-gray-700" : "bg-white"
                }`}
              >
                <Box
                  component="img"
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-96 object-cover rounded-md mb-4"
                />
                <Typography
                  variant="h6"
                  className={`font-semibold truncate ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {" "}
                  {movie.title}{" "}
                </Typography>
                <Typography
                  variant="subtitle2"
                  className={darkMode ? "text-gray-300" : "text-gray-600"}
                >
                  Release: {movie.release_date}
                </Typography>
                <Typography
                  variant="subtitle2"
                  className={darkMode ? "text-gray-300" : "text-gray-600"}
                >
                  Certification: {movie.certification}
                </Typography>
                <Typography
                  variant="subtitle2"
                  className={darkMode ? "text-gray-300" : "text-gray-600"}
                >
                  User Rating: {movie.vote_average.toFixed(1)} / 10
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
        {loadingMovies && (
          <Box className="flex justify-center my-8">
            <CircularProgress />
          </Box>
        )}
        {!loadingMovies && hasMore && (
          <Box className="flex justify-center my-8">
            <Button
              variant="contained"
              onClick={loadMore}
              className={`${
                darkMode
                  ? "bg-blue-500 hover:bg-blue-600"
                  : "bg-blue-600 hover:bg-blue-700"
              } text-white font-semibold py-2 px-6 rounded-md`}
            >
              Load More
            </Button>
          </Box>
        )}
        {!hasMore && (
          <Typography
            variant="body1"
            className={`text-center my-8 ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            No more movies to load.
          </Typography>
        )}
      </Box>

      {/* Details Dialog */}
      {selectedMovie && (
        <Dialog
          open={open}
          onClose={closeDetails}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: 3,
              bgcolor: darkMode ? "grey.800" : "background.paper",
            },
          }}
        >
          <DialogTitle
            sx={{
              bgcolor: darkMode ? "grey.900" : "primary.main",
              color: "white",
              py: 2,
              px: 3,
              fontWeight: "bold",
            }}
          >
            {selectedMovie.title}
          </DialogTitle>
          <DialogContent
            sx={{ p: 3, bgcolor: darkMode ? "grey.800" : "background.paper" }}
          >
            <Box
              sx={{
                display: "flex",
                gap: 3,
                flexDirection: { xs: "column", md: "row" },
              }}
            >
              <Box
                component="img"
                src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
                alt={selectedMovie.title}
                sx={{
                  width: { xs: "100%", md: "33%" },
                  borderRadius: 2,
                  boxShadow: 3,
                }}
              />
              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    color: darkMode ? "white" : "grey.900",
                  }}
                >
                  Overview
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: darkMode ? "grey.300" : "grey.600",
                    lineHeight: 1.6,
                  }}
                >
                  {selectedMovie.overview || "No overview available."}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: darkMode ? "grey.300" : "grey.600" }}
                >
                  <strong>Release Date:</strong> {selectedMovie.release_date}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: darkMode ? "grey.300" : "grey.600" }}
                >
                  <strong>Certification:</strong> {selectedMovie.certification}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: darkMode ? "grey.300" : "grey.600" }}
                >
                  <strong>User Rating:</strong>{" "}
                  {selectedMovie.vote_average.toFixed(1)} / 10 (
                  {selectedMovie.vote_count} votes)
                </Typography>
                {trailerUrl ? (
                  <Link
                    href={trailerUrl}
                    target="_blank"
                    rel="noopener"
                    sx={{
                      mt: 1,
                      textDecoration: "underline",
                      color: "primary.main",
                    }}
                  >
                    Watch Trailer
                  </Link>
                ) : (
                  <Typography
                    variant="body2"
                    sx={{ color: darkMode ? "grey.300" : "grey.600" }}
                  >
                    <strong>Trailer:</strong> Not available
                  </Typography>
                )}
              </Box>
            </Box>
          </DialogContent>
          <DialogActions
            sx={{ p: 3, bgcolor: darkMode ? "grey.900" : "background.paper" }}
          >
            <Button
              onClick={closeDetails}
              variant="contained"
              sx={{ textTransform: "none", fontWeight: "bold" }}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
}
