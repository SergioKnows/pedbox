import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Footer from "./components/Footer";
import GoTop from "./components/GoTop";

function App() {
  return (
    <Router>
      <Header />
      <Home />
      <Footer />
      <GoTop />
    </Router>
  );
}

export default App;
