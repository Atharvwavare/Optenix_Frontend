import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// ✅ IMPORT IMAGES FROM SRC
import edu1 from "../images/bg1.jpg";
import edu2 from "../images/bg2.jpg";
import edu3 from "../images/img2.jpg";
import edu4 from "../images/img3.jpg";

export default function ImageCarousel() {
  const images = [edu1, edu2, edu3, edu4];
  const [current, setCurrent] = useState(0);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="relative max-w-6xl mx-auto rounded-3xl overflow-hidden shadow-2xl">

          {/* Slides */}
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Slide ${index + 1}`}
                className="w-full h-[420px] object-cover flex-shrink-0"
              />
            ))}
          </div>

          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg"
          >
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg"
          >
            <ChevronRight className="w-6 h-6 text-gray-800" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex space-x-3">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-3 h-3 rounded-full transition ${
                  current === index
                    ? "bg-blue-600 scale-110"
                    : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
