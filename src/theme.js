
import { createTheme } from "@mui/material";
import { blue, amber } from "@mui/material/colors";


const theme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: blue[700],
            contrastText: "#FFFFFF",
        },
        secondary: {
            main: amber[500],
            contrastText: "#FFFFFF",
        },
        contrastThreshold: 3,
        tonalOffset: 0.2,
        background: {
            paper: '#212121',
            default: '#fff'
        }

    }
})

export default theme