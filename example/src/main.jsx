import Dust, { createRoot } from "dust";

// import App from "./App.BrowserRouter";
import App from "./App.DirectoryRouter";

const root = createRoot(document.getElementById("root"));
root.render(<App />);
