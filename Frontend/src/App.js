import React, { createContext, useContext, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Messenger from "./pages/messenger/Messenger";
import NoteState from "./context/notes/NoteState";
import PageNotFound from "../src/pages/PageNotFound";
import NotePage from "./pages/NotePage/NotePage";
import MainPage from "./pages/mainPage/MainPage";
import Search from "./components/search/Search";
import "./App.css";
import FirebaseSignUp from "./chatComponents/firebase/FirebaseSignUp";
import FirebaseLogin from "./chatComponents/firebase/FirebaseLogin";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import EditNote from "./components/editNote/EditNote";
import { AuthContext } from "./context/authContext/AuthContext";

export const ThemeContext = createContext(null);
const App = () => {
  const [theme, setTheme] = useState("light");
  const { firebaseUser } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!firebaseUser) {
      return <Navigate to="/firebaselogin" />;
    }

    return children;
  };
  const queryClient = new QueryClient();
  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
        <div className="app" id={theme}>
          <NoteState>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/search" element={<Search />} />
                <Route path="/edit/:id" element={<EditNote />} />
                <Route
                  path="/message"
                  element={
                    <ProtectedRoute>
                      <Messenger />
                    </ProtectedRoute>
                  }
                />
                <Route path="/message" element={<Messenger />} />
                <Route path="/login" element={<Login />} />
                <Route path="/firebaselogin" element={<FirebaseLogin />} />
                <Route path="/firebasesignup" element={<FirebaseSignUp />} />

                <Route path="/mynotes" element={<Home />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="*" element={<PageNotFound />} />
                <Route path="/notepage/:id" element={<NotePage />} />
              </Routes>
            </BrowserRouter>
          </NoteState>
        </div>
      </ThemeContext.Provider>
    </QueryClientProvider>
  );
};

export default App;
