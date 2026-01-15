import {
  Box,
} from "@mui/material";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useThemeStore } from "./utils/store";

const Layout = ({ children }) => {
  const [theme,] = useThemeStore();

  return (
    <>
      <Header />
      <Box
        className="main-component"
        style={{
          backgroundColor: theme == 'dark-theme' ? '#2A2A2A' : 'white',
        }}
      >
        {children}
      </Box>
      <Footer />
    </>
  );
};

export default Layout;
