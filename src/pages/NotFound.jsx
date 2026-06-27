import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <div className="font-display text-[150px] sm:text-[200px] text-[#1a1a1a] leading-none select-none mb-0">
          404
        </div>
        <div className="-mt-8 mb-6">
          <h2 className="text-white text-2xl font-semibold mb-2">Page Not Found</h2>
          <p className="text-gray-500 text-sm max-w-sm mx-auto">
            Looks like this scene ended up on the cutting room floor. The page you're looking for doesn't exist.
          </p>
        </div>
        <Link to="/" className="inline-block bg-[#e50914] hover:bg-red-700 text-white px-8 py-3 rounded-xl font-medium transition-colors">
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
}

export default NotFound;
