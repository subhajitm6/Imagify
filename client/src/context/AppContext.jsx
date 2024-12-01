import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from 'axios'
import { Navigate, useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [showLogin, setShowLogin] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [credits, setCredits] = useState(false);

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const loadCredits = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/user/credits', {
                headers: {
                    token
                }
            });
            if (data.success) {
                setCredits(data.credits);
                setUser(data.user);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    };

    const generateImage = async (prompt) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/image/generate-image', {
                prompt
            }, {
                headers: {
                    token
                }
            });
            if (data.success) {
                loadCredits();
                return data.resultImage;
            } else {
                toast.error(data.message);
                loadCredits();
                if(data.credits <=0){
                    navigate('/buy')
                }
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        setCredits(false);
        toast.success('Logged out successfully');
    };

    useEffect(() => {
        if(token){
            loadCredits()
        }
    }, [token]);

    const value = {
        user, setUser, showLogin, setShowLogin, backendUrl, token,
        setToken, credits, setCredits, loadCredits, logout, generateImage
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider; 