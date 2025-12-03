import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import ChatbotPage from "../pages/ChatbotPage";
import CardPage from "../pages/CardPage";
import SearchPage from "../pages/SearchPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "forgot-password",
        element: <ForgotPasswordPage />,
      },
      {
        path: "chatbot",
        element: <ChatbotPage />,
      },
      {
        path: "farming",
        element: <CardPage type="farming" />,
      },
      {
        path: "dairy",
        element: <CardPage type="dairy" />,
      },
      {
        path: "education",
        element: <CardPage type="education" />,
      },
      {
        path: "health",
        element: <CardPage type="health" />,
      },
      {
        path: "solar",
        element: <CardPage type="solar" />,
      },
      {
        path: "water",
        element: <CardPage type="water" />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
    ],
  },
]);

export default router;
