import {
  AppBar,
  Toolbar,
  Typography,
  FormGroup,
  FormControlLabel,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";

// Styled Material UI switch
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

export default function Navbar({ darkMode, onThemeChange }) {
  return (
    <AppBar
      position="fixed"
      className={darkMode ? "bg-gray-900" : "bg-blue-600"}
    >
      <Toolbar className="flex justify-between items-center">
        <Typography variant="h6" className="font-bold text-white">
          Movie Explorer
        </Typography>
        <FormGroup>
          <FormControlLabel
            control={
              <MaterialUISwitch checked={darkMode} onChange={onThemeChange} />
            }
            label={<Typography className="text-white">Dark Theme</Typography>}
          />
        </FormGroup>
      </Toolbar>
    </AppBar>
  );
}
