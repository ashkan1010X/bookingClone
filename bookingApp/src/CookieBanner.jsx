import { useState, useEffect } from "react";

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(true);

  useEffect(() => {
    const bannerClosed = localStorage.getItem("cookieConsent");
    if (bannerClosed) {
      setShowBanner(false);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "true");
    setShowBanner(false);
  };

  const closeBanner = () => {
    setShowBanner(false);
    localStorage.setItem("cookieConsent", "true");
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-purple-700 to-purple-900 text-white py-5 px-6 shadow-lg z-50">
      <div className="relative flex items-center justify-between">
        <p className="text-sm">
          We use cookies to improve your experience, personalize content, and
          analyze traffic. By continuing to use our site, you accept our use of
          cookies.{" "}
          <a
            href="/privacy-policy"
            className="underline text-blue-400 hover:text-blue-300"
          >
            Learn more
          </a>
        </p>
        <div className="flex mr-7 items-center space-x-4">
          <button
            onClick={acceptCookies}
            className="bg-gradient-to-r from-pink-500 to-purple-500 text-white py-1 px-4 rounded-full shadow-md hover:bg-gradient-to-r hover:from-pink-400 hover:to-purple-400 transition-all duration-300"
          >
            Accept
          </button>
        </div>

        <button
          onClick={closeBanner}
          className="absolute top-[-25px] right-[-15px] text-3xl bg-transparent text-white hover:text-gray-300"
          title="Close"
        >
          ×
        </button>
      </div>
    </div>
  );
}
