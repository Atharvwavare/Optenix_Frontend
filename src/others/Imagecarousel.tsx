import { useEffect, useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// IMPORT IMAGES
import edu1 from "../images/cara_img1.jpeg";
import edu2 from "../images/cara_img2.jpg";
import edu3 from "../images/cara_img3.jpg";
import edu4 from "../images/cara_img4.jpeg";

export default function ImageCarousel() {
  const images = [edu1, edu2, edu3, edu4];
  const [current, setCurrent] = useState(0);
  const startX = useRef(0);

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

  // Swipe Handlers
  const handleStart = (e: React.TouchEvent | React.MouseEvent) => {
    startX.current =
      "touches" in e ? e.touches[0].clientX : e.clientX;
  };

  const handleEnd = (e: React.TouchEvent | React.MouseEvent) => {
    const endX =
      "changedTouches" in e ? e.changedTouches[0].clientX : e.clientX;

    const diff = startX.current - endX;

    if (diff > 50) nextSlide();
    else if (diff < -50) prevSlide();
  };

  return (
    <section className="py-16 w-full bg-white">
      <div className="container mx-auto px-4 md:px-10">
        <div className="relative max-w-7xl mx-auto rounded-2xl overflow-hidden shadow-2xl">

          {/* Slides */}
          <div
            className="relative w-full h-[250px] sm:h-[300px] md:h-[430px]"
            onTouchStart={handleStart}
            onTouchEnd={handleEnd}
            onMouseDown={handleStart}
            onMouseUp={handleEnd}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={current}
                src={images[current]}
                alt={`Slide ${current + 1}`}
                className="absolute w-full h-full object-cover"
                initial={{ opacity: 0, x: 100, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -100, scale: 0.95 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
              />
            </AnimatePresence>
          </div>

          {/* Left Arrow */}
          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevSlide}
            className="hidden md:flex absolute left-5 top-1/2 -translate-y-1/2 
                       bg-white/80 hover:bg-white p-3 rounded-full shadow-lg"
          >
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </motion.button>

          {/* Right Arrow */}
          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextSlide}
            className="hidden md:flex absolute right-5 top-1/2 -translate-y-1/2 
                       bg-white/80 hover:bg-white p-3 rounded-full shadow-lg"
          >
            <ChevronRight className="w-6 h-6 text-gray-800" />
          </motion.button>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-3">
            {images.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrent(index)}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.9 }}
                className={`w-3 h-3 rounded-full transition-all ${
                  current === index
                    ? "bg-blue-600 scale-125"
                    : "bg-white/70 hover:bg-white"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
