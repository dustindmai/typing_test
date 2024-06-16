import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./Styles/global";
import Footer from "./components/Footer";
import TypingBox from "./components/TypingBox"
import { useTheme } from "./context/ThemeContext";
import Header from "./components/Header";

function App() {
  const {theme} = useTheme();
  return (
    <ThemeProvider theme = {theme}>
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
