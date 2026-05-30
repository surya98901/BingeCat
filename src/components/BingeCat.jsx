import { motion } from "framer-motion";

const BingeCat = () => {
    return (
        <div className="">
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
            >
                <img
                    src={`${import.meta.env.BASE_URL}applogo.png`}
                    alt="logo"
                    className="w-full"
                />
            </motion.div>
        </div>
    )
}
export default BingeCat;