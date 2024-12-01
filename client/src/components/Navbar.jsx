import { Link, useNavigate } from "react-router-dom"
import { assets } from "../assets/assets"
import { useContext } from "react"
import { AppContext } from "../context/AppContext"

const Navbar = () => {
    const { user, setShowLogin, credits, logout } = useContext(AppContext);

    const navigate = useNavigate();
    return (
        <div className="flex justify-between items-center py-4">
            <Link to="/">
                <img src={assets.logo} alt="" className="w-28 sm:w-32 lg:w-40" />
            </Link>
            <div>
                {
                    user ?
                        <div className="flex items-center gap-2 sm:gap-3">
                            <button onClick={() => navigate('/buy')} className="flex gap-2 items-center px-4 py-1.5 sm:px-6 sm:py-3 rounded-full bg-blue-200 hover:scale-105 transition-all duration-700">
                                <img src={assets.credit_star} alt="" className="w-4" />
                                <p className="text-xs sm:text-sm font-medium text-gray-600">Credit left: {credits}</p>
                            </button>
                            <p className="text-gray-600 max-sm:hidden pl-4">Hi, {user.name}</p>
                            <div className="relative group">
                                <img src={assets.profile_icon} alt="" className="w-10 drop-shadow" />
                                <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12">
                                    <ul className="list-none m-0 p-2 border text-sm rounded-md bg-white">
                                        <li onClick={logout} className="py-1 px-2 cursor-pointer pr-10">Logout</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        :
                        <div className="flex gap-2 items-center sm:gap-5">
                            <p onClick={() => navigate('/buy')} className="cursor-pointer">Pricing</p>
                            <button onClick={()=>setShowLogin(true)} className="bg-zinc-800 text-white px-7 py-2 sm:px-8 rounded-full text-sm">Login</button>
                        </div>
                }
            </div>
        </div>
    )
}

export default Navbar
