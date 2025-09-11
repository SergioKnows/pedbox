import { Routes, Route } from "react-router-dom";
import SubredditList from "./SubredditList";
import SubredditDetail from "./SubredditDetail";

export default function Home() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<SubredditList />} />
        <Route path="/subreddit/:id" element={<SubredditDetail />} />
      </Routes>
    </main>
  );
}
