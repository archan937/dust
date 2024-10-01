import Dust, { useState } from "dust";

import AboutMe from "./pages/AboutMe";
import Home from "./pages/Home";

function App() {
  console.log("Rendering <App/>");

  return <Home />;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="me" element={<AboutMe />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
