import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search"; // Correct import

const Search = ({ onSearch, darkMode }) => {
  const handleSearchChange = (event) => {
    const query = event.target.value;
    onSearch(query);
  };

  return (
    <TextField
      fullWidth
      variant="outlined"
      placeholder="Search for a movie..."
      onChange={handleSearchChange}
      sx={{
        maxWidth: 600,
        "& .MuiOutlinedInput-root": {
          borderRadius: 2,
          bgcolor: darkMode ? "grey.700" : "background.paper",
          "& fieldset": {
            borderColor: darkMode ? "grey.600" : "grey.300",
          },
          "&:hover fieldset": {
            borderColor: darkMode ? "grey.500" : "grey.400",
          },
          "&.Mui-focused fieldset": {
            borderColor: "primary.main",
          },
        },
        "& .MuiInputBase-input": {
          color: darkMode ? "grey.200" : "grey.900",
          py: 1.5,
        },
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon sx={{ color: darkMode ? "grey.400" : "grey.600" }} />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default Search;
