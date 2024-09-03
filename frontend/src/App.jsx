import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import PageNotFound from "./components/PageNotFound";
import ShowNavbar from "./components/ShowNavbar";

function App() {
  return (
    <BrowserRouter>
      <div className="w-screen h-screen flex flex-col items-center">
        <ShowNavbar>
          <Navbar />
        </ShowNavbar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
