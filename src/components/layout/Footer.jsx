import { FaFilm, FaGithub, FaTwitter, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="mt-20 border-t border-white/5 bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-[#e50914] rounded-lg flex items-center justify-center">
              <FaFilm className="text-white text-xs" />
            </div>
            <span className="font-display text-xl tracking-widest text-white">CINEVERSE</span>
          </Link>

          <p className="text-gray-600 text-xs text-center">
            Movie data provided by{" "}
            <a href="https://www.themoviedb.org" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">
              TMDB
            </a>. Not for commercial use.
          </p>

          <div className="flex items-center gap-3">
            {[FaGithub, FaTwitter, FaInstagram].map((Icon, i) => (
              <a key={i} href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                <Icon className="text-sm" />
              </a>
            ))}
          </div>
        </div>
        <p className="text-center text-gray-700 text-xs mt-6">
          &copy; {new Date().getFullYear()} CineVerse. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
