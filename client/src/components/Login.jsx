import { useContext, useEffect, useState } from "react"
import { assets } from "../assets/assets"
import { AppContext } from "../context/AppContext"
import { motion } from "framer-motion"
import axios from 'axios'
import { toast } from "react-toastify"

const Login = () => {
    const [state, setState] = useState('Login')
    const { setShowLogin, backendUrl, setToken, setUser, setCredits} = useContext(AppContext)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onSubmitHandler = async(e) =>{
        e.preventDefault();
        
        try {
            if(state === 'Login'){
                const { data } = await axios.post(backendUrl + '/api/user/login', {
                    email, password
                })
                if (data.success) {
                    localStorage.setItem('token', data.token);
                    setToken(data.token);
                    setUser(data.user);
                    setCredits(data.user.credits);
                    setShowLogin(false);
                } else {
                    toast.error(data.message)
                }
            }else{
                const { data } = await axios.post(backendUrl + '/api/user/register', {
                    name, email, password
                })
                if (data.success) {
                    localStorage.setItem('token', data.token);
                    setToken(data.token);
                    setUser(data.user);
                    setCredits(data.user.credits);
                    setShowLogin(false);
                } else {
                    toast.error(data.message)
                }
            }

        } catch (error) {
            toast.error(error.message)
        }

    }

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    return (
        <div className="fixed left-0 right-0 top-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">
            <motion.form
            onSubmit={onSubmitHandler}
                initial={{ opacity: 0.2, y: 50 }}
                transition={{ duration: 0.3 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                action="" className="relative bg-white p-10 rounded-xl text-slate-500">
                <h2 className="text-2xl font-medium text-neutral-700 text-center">{state}</h2>
                <p className="text-sm">Welcome back! Please sign in to continue.</p>
                {state !== 'Login' && <div className="border px-6 py-2 flex items-center gap-2 mt-5 rounded-full">
                    <img width={20} src={assets.profile_icon} alt="" />
                    <input
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        type="text"
                        id="name"
                        className="outline-none text-sm"
                        placeholder="Full Name"
                        required
                    />
                </div>
                }
                <div className="border px-6 py-2 flex items-center gap-2 mt-5 rounded-full">
                    <img src={assets.email_icon} alt="" />
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        type="email"
                        id="email"
                        className="outline-none text-sm"
                        placeholder="Email"
                        required
                    />
                </div>
                <div className="border px-6 py-2 flex items-center gap-2 mt-5 rounded-full">
                    <img src={assets.lock_icon} alt="" />
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        type="password"
                        id="password"
                        className="outline-none text-sm"
                        placeholder="Password"
                        required
                    />
                </div>
                <p className="text-sm text-blue-500 my-6 cursor-pointer">Forgot password?</p>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-full hover:bg-blue-600 transition-colors"
                >
                    {state === 'Login' ? 'login' : 'create account'}
                </button>
                {state === 'Login' ?
                    <p className="mt-5 text-center text-sm">Don't have an account? <span onClick={() => setState('Sign Up')} className="text-blue-600 cursor-pointer">Sign up</span></p>
                    :
                    <p className="mt-5 text-center text-sm">Already have an account? <span onClick={() => setState('Login')} className="text-blue-600 cursor-pointer">Login</span></p>
                }
                <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" className="top-5 right-5 cursor-pointer absolute" />
            </motion.form>
        </div>
    )
}

export default Login
