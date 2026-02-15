import { BrowserRouter as Router } from "react-router-dom";
import Sidebar from "./components/layout/Sidebar.jsx";
import Chat from "./pages/Chat.jsx";

function App() {
  return (
    <Router>
      <div style={{ display: "flex", height: "100vh" }}>
        <Sidebar />
        <div style={{ flex: 1 }}>
          <Chat />
        </div>
      </div>
    </Router>
  );
}

export default App;