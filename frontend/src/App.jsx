import { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Footer from "./components/Footer";
import GoTop from "./components/GoTop";

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleAuthChange = () => {
    // Forzar re-render de SubredditList
    setRefreshKey(prev => prev + 1);
  };

  return (
    <Router>
      <Header onAuthChange={handleAuthChange} />
      <Home key={refreshKey} />
      <Footer />
      <GoTop />
    </Router>
  );
}

export default App;
