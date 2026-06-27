import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

function StarRating({ rating }) {
  const stars = rating / 2;
  const full = Math.floor(stars);
  const half = stars % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return (
    <div className="flex gap-0.5 items-center">
      {[...Array(full)].map((_, i) => <FaStar key={"f"+i} className="text-yellow-400 text-sm" />)}
      {half === 1 && <FaStarHalfAlt className="text-yellow-400 text-sm" />}
      {[...Array(empty)].map((_, i) => <FaRegStar key={"e"+i} className="text-yellow-400 text-sm" />)}
      <span className="ml-1.5 text-xs text-gray-400">{rating?.toFixed(1)}</span>
    </div>
  );
}
export default StarRating;
