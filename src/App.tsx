import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Routes/Home";
import Tv from "./Routes/Tv";
import Search from "./Routes/Search";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";
import GlobalStyle from "./globalstyle";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <GlobalStyle />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies/:id" element={<Home />} />
          <Route path="/tv" element={<Tv />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
