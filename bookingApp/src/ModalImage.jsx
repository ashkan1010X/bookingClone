import { useEffect } from "react";

export default function ModalImage({ selectedImage, setSelectedImage }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSelectedImage(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [setSelectedImage]);

  return (
    // Modal for Selected Image
    selectedImage && (
      <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
        <div className="relative max-w-full max-h-full">
          <div className="flex justify-center">
            <img
              className="max-w-[80%] max-h-[80%] rounded-xl"
              src={selectedImage}
              alt="Selected"
            />

            <button
              className="absolute top-0 right-11 rounded-full py-2 px-3 bg-opacity-40"
              onClick={() => setSelectedImage(null)} // Close modal on button click
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={4}
                stroke="black"
                className="w-6 h-6 hover:stroke-white transition-all duration-200"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    )
  );
}
