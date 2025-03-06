import { useEffect } from "react";
import Lenis from "lenis";

function Home() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="bg-[#121212] text-white min-h-screen font-sans">
      {/* Hero Section */}
      <section className="h-screen flex items-center justify-center sticky top-0 bg-[#1a1a1a]">
        <div>
          <h1 className="text-5xl font-bold tracking-wide">Entice Lounge</h1>
        </div>
      </section>

      {/* Cards Section */}
      <section className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="bg-[#222] rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform">
            <img
              src={`https://source.unsplash.com/400x300/?night,club,party&sig=${index}`}
              alt="Nightlife Scene"
              className="w-full h-60 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold">
                Night Event #{index + 1}
              </h2>
              <p className="text-gray-400 mt-2">
                Feel the vibe of the nightlife.
              </p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Home;
