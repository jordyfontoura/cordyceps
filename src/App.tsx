import React from "react";
import "styles/App.scss";
import Editor from "./Editor";
import Play from "./Play";

function App() {
  const url = new URL(window.location.href);

  if (url.pathname.match(/^\/play.*$/)) {
    return <Play />
  }
  return <Editor />;
}

export default App;
