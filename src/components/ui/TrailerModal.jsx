import Modal from "./Modal";

function TrailerModal({ isOpen, onClose, trailerKey, title }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-2">
        <div className="aspect-video rounded-xl overflow-hidden bg-black">
          {isOpen && (
            <iframe
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&rel=0`}
              title={`${title} Trailer`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          )}
        </div>
        <p className="text-center text-gray-400 text-sm mt-3 pb-2">{title} — Official Trailer</p>
      </div>
    </Modal>
  );
}

export default TrailerModal;
