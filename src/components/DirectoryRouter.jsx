import Dust, { useState } from "src";

import { matchRoute } from "src/router";

function DirectoryRouter() {
  const [route, setRoute] = useState();
  const [page, setPage] = useState();

  matchRoute((route, page) => {
    setRoute(route);
    setPage(page());
  });

  console.log("Rendering <DirectoryRouter/>");

  return (
    <>
      <h1>Hi, my name is DirectoryRouter! :) </h1>
      <p>Route: {route()}</p>
      <div>{page()}</div>
    </>
  );
}

export default DirectoryRouter;
