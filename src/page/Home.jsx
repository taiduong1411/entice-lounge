import React, { useEffect, useState, Suspense, useRef } from "react";
import Lenis from "lenis";
import axios from "axios"; // Import axios for API requests
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
// import { ScrollSmoother } from "gsap/ScrollSmoother";
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
  const menuItemsRef = useRef(Array(12).fill(null));
  const galleryRef = useRef(null);
  const cursorRef = useRef(null);
  const marqueeRef = useRef(null);
  const mainHeadingRef = useRef(null);
  const subHeadingRef = useRef(null);
  const buttonRefs = useRef(Array(2).fill(null));
  const loungeTitleRef = useRef(null);
  const scrollLineRef = useRef(null);
  const countUpRefs = useRef(Array(3).fill(null));

  // Add refs for new animations
  const sectionRefs = useRef([]);
  const textRevealRefs = useRef([]);
  const parallaxItems = useRef([]);
  const fadeInRefs = useRef([]);
  const lenisRef = useRef(null);

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

  // Initialize Lenis for smooth scrolling
  useEffect(() => {
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "both",
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenisRef.current.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Connect Lenis to ScrollTrigger
    ScrollTrigger.update();

    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
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
    // Link GSAP ScrollTrigger with Lenis for proper scroll synchronization
    ScrollTrigger.refresh();

    // Parallax elements on scroll
    if (parallaxItems.current.length > 0) {
      parallaxItems.current.forEach((item, index) => {
        if (!item) return;

        const direction = index % 2 === 0 ? -20 : 20;

        gsap.fromTo(
          item,
          { y: 0 },
          {
            scrollTrigger: {
              trigger: item,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
            y: direction,
            ease: "none",
          }
        );
      });
    }

    // Text reveal animations
    if (textRevealRefs.current.length > 0) {
      textRevealRefs.current.forEach((section) => {
        if (!section) return;

        // Find all paragraphs within this section
        const textElements = section.querySelectorAll("p, h2, h3");

        gsap.fromTo(
          textElements,
          {
            y: 50,
            opacity: 0,
          },
          {
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
            y: 0,
            opacity: 1,
            stagger: 0.2,
            duration: 1,
            ease: "power3.out",
          }
        );
      });
    }

    // Section reveal with scale and opacity
    if (sectionRefs.current.length > 0) {
      sectionRefs.current.forEach((section) => {
        if (!section) return;

        gsap.fromTo(
          section,
          {
            scale: 0.9,
            opacity: 0,
          },
          {
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            scale: 1,
            opacity: 1,
            duration: 1.2,
            ease: "power2.out",
          }
        );
      });
    }

    // Fade in animations with different directions
    if (fadeInRefs.current.length > 0) {
      fadeInRefs.current.forEach((item, index) => {
        if (!item) return;

        // Alternate between left, right, bottom entrances
        let fromDirection = {};

        switch (index % 3) {
          case 0:
            fromDirection = { x: -50, opacity: 0 };
            break;
          case 1:
            fromDirection = { x: 50, opacity: 0 };
            break;
          case 2:
            fromDirection = { y: 50, opacity: 0 };
            break;
        }

        gsap.fromTo(item, fromDirection, {
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          x: 0,
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
        });
      });
    }

    // Add scroll-triggered background color changes to sections
    gsap.utils.toArray(".color-change-section").forEach((section) => {
      ScrollTrigger.create({
        trigger: section,
        start: "top 70%",
        end: "bottom 20%",
        toggleClass: "active-section",
        onEnter: () => {
          gsap.to(section, {
            backgroundColor: "rgba(255, 0, 85, 0.05)",
            duration: 0.8,
          });
        },
        onLeave: () => {
          gsap.to(section, {
            backgroundColor: "rgba(0, 0, 0, 0)",
            duration: 0.8,
          });
        },
        onEnterBack: () => {
          gsap.to(section, {
            backgroundColor: "rgba(255, 0, 85, 0.05)",
            duration: 0.8,
          });
        },
        onLeaveBack: () => {
          gsap.to(section, {
            backgroundColor: "rgba(0, 0, 0, 0)",
            duration: 0.8,
          });
        },
      });
    });

    // Alternative to pinning - use simpler animation for gallery
    ScrollTrigger.create({
      trigger: "#gallery",
      start: "top 20%",
      onEnter: () => {
        gsap.fromTo(
          ".gallery-item",
          { scale: 0.8, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            stagger: 0.1,
            duration: 0.8,
            ease: "power2.out",
          }
        );
      },
      onLeaveBack: () => {
        gsap.to(".gallery-item", {
          scale: 0.8,
          opacity: 0,
          stagger: 0.05,
          duration: 0.5,
        });
      },
    });

    // Scroll-triggered rotation effect for icons
    gsap.utils.toArray(".rotate-on-scroll").forEach((el) => {
      gsap.fromTo(
        el,
        { rotation: 0 },
        {
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            end: "bottom 20%",
            scrub: true,
          },
          rotation: 360,
          ease: "none",
          duration: 1,
        }
      );
    });

    // Title animations that split characters and animate them individually
    const animateChars = (element) => {
      if (!element) return;

      const text = element.innerText;
      const chars = text.split("");

      // Clear the element
      element.innerHTML = "";

      // Create spans for each character
      chars.forEach((char) => {
        const span = document.createElement("span");
        span.textContent = char === " " ? "\u00A0" : char;
        span.style.display = "inline-block";
        span.style.opacity = "0";
        span.style.transform = "translateY(20px)";
        element.appendChild(span);
      });

      // Animate spans on scroll
      gsap.to(element.querySelectorAll("span"), {
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
        },
        y: 0,
        opacity: 1,
        stagger: 0.03,
        duration: 0.8,
        ease: "back.out",
      });
    };

    // Apply char animation to titles with .char-reveal class
    document.querySelectorAll(".char-reveal").forEach(animateChars);

    // Count-up animation
    if (countUpRefs.current.length > 0) {
      countUpRefs.current.forEach((ref) => {
        if (!ref) return;

        const value = parseInt(ref.dataset.value);

        ScrollTrigger.create({
          trigger: ref,
          start: "top 80%",
          onEnter: () => {
            let start = 0;
            const duration = 2000; // milliseconds
            const step = (timestamp) => {
              if (!start) start = timestamp;
              const progress = Math.min((timestamp - start) / duration, 1);
              ref.innerHTML = Math.floor(progress * value);
              if (progress < 1) {
                window.requestAnimationFrame(step);
              }
            };
            window.requestAnimationFrame(step);
          },
        });
      });
    }

    // Hero animation on load
    gsap.from(heroRef.current, {
      opacity: 0,
      scale: 1.1,
      duration: 1.5,
      ease: "power3.out",
    });

    // Add some extra scroll animations for extra flair
    // Parallax background on scroll
    gsap.to(".parallax-bg", {
      scrollTrigger: {
        trigger: ".parallax-bg",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
      y: () => window.innerHeight * 0.2,
      ease: "none",
    });

    return () => {
      // Clean up all ScrollTriggers to prevent memory leaks
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Handle tab change with animation
  useEffect(() => {
    if (menuItemsRef.current.length > 0) {
      const menuItems = document.querySelectorAll(`.menu-item-${activeTab}`);
      if (menuItems.length > 0) {
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
    }
  }, [activeTab]);

  // Add form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dateTime: "",
    guests: "",
  });
  const [formStatus, setFormStatus] = useState({
    loading: false,
    success: false,
    error: false,
    message: "",
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.dateTime ||
      !formData.guests
    ) {
      setFormStatus({
        loading: false,
        success: false,
        error: true,
        message: "Please fill all fields",
      });
      return;
    }

    // Set loading state
    setFormStatus({
      loading: true,
      success: false,
      error: false,
      message: "Sending your reservation...",
    });

    try {
      // Send data to webhook
      await axios.post(
        "https://n8n.taiduong.io.vn/webhook/8e88aef7-67a9-45d3-a9a6-870cf98948f7",
        formData
      );

      // Handle success
      setFormStatus({
        loading: false,
        success: true,
        error: false,
        message:
          "Reservation submitted successfully! We will contact you shortly.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        dateTime: "",
        guests: "",
      });
    } catch (error) {
      // Handle error
      console.error("Reservation submission error:", error);
      setFormStatus({
        loading: false,
        success: false,
        error: true,
        message:
          "Something went wrong. Please try again or contact us directly.",
      });
    }
  };

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

      {/* Floating Phone Button */}
      <a
        href="tel:+84941907954"
        className="floating-phone-button"
        aria-label="Call us">
        <div className="phone-pulse"></div>
        <svg
          className="phone-icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24">
          <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
        </svg>
      </a>

      {/* Navigation */}
      <nav
        ref={navRef}
        className="fixed top-0 w-full z-50 transition-all duration-500"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0) 100%)",
          backdropFilter: "blur(10px)",
        }}>
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="text-[#ff0055] font-bold text-2xl tracking-wider flex items-center">
            <div className="logo-container mr-2">
              <div className="logo-diamond"></div>
            </div>
            <span className="font-serif tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#ff0055] to-[#ff4080]">
              ENTICE
            </span>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="burger-menu w-10 h-10 relative focus:outline-none">
              <span
                className={`burger-bar absolute left-1/2 top-1/2 w-6 h-[2px] bg-white transform -translate-x-1/2 transition-all duration-300 ${
                  isMenuOpen ? "rotate-45 translate-y-0" : "-translate-y-2"
                }`}></span>
              <span
                className={`burger-bar absolute left-1/2 top-1/2 w-6 h-[2px] bg-white transform -translate-x-1/2 transition-all duration-300 ${
                  isMenuOpen ? "opacity-0" : "opacity-100"
                }`}></span>
              <span
                className={`burger-bar absolute left-1/2 top-1/2 w-6 h-[2px] bg-white transform -translate-x-1/2 transition-all duration-300 ${
                  isMenuOpen ? "-rotate-45 translate-y-0" : "translate-y-2"
                }`}></span>
            </button>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex space-x-10">
            {["Home", "Menu", "Events", "Gallery", "Contact"].map(
              (item, index) => (
                <a
                  key={index}
                  href={`#${item.toLowerCase()}`}
                  className="nav-link relative text-white hover:text-[#ff0055] transition-colors duration-300 py-1">
                  {item}
                  <span className="nav-line absolute left-0 bottom-0 w-0 h-[1px] bg-[#ff0055] transition-all duration-300"></span>
                </a>
              )
            )}
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden backdrop-blur-lg bg-black/90 overflow-hidden transition-all duration-500 ease-in-out ${
            isMenuOpen ? "max-h-72 border-b border-gray-800/50" : "max-h-0"
          }`}>
          <div className="px-6 py-4 flex flex-col space-y-4">
            {["Home", "Menu", "Events", "Gallery", "Contact"].map(
              (item, index) => (
                <a
                  key={index}
                  href={`#${item.toLowerCase()}`}
                  className="text-white hover:text-[#ff0055] transition-colors duration-300 py-2 border-b border-gray-800/30"
                  onClick={() => setIsMenuOpen(false)}>
                  <span className="mr-2 text-[#ff0055] opacity-60">
                    0{index + 1}
                  </span>{" "}
                  {item}
                </a>
              )
            )}
          </div>
        </div>
      </nav>

      {/* Vertical scroll line */}
      <div
        ref={scrollLineRef}
        className="hidden md:block fixed left-6 top-1/2 -translate-y-1/2 w-0.5 h-48 bg-gradient-to-b from-[#ff0055] via-[#ff4080]/50 to-transparent opacity-60 z-40"></div>

      {/* Hero Section with Background Image */}
      <section
        ref={heroRef}
        id="home"
        className="relative h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        {/* Dynamic background with animated overlay */}
        <div
          className="absolute inset-0 bg-center bg-cover bg-fixed parallax-bg"
          style={{
            backgroundImage: `url(${bgImage})`,
            filter: "brightness(0.4)",
          }}></div>

        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-transparent to-black/50 z-0"></div>

        {/* Animated particles */}
        <div className="absolute inset-0 z-0">
          <div className="particles-container">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="particle"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  width: `${Math.random() * 5 + 2}px`,
                  height: `${Math.random() * 5 + 2}px`,
                  animationDuration: `${Math.random() * 20 + 10}s`,
                  animationDelay: `${Math.random() * 5}s`,
                  opacity: Math.random() * 0.5 + 0.3,
                }}
              />
            ))}
          </div>
        </div>

        {/* Diagonal reveal line */}
        <div className="absolute inset-0 overflow-hidden z-0">
          <div className="diagonal-line"></div>
        </div>

        <div className="relative p-8 z-10 backdrop-blur-sm bg-black/10 rounded-xl border border-white/10 max-w-4xl mx-auto transform hover:scale-[1.01] transition-transform duration-700">
          <div className="mb-5 flex justify-center">
            <div className="w-32 h-0.5 bg-gradient-to-r from-[#ff0055] to-[#ff4080]"></div>
          </div>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-4 hero-title">
            <span ref={heroTextRef} className="text-white">
              <span ref={mainHeadingRef} className="hero-text-shadow">
                ENTICE
              </span>
            </span>{" "}
            <span
              className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff0055] to-[#ff4080]"
              ref={loungeTitleRef}>
              LOUNGE
            </span>
          </h1>
          <p
            ref={subHeadingRef}
            className="text-gray-200 text-xl md:text-2xl mt-6 max-w-2xl mx-auto font-light tracking-wider leading-relaxed">
            WHERE EVERY NIGHT BECOMES A STORY
          </p>

          {/* Stylish separator */}
          <div className="my-10 flex items-center justify-center">
            <div className="w-14 h-0.5 bg-[#ff0055]/30"></div>
            <div className="mx-4">
              <span className="text-[#ff0055] text-2xl">✦</span>
            </div>
            <div className="w-14 h-0.5 bg-[#ff0055]/30"></div>
          </div>

          <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-6">
            <a
              href="#contact"
              ref={(el) => (buttonRefs.current[0] = el)}
              className="magnetic-btn group px-10 py-4 relative overflow-hidden bg-transparent text-white font-semibold rounded-full w-full md:w-auto border border-white/10 backdrop-blur-sm">
              <span className="btn-bg absolute inset-0 bg-gradient-to-r from-[#ff0055] to-[#ff4080] transform scale-x-0 origin-left transition-transform duration-300 rounded-full -z-10 group-hover:scale-x-100"></span>
              <span className="relative z-10 flex items-center justify-center">
                <span>RESERVE A TABLE</span>
                <span className="ml-2 transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300">
                  →
                </span>
              </span>
            </a>
            <a
              href="#menu"
              ref={(el) => (buttonRefs.current[1] = el)}
              className="magnetic-btn group px-10 py-4 relative overflow-hidden border border-white/20 text-white font-semibold rounded-full w-full md:w-auto mt-4 md:mt-0 hover:border-[#ff0055]/40 transition-colors duration-500">
              <span className="btn-bg absolute inset-0 bg-white/5 transform scale-x-0 origin-left transition-transform duration-300 rounded-full -z-10 group-hover:scale-x-100"></span>
              <span className="relative z-10 flex items-center justify-center">
                <span className="group-hover:text-[#ff0055] transition-colors duration-300">
                  EXPLORE MENU
                </span>
                <span className="ml-2 transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300">
                  →
                </span>
              </span>
            </a>
          </div>
        </div>

        {/* Scroll indicator with animation */}
        <div className="absolute bottom-10 w-full text-center z-10">
          <div className="inline-block">
            <div className="scroll-indicator">
              <div className="scroll-indicator-ball"></div>
            </div>
            <p className="text-gray-400 text-sm mt-2 tracking-wider">
              SCROLL TO EXPLORE
            </p>
          </div>
        </div>
      </section>

      {/* Marquee Text */}
      <div
        ref={marqueeRef}
        className="relative py-4 overflow-hidden border-y border-gray-800/50"
        style={{
          background: "linear-gradient(90deg, #000 0%, #0a0a0a 50%, #000 100%)",
          boxShadow: "0 10px 30px -10px rgba(0,0,0,0.5) inset",
        }}>
        <div className="marquee-inner whitespace-nowrap flex items-center">
          <div className="inline-block flex items-center">
            {[
              { text: "PREMIUM COCKTAILS", icon: "🍸" },
              { text: "EXCEPTIONAL AMBIANCE", icon: "✨" },
              { text: "UNFORGETTABLE NIGHTS", icon: "🌙" },
              { text: "PREMIUM COCKTAILS", icon: "🍸" },
              { text: "EXCEPTIONAL AMBIANCE", icon: "✨" },
              { text: "UNFORGETTABLE NIGHTS", icon: "🌙" },
            ].map((item, index) => (
              <React.Fragment key={index}>
                <div className="mx-4 flex items-center">
                  <span className="text-[#ff0055] text-lg mr-2">
                    {item.icon}
                  </span>
                  <span className="text-white/80 tracking-wider text-sm font-medium">
                    {item.text}
                  </span>
                </div>
                <div className="mx-4">
                  <span className="text-[#ff0055] text-xs tracking-wider">
                    ●
                  </span>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* About Section - Add scroll animation classes */}
      <section
        id="about"
        ref={(el) => (sectionRefs.current[0] = el)}
        className="py-24 px-6 md:px-12 bg-black relative overflow-hidden gsap-reveal color-change-section">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#ff0055]/5 rounded-full blur-3xl -z-0"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#ff0055]/5 rounded-full blur-3xl -z-0"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div
              className="w-full md:w-1/2"
              ref={(el) => (textRevealRefs.current[0] = el)}
              data-aos="fade-right">
              <h2 className="text-4xl md:text-5xl font-bold mb-8 char-reveal">
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
                <div className="rotate-on-scroll">
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
                <div className="rotate-on-scroll">
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
                <div className="rotate-on-scroll">
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
            <div
              className="w-full md:w-1/2 relative"
              data-aos="fade-left"
              ref={(el) => (parallaxItems.current[0] = el)}>
              <div className="relative z-10 rounded-xl overflow-hidden shadow-2xl shadow-black/50">
                <img
                  src={image1}
                  alt="Entice Lounge Ambiance"
                  className="w-full h-auto object-cover min-h-[450px]"
                />
              </div>
              <div className="absolute top-8 -right-8 bottom-8 -z-10 border-2 border-[#ff0055]/20 rounded-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section - Add scroll animation classes */}
      <section
        id="menu"
        ref={(el) => (sectionRefs.current[1] = el)}
        className="py-24 px-6 md:px-12 relative gsap-reveal color-change-section">
        {/* Premium background for menu */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="menu-bg-gradient absolute inset-0 opacity-10"></div>
          <div className="menu-bg-pattern absolute inset-0"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div
            className="text-center mb-16"
            ref={(el) => (textRevealRefs.current[1] = el)}
            data-aos="fade-up">
            <div className="flex justify-center mb-4">
              <div className="menu-decorative-element">
                <div className="menu-diamond"></div>
                <div className="menu-line"></div>
              </div>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 char-reveal">
              Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff0055] to-[#ff4080]">
                Menu
              </span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-10 font-light text-lg tracking-wider">
              Indulge in our carefully curated selection of premium drinks,
              crafted with passion and precision
            </p>

            <div className="flex flex-wrap justify-center gap-4 menu-tabs">
              {["cocktails", "spirits", "beers"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`menu-tab-btn ${
                    activeTab === tab ? "active" : ""
                  }`}>
                  {tab === "cocktails" && <span className="tab-icon">🍸</span>}
                  {tab === "spirits" && <span className="tab-icon">🥃</span>}
                  {tab === "beers" && <span className="tab-icon">🍺</span>}
                  <span className="tab-text">
                    {tab === "cocktails"
                      ? "Cocktails"
                      : tab === "spirits"
                      ? "Spirits & Wine"
                      : "Beer & Soft Drinks"}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Cocktails Menu */}
          {activeTab === "cocktails" && (
            <div className="max-w-5xl mx-auto menu-container">
              <div className="flex justify-center mb-14">
                <div className="menu-category-header">
                  <h3 className="text-2xl md:text-3xl font-semibold">
                    COCKTAIL
                  </h3>
                  <div className="menu-category-underline"></div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {cocktails.map((item, index) => (
                  <div
                    key={index}
                    ref={(el) => (menuItemsRef.current[index] = el)}
                    className="menu-item menu-item-cocktails"
                    data-aos="fade-up"
                    data-aos-delay={index * 50}>
                    <div className="menu-item-inner">
                      <div className="menu-item-icon">{item.icon}</div>
                      <h3 className="menu-item-name">{item.name}</h3>
                      <div className="menu-item-price">{item.price}</div>
                      <div className="menu-item-shine"></div>
                    </div>
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
            <div className="max-w-5xl mx-auto menu-container">
              <div className="flex justify-center mb-14">
                <div className="menu-category-header">
                  <h3 className="text-2xl md:text-3xl font-semibold">
                    SPIRITS & WINE
                  </h3>
                  <div className="menu-category-underline"></div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {spirits.map((item, index) => (
                  <div
                    key={index}
                    className="menu-item-large menu-item-spirits"
                    data-aos="fade-up"
                    data-aos-delay={index * 50}>
                    <div className="menu-item-large-inner">
                      <div className="flex items-center mb-3">
                        <span className="menu-item-icon-large">
                          {item.icon}
                        </span>
                        <h3 className="menu-item-name-large">{item.name}</h3>
                      </div>
                      <div className="flex justify-between mt-3">
                        <div className="menu-item-price-container">
                          <div className="menu-item-price-label">Glass</div>
                          <div className="menu-item-price-value">
                            {item.glass}
                          </div>
                        </div>
                        <div className="menu-item-price-container">
                          <div className="menu-item-price-label">Bottle</div>
                          <div className="menu-item-price-value">
                            {item.bottle}
                          </div>
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
            <div
              className="max-w-5xl mx-auto menu-container"
              data-aos="fade-up">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
                {/* Beers */}
                <div className="menu-section">
                  <div className="menu-category-header">
                    <h4 className="text-xl text-white mb-6 font-semibold tracking-wider text-center">
                      BEER
                    </h4>
                    <div className="menu-category-underline"></div>
                  </div>

                  <div className="space-y-4">
                    {beers.map((item, index) => (
                      <div
                        key={index}
                        className="menu-item-list"
                        data-aos="fade-up"
                        data-aos-delay={index * 50}>
                        <div className="flex items-center">
                          <span className="menu-item-list-icon">
                            {item.icon}
                          </span>
                          <span className="menu-item-list-name">
                            {item.name}
                          </span>
                        </div>
                        <span className="menu-item-list-price">
                          {item.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Soft Drinks */}
                <div className="menu-section">
                  <div className="menu-category-header">
                    <h4 className="text-xl text-white mb-6 font-semibold tracking-wider text-center">
                      SOFT DRINKS
                    </h4>
                    <div className="menu-category-underline"></div>
                  </div>

                  <div className="space-y-4">
                    {softDrinks.map((item, index) => (
                      <div
                        key={index}
                        className="menu-item-list"
                        data-aos="fade-up"
                        data-aos-delay={index * 50}>
                        <div className="flex items-center">
                          <span className="menu-item-list-icon">
                            {item.icon}
                          </span>
                          <span className="menu-item-list-name">
                            {item.name}
                          </span>
                        </div>
                        <span className="menu-item-list-price">
                          {item.price}
                        </span>
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
              className="see-full-menu inline-flex items-center">
              <span>See our full menu at the venue</span>
              <svg
                className="w-5 h-5 ml-2 arrow-icon"
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

        <style jsx>{`
          /* Menu section styling */
          .menu-bg-gradient {
            background: radial-gradient(
              circle at center,
              rgba(255, 0, 85, 0.1) 0%,
              rgba(0, 0, 0, 0) 70%
            );
          }

          .menu-bg-pattern {
            background-image: linear-gradient(
                135deg,
                rgba(255, 0, 85, 0.05) 25%,
                transparent 25%
              ),
              linear-gradient(
                225deg,
                rgba(255, 0, 85, 0.05) 25%,
                transparent 25%
              ),
              linear-gradient(
                45deg,
                rgba(255, 0, 85, 0.05) 25%,
                transparent 25%
              ),
              linear-gradient(
                315deg,
                rgba(255, 0, 85, 0.05) 25%,
                transparent 25%
              );
            background-position: 10px 0, 10px 0, 0 0, 0 0;
            background-size: 20px 20px;
            background-repeat: repeat;
          }

          .menu-decorative-element {
            position: relative;
            width: 100px;
            height: 40px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }

          .menu-diamond {
            width: 10px;
            height: 10px;
            background: linear-gradient(135deg, #ff0055, #ff4080);
            transform: rotate(45deg);
          }

          .menu-line {
            width: 60px;
            height: 2px;
            background: linear-gradient(
              to right,
              transparent,
              #ff0055,
              transparent
            );
            margin-top: 10px;
          }

          .menu-tab-btn {
            position: relative;
            padding: 0.75rem 1.5rem;
            border-radius: 30px;
            background-color: rgba(0, 0, 0, 0.3);
            border: 1px solid rgba(255, 255, 255, 0.1);
            color: white;
            font-weight: 500;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            overflow: hidden;
          }

          .menu-tab-btn::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(
              to right,
              rgba(255, 0, 85, 0.2),
              rgba(255, 64, 128, 0.2)
            );
            transform: translateX(-100%);
            transition: transform 0.5s ease;
            z-index: 0;
          }

          .menu-tab-btn.active {
            border-color: rgba(255, 0, 85, 0.5);
            box-shadow: 0 0 15px rgba(255, 0, 85, 0.3);
          }

          .menu-tab-btn.active::before {
            transform: translateX(0);
          }

          .tab-icon {
            margin-right: 6px;
            position: relative;
            z-index: 1;
          }

          .tab-text {
            position: relative;
            z-index: 1;
          }

          .menu-container {
            opacity: 0;
            animation: fadeIn 0.5s forwards;
          }

          @keyframes fadeIn {
            to {
              opacity: 1;
            }
          }

          .menu-category-header {
            position: relative;
            display: inline-block;
            padding-bottom: 5px;
          }

          .menu-category-underline {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background: linear-gradient(
              to right,
              transparent,
              #ff0055,
              transparent
            );
          }

          .menu-item {
            position: relative;
            height: 180px;
            perspective: 1000px;
            cursor: pointer;
          }

          .menu-item-inner {
            width: 100%;
            height: 100%;
            text-align: center;
            padding: 1.5rem 1rem;
            background-color: rgba(10, 10, 10, 0.4);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 10px;
            transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            transform-style: preserve-3d;
            position: relative;
            backdrop-filter: blur(5px);
            overflow: hidden;
          }

          .menu-item:hover .menu-item-inner {
            transform: rotateY(10deg) rotateX(5deg);
            border-color: rgba(255, 0, 85, 0.3);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
          }

          .menu-item-icon {
            font-size: 2rem;
            margin-bottom: 1rem;
          }

          .menu-item-name {
            font-size: 0.875rem;
            font-weight: 600;
            letter-spacing: 0.05em;
            color: white;
            margin-bottom: 0.75rem;
          }

          .menu-item-price {
            font-size: 0.875rem;
            color: #ff0055;
            font-weight: 500;
          }

          .menu-item-shine {
            position: absolute;
            top: 0;
            left: -100%;
            width: 50%;
            height: 100%;
            background: linear-gradient(
              90deg,
              transparent,
              rgba(255, 255, 255, 0.1),
              transparent
            );
            transition: 0.5s;
          }

          .menu-item:hover .menu-item-shine {
            left: 100%;
          }

          /* Larger menu items for spirits */
          .menu-item-large {
            position: relative;
            perspective: 1000px;
            cursor: pointer;
            margin-bottom: 1rem;
          }

          .menu-item-large-inner {
            width: 100%;
            padding: 1.5rem;
            background-color: rgba(10, 10, 10, 0.4);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 10px;
            transition: all 0.4s ease;
            position: relative;
            backdrop-filter: blur(5px);
            overflow: hidden;
          }

          .menu-item-large:hover .menu-item-large-inner {
            transform: translateY(-5px);
            border-color: rgba(255, 0, 85, 0.3);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
          }

          .menu-item-icon-large {
            font-size: 1.5rem;
            margin-right: 0.75rem;
          }

          .menu-item-name-large {
            font-size: 0.875rem;
            font-weight: 600;
            letter-spacing: 0.05em;
            color: white;
          }

          .menu-item-price-container {
            display: flex;
            flex-direction: column;
          }

          .menu-item-price-label {
            font-size: 0.75rem;
            color: rgba(255, 255, 255, 0.5);
            margin-bottom: 0.25rem;
          }

          .menu-item-price-value {
            font-size: 0.875rem;
            color: #ff0055;
            font-weight: 500;
          }

          /* List items for beers and soft drinks */
          .menu-section {
            position: relative;
          }

          .menu-item-list {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.75rem 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            transition: all 0.3s ease;
          }

          .menu-item-list:hover {
            border-bottom-color: rgba(255, 0, 85, 0.3);
            transform: translateX(5px);
          }

          .menu-item-list-icon {
            font-size: 1.25rem;
            margin-right: 0.75rem;
          }

          .menu-item-list-name {
            font-size: 0.875rem;
            color: white;
            font-weight: 500;
          }

          .menu-item-list-price {
            font-size: 0.875rem;
            color: #ff0055;
            font-weight: 500;
          }

          .see-full-menu {
            color: #ff0055;
            font-weight: 500;
            transition: all 0.3s ease;
            padding: 0.5rem 1rem;
            border-radius: 20px;
            border: 1px solid transparent;
          }

          .see-full-menu:hover {
            color: white;
            border-color: rgba(255, 0, 85, 0.3);
            background-color: rgba(255, 0, 85, 0.1);
          }

          .arrow-icon {
            transition: transform 0.3s ease;
          }

          .see-full-menu:hover .arrow-icon {
            transform: translateX(5px);
          }
        `}</style>
      </section>

      {/* Events Section - Add scroll animation classes */}
      <section
        id="events"
        ref={(el) => (sectionRefs.current[2] = el)}
        className="py-24 px-6 md:px-12 bg-[#0c0c0c] relative color-change-section">
        <div className="max-w-6xl mx-auto relative z-10">
          <div
            className="text-center mb-16"
            ref={(el) => (textRevealRefs.current[2] = el)}
            data-aos="fade-up">
            <div className="mb-3 flex justify-center">
              <div className="w-24 h-1 bg-[#ff0055]"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 char-reveal">
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
                ref={(el) => (fadeInRefs.current[index] = el)}
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
        className="py-24 px-6 md:px-12 bg-black gsap-reveal color-change-section">
        <div className="max-w-7xl mx-auto">
          <div
            className="text-center mb-16"
            ref={(el) => (textRevealRefs.current[3] = el)}
            data-aos="fade-up">
            <div className="mb-3 flex justify-center">
              <div className="w-24 h-1 bg-[#ff0055]"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 char-reveal">
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
                  ref={(el) => (parallaxItems.current[index + 1] = el)}
                  className="rounded-xl overflow-hidden group relative gallery-item transform-gpu">
                  <img
                    src={img}
                    alt={`Gallery ${index + 1}`}
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
      <section
        ref={(el) => (sectionRefs.current[3] = el)}
        className="py-24 px-6 md:px-12 bg-gradient-to-b from-[#0c0c0c] to-black relative overflow-hidden color-change-section">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#ff0055]/5 rounded-full blur-3xl -z-0"></div>

        <div className="max-w-5xl mx-auto relative z-10">
          <div
            className="text-center mb-16"
            ref={(el) => (textRevealRefs.current[4] = el)}
            data-aos="fade-up">
            <div className="mb-3 flex justify-center">
              <div className="w-24 h-1 bg-[#ff0055]"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 char-reveal">
              What Our <span className="text-[#ff0055]">Guests</span> Say
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((item, index) => (
              <div
                key={index}
                ref={(el) => (fadeInRefs.current[index + 3] = el)}
                className="bg-black/30 backdrop-blur-sm border border-gray-800 p-6 rounded-xl relative"
                data-aos="fade-up"
                data-aos-delay={index * 100}>
                <div className="text-[#ff0055] text-4xl mb-4 rotate-on-scroll">
                  ❝
                </div>
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
        ref={(el) => (sectionRefs.current[4] = el)}
        className="p-12 text-center bg-black relative overflow-hidden gsap-reveal color-change-section">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#ff0055]/5 rounded-full blur-3xl -z-0"></div>

        <div className="max-w-5xl mx-auto relative z-10">
          <h2 className="text-4xl font-bold mb-10" data-aos="fade-up">
            <span className="text-white">Reserve Your</span>{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff0055] to-[#ff4080]">
              Experience
            </span>
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

            {/* Form status message */}
            {formStatus.message && (
              <div
                className={`py-3 px-4 mb-6 rounded-md ${
                  formStatus.success
                    ? "bg-green-900/40 text-green-300 border border-green-500/30"
                    : formStatus.error
                    ? "bg-red-900/40 text-red-300 border border-red-500/30"
                    : "bg-blue-900/40 text-blue-300 border border-blue-500/30"
                }`}>
                <p>{formStatus.message}</p>
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 reservation-form">
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your Name"
                  className="w-full bg-[#111] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#ff0055] transition-all duration-300"
                />
                <div className="form-field-glow"></div>
              </div>

              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Your Email"
                  className="w-full bg-[#111] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#ff0055] transition-all duration-300"
                />
                <div className="form-field-glow"></div>
              </div>

              <div className="relative">
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Phone Number"
                  className="w-full bg-[#111] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#ff0055] transition-all duration-300"
                />
                <div className="form-field-glow"></div>
              </div>

              <div className="relative">
                <input
                  type="text"
                  name="dateTime"
                  value={formData.dateTime}
                  onChange={handleInputChange}
                  placeholder="Date & Time (e.g., May 20, 8:00 PM)"
                  className="w-full bg-[#111] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#ff0055] transition-all duration-300"
                />
                <div className="form-field-glow"></div>
              </div>

              <div className="relative col-span-1 md:col-span-2">
                <select
                  name="guests"
                  value={formData.guests}
                  onChange={handleInputChange}
                  className="w-full bg-[#111] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#ff0055] transition-all duration-300 appearance-none">
                  <option value="">Number of Guests</option>
                  <option value="1-2">1-2 Guests</option>
                  <option value="3-4">3-4 Guests</option>
                  <option value="5-6">5-6 Guests</option>
                  <option value="7+">7+ Guests</option>
                </select>
                <div className="form-field-glow"></div>
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>

              <div className="col-span-1 md:col-span-2 mt-4">
                <button
                  type="submit"
                  disabled={formStatus.loading}
                  className="group relative bg-gradient-to-r from-[#ff0055] to-[#ff4080] text-white font-semibold py-3 px-6 rounded-lg hover:shadow-lg hover:shadow-[#ff0055]/20 transition-all duration-300 transform hover:-translate-y-1 w-full overflow-hidden">
                  <span className="relative z-10 flex items-center justify-center">
                    {formStatus.loading ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24">
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      <>
                        Reserve Now
                        <span className="ml-2 transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300">
                          →
                        </span>
                      </>
                    )}
                  </span>
                  <div className="absolute top-0 left-0 w-20 h-full bg-white/10 skew-x-[45deg] transform -translate-x-32 transition-transform group-hover:translate-x-96 duration-1000"></div>
                </button>
              </div>
            </form>
          </div>

          {/* Contact info cards */}
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

      {/* Additional CSS for form styling */}
      <style jsx>{`
        /* Existing styles... */

        /* Form field effects */
        .reservation-form .relative {
          overflow: hidden;
        }

        .form-field-glow {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(
            circle at center,
            rgba(255, 0, 85, 0.4) 0%,
            transparent 70%
          );
          opacity: 0;
          transition: opacity 0.5s ease;
          pointer-events: none;
          z-index: -1;
        }

        .reservation-form input:focus ~ .form-field-glow,
        .reservation-form select:focus ~ .form-field-glow {
          opacity: 0.2;
        }

        .reservation-form input,
        .reservation-form select {
          background-color: rgba(17, 17, 17, 0.7);
          backdrop-filter: blur(5px);
        }

        .reservation-form input:focus,
        .reservation-form select:focus {
          box-shadow: 0 0 15px rgba(255, 0, 85, 0.2);
          border-color: rgba(255, 0, 85, 0.5);
        }

        /* Logo animation */
        .logo-container {
          width: 20px;
          height: 20px;
          position: relative;
          transform: rotate(45deg);
          animation: pulse 3s infinite;
        }

        .logo-diamond {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #ff0055, #ff4080);
          box-shadow: 0 0 15px rgba(255, 0, 85, 0.7);
        }

        @keyframes pulse {
          0% {
            transform: rotate(45deg) scale(1);
          }
          50% {
            transform: rotate(45deg) scale(1.1);
          }
          100% {
            transform: rotate(45deg) scale(1);
          }
        }

        /* Navigation animation */
        .nav-link:hover .nav-line {
          width: 100%;
        }

        /* Hero animations */
        .hero-text-shadow {
          text-shadow: 0 0 40px rgba(255, 255, 255, 0.2);
        }

        .particles-container {
          width: 100%;
          height: 100%;
          position: absolute;
        }

        .particle {
          position: absolute;
          background-color: rgba(255, 255, 255, 0.6);
          border-radius: 50%;
          animation: float linear infinite;
        }

        @keyframes float {
          0% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-100px) translateX(50px);
          }
          50% {
            transform: translateY(-50px) translateX(100px);
          }
          75% {
            transform: translateY(50px) translateX(50px);
          }
          100% {
            transform: translateY(0) translateX(0);
          }
        }

        .diagonal-line {
          position: absolute;
          top: -100%;
          left: -100%;
          width: 300%;
          height: 300%;
          background: linear-gradient(
            45deg,
            transparent 49.5%,
            rgba(255, 0, 85, 0.3) 49.5%,
            rgba(255, 0, 85, 0.3) 50.5%,
            transparent 50.5%
          );
          background-size: 20px 20px;
          transform: rotate(45deg);
          animation: moveDiagonal 15s linear infinite;
        }

        @keyframes moveDiagonal {
          0% {
            transform: rotate(45deg) translateX(0);
          }
          100% {
            transform: rotate(45deg) translateX(100px);
          }
        }

        .scroll-indicator {
          width: 2px;
          height: 60px;
          background-color: rgba(255, 255, 255, 0.2);
          margin: 0 auto;
          position: relative;
          overflow: hidden;
        }

        .scroll-indicator-ball {
          width: 6px;
          height: 6px;
          background: #ff0055;
          border-radius: 50%;
          position: absolute;
          top: 0;
          left: -2px;
          animation: scrollDown 2s ease-in-out infinite;
        }

        @keyframes scrollDown {
          0% {
            top: -6px;
            opacity: 1;
          }
          90% {
            top: 60px;
            opacity: 1;
          }
          100% {
            top: 60px;
            opacity: 0;
          }
        }

        /* Form field effects */
        .reservation-form .relative {
          overflow: hidden;
        }

        .form-field-glow {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(
            circle at center,
            rgba(255, 0, 85, 0.4) 0%,
            transparent 70%
          );
          opacity: 0;
          transition: opacity 0.5s ease;
          pointer-events: none;
          z-index: -1;
        }

        .reservation-form input:focus ~ .form-field-glow,
        .reservation-form select:focus ~ .form-field-glow {
          opacity: 0.2;
        }

        .reservation-form input,
        .reservation-form select {
          background-color: rgba(17, 17, 17, 0.7);
          backdrop-filter: blur(5px);
        }

        .reservation-form input:focus,
        .reservation-form select:focus {
          box-shadow: 0 0 15px rgba(255, 0, 85, 0.2);
          border-color: rgba(255, 0, 85, 0.5);
        }

        /* Floating Phone Button */
        .floating-phone-button {
          position: fixed;
          bottom: 30px;
          right: 30px;
          width: 65px;
          height: 65px;
          background: linear-gradient(135deg, #c29545, #f6e27a);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3),
            0 0 30px rgba(194, 149, 69, 0.3);
          z-index: 1000;
          cursor: pointer;
          transition: all 0.3s ease;
          animation: phoneButtonFloat 3s ease-in-out infinite;
        }

        .floating-phone-button:hover {
          transform: scale(1.1);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4),
            0 0 40px rgba(194, 149, 69, 0.4);
        }

        .floating-phone-button .phone-icon {
          width: 30px;
          height: 30px;
          fill: white;
          filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.2));
          transition: transform 0.3s ease;
        }

        .floating-phone-button:hover .phone-icon {
          transform: rotate(15deg);
        }

        .phone-pulse {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background-color: rgba(194, 149, 69, 0.4);
          z-index: -1;
          animation: phonePulse 2s infinite ease-out;
        }

        @keyframes phonePulse {
          0% {
            transform: scale(1);
            opacity: 0.6;
          }
          70% {
            transform: scale(1.5);
            opacity: 0;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }

        @keyframes phoneButtonFloat {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-6px);
          }
        }

        @media (max-width: 768px) {
          .floating-phone-button {
            width: 55px;
            height: 55px;
            bottom: 20px;
            right: 20px;
          }

          .floating-phone-button .phone-icon {
            width: 25px;
            height: 25px;
          }
        }

        /* Remove old floating phone button styles */
        .floating-phone-btn {
          position: fixed;
          bottom: 30px;
          right: 30px;
          z-index: 999;
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          border-radius: 50%;
          box-shadow: 0 4px 15px rgba(255, 0, 85, 0.4);
          transition: all 0.3s ease;
        }

        .floating-phone-btn:hover {
          transform: scale(1.05) translateY(-5px);
          box-shadow: 0 10px 25px rgba(255, 0, 85, 0.5);
        }

        .phone-icon-container {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: linear-gradient(135deg, #ff0055, #ff4080);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 3;
        }

        .delay-1 {
          animation-delay: 0.6s;
        }

        .delay-2 {
          animation-delay: 1.2s;
        }

        @keyframes shake {
          0%,
          100% {
            transform: rotate(0);
          }
          10%,
          30%,
          50%,
          70%,
          90% {
            transform: rotate(-8deg);
          }
          20%,
          40%,
          60%,
          80% {
            transform: rotate(8deg);
          }
        }
      `}</style>
    </div>
  );
}
export default Home;
