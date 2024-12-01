import { useContext } from "react"
import { assets, plans } from "../assets/assets"
import { AppContext } from "../context/AppContext"
import { motion } from "framer-motion"

const BuyCredit = () => {
  const { user } = useContext(AppContext);

  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="min-h-[80vh] text-center pt-14 mb-10">
      <button className="border border-gray-400 px-10 py-2 rounded-full uppercase text-sm mb-6">Our Plans</button>
      <h1 className='text-center text-3xl font-semibold mb-6 sm:mb-10'>Choose the plan</h1>

      <div className='flex flex-wrap justify-center gap-6 text-left'>
        {
          plans.map((item, index) => (
            <div key={index} className='bg-white drop-shadow-sm px-8 py-12 rounded-lg border text-gray-600 hover:scale-105 transition-all duration-500'>
              <img src={assets.logo_icon} alt="" className='w-5' />
              <h1 className="mt-3 mb-1 font-semibold">{item.id}</h1>
              <p className="text-sm">{item.desc}</p>
              <p className="mt-6"><span className="text-3xl font-medium">${item.price}</span> / {item.credits}</p>
              <button className="bg-zinc-800 w-full text-white rounded-md py-2.5 min-w-52 text-sm mt-8">{user ? 'Purchase' : 'Get Started'}</button>
            </div>
          ))
        }
      </div>
    </motion.div>
  )
}

export default BuyCredit
