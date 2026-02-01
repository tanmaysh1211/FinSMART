import { useNavigate } from "react-router-dom";
import { useEffect, useState , useRef } from "react";

export default function Landing() {
  const navigate = useNavigate();
  const [showCTA, setShowCTA] = useState(false);

  const ctaRef = useRef(null);
  const [ctaVisible, setCtaVisible] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);

  const whyRef = useRef(null);
  const [whyVisible, setWhyVisible] = useState(false);

useEffect(() => {
  requestAnimationFrame(() => setHeroVisible(true));
}, []);

useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setWhyVisible(true);
        observer.disconnect();
      }
    },
    { threshold: 0.3 }
  );

  if (whyRef.current) observer.observe(whyRef.current);

  return () => observer.disconnect();
}, []);

useEffect(() => {
  requestAnimationFrame(() => setHeadingVisible(true));
}, []);

useEffect(() => {
  requestAnimationFrame(() => setShowCTA(true));
}, []);

useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setCtaVisible(true);
        observer.disconnect(); // run only once
      }
    },
    { threshold: 0.3 } // 30% visible = trigger
  );

  if (ctaRef.current) observer.observe(ctaRef.current);

  return () => observer.disconnect();
}, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full bg-white border-b border-slate-200 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
        
        {/* LOGO */}
        <div className={`flex items-center gap-3 font-semibold text-xl transition-all duration-700 ease-out
    ${showCTA ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
          {/* <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white">
            🛡️
          </div> */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
          <span className="text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-sm sm:text-base">FS</span>
        </div>

          <span className="text-indigo-600 font-semibold">FinSmart</span>
        </div>

        {/* CTA */}
        <button
          onClick={() => navigate("/login")}
          className={`bg-gradient-to-r from-indigo-500 to-purple-600  text-white px-4 py-2.5 rounded-lg
                  font-medium flex items-center gap-2 transition-all duration-700 ease-out hover:opacity-90
                  ${showCTA ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>Get Started
          <span className="text-lg">→</span>
        </button>

      </div>
    </nav>
      
            {/* HERO SECTION */}
      <section className="min-h-[82vh] flex items-center justify-center bg-[#EEF3F1]">
        {/* <div className="text-center max-w-3xl px-4 sm:px-2 mt-24 sm:mt-20"> */}
        
  <div className={`
      text-center max-w-3xl px-4 sm:px-6
      transition-all duration-700 ease-out
      ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
  >
    
    <h1 className="text-[42px] sm:text-[56px] md:text-[62px] font-bold leading-tight mt-12">
      <span className=" bg-gradient-to-r from-[#0f172a] via-[#1d4ed8] to-[#2563eb] bg-clip-text text-transparent">
            Smart Finance</span>
      <br />
      <span className="bg-gradient-to-r from-[#4F46E5] via-[#7C3AED] to-[#EC4899] bg-clip-text text-transparent">
        Management
      </span>
    </h1>

    <p className="mt-6 text-[20px] md:text-[24px] text-slate-600 leading-relaxed">
      Take control of your financial future with FinSmart.
      Track expenses, set goals, and achieve financial freedom with
      our intelligent personal finance platform.
    </p>

    <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-10">
      <button onClick={() => navigate("/login")} className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lgfont-semibold text-white  bg-gradient-to-r from-[#4F46E5] to-[#9333EA] rounded-xl shadow-lg hover:scale-[1.03] transition">
        Start Your Journey →
      </button>

      <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold text-black bg-white rounded-xl shadow hover:bg-slate-50 transition">
        Watch Demo
      </button>
    </div>

  </div>
</section>

 {/* WHY CHOOSE */}
      <section className="py-24 bg-[#F5F9F]">
  {/* Heading */}
  {/* <div className="text-center max-w-3xl mx-auto mb-20"> */}
   <div
    ref={whyRef}
    className={`
      text-center max-w-3xl mx-auto mb-20
      transition-all duration-700 ease-out
      ${whyVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
    `}
  >

  <h2 className="text-4xl md:text-4xl font-bold tracking-tight text-[#0f172a]">
    Why Choose FinSmart?
  </h2>

  <p className="mt-6 text-lg md:text-xl text-slate-700 leading-relaxed">
    Built with modern technology and user experience in mind, FinSmart provides
    everything you need for comprehensive financial management.
  </p>
</div>


  {/* Feature Cards */}
  <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-y-10 sm:gap-y-14 gap-x-6 sm:gap-x-24 px-4 sm:px-14">
    
    {/* Smart Analytics */}
    <div className="feature-card">
      <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center mb-4">
        📈
      </div>
      <h3 className="text-xl font-semibold text-slate-900">
        Smart Analytics
      </h3>
      <p className="mt-2 text-slate-600 leading-relaxed">
        Get insights into your spending patterns with AI-powered
        financial analysis.
      </p>
    </div>

    {/* Visual Reports */}
    <div className="feature-card">
      <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center mb-4">
        📊
      </div>
      <h3 className="text-xl font-semibold text-slate-900">
        Visual Reports
      </h3>
      <p className="mt-2 text-slate-600 leading-relaxed">
        Beautiful charts and graphs to understand your financial
        health at a glance.
      </p>
    </div>

    {/* Mobile First */}
    <div className="feature-card">
      <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center mb-4">
        📱
      </div>
      <h3 className="text-xl font-semibold text-slate-900">
        Mobile First
      </h3>
      <p className="mt-2 text-slate-600 leading-relaxed">
        Responsive design that works perfectly on all
        devices and screen sizes.
      </p>
    </div>

    {/* Lightning Fast */}
    <div className="feature-card">
      <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center mb-4">
        ⚡
      </div>
      <h3 className="text-xl font-semibold text-slate-900">
        Lightning Fast
      </h3>
      <p className="mt-2 text-slate-600 leading-relaxed">
        Built with modern technologies for instant loading
        and smooth performance.
      </p>
    </div>

  </div>
</section>

      
      {/* CTA */}
      <section className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-20">
      <div ref={ctaRef} className={`max-w-3xl mx-auto text-center px-6 transition-all duration-700 ease-out ${ctaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
                
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
          Ready to Transform Your Financial Life?
        </h2>

        <p className="mt-5 text-base sm:text-lg md:text-xl text-white/90">
          Start your journey to financial freedom with FinSmart today.
        </p>

        <button
          onClick={() => navigate("/login")}
          className="mt-10 inline-flex items-center gap-3 bg-white text-indigo-600 
                     px-8 py-4 text-lg font-semibold rounded-lg
                     transition hover:scale-[1.03] active:scale-95"
        >
          Get Started Now
          <span className="text-xl">→</span>
        </button>

      </div>
    </section>

      <footer className="w-full">
  {/* Top Gradient Strip */}
  <div className="h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

  {/* Main Footer */}
  <div className="bg-[#0b1222]">
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
      
      {/* Left: Logo */}
      <div className="flex items-center gap-3">        
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
          <span className="text-white font-bold text-lg">FS</span>
        </div>

          <span className="text-white font-bold text-lg">FinSmart</span>
      </div>

      {/* Right: Copyright */}
      <p className="text-sm text-slate-400">
        © 2025 FinSmart. All rights reserved.
      </p>

    </div>
  </div>
</footer>
</div>
  );
}
