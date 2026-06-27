import Modal from "./Modal";
import { Link } from "react-router-dom";
import { FaLock, FaFilm } from "react-icons/fa";
import { motion } from "framer-motion";

function LoginRequiredModal({ isOpen, onClose, action = "add to favorites" }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-8 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.1 }}
          className="w-16 h-16 bg-[#e50914]/10 border border-[#e50914]/20 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <FaLock className="text-[#e50914] text-xl" />
        </motion.div>
        <h3 className="text-white text-xl font-semibold mb-2">Sign In Required</h3>
        <p className="text-gray-400 text-sm mb-6">
          You need to be signed in to {action}. Join CineVerse to save your movies and build your collection.
        </p>
        <div className="flex gap-3 justify-center">
          <Link
            to="/login"
            onClick={onClose}
            className="flex items-center gap-2 bg-[#e50914] hover:bg-red-700 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-colors"
          >
            <FaFilm className="text-xs" /> Sign In
          </Link>
          <button
            onClick={onClose}
            className="bg-white/10 hover:bg-white/20 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-colors"
          >
            Maybe Later
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default LoginRequiredModal;
