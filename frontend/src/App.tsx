import "./App.css";
import { RouterProvider } from "react-router";
import { router } from "./lib/router/router.ts";

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
