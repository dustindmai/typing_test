import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./Styles/global";
import Footer from "./components/Footer";
import TypingBox from "./components/TypingBox"
import { useTheme } from "./context/ThemeContext";

function App() {
  const {theme} = useTheme();
  return (
    <ThemeProvider theme = {theme}>
      <div className="canvas">
        <GlobalStyles/>
        <div>Header</div>
        <TypingBox/>
        <Footer/>
      </div>
    </ThemeProvider>

  );
}

export default App;
