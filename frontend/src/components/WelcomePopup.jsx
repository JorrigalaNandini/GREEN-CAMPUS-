import React from "react";

function WelcomePopup({ title, quote }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">

      <div className="relative w-full max-w-md sm:max-w-lg bg-gradient-to-br from-green-50 via-white to-green-100 rounded-3xl shadow-2xl border border-green-300 p-6 sm:p-8 text-center animate-pulse">

        {/* Floating Emojis */}
        <div className="absolute top-3 left-4 text-2xl sm:text-3xl animate-bounce">
          🌿
        </div>

        <div className="absolute top-3 right-4 text-2xl sm:text-3xl animate-bounce">
          🍃
        </div>

        <div className="absolute bottom-3 left-5 text-xl sm:text-2xl animate-pulse">
          🌸
        </div>

        <div className="absolute bottom-3 right-5 text-xl sm:text-2xl animate-pulse">
          💚
        </div>

        <div className="text-5xl sm:text-6xl mb-4">
          🌍
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-green-700 mb-4">
          {title}
        </h1>

        <p className="text-gray-700 italic text-base sm:text-lg leading-7">
          {quote}
        </p>

        <div className="mt-6 text-green-700 font-semibold text-sm sm:text-base">
          🌱 Together, let's make our campus greener! 🌱
        </div>

      </div>

    </div>
  );
}

export default WelcomePopup;