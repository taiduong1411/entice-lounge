import { useEffect, useState, lazy, Suspense, useRef } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Lenis from "lenis";
import bgImage from "../assets/bg.jpg";
import image1 from "../assets/image1.jpg";
import image2 from "../assets/image2.jpg";
import image3 from "../assets/image3.jpg";
import image4 from "../assets/image4.jpg";
import image5 from "../assets/image5.jpg";
import image6 from "../assets/image6.jpg";

import AOS from "aos";
import "aos/dist/aos.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
// import { SplitText } from "gsap/SplitText";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);

function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("cocktails");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Refs for GSAP animations
  const heroRef = useRef(null);
  const heroTextRef = useRef(null);
  const navRef = useRef(null);
  const menuItemsRef = useRef([]);
  const galleryRef = useRef(null);
  const cursorRef = useRef(null);
  const marqueeRef = useRef(null);
  const mainHeadingRef = useRef(null);
  const subHeadingRef = useRef(null);
  const buttonRefs = useRef([]);
  const loungeTitleRef = useRef(null);
  const scrollLineRef = useRef(null);
  const countUpRefs = useRef([]);

  // Mouse movement handler for custom cursor and magnetic elements
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      // Update custom cursor position
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.3,
          ease: "power3.out",
        });
      }

      // Magnetic effect for buttons
      document.querySelectorAll(".magnetic-btn").forEach((btn) => {
        const rect = btn.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distance = Math.sqrt(
          Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
        );

        // Apply magnetic effect if cursor is close enough
        if (distance < 100) {
          const x = (e.clientX - centerX) / 5;
          const y = (e.clientY - centerY) / 5;

          gsap.to(btn, {
            x: x,
            y: y,
            duration: 0.3,
            ease: "power3.out",
          });
        } else {
          // Reset position when cursor is far
          gsap.to(btn, {
            x: 0,
            y: 0,
            duration: 0.7,
            ease: "elastic.out(1, 0.3)",
          });
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Marquee animation
  useEffect(() => {
    if (marqueeRef.current) {
      const marqueeText = marqueeRef.current.querySelector(".marquee-inner");
      if (marqueeText) {
        gsap.to(marqueeText, {
          xPercent: -50,
          ease: "none",
          duration: 20,
          repeat: -1,
        });
      }
    }
  }, []);

  useEffect(() => {
    AOS.init({
      once: false,
      mirror: true,
      duration: 1200,
    });
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 3,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "both",
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

  const cocktails = [
    {
      name: "OLD FASHIONED",
      price: "180.000",
      icon: "🥃",
    },
    {
      name: "CAIPIROSKA",
      price: "180.000",
      icon: "🍹",
    },
    {
      name: "MARGARITA",
      price: "180.000",
      icon: "🍸",
    },
    {
      name: "WHISKY SOUR",
      price: "180.000",
      icon: "🥃",
    },
    {
      name: "MIDORI SOUR",
      price: "180.000",
      icon: "🥝",
    },
    {
      name: "DAIQUIRI",
      price: "180.000",
      icon: "🍹",
    },
    {
      name: "LONG ISLAND",
      price: "180.000",
      icon: "🥤",
    },
    {
      name: "MOJITO",
      price: "180.000",
      icon: "🍃",
    },
    {
      name: "GIN SOUR",
      price: "180.000",
      icon: "🍋",
    },
    {
      name: "KAMIKAZE",
      price: "180.000",
      icon: "💥",
    },
    {
      name: "JAGER BOMB",
      price: "180.000",
      icon: "💣",
    },
    {
      name: "B52",
      price: "180.000",
      icon: "🔥",
    },
  ];

  const spirits = [
    {
      name: "JACK DANIEL'S",
      glass: "150.000",
      bottle: "1.599.000",
      icon: "🥃",
    },
    {
      name: "JAMESON",
      glass: "150.000",
      bottle: "1.599.000",
      icon: "🥃",
    },
    {
      name: "BOMBAY",
      glass: "150.000",
      bottle: "1.299.000",
      icon: "🍸",
    },
    {
      name: "JIM BEAM",
      glass: "150.000",
      bottle: "1.099.000",
      icon: "🥃",
    },
    {
      name: "TITO'S VODKA",
      glass: "150.000",
      bottle: "1.299.000",
      icon: "🍸",
    },
    {
      name: "BAILEYS",
      glass: "150.000",
      bottle: "1.299.000",
      icon: "🍦",
    },
    {
      name: "PATRON XO COFFEE",
      glass: "200.000",
      bottle: "3.600.000",
      icon: "☕",
    },
    {
      name: "JOSE CUERVO",
      glass: "150.000",
      bottle: "1.199.000",
      icon: "🌵",
    },
    {
      name: "JAGERMEISTER",
      glass: "150.000",
      bottle: "1.199.000",
      icon: "🌿",
    },
  ];

  const beers = [
    { name: "CORONA", price: "130.000", icon: "🍺" },
    { name: "TIGER SILVER", price: "75.000", icon: "🐯" },
    { name: "TIGER ORIGINAL", price: "75.000", icon: "🐯" },
    { name: "HEINEKEN", price: "95.000", icon: "🍻" },
  ];

  const softDrinks = [
    { name: "REDBULL", price: "75.000", icon: "🐂" },
    { name: "TWISTER", price: "75.000", icon: "🌪️" },
    { name: "COCA COLA", price: "75.000", icon: "🥤" },
    { name: "SPRITE", price: "75.000", icon: "🍋" },
    { name: "TONIC", price: "75.000", icon: "💧" },
    { name: "GINGER ALE", price: "75.000", icon: "🌱" },
    { name: "AQUAFINA", price: "75.000", icon: "💦" },
  ];

  const events = [
    {
      day: "Friday",
      title: "Jazz Night",
      time: "8PM - 11PM",
    },
    {
      day: "Saturday",
      title: "DJ Sessions",
      time: "10PM - 2AM",
    },
    {
      day: "Sunday",
      title: "Acoustic Evening",
      time: "7PM - 10PM",
    },
  ];

  const testimonials = [
    {
      text: "The atmosphere at Entice Lounge is unmatched. Perfect for both casual drinks and special occasions.",
      author: "Minh Trần",
    },
    {
      text: "Their signature cocktails are works of art. I keep coming back to try everything on the menu!",
      author: "Linh Nguyễn",
    },
    {
      text: "The staff is incredibly knowledgeable and the ambiance is sophisticated yet welcoming.",
      author: "Alex Johnson",
    },
  ];

  // Initialize animations
  useEffect(() => {
    // Text scramble effect for main heading
    if (mainHeadingRef.current) {
      const mainHeading = mainHeadingRef.current;
      const originalText = mainHeading.textContent;
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

      let currentText = "";
      let iteration = 0;
      const maxIterations = 10;

      const scrambleText = () => {
        iteration++;

        if (iteration > maxIterations) {
          mainHeading.textContent = originalText;
          return;
        }

        currentText = originalText
          .split("")
          .map((char, index) => {
            const progress = iteration / maxIterations;
            const shouldReveal =
              Math.random() < progress + (index / originalText.length) * 0.5;
            return shouldReveal
              ? char
              : chars[Math.floor(Math.random() * chars.length)];
          })
          .join("");

        mainHeading.textContent = currentText;
        requestAnimationFrame(scrambleText);
      };

      setTimeout(scrambleText, 1000);
    }

    // Scroll line animation
    if (scrollLineRef.current) {
      gsap.from(scrollLineRef.current, {
        scaleY: 0,
        transformOrigin: "top",
        duration: 1.5,
        delay: 2,
        ease: "power3.inOut",
      });
    }

    // Count up animations
    if (countUpRefs.current.length > 0) {
      countUpRefs.current.forEach((ref) => {
        if (!ref) return;

        const value = parseInt(ref.dataset.value);
        const duration = 2;

        ScrollTrigger.create({
          trigger: ref,
          start: "top 80%",
          onEnter: () => {
            gsap.fromTo(
              ref,
              { textContent: 0 },
              {
                textContent: value,
                duration: duration,
                ease: "power1.inOut",
                snap: { textContent: 1 },
                stagger: 1,
              }
            );
          },
          onEnterBack: () => {
            gsap.fromTo(
              ref,
              { textContent: 0 },
              {
                textContent: value,
                duration: duration,
                ease: "power1.inOut",
                snap: { textContent: 1 },
                stagger: 1,
              }
            );
          },
        });
      });
    }

    // 3D tilt effect for gallery items
    const galleryItems = document.querySelectorAll(".gallery-item");
    galleryItems.forEach((item) => {
      item.addEventListener("mousemove", (e) => {
        const rect = item.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        gsap.to(item, {
          rotationY: x * 10,
          rotationX: -y * 10,
          transformPerspective: 900,
          transformStyle: "preserve-3d",
          ease: "power1.out",
          duration: 0.4,
        });

        gsap.to(item.querySelector("img"), {
          scale: 1.1,
          duration: 0.4,
        });
      });

      item.addEventListener("mouseleave", () => {
        gsap.to(item, {
          rotationY: 0,
          rotationX: 0,
          duration: 0.7,
          ease: "elastic.out(1, 0.5)",
        });

        gsap.to(item.querySelector("img"), {
          scale: 1,
          duration: 0.7,
        });
      });
    });

    // GSAP animations
    // Navigation animation
    gsap.from(navRef.current, {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });

    // Hero section animations
    const heroTl = gsap.timeline();
    heroTl.from(heroRef.current, {
      scale: 1.1,
      opacity: 0,
      duration: 1.5,
      ease: "power3.out",
    });

    // Split text animation for subtitle
    if (subHeadingRef.current) {
      const text = subHeadingRef.current.textContent;
      const chars = text.split("");

      // Clear the element
      subHeadingRef.current.textContent = "";

      // Create spans for each character
      chars.forEach((char) => {
        const span = document.createElement("span");
        span.textContent = char === " " ? "\u00A0" : char; // Use non-breaking space for spaces
        span.style.display = "inline-block";
        span.style.opacity = "0";
        span.style.transform = "translateY(20px) rotateX(-90deg)";
        subHeadingRef.current.appendChild(span);
      });

      // Animate each character
      const charElements = subHeadingRef.current.querySelectorAll("span");
      gsap.to(charElements, {
        opacity: 1,
        y: 0,
        rotationX: 0,
        stagger: 0.02,
        duration: 1,
        ease: "back.out(2)",
        delay: 1,
      });
    }

    if (heroTextRef.current) {
      const splitText = heroTextRef.current.innerText.split("");
      heroTextRef.current.innerHTML = "";
      splitText.forEach((char) => {
        const span = document.createElement("span");
        span.textContent = char;
        span.style.display = "inline-block";
        heroTextRef.current.appendChild(span);
      });

      heroTl.from(
        heroTextRef.current.children,
        {
          opacity: 0,
          y: 50,
          rotateY: 90,
          stagger: 0.05,
          duration: 0.8,
          ease: "back.out",
        },
        "-=0.5"
      );
    }

    // Neon flicker animation for lounge title
    if (loungeTitleRef.current) {
      const flickerTimeline = gsap.timeline({ repeat: -1, repeatDelay: 5 });

      flickerTimeline
        .to(loungeTitleRef.current, {
          textShadow:
            "0 0 10px rgba(255, 0, 85, 0.8), 0 0 20px rgba(255, 0, 85, 0.5), 0 0 30px rgba(255, 0, 85, 0.3)",
          color: "#fff",
          duration: 0.1,
        })
        .to(loungeTitleRef.current, {
          textShadow:
            "0 0 5px rgba(255, 0, 85, 0.5), 0 0 10px rgba(255, 0, 85, 0.3)",
          color: "#ff0055",
          duration: 0.1,
        })
        .to(loungeTitleRef.current, {
          textShadow:
            "0 0 10px rgba(255, 0, 85, 0.8), 0 0 20px rgba(255, 0, 85, 0.5), 0 0 30px rgba(255, 0, 85, 0.3)",
          color: "#fff",
          duration: 0.1,
          delay: 0.1,
        })
        .to(loungeTitleRef.current, {
          textShadow:
            "0 0 5px rgba(255, 0, 85, 0.5), 0 0 10px rgba(255, 0, 85, 0.3)",
          color: "#ff0055",
          duration: 0.1,
        });
    }

    // Scroll animations for sections
    gsap.utils.toArray(".gsap-reveal").forEach((section) => {
      gsap.from(section, {
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    });

    // Gallery items staggered animation
    if (galleryRef.current) {
      const galleryItems = galleryRef.current.querySelectorAll(".gallery-item");
      gsap.from(galleryItems, {
        scrollTrigger: {
          trigger: galleryRef.current,
          start: "top 80%",
        },
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
      });
    }

    // Animate menu items on tab change
    if (menuItemsRef.current.length > 0) {
      gsap.from(menuItemsRef.current, {
        opacity: 0,
        y: 30,
        stagger: 0.05,
        duration: 0.5,
        ease: "power2.out",
      });
    }

    // Parallax effect for background
    gsap.to(".parallax-bg", {
      scrollTrigger: {
        trigger: ".parallax-bg",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
      y: () => -ScrollTrigger.maxScroll(window) * 0.15,
      ease: "none",
    });

    // Button hover effects
    buttonRefs.current.forEach((btn) => {
      if (!btn) return;

      const btnBg = btn.querySelector(".btn-bg");
      if (!btnBg) return;

      btn.addEventListener("mouseenter", () => {
        gsap.to(btnBg, {
          scale: 1,
          duration: 0.6,
          ease: "power2.out",
        });
      });

      btn.addEventListener("mouseleave", () => {
        gsap.to(btnBg, {
          scale: 0,
          duration: 0.6,
          ease: "power2.out",
        });
      });
    });
  }, []);

  // Handle tab change with animation
  useEffect(() => {
    if (menuItemsRef.current.length > 0) {
      const menuItems = document.querySelectorAll(`.menu-item-${activeTab}`);

      gsap.fromTo(
        menuItems,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.05,
          duration: 0.4,
          ease: "power1.out",
          clearProps: "all",
        }
      );
    }
  }, [activeTab]);

  return (
    <div className="bg-[#0c0c0c] text-white min-h-screen font-sans overflow-hidden">
      {/* Custom cursor */}
      <div
        ref={cursorRef}
        className="custom-cursor fixed w-8 h-8 rounded-full border-2 border-[#ff0055] pointer-events-none z-50 mix-blend-difference"
        style={{
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
          transition: "transform 0.1s ease-out",
        }}></div>

      {/* Navigation */}
      <nav
        ref={navRef}
        className="fixed top-0 w-full z-50 bg-black/70 backdrop-blur-md border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-[#ff0055] font-bold text-2xl tracking-wider flex items-center">
            <span className="text-3xl mr-1">✦</span>ENTICE
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white focus:outline-none">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex space-x-10">
            <a
              href="#home"
              className="text-white hover:text-[#ff0055] transition-colors duration-300">
              Home
            </a>
            <a
              href="#menu"
              className="text-white hover:text-[#ff0055] transition-colors duration-300">
              Menu
            </a>
            <a
              href="#events"
              className="text-white hover:text-[#ff0055] transition-colors duration-300">
              Events
            </a>
            <a
              href="#gallery"
              className="text-white hover:text-[#ff0055] transition-colors duration-300">
              Gallery
            </a>
            <a
              href="#contact"
              className="text-white hover:text-[#ff0055] transition-colors duration-300">
              Contact
            </a>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden bg-black/90 overflow-hidden transition-all duration-500 ease-in-out ${
            isMenuOpen ? "max-h-72" : "max-h-0"
          }`}>
          <div className="px-6 py-4 flex flex-col space-y-4">
            <a
              href="#home"
              className="text-white hover:text-[#ff0055] transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}>
              Home
            </a>
            <a
              href="#menu"
              className="text-white hover:text-[#ff0055] transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}>
              Menu
            </a>
            <a
              href="#events"
              className="text-white hover:text-[#ff0055] transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}>
              Events
            </a>
            <a
              href="#gallery"
              className="text-white hover:text-[#ff0055] transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}>
              Gallery
            </a>
            <a
              href="#contact"
              className="text-white hover:text-[#ff0055] transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}>
              Contact
            </a>
          </div>
        </div>
      </nav>

      {/* Vertical scroll line */}
      <div
        ref={scrollLineRef}
        className="hidden md:block fixed left-6 top-1/2 -translate-y-1/2 w-0.5 h-48 bg-[#ff0055] opacity-60 z-40"></div>

      {/* Hero Section with Background Image */}
      <section
        ref={heroRef}
        id="home"
        className="relative h-screen flex flex-col items-center justify-center text-center px-6">
        <div
          className="absolute inset-0 bg-center bg-cover bg-fixed parallax-bg"
          style={{
            backgroundImage: `url(${bgImage})`,
            filter: "brightness(0.3)",
          }}></div>

        {/* Animated overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80"></div>

        <div className="relative p-8 z-10">
          <div className="mb-3 flex justify-center">
            <div className="w-24 h-1 bg-[#ff0055]"></div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-wide mb-2">
            <span ref={heroTextRef} className="text-white">
              <span ref={mainHeadingRef}>ENTICE</span>
            </span>{" "}
            <span className="text-[#ff0055]" ref={loungeTitleRef}>
              LOUNGE
            </span>
          </h1>
          <p
            ref={subHeadingRef}
            className="text-gray-300 text-xl md:text-2xl mt-4 max-w-2xl mx-auto font-light tracking-wider">
            WHERE EVERY NIGHT BECOMES A STORY
          </p>
          <div className="mt-14 flex flex-col md:flex-row items-center justify-center gap-6">
            <a
              href="#contact"
              ref={(el) => (buttonRefs.current[0] = el)}
              className="magnetic-btn px-8 py-4 relative overflow-hidden bg-transparent text-white font-semibold rounded-full w-full md:w-auto group">
              <span className="btn-bg absolute inset-0 bg-gradient-to-r from-[#ff0055] to-[#ff4080] transform scale-0 origin-center transition-transform duration-300 rounded-full -z-10"></span>
              <span className="relative z-10">RESERVE A TABLE</span>
            </a>
            <a
              href="#menu"
              ref={(el) => (buttonRefs.current[1] = el)}
              className="magnetic-btn px-8 py-4 relative overflow-hidden border border-white/30 text-white font-semibold rounded-full w-full md:w-auto mt-4 md:mt-0 group">
              <span className="btn-bg absolute inset-0 bg-[#ff0055]/20 transform scale-0 origin-center transition-transform duration-300 rounded-full -z-10"></span>
              <span className="relative z-10 group-hover:text-[#ff0055]">
                EXPLORE MENU
              </span>
            </a>
          </div>
        </div>

        <div className="absolute bottom-10 w-full text-center z-10">
          <a href="#about" className="animate-bounce inline-block">
            <svg
              className="w-8 h-8 text-white opacity-70"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </a>
        </div>
      </section>

      {/* Marquee Text */}
      <div
        ref={marqueeRef}
        className="relative py-3 bg-black overflow-hidden border-y border-gray-800/50">
        <div className="marquee-inner whitespace-nowrap">
          <div className="inline-block">
            <span className="mx-4 text-white/70">PREMIUM COCKTAILS</span>
            <span className="mx-4 text-[#ff0055]">•</span>
            <span className="mx-4 text-white/70">EXCEPTIONAL AMBIANCE</span>
            <span className="mx-4 text-[#ff0055]">•</span>
            <span className="mx-4 text-white/70">UNFORGETTABLE NIGHTS</span>
            <span className="mx-4 text-[#ff0055]">•</span>
            <span className="mx-4 text-white/70">PREMIUM COCKTAILS</span>
            <span className="mx-4 text-[#ff0055]">•</span>
            <span className="mx-4 text-white/70">EXCEPTIONAL AMBIANCE</span>
            <span className="mx-4 text-[#ff0055]">•</span>
            <span className="mx-4 text-white/70">UNFORGETTABLE NIGHTS</span>
            <span className="mx-4 text-[#ff0055]">•</span>
          </div>
        </div>
      </div>

      {/* About Section */}
      <section
        id="about"
        className="py-24 px-6 md:px-12 bg-black relative overflow-hidden gsap-reveal">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#ff0055]/5 rounded-full blur-3xl -z-0"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#ff0055]/5 rounded-full blur-3xl -z-0"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="w-full md:w-1/2" data-aos="fade-right">
              <h2 className="text-4xl md:text-5xl font-bold mb-8">
                Experience <span className="text-[#ff0055]">Elegance</span>
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Entice Lounge is Saigon's premium destination for those seeking
                an extraordinary night out. Nestled in the heart of District 1,
                our venue combines sophisticated ambiance with exceptional
                mixology.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                Whether you're looking for perfectly crafted cocktails, fine
                wines, or an unforgettable evening with friends, Entice Lounge
                offers a curated experience that will captivate your senses.
              </p>
              <div className="flex items-center space-x-8">
                <div>
                  <div className="text-3xl font-bold text-[#ff0055]">
                    <span
                      ref={(el) => (countUpRefs.current[0] = el)}
                      data-value="5">
                      5
                    </span>
                    +
                  </div>
                  <div className="text-gray-400">Years Experience</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#ff0055]">
                    <span
                      ref={(el) => (countUpRefs.current[1] = el)}
                      data-value="30">
                      30
                    </span>
                    +
                  </div>
                  <div className="text-gray-400">Signature Cocktails</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#ff0055]">
                    <span
                      ref={(el) => (countUpRefs.current[2] = el)}
                      data-value="100">
                      100
                    </span>
                    %
                  </div>
                  <div className="text-gray-400">Satisfaction</div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 relative" data-aos="fade-left">
              <div className="relative z-10 rounded-xl overflow-hidden shadow-2xl shadow-black/50">
                <LazyLoadImage
                  src={image1}
                  alt="Entice Lounge Ambiance"
                  effect="blur"
                  className="w-full h-auto object-cover min-h-[450px]"
                />
              </div>
              <div className="absolute top-8 -right-8 bottom-8 -z-10 border-2 border-[#ff0055]/20 rounded-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section
        id="menu"
        className="py-24 px-6 md:px-12 bg-gradient-to-b from-black to-[#0c0c0c] gsap-reveal">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16" data-aos="fade-up">
            <div className="mb-3 flex justify-center">
              <div className="w-24 h-1 bg-[#ff0055]"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Our <span className="text-[#ff0055]">Menu</span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-10">
              Indulge in our carefully curated selection of premium drinks
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => setActiveTab("cocktails")}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === "cocktails"
                    ? "bg-[#ff0055] text-white"
                    : "bg-black/40 border border-gray-800 text-gray-300 hover:text-white"
                }`}>
                COCKTAILS
              </button>
              <button
                onClick={() => setActiveTab("spirits")}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === "spirits"
                    ? "bg-[#ff0055] text-white"
                    : "bg-black/40 border border-gray-800 text-gray-300 hover:text-white"
                }`}>
                SPIRITS & WINE
              </button>
              <button
                onClick={() => setActiveTab("beers")}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === "beers"
                    ? "bg-[#ff0055] text-white"
                    : "bg-black/40 border border-gray-800 text-gray-300 hover:text-white"
                }`}>
                BEER & SOFT DRINKS
              </button>
            </div>
          </div>

          {/* Cocktails Menu */}
          {activeTab === "cocktails" && (
            <div className="max-w-5xl mx-auto">
              <div className="flex justify-center mb-14">
                <h3 className="text-2xl md:text-3xl font-semibold inline-block relative">
                  <span className="text-white">COCKTAIL</span>
                  <div className="absolute -bottom-3 left-0 w-full h-0.5 bg-[#ff0055]"></div>
                </h3>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {cocktails.map((item, index) => (
                  <div
                    key={index}
                    ref={(el) => (menuItemsRef.current[index] = el)}
                    className="text-center p-4 rounded-lg bg-black/20 backdrop-blur-sm border border-gray-800/40 hover:border-[#ff0055]/30 transition-all duration-300 menu-item-cocktails"
                    onMouseEnter={(e) => {
                      gsap.to(e.currentTarget, {
                        y: -10,
                        scale: 1.05,
                        boxShadow: "0 10px 25px -5px rgba(255, 0, 85, 0.1)",
                        duration: 0.3,
                        ease: "power1.out",
                      });
                    }}
                    onMouseLeave={(e) => {
                      gsap.to(e.currentTarget, {
                        y: 0,
                        scale: 1,
                        boxShadow: "none",
                        duration: 0.3,
                        ease: "power1.in",
                      });
                    }}>
                    <div className="text-3xl mb-3">{item.icon}</div>
                    <h3 className="text-sm font-semibold tracking-wider text-white mb-3">
                      {item.name}
                    </h3>
                    <p className="text-[#ff0055] text-sm">{item.price}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5 text-sm text-gray-500 text-center">
                <p>Prices exclude taxes and service fees</p>
              </div>
            </div>
          )}

          {/* Spirits Menu */}
          {activeTab === "spirits" && (
            <div className="max-w-5xl mx-auto">
              <div className="flex justify-center mb-14">
                <h3 className="text-2xl md:text-3xl font-semibold inline-block relative">
                  <span className="text-white">SPIRITS & WINE</span>
                  <div className="absolute -bottom-3 left-0 w-full h-0.5 bg-[#ff0055]"></div>
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {spirits.map((item, index) => (
                  <div
                    key={index}
                    className="p-5 rounded-lg bg-black/20 backdrop-blur-sm border border-gray-800/40 hover:border-[#ff0055]/30 transition-all duration-300 menu-item-spirits"
                    onMouseEnter={(e) => {
                      gsap.to(e.currentTarget, {
                        y: -10,
                        boxShadow: "0 10px 25px -5px rgba(255, 0, 85, 0.1)",
                        duration: 0.3,
                        ease: "power1.out",
                      });
                    }}
                    onMouseLeave={(e) => {
                      gsap.to(e.currentTarget, {
                        y: 0,
                        boxShadow: "none",
                        duration: 0.3,
                        ease: "power1.in",
                      });
                    }}>
                    <div className="flex items-center mb-3">
                      <span className="text-2xl mr-3">{item.icon}</span>
                      <h3 className="text-sm font-semibold tracking-wider text-white">
                        {item.name}
                      </h3>
                    </div>
                    <div className="flex justify-between mt-3">
                      <div>
                        <div className="text-xs text-gray-400">Glass</div>
                        <div className="text-[#ff0055] text-sm">
                          {item.glass}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-400">Bottle</div>
                        <div className="text-[#ff0055] text-sm">
                          {item.bottle}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 text-sm text-gray-500 text-center">
                <p>Prices exclude taxes and service fees</p>
              </div>
            </div>
          )}

          {/* Beers and Soft Drinks Menu */}
          {activeTab === "beers" && (
            <div className="max-w-5xl mx-auto" data-aos="fade-up">
              <div className="flex justify-center mb-14">
                <h3 className="text-2xl md:text-3xl font-semibold inline-block relative">
                  <span className="text-white">BEER & SOFT DRINKS</span>
                  <div className="absolute -bottom-3 left-0 w-full h-0.5 bg-[#ff0055]"></div>
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
                {/* Beers */}
                <div>
                  <h4 className="text-xl text-white mb-6 font-semibold tracking-wider text-center">
                    BEER
                  </h4>
                  <div className="space-y-4">
                    {beers.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center py-3 border-b border-gray-800/50"
                        data-aos="fade-up"
                        data-aos-delay={index * 50}>
                        <div className="flex items-center">
                          <span className="text-xl mr-3">{item.icon}</span>
                          <span className="text-white">{item.name}</span>
                        </div>
                        <span className="text-[#ff0055]">{item.price}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Soft Drinks */}
                <div>
                  <h4 className="text-xl text-white mb-6 font-semibold tracking-wider text-center">
                    SOFT DRINKS
                  </h4>
                  <div className="space-y-4">
                    {softDrinks.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center py-3 border-b border-gray-800/50"
                        data-aos="fade-up"
                        data-aos-delay={index * 50}>
                        <div className="flex items-center">
                          <span className="text-xl mr-3">{item.icon}</span>
                          <span className="text-white">{item.name}</span>
                        </div>
                        <span className="text-[#ff0055]">{item.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-10 text-sm text-gray-500 text-center">
                <p>Prices exclude taxes and service fees</p>
              </div>
            </div>
          )}

          <div className="mt-16 text-center" data-aos="fade-up">
            <a
              href="#contact"
              className="inline-flex items-center text-[#ff0055] hover:text-white transition-colors duration-300">
              <span>See our full menu at the venue</span>
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section
        id="events"
        className="py-24 px-6 md:px-12 bg-[#0c0c0c] relative">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16" data-aos="fade-up">
            <div className="mb-3 flex justify-center">
              <div className="w-24 h-1 bg-[#ff0055]"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Upcoming <span className="text-[#ff0055]">Events</span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Join us for special nights featuring live music, themed parties,
              and unforgettable experiences
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {events.map((event, index) => (
              <div
                key={index}
                className="relative bg-black/30 backdrop-blur-sm border border-gray-800 p-8 rounded-xl overflow-hidden group hover:border-[#ff0055]/30 transition-all duration-300"
                data-aos="fade-up"
                data-aos-delay={index * 100}>
                <div className="absolute inset-0 bg-gradient-to-br from-[#ff0055]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="text-[#ff0055] font-medium mb-2">
                    {event.day}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {event.title}
                  </h3>
                  <p className="text-gray-400 mb-6">{event.time}</p>
                  <button className="text-white hover:text-[#ff0055] transition-colors duration-300 font-medium inline-flex items-center">
                    <span>Details</span>
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section
        id="gallery"
        ref={galleryRef}
        className="py-24 px-6 md:px-12 bg-black gsap-reveal">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16" data-aos="fade-up">
            <div className="mb-3 flex justify-center">
              <div className="w-24 h-1 bg-[#ff0055]"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Our <span className="text-[#ff0055]">Gallery</span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Take a visual journey through our luxurious lounge and vibrant
              atmosphere
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[image1, image2, image3, image4, image5, image6].map(
              (img, index) => (
                <div
                  key={index}
                  className="rounded-xl overflow-hidden group relative gallery-item transform-gpu">
                  <LazyLoadImage
                    src={img}
                    alt={`Gallery ${index + 1}`}
                    effect="blur"
                    className="w-full h-72 object-cover transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end">
                    <div className="p-5 transform translate-y-10 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-white font-semibold text-lg">
                        Entice Experience
                      </h3>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>

          <div className="mt-12 text-center" data-aos="fade-up">
            <a
              href="#"
              className="inline-flex items-center text-[#ff0055] hover:text-white transition-colors duration-300">
              <span>View All Photos</span>
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 md:px-12 bg-gradient-to-b from-[#0c0c0c] to-black relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#ff0055]/5 rounded-full blur-3xl -z-0"></div>

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-16" data-aos="fade-up">
            <div className="mb-3 flex justify-center">
              <div className="w-24 h-1 bg-[#ff0055]"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              What Our <span className="text-[#ff0055]">Guests</span> Say
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((item, index) => (
              <div
                key={index}
                className="bg-black/30 backdrop-blur-sm border border-gray-800 p-6 rounded-xl relative"
                data-aos="fade-up"
                data-aos-delay={index * 100}>
                <div className="text-[#ff0055] text-4xl mb-4">❝</div>
                <p className="text-gray-300 mb-6">{item.text}</p>
                <div className="text-white font-medium">- {item.author}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section
        id="contact"
        className="p-12 text-center bg-black relative overflow-hidden gsap-reveal">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#ff0055]/5 rounded-full blur-3xl -z-0"></div>

        <div className="max-w-5xl mx-auto relative z-10">
          <h2 className="text-4xl font-bold mb-10" data-aos="fade-up">
            <span className="text-white">Reserve Your</span>{" "}
            <span className="text-[#ff0055]">Experience</span>
          </h2>

          <div
            className="mb-12 max-w-2xl mx-auto"
            data-aos="fade-up"
            data-aos-delay="100">
            <p className="text-gray-300 mb-6">
              For table reservations, private events, or any inquiries, please
              contact us. We recommend booking in advance to ensure
              availability.
            </p>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              <input
                type="text"
                placeholder="Your Name"
                className="bg-[#111] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#ff0055]"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="bg-[#111] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#ff0055]"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="bg-[#111] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#ff0055]"
              />
              <input
                type="text"
                placeholder="Date & Time"
                className="bg-[#111] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#ff0055]"
              />
              <select className="bg-[#111] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#ff0055] col-span-1 md:col-span-2">
                <option value="">Number of Guests</option>
                <option value="1-2">1-2 Guests</option>
                <option value="3-4">3-4 Guests</option>
                <option value="5-6">5-6 Guests</option>
                <option value="7+">7+ Guests</option>
              </select>
              <button className="bg-gradient-to-r from-[#ff0055] to-[#ff4080] text-white font-semibold py-3 px-6 rounded-lg hover:shadow-lg hover:shadow-[#ff0055]/20 transition-all duration-300 transform hover:-translate-y-1 col-span-1 md:col-span-2">
                Reserve Now
              </button>
            </form>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div
              className="p-6 rounded-xl bg-black/50 backdrop-blur-sm border border-gray-800 hover:border-[#ff0055]/30 transition-all duration-300"
              data-aos="fade-up"
              data-aos-delay="100">
              <div className="mb-4">
                <svg
                  className="w-8 h-8 text-[#ff0055] mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Phone</h3>
              <p className="text-gray-400">
                <a
                  href="tel:+84941907954"
                  className="hover:text-[#ff0055] transition-colors">
                  0941907954
                </a>
              </p>
            </div>

            <div
              className="p-6 rounded-xl bg-black/50 backdrop-blur-sm border border-gray-800 hover:border-[#ff0055]/30 transition-all duration-300"
              data-aos="fade-up"
              data-aos-delay="200">
              <div className="mb-4">
                <svg
                  className="w-8 h-8 text-[#ff0055] mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Address</h3>
              <p className="text-gray-400">
                <a
                  href="https://maps.app.goo.gl/H9LvnLNWevBGvC8p6"
                  className="hover:text-[#ff0055] transition-colors">
                  19 Hải Triều, Bến Nghé, Quận 1, Hồ Chí Minh
                </a>
              </p>
            </div>

            <div
              className="p-6 rounded-xl bg-black/50 backdrop-blur-sm border border-gray-800 hover:border-[#ff0055]/30 transition-all duration-300"
              data-aos="fade-up"
              data-aos-delay="300">
              <div className="mb-4">
                <svg
                  className="w-8 h-8 text-[#ff0055] mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 8l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M5 3a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2H5z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Social</h3>
              <p className="text-gray-400">
                <a
                  href="https://www.facebook.com/profile.php?id=61572968996710#"
                  className="text-[#ff0055] hover:underline">
                  Facebook
                </a>
              </p>
            </div>

            <div
              className="p-6 rounded-xl bg-black/50 backdrop-blur-sm border border-gray-800 hover:border-[#ff0055]/30 transition-all duration-300"
              data-aos="fade-up"
              data-aos-delay="400">
              <div className="mb-4">
                <svg
                  className="w-8 h-8 text-[#ff0055] mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Hours</h3>
              <p className="text-gray-400">17:00 - 02:00</p>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-gray-800 pt-8">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Entice Lounge. All rights reserved.
          </p>
        </div>
      </section>
    </div>
  );
}
export default Home;
