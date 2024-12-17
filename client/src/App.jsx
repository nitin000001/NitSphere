import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { UserData } from "./context/UserContext";
import { Loading } from "./components/LoadingAnimation";
import Navbar from "./components/Navbar";
import { BrowserRouter } from "react-router-dom";
import PinPage from "./pages/PinPage";
import Create from "./pages/Create";
import Account from "./pages/Account";
import UserProfile from "./pages/UserProfile";

const App = () => {
  const { loading, isAuth, user } = UserData();

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <BrowserRouter>
          {isAuth && <Navbar user={user} />}
          <Routes>
            <Route path="/" element={isAuth ? <Home /> : <Login />} />
            <Route path="/account" element={isAuth ? <Account user={user} /> : <Login />} />
            <Route path="/user/:id" element={isAuth ? <UserProfile user={user} /> : <Login />} />
            <Route path="/create" element={isAuth ? <Create /> : <Login />} />
            <Route path="/pin/:id" element={isAuth ? <PinPage user={user} /> : <Login />} />
            <Route path="/login" element={isAuth ? <Home /> : <Login />} />
            <Route path="/register" element={isAuth ? <Home /> : <Register />} />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
};

export default App;
