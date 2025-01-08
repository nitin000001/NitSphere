import { createContext, useContext, useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { PinData } from "./PinContext";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [isAuth, setIsAuth] = useState(false);
  const [btnLoading, setbtnLoading] = useState(false);
  

  async function registerUser(name, email, password, navigate, fetchPins) {
    setbtnLoading(true);
    try {
      const { data } = await axios.post("/api/user/register", {name, email, password });

      toast.success(data.message);
      setUser(data.user);
      setIsAuth(true);
      setbtnLoading(false);
      navigate("/");
      fetchPins();
    } catch (error) {
      toast.error(error.response.data.message);
      setbtnLoading(false);
    }
  }

  async function loginUser(email, password, navigate, fetchPins) {
    setbtnLoading(true);
    try {
      const { data } = await axios.post("/api/user/login", { email, password });
      toast.success(data.message);
      setUser(data.user);
      setIsAuth(true);
      navigate("/");
      fetchPins();
      setbtnLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setbtnLoading(false);
    }
  }

  const [loading, setLoading] = useState(true);

  async function fetchUser() {
    try {
      const { data } = await axios.get("/api/user/me");
      setUser(data);
      setIsAuth(true);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

   const followUser = async (id, fetchUser) => {
    try {
      const { data } = await axios.get(`/api/user/follow/${id}`);
      toast.success(data.message);
      fetchUser();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to follow user.");
    }
  };
  
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider
      value={{ loginUser, btnLoading, isAuth, user, loading, registerUser, setIsAuth, setUser, followUser }}
    >
      {children}
      <Toaster />
    </UserContext.Provider>
  );
};

export const UserData = () => useContext(UserContext);
