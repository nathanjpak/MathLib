import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import App from "./App";
import GeneratorForm from "./components/GeneratorForm";
import Login from "./components/Login";
import ProblemSet from "./components/ProblemSet";
import SignUp from "./components/SignUp";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<GeneratorForm />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/s/:setId" element={<ProblemSet />} />
    </Route>
  )
);

export default router;
