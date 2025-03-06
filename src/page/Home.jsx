import { useEffect } from "react";
import Lenis from "lenis";
import bgImage from "../assets/bg.jpg";
import image1 from "../assets/image1.jpg";
import image2 from "../assets/image2.jpg";
import image3 from "../assets/image3.jpg";

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

  const images = [
    {
      src: image1,
      caption:
        "Entice Lounge không chỉ là một địa điểm giải trí sôi động với âm nhạc và không gian đẳng cấp mà còn là thiên đường của những tín đồ yêu thích cocktail và thức uống cao cấp. Tại đây, mỗi ly cocktail không đơn thuần chỉ là một món đồ uống mà còn là một tác phẩm nghệ thuật, được sáng tạo bởi những bartender chuyên nghiệp, luôn sẵn sàng mang đến cho bạn những trải nghiệm hương vị độc đáo và khó quên.",
    },
    {
      src: image2,
      caption:
        "Đối với những vị khách yêu thích sự cổ điển và sang trọng, Entice Lounge cũng phục vụ một bộ sưu tập rượu vang và rượu mạnh từ những thương hiệu danh tiếng trên thế giới. Từ những chai vang đỏ đậm đà, vang trắng tinh tế cho đến các dòng whisky, cognac thượng hạng, mọi lựa chọn đều có sẵn để nâng tầm trải nghiệm của bạn.",
    },
    {
      src: image3,
      caption:
        "Entice Lounge không chỉ là nơi thưởng thức đồ uống tuyệt hảo mà còn là điểm đến của những khoảnh khắc sôi động và vui nhộn. Không gian ngập tràn âm nhạc, ánh sáng rực rỡ cùng những trò chơi giải trí như phi tiêu, tạo nên bầu không khí náo nhiệt. Khách hàng có thể thả mình vào những bản nhạc sôi động, cười đùa cùng bạn bè, tham gia các trò chơi hấp dẫn và tận hưởng những ly cocktail đầy mê hoặc. Mỗi đêm tại Entice Lounge đều là một trải nghiệm khó quên, tràn ngập niềm vui và sự hứng khởi!",
    },
  ];

  return (
    <div className="bg-[#121212] text-white min-h-screen font-sans">
      {/* Hero Section with Background Image */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-6">
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{
            backgroundImage: `url(${bgImage})`,
            filter: "brightness(0.5)",
          }}></div>
        <div className="relative bg-opacity-50 p-6 rounded-xl text-center">
          <h1 className="text-5xl font-bold tracking-wide">ENTICE LOUNGE</h1>
          <p className="text-gray-300 text-lg mt-4 max-w-2xl">
            SIP - SAVOR -SEDUCE
          </p>
          <div className="mt-10">
            <a
              href="https://www.facebook.com/profile.php?id=61572968996710#"
              className="mt-6 px-6 py-3 bg-[#ff0055] text-white font-semibold rounded-full hover:bg-[#e6004c] transition">
              Booking Now
            </a>
          </div>
        </div>
      </section>

      {/* Images Section */}
      <section className="p-8 flex flex-col gap-8">
        {images.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col md:flex-row items-center gap-32 ${
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            }`}>
            <img
              src={item.src}
              alt={`Gallery ${index + 1}`}
              className="w-full md:w-1/2 h-60 object-cover rounded-xl min-h-[600px]"
            />
            <p className="text-gray-300 text-lg max-w-2xl font-sans">
              {item.caption}
            </p>
          </div>
        ))}
      </section>

      {/* Contact Information */}
      <section className="p-8 text-center bg-[#1a1a1a]">
        {/* <h2 className="text-4xl font-bold">Contact Us</h2> */}
        <p className="text-gray-400 mt-2">
          <a href="tel:+84941907954">Phone: 0941907954</a>
        </p>
        <p className="text-gray-400 mt-2">
          <a href="https://maps.app.goo.gl/H9LvnLNWevBGvC8p6">
            Address: 19 Hải Triều, Bến Nghé, Quận 1, Hồ Chí Minh
          </a>
        </p>
        <p className="text-gray-400 mt-2">
          Fanpage:{" "}
          <a
            href="https://www.facebook.com/profile.php?id=61572968996710#"
            className="text-[#ff0055] hover:underline">
            Facebook
          </a>
        </p>
        <p className="text-gray-400 mt-2">Open: 17:00 - 02:00</p>
      </section>
    </div>
  );
}
export default Home;
