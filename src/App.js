import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./Styles/global";
import Footer from "./components/Footer";
import TypingBox from "./components/TypingBox"
import { useTheme } from "./context/ThemeContext";
import Header from "./components/Header";
import {ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const {theme} = useTheme();
  return (
    <ThemeProvider theme = {theme}>
      <ToastContainer/>
      <div className="canvas">
        <GlobalStyles/>
        <Header/>
        <TypingBox/>
        <Footer/>
      </div>
    </ThemeProvider>

  );
}

export default App;
