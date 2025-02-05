import { useState, useEffect } from "react";

export default function DevelopmentBanner() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const bannerClosed = localStorage.getItem("developmentBannerClosed");
    if (bannerClosed) {
      setIsVisible(false);
    }
  }, []);

  const closeBanner = () => {
    setIsVisible(false);
    localStorage.setItem("developmentBannerClosed", "true");
  };

  return (
    isVisible && (
      <div className="relative z-10 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black text-center py-2 px-4 mb-6 flex justify-between items-center">
        <p className="flex-1">
          This is a development version of the Booking Platform. Features are
          being added and improved. Please note that cookies information
          collected will not be saved as there is no full functionality in place
          yet.
        </p>
        <button
          onClick={closeBanner}
          className="absolute right-0 top-[-8px] text-2xl font-bold text-white bg-transparent border-0 cursor-pointer hover:text-black"
          title="Close"
        >
          &times;
        </button>
      </div>
    )
  );
}
