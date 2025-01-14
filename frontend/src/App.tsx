import "./App.css";
import { NavBar } from "./compontents/NavBar";
import { BrowserRouter, Route, Routes } from "react-router";
import { HomePage } from "./pages/HomePage";
import { LeaderBoardPage } from "./pages/LeaderBoardPage";
import { RoomPage } from "./pages/RoomPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<NavBar />}>
          <Route index element={<HomePage />} />
          <Route path="/leaderboard" element={<LeaderBoardPage />} />
          <Route path="/room/:roomId" element={<RoomPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
