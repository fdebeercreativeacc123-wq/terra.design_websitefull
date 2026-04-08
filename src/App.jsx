import { useEffect, useMemo, useRef, useState } from "react";

const C = {
  bg: "#fbf7f2",
  cream: "#f7efe4",
  sand: "#e8ddd0",
  tan: "#c6a88a",
  terracotta: "#c96b3c",
  burnt: "#a85a30",
  espresso: "#2e2118",
  dark: "#1c1612",
  warmGray: "#7d7068",
  muted: "#a69a8e",
  white: "#fffdf9",
  card: "rgba(255,253,249,0.72)",
  coral: "#d4785a",
  amber: "#d4a24e",
  sage: "#8ba888",
  sky: "#7aafc4",
  plum: "#8a6fa8",
};

const CONTACT_EMAIL = "hello@terradesign.co";
const SITE_URL = "https://terradesign.co";

const services = [
  {
    num: "01",
    title: "Custom Website Design",
    desc: "A website built specifically for your business, not a template with your logo dropped in. Designed to look polished on every screen and guide visitors toward getting in touch.",
    color: C.terracotta,
  },
  {
    num: "02",
    title: "Search Engine Optimisation",
    desc: "Proper page structure, metadata, and indexing so your business appears when potential customers search for the services you offer.",
    color: C.amber,
  },
  {
    num: "03",
    title: "Hosting Setup & Handoff",
    desc: "We configure your hosting, deploy the finished site, and hand over full access. You own everything from day one, with no ongoing fees to us.",
    color: C.sage,
  },
  {
    num: "04",
    title: "Performance Optimisation",
    desc: "Clean, lightweight code and optimised assets so your site loads quickly on any connection, because slow websites lose customers.",
    color: C.sky,
  },
  {
    num: "05",
    title: "Contact & Enquiry Forms",
    desc: "Professionally designed forms with input validation, making it easy for genuine leads to reach you while keeping spam to a minimum.",
    color: C.coral,
  },
  {
    num: "06",
    title: "Google Business Integration",
    desc: "Your site connected to Google Maps and local search, giving nearby customers the confidence to find and choose your business.",
    color: C.plum,
  },
];

const processSteps = [
  {
    step: "1",
    title: "Consultation",
    desc: "We discuss your business, your customers, and what you need the website to achieve. A brief call or message is all it takes.",
    time: "Day 1",
  },
  {
    step: "2",
    title: "Design",
    desc: "You receive a visual direction early on. We refine together until the look, feel, and structure are exactly right.",
    time: "Day 2-5",
  },
  {
    step: "3",
    title: "Development",
    desc: "The approved design is built into a fully responsive, fast-loading website with SEO foundations in place.",
    time: "Day 5-10",
  },
  {
    step: "4",
    title: "Launch",
    desc: "Final testing, hosting deployment, and a complete handover. Your website goes live and the access is entirely yours.",
    time: "Day 10-14",
  },
];

const plans = [
  {
    name: "Starter",
    price: "R2,000",
    desc: "A clean, professional single-page website for businesses establishing their online presence.",
    best: false,
    features: [
      "Single-page website",
      "Mobile responsive design",
      "Contact section",
      "Basic SEO setup",
      "Hosting setup & deployment",
      "1 round of revisions",
    ],
  },
  {
    name: "Professional",
    price: "R3,500",
    desc: "A comprehensive multi-page website built for businesses ready to grow their customer base online.",
    best: true,
    features: [
      "Multi-page website (up to 5 pages)",
      "Mobile responsive design",
      "Enquiry form with validation",
      "Full SEO setup & Google indexing",
      "Hosting setup & deployment",
      "Google Maps integration",
      "Speed optimisation",
      "2 rounds of revisions",
    ],
  },
  {
    name: "Premium",
    price: "R5,000",
    desc: "The complete package for businesses that want the highest standard of online presence.",
    best: false,
    features: [
      "Multi-page website (up to 8 pages)",
      "Advanced enquiry forms",
      "Full SEO & analytics setup",
      "Image & speed optimisation",
      "Social media integration",
      "3 rounds of revisions",
      "30 days post-launch support",
    ],
  },
];

const getSectionHref = (section, isAboutPage = false) =>
  isAboutPage ? `/#${section}` : `#${section}`;

const setMetaContent = (selector, content) => {
  const element = document.querySelector(selector);
  if (element && content) {
    element.setAttribute("content", content);
  }
};

const usePageMeta = ({ title, description, pathname }) => {
  useEffect(() => {
    const canonicalUrl = `${SITE_URL}${pathname}`;
    document.title = title;
    setMetaContent('meta[name="description"]', description);
    setMetaContent('meta[property="og:title"]', title);
    setMetaContent('meta[property="og:description"]', description);
    setMetaContent('meta[property="og:url"]', canonicalUrl);
    setMetaContent('meta[name="twitter:title"]', title);
    setMetaContent('meta[name="twitter:description"]', description);

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute("href", canonicalUrl);
  }, [description, pathname, title]);
};

const useInView = (threshold = 0.1) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || !("IntersectionObserver" in window)) {
      setVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
};

const BouncingSpheres = () => {
  const canvasRef = useRef(null);
  const spheresRef = useRef([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animRef = useRef(null);
  const reducedMotion = useMemo(
    () =>
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    const colors = [
      { r: 201, g: 107, b: 60 },
      { r: 212, g: 120, b: 90 },
      { r: 196, g: 168, b: 130 },
      { r: 212, g: 162, b: 78 },
      { r: 139, g: 168, b: 136 },
      { r: 122, g: 175, b: 196 },
      { r: 138, g: 111, b: 168 },
    ];

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = window.innerWidth * ratio;
      canvas.height = window.innerHeight * ratio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(ratio, ratio);

      const count = window.innerWidth < 640 ? 8 : 14;
      spheresRef.current = Array.from({ length: count }, () => {
        const r = 18 + Math.random() * 52;
        const color = colors[Math.floor(Math.random() * colors.length)];
        return {
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: (Math.random() - 0.5) * 1.4,
          vy: (Math.random() - 0.5) * 1.4,
          r,
          color,
          opacity: 0.15 + Math.random() * 0.16,
          mass: r * 0.01,
        };
      });
    };

    const onMouseMove = (event) => {
      mouseRef.current = { x: event.clientX, y: event.clientY };
    };

    const draw = (time) => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      const spheres = spheresRef.current;

      spheres.forEach((s, i) => {
        if (!reducedMotion) {
          const dx = s.x - mouseRef.current.x;
          const dy = s.y - mouseRef.current.y;
          const dist = Math.hypot(dx, dy);
          if (dist > 0 && dist < 180) {
            const force = ((180 - dist) / 180) * 0.08;
            s.vx += (dx / dist) * force;
            s.vy += (dy / dist) * force;
          }

          s.vx += Math.sin(time * 0.00028 + i * 1.3) * 0.01;
          s.vy += Math.cos(time * 0.0003 + i * 1.9) * 0.01;
          s.vx *= 0.995;
          s.vy *= 0.995;
          s.x += s.vx;
          s.y += s.vy;

          if (s.x - s.r < 0 || s.x + s.r > window.innerWidth) s.vx *= -0.92;
          if (s.y - s.r < 0 || s.y + s.r > window.innerHeight) s.vy *= -0.92;
          s.x = Math.max(s.r, Math.min(window.innerWidth - s.r, s.x));
          s.y = Math.max(s.r, Math.min(window.innerHeight - s.r, s.y));
        }

        const gradient = ctx.createRadialGradient(
          s.x - s.r * 0.28,
          s.y - s.r * 0.28,
          s.r * 0.08,
          s.x,
          s.y,
          s.r
        );
        gradient.addColorStop(0, `rgba(${Math.min(255, s.color.r + 65)},${Math.min(255, s.color.g + 65)},${Math.min(255, s.color.b + 55)},${s.opacity})`);
        gradient.addColorStop(0.55, `rgba(${s.color.r},${s.color.g},${s.color.b},${s.opacity})`);
        gradient.addColorStop(1, `rgba(${Math.max(0, s.color.r - 40)},${Math.max(0, s.color.g - 40)},${Math.max(0, s.color.b - 24)},0)`);

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      animRef.current = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMouseMove, { passive: true });
    animRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMouseMove);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [reducedMotion]);

  return <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none" }} />;
};

const AuroraGlow = () => (
  <div
    aria-hidden="true"
    style={{
      position: "fixed",
      inset: 0,
      pointerEvents: "none",
      zIndex: 0,
      background: `
        radial-gradient(circle at 12% 18%, rgba(212,162,78,0.18), transparent 20%),
        radial-gradient(circle at 85% 22%, rgba(122,175,196,0.18), transparent 24%),
        radial-gradient(circle at 70% 78%, rgba(138,111,168,0.14), transparent 22%),
        radial-gradient(circle at 18% 82%, rgba(212,120,90,0.14), transparent 20%)
      `,
    }}
  />
);

const Button = ({ children, variant = "primary", href, onClick, style }) => {
  const Tag = href ? "a" : "button";
  const external = href && /^https?:\/\//i.test(href);
  const variants = {
    primary: { background: `linear-gradient(135deg, ${C.terracotta}, ${C.burnt})`, color: C.white, boxShadow: `0 10px 30px ${C.terracotta}33` },
    secondary: { background: "rgba(255,255,255,0.45)", color: C.espresso, border: `1.5px solid ${C.espresso}22` },
    dark: { background: C.espresso, color: C.white, boxShadow: `0 10px 30px ${C.espresso}2a` },
    light: { background: "rgba(255,255,255,0.14)", color: C.white, border: "1.5px solid rgba(255,255,255,0.2)" },
  };

  return (
    <Tag
      href={href}
      onClick={onClick}
      rel={external ? "noopener noreferrer" : undefined}
      target={external ? "_blank" : undefined}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        padding: "16px 30px",
        borderRadius: 999,
        border: "none",
        textDecoration: "none",
        fontSize: 15,
        fontWeight: 700,
        cursor: "pointer",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        ...variants[variant],
        ...style,
      }}
    >
      {children}
    </Tag>
  );
};

const Wrap = ({ children, style }) => <div style={{ maxWidth: 1160, margin: "0 auto", position: "relative", zIndex: 2, ...style }}>{children}</div>;

const Label = ({ children }) => (
  <span
    style={{
      display: "inline-block",
      padding: "7px 16px",
      borderRadius: 999,
      fontSize: 11,
      fontWeight: 800,
      letterSpacing: 2.4,
      textTransform: "uppercase",
      color: C.terracotta,
      background: `${C.terracotta}12`,
    }}
  >
    {children}
  </span>
);

const Section = ({ children, id, bg, style }) => {
  const [ref, visible] = useInView(0.08);
  return (
    <section
      ref={ref}
      id={id}
      style={{
        position: "relative",
        padding: "110px 22px",
        overflow: "hidden",
        background: bg || "transparent",
        zIndex: 1,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(34px)",
        transition: "opacity 0.8s ease, transform 0.8s ease",
        ...style,
      }}
    >
      {children}
    </section>
  );
};

const Navbar = ({ isAboutPage = false }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [pagesOpen, setPagesOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = ["Services", "Process", "Pricing", "Contact"];
  const hrefs = ["services", "process", "pricing", "contact"].map((section) =>
    getSectionHref(section, isAboutPage)
  );

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: scrolled ? "12px 22px" : "18px 22px",
        background: scrolled ? "rgba(251,247,242,0.8)" : "transparent",
        backdropFilter: scrolled ? "blur(20px) saturate(1.2)" : "none",
        borderBottom: scrolled ? `1px solid ${C.sand}66` : "none",
        transition: "all 0.35s ease",
      }}
    >
      <Wrap style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: `linear-gradient(135deg, ${C.terracotta}, ${C.plum})`, display: "flex", alignItems: "center", justifyContent: "center", color: C.white, fontFamily: "'Libre Baskerville', serif", fontWeight: 700, boxShadow: `0 8px 24px ${C.terracotta}33` }}>T</div>
          <span style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 21, fontWeight: 700, color: C.dark }}>
            Terra<span style={{ color: C.terracotta }}>.</span>
          </span>
        </a>

        <div className="desktop-nav" style={{ display: "flex", gap: 4, alignItems: "center" }}>
          {links.map((link, index) => (
            <a key={link} href={hrefs[index]} style={{ textDecoration: "none", color: C.warmGray, padding: "10px 16px", borderRadius: 999, fontWeight: 600, fontSize: 14 }}>
              {link}
            </a>
          ))}
          <div
            onMouseEnter={() => setPagesOpen(true)}
            onMouseLeave={() => setPagesOpen(false)}
            style={{ position: "relative" }}
          >
            <button
              type="button"
              onClick={() => setPagesOpen((value) => !value)}
              style={{ background: "transparent", border: "none", color: C.warmGray, padding: "10px 16px", borderRadius: 999, fontWeight: 600, fontSize: 14, cursor: "pointer" }}
            >
              Pages
            </button>
            <div
              style={{
                position: "absolute",
                top: "calc(100% + 10px)",
                right: 0,
                minWidth: 170,
                background: "rgba(255,250,245,0.98)",
                border: `1px solid ${C.sand}66`,
                borderRadius: 18,
                boxShadow: "0 18px 40px rgba(28,22,18,0.08)",
                padding: 10,
                opacity: pagesOpen ? 1 : 0,
                pointerEvents: pagesOpen ? "auto" : "none",
                transform: pagesOpen ? "translateY(0)" : "translateY(8px)",
                transition: "all 0.25s ease",
              }}
            >
              <a href="/" style={{ display: "block", padding: "10px 12px", textDecoration: "none", color: C.espresso, fontWeight: 700, borderRadius: 12 }}>
                Home
              </a>
              <a href="/about" style={{ display: "block", padding: "10px 12px", textDecoration: "none", color: C.espresso, fontWeight: 700, borderRadius: 12 }}>
                About
              </a>
            </div>
          </div>
          <Button href={getSectionHref("contact", isAboutPage)} style={{ marginLeft: 10, padding: "12px 24px", fontSize: 14 }}>
            Get a Quote
          </Button>
        </div>

        <button className="mobile-menu-btn" onClick={() => setMenuOpen((v) => !v)} style={{ display: "none", background: "none", border: "none", padding: 8, cursor: "pointer" }}>
          <div style={{ width: 24, height: 2, background: C.dark, marginBottom: 5 }} />
          <div style={{ width: 24, height: 2, background: C.dark, marginBottom: 5 }} />
          <div style={{ width: 24, height: 2, background: C.dark }} />
        </button>
      </Wrap>

      {menuOpen ? (
        <div style={{ margin: "12px 22px 0", padding: 14, borderRadius: 18, background: "rgba(255,250,245,0.96)", border: `1px solid ${C.sand}55` }}>
          {links.map((link, index) => (
            <a key={link} href={hrefs[index]} onClick={() => setMenuOpen(false)} style={{ display: "block", padding: "12px 14px", textDecoration: "none", color: C.espresso, fontWeight: 700 }}>
              {link}
            </a>
          ))}
          <div style={{ padding: "10px 14px 6px", color: C.muted, fontSize: 11, fontWeight: 800, letterSpacing: 1.6, textTransform: "uppercase" }}>Pages</div>
          <a href="/" onClick={() => setMenuOpen(false)} style={{ display: "block", padding: "12px 14px", textDecoration: "none", color: C.espresso, fontWeight: 700 }}>
            Home
          </a>
          <a href="/about" onClick={() => setMenuOpen(false)} style={{ display: "block", padding: "12px 14px", textDecoration: "none", color: C.espresso, fontWeight: 700 }}>
            About
          </a>
        </div>
      ) : null}
    </nav>
  );
};

const Hero = () => (
  <section id="top" style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "136px 22px 90px", position: "relative", overflow: "hidden", zIndex: 1 }}>
    <Wrap>
      <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: 32, alignItems: "center" }}>
        <div style={{ maxWidth: 660, position: "relative", zIndex: 3 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "8px 18px", borderRadius: 999, background: `${C.terracotta}10`, border: `1px solid ${C.terracotta}12`, marginBottom: 28 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: C.sage }} />
            <span style={{ fontSize: 12, fontWeight: 700, color: C.warmGray, letterSpacing: 1.5, textTransform: "uppercase" }}>Accepting new clients</span>
          </div>

          <h1 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "clamp(42px, 7vw, 76px)", lineHeight: 1.02, letterSpacing: -1.2, color: C.dark, marginBottom: 24 }}>
            A professional
            <br />
            website your
            <br />
            <span style={{ color: C.terracotta, fontStyle: "italic", fontWeight: 400 }}>business deserves</span>
            <span style={{ color: C.plum }}>.</span>
          </h1>

          <p style={{ fontSize: 18, lineHeight: 1.8, color: C.warmGray, maxWidth: 540, marginBottom: 38 }}>
            Terra designs and builds polished, high-performing websites for small businesses, crafted to establish credibility, attract the right customers, and deliver results from the moment you go live.
          </p>

          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 46 }}>
            <Button href="#pricing">View Pricing</Button>
            <Button href="#services" variant="secondary">
              Explore Services
            </Button>
          </div>

          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            {[
              { label: "Delivered in 1-2 weeks", color: C.amber },
              { label: "Mobile-first design", color: C.sky },
              { label: "SEO foundations included", color: C.sage },
            ].map((item) => (
              <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", borderRadius: 999, background: "rgba(255,255,255,0.48)", border: `1px solid ${item.color}40` }}>
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: item.color, boxShadow: `0 0 0 6px ${item.color}18` }} />
                <span style={{ fontSize: 14, fontWeight: 700, color: C.warmGray }}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ position: "relative", minHeight: 540, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ position: "absolute", inset: "12% 10% 10% 10%", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,0.35), rgba(255,255,255,0))", filter: "blur(10px)" }} />
          <div style={{ position: "absolute", width: 360, height: 360, borderRadius: "50%", background: `radial-gradient(circle, ${C.sky}30, transparent 70%)`, top: 60, left: 10, animation: "floatOne 8s ease-in-out infinite" }} />
          <div style={{ position: "absolute", width: 320, height: 320, borderRadius: "50%", background: `radial-gradient(circle, ${C.coral}2f, transparent 70%)`, bottom: 40, right: 0, animation: "floatTwo 10s ease-in-out infinite" }} />
          <div style={{ position: "absolute", width: 260, height: 260, borderRadius: "50%", background: `radial-gradient(circle, ${C.plum}28, transparent 72%)`, top: 180, right: 90, animation: "floatThree 9s ease-in-out infinite" }} />

          <div style={{ position: "relative", width: "min(100%, 520px)", aspectRatio: "1 / 1", display: "grid", placeItems: "center" }}>
            {[
              { size: 260, top: 60, left: 60, color: `linear-gradient(145deg, ${C.terracotta}, ${C.coral})`, delay: "0s" },
              { size: 190, top: 30, right: 40, color: `linear-gradient(145deg, ${C.sky}, ${C.plum})`, delay: "-2s" },
              { size: 170, bottom: 72, left: 40, color: `linear-gradient(145deg, ${C.amber}, ${C.terracotta})`, delay: "-4s" },
              { size: 140, bottom: 44, right: 34, color: `linear-gradient(145deg, ${C.sage}, ${C.sky})`, delay: "-1s" },
            ].map((shape, index) => (
              <div
                key={index}
                style={{
                  position: "absolute",
                  width: shape.size,
                  height: shape.size,
                  top: shape.top,
                  left: shape.left,
                  right: shape.right,
                  bottom: shape.bottom,
                  borderRadius: index % 2 === 0 ? "44% 56% 58% 42% / 42% 40% 60% 58%" : "58% 42% 40% 60% / 50% 58% 42% 50%",
                  background: shape.color,
                  opacity: 0.94,
                  boxShadow: "0 28px 60px rgba(28,22,18,0.14), inset 0 1px 18px rgba(255,255,255,0.32)",
                  animation: `blobDrift 8s ease-in-out infinite ${shape.delay}`,
                }}
              />
            ))}

          </div>
        </div>
      </div>
    </Wrap>
  </section>
);

const ServicesSection = () => (
  <Section id="services" bg={C.cream}>
    <Wrap>
      <div style={{ marginBottom: 58 }}>
        <Label>Services</Label>
        <h2 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "clamp(30px,4vw,50px)", lineHeight: 1.14, marginTop: 16, color: C.dark }}>
          A complete website
          <br />
          solution, delivered<span style={{ color: C.terracotta }}>.</span>
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.8, color: C.warmGray, marginTop: 14, maxWidth: 520 }}>
          Every project includes the essentials your business needs to look credible and perform well online.
        </p>
      </div>
      <div className="services-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: 20 }}>
        {services.map((service) => (
          <div key={service.num} style={{ background: C.card, backdropFilter: "blur(14px)", borderRadius: 22, padding: 30, border: `1px solid ${C.sand}66`, boxShadow: "0 14px 40px rgba(28,22,18,0.04)" }}>
            <div style={{ width: 50, height: 50, borderRadius: 16, background: `${service.color}15`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18, border: `1px solid ${service.color}22` }}>
              <span style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 18, color: service.color, fontWeight: 700 }}>{service.num}</span>
            </div>
            <h3 style={{ fontSize: 19, fontWeight: 700, marginBottom: 10, color: C.dark }}>{service.title}</h3>
            <p style={{ fontSize: 14, lineHeight: 1.8, color: C.warmGray }}>{service.desc}</p>
          </div>
        ))}
      </div>
    </Wrap>
  </Section>
);

const ProcessSection = () => (
  <Section id="process">
    <Wrap>
      <div style={{ textAlign: "center", marginBottom: 68 }}>
        <Label>Our Process</Label>
        <h2 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "clamp(30px,4vw,50px)", lineHeight: 1.14, marginTop: 16, color: C.dark }}>
          From brief to launch
          <br />
          in two weeks<span style={{ color: C.terracotta }}>.</span>
        </h2>
        <p style={{ fontSize: 16, color: C.warmGray, margin: "16px auto 0", maxWidth: 500, lineHeight: 1.8 }}>
          A structured, transparent process with clear milestones at every stage, so you always know exactly where things stand.
        </p>
      </div>
      <div className="process-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))", gap: 26 }}>
        {processSteps.map((step, index) => (
          <div key={step.step} style={{ textAlign: "center", padding: 24 }}>
            <div style={{ width: 68, height: 68, borderRadius: "50%", margin: "0 auto 22px", background: index === 0 ? `linear-gradient(135deg, ${C.terracotta}, ${C.plum})` : "rgba(255,255,255,0.7)", border: index === 0 ? "none" : `2px solid ${C.sand}`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 28px rgba(28,22,18,0.08)" }}>
              <span style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 24, fontWeight: 700, color: index === 0 ? C.white : C.terracotta }}>{step.step}</span>
            </div>
            <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: C.muted }}>{step.time}</span>
            <h3 style={{ fontSize: 22, fontWeight: 700, marginTop: 8, marginBottom: 12, color: C.dark, fontFamily: "'Libre Baskerville', serif" }}>{step.title}</h3>
            <p style={{ fontSize: 14, lineHeight: 1.75, color: C.warmGray }}>{step.desc}</p>
          </div>
        ))}
      </div>
    </Wrap>
  </Section>
);

const PricingSection = () => {
  const [hovered, setHovered] = useState(1);
  return (
    <Section id="pricing" bg={C.cream}>
      <Wrap>
        <div style={{ textAlign: "center", marginBottom: 62 }}>
          <Label>Pricing</Label>
          <h2 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "clamp(30px,4vw,50px)", lineHeight: 1.14, marginTop: 16, color: C.dark }}>
            Transparent, one-time pricing<span style={{ color: C.terracotta }}>.</span>
          </h2>
          <p style={{ fontSize: 16, color: C.warmGray, margin: "12px auto 0", maxWidth: 460 }}>
            No monthly retainers. No hidden costs. A single investment, and the website is yours to keep.
          </p>
        </div>
        <div className="pricing-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: 20, alignItems: "start" }}>
          {plans.map((plan, index) => (
            <div key={plan.name} onMouseEnter={() => setHovered(index)} style={{ background: plan.best ? `linear-gradient(160deg, ${C.espresso}, #443026)` : C.card, color: plan.best ? C.white : C.dark, borderRadius: 24, padding: 34, border: plan.best ? "none" : `1px solid ${C.sand}66`, boxShadow: hovered === index ? "0 24px 50px rgba(28,22,18,0.08)" : "none", transform: hovered === index ? "translateY(-4px)" : "none", transition: "all 0.35s ease", position: "relative" }}>
              {plan.best ? <div style={{ position: "absolute", top: -12, right: 24, background: `linear-gradient(135deg, ${C.terracotta}, ${C.plum})`, color: C.white, padding: "7px 16px", borderRadius: 999, fontSize: 11, fontWeight: 800, letterSpacing: 1.5, textTransform: "uppercase" }}>Recommended</div> : null}
              <h3 style={{ fontSize: 13, fontWeight: 800, letterSpacing: 1.7, textTransform: "uppercase", color: plan.best ? "rgba(255,255,255,0.65)" : C.warmGray }}>{plan.name}</h3>
              <div style={{ fontSize: 46, fontWeight: 700, fontFamily: "'Libre Baskerville', serif", margin: "14px 0 10px" }}>{plan.price}</div>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: plan.best ? "rgba(255,255,255,0.72)" : C.warmGray, marginBottom: 24 }}>{plan.desc}</p>
              <div style={{ borderTop: `1px solid ${plan.best ? "rgba(255,255,255,0.12)" : `${C.sand}88`}`, paddingTop: 22 }}>
                {plan.features.map((feature) => (
                  <div key={feature} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 14 }}>
                    <span style={{ width: 10, height: 10, marginTop: 7, borderRadius: "50%", background: plan.best ? C.coral : C.sage, boxShadow: `0 0 0 5px ${(plan.best ? C.coral : C.sage)}20`, flexShrink: 0 }} />
                    <span style={{ fontSize: 14, lineHeight: 1.6, color: plan.best ? "rgba(255,255,255,0.78)" : C.warmGray }}>{feature}</span>
                  </div>
                ))}
              </div>
              <Button href="#contact" variant={plan.best ? "primary" : "secondary"} style={{ width: "100%", marginTop: 24 }}>
                Get Started
              </Button>
            </div>
          ))}
        </div>
        <p style={{ textAlign: "center", marginTop: 28, fontSize: 14, color: C.muted, lineHeight: 1.7 }}>
          Need something beyond these packages?{" "}
          <a href="#contact" style={{ color: C.terracotta, textDecoration: "underline", textUnderlineOffset: 3 }}>
            Get in touch
          </a>{" "}
          for a tailored quote.
        </p>
      </Wrap>
    </Section>
  );
};

const AboutPage = () => {
  usePageMeta({
    title: "About Terra Design | Professional Websites for Small Businesses",
    description:
      "Terra Design delivers affordable, professionally built websites for small businesses with one-time pricing, complete ownership, and a stronger online presence.",
    pathname: "/about",
  });

  return (
    <>
      <section style={{ minHeight: "70vh", display: "flex", alignItems: "center", padding: "136px 22px 70px", position: "relative", zIndex: 1 }}>
        <Wrap>
          <div className="about-page-hero" style={{ display: "grid", gridTemplateColumns: "minmax(300px,0.9fr) minmax(320px,1.1fr)", gap: 38, alignItems: "center" }}>
            <div style={{ minHeight: 430, borderRadius: 28, background: `linear-gradient(155deg, ${C.espresso}, #3d2e25)`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 30px 60px ${C.espresso}22`, position: "relative", overflow: "hidden" }}>
              <div style={{ textAlign: "center", padding: 40, zIndex: 1 }}>
                <div style={{ width: 110, height: 110, borderRadius: "50%", margin: "0 auto 20px", background: `linear-gradient(135deg, ${C.terracotta}, ${C.plum})`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 12px 32px ${C.terracotta}44` }}>
                  <span style={{ fontSize: 42, fontFamily: "'Libre Baskerville', serif", color: C.white, fontWeight: 700 }}>F</span>
                </div>
                <p style={{ fontSize: 23, color: C.white, fontFamily: "'Libre Baskerville', serif", fontWeight: 700 }}>Franko de Beer</p>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.58)", marginTop: 6 }}>Founder - Terra Design</p>
              </div>
              <div style={{ position: "absolute", width: 220, height: 220, top: -40, right: -30, borderRadius: "50%", background: `${C.plum}20` }} />
              <div style={{ position: "absolute", width: 180, height: 180, bottom: -50, left: -30, borderRadius: "50%", background: `${C.sky}16` }} />
            </div>

            <div>
              <Label>About Terra</Label>
              <h1 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "clamp(34px,5vw,58px)", lineHeight: 1.06, marginTop: 18, marginBottom: 22, color: C.dark }}>
                Professional websites
                <br />
                built for businesses
                <br />
                that want to grow<span style={{ color: C.terracotta }}>.</span>
              </h1>
              <p style={{ fontSize: 17, lineHeight: 1.9, color: C.warmGray, marginBottom: 20 }}>
                Terra Design was founded on a simple observation: most small businesses do not need a full-service agency. They need a well-crafted website that establishes credibility and helps customers find them.
              </p>
              <p style={{ fontSize: 17, lineHeight: 1.9, color: C.warmGray, marginBottom: 28 }}>
                The approach is deliberately focused: one-time pricing, defined scope, efficient timelines, and a finished product that consistently feels more premium than the investment.
              </p>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                <Button href={getSectionHref("contact", true)}>Start a Project</Button>
                <Button href={getSectionHref("pricing", true)} variant="secondary">
                  View Pricing
                </Button>
              </div>
            </div>
          </div>
        </Wrap>
      </section>

      <Section bg={C.cream}>
        <Wrap>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <Label>Our Approach</Label>
            <h2 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "clamp(30px,4vw,48px)", lineHeight: 1.12, marginTop: 16, color: C.dark }}>
              Clear principles,
              <br />
              consistent results<span style={{ color: C.terracotta }}>.</span>
            </h2>
          </div>
          <div className="about-strategy-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 250px), 1fr))", gap: 20 }}>
            {[
              {
                title: "Who we serve",
                text: "Service businesses, local brands, restaurants, salons, tradespeople, and professionals who need a polished digital presence that reflects the quality of their work.",
                color: C.terracotta,
              },
              {
                title: "Why our pricing works",
                text: "We focus on what drives results for small businesses: clean design, mobile performance, and search visibility, without inflating the scope or the invoice.",
                color: C.sky,
              },
              {
                title: "What sets us apart",
                text: "A premium visual standard paired with practical delivery: fixed pricing, fast turnaround, and copy that positions your business as established and trustworthy.",
                color: C.sage,
              },
            ].map((item) => (
              <div key={item.title} style={{ background: C.card, borderRadius: 24, padding: 28, border: `1px solid ${C.sand}66`, boxShadow: "0 14px 38px rgba(28,22,18,0.04)" }}>
                <div style={{ width: 44, height: 44, borderRadius: 14, background: `${item.color}16`, marginBottom: 18, border: `1px solid ${item.color}22` }} />
                <h3 style={{ fontSize: 20, color: C.dark, marginBottom: 10 }}>{item.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.8, color: C.warmGray }}>{item.text}</p>
              </div>
            ))}
          </div>
        </Wrap>
      </Section>

      <CTASection isAboutPage />
    </>
  );
};

const CTASection = ({ isAboutPage = false }) => {
  const nextUrl = typeof window !== "undefined" ? `${window.location.origin}/thanks.html` : `${SITE_URL}/thanks.html`;

  return (
    <Section id="contact" style={{ paddingBottom: 80 }}>
      <Wrap>
        <div style={{ background: `linear-gradient(155deg, ${C.terracotta}, ${C.burnt}, ${C.plum})`, borderRadius: 28, padding: "70px 34px", position: "relative", overflow: "hidden", boxShadow: `0 40px 90px ${C.terracotta}25` }}>
          <div style={{ position: "absolute", width: 260, height: 260, top: -90, right: -70, borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
          <div style={{ position: "absolute", width: 180, height: 180, bottom: -50, left: -40, borderRadius: "50%", background: "rgba(122,175,196,0.18)" }} />

          <div className="cta-grid" style={{ display: "grid", gridTemplateColumns: "1fr 0.92fr", gap: 28, alignItems: "start", position: "relative", zIndex: 2 }}>
            <div>
              <h2 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "clamp(30px,4vw,48px)", lineHeight: 1.12, color: C.white, marginBottom: 14 }}>
                Let&apos;s discuss
                <br />
                your project<span style={{ color: "rgba(255,255,255,0.6)" }}>.</span>
              </h2>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: "rgba(255,255,255,0.78)", maxWidth: 480, marginBottom: 26 }}>
                Share a few details about your business and what you need. Terra will respond with a recommended approach, timeline, and quote with no obligation.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <Button variant="dark" href={`mailto:${CONTACT_EMAIL}`}>
                  Email Directly
                </Button>
                {isAboutPage ? (
                  <Button variant="light" href={getSectionHref("pricing", true)}>
                    View Pricing
                  </Button>
                ) : null}
              </div>
            </div>

            <form action={`https://formsubmit.co/${CONTACT_EMAIL}`} method="POST" style={{ background: "rgba(255,255,255,0.14)", border: "1px solid rgba(255,255,255,0.18)", borderRadius: 22, padding: 20, backdropFilter: "blur(8px)" }}>
              <input type="hidden" name="_subject" value="New Terra Design enquiry" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_next" value={nextUrl} />
              <input type="text" name="_honey" tabIndex={-1} autoComplete="off" style={{ position: "absolute", left: -9999, opacity: 0, pointerEvents: "none" }} />
              <div style={{ display: "grid", gap: 12 }}>
                <input name="name" placeholder="Full name" style={inputStyle(true)} required />
                <input name="email" type="email" placeholder="Email address" style={inputStyle(true)} required />
                <input name="business" placeholder="Business name (optional)" style={inputStyle(true)} />
                <textarea name="message" placeholder="Briefly describe what you need, your type of business, number of pages, or any specific requirements." style={{ ...inputStyle(false), minHeight: 120, resize: "vertical" }} required />
                <Button>Submit Enquiry</Button>
                <p style={{ color: "rgba(255,255,255,0.9)", fontSize: 13, lineHeight: 1.6 }}>
                  After submission you&apos;ll land on a confirmation page and the enquiry will be sent through the hosted form backend. The first live submission may ask you to confirm the email address once.
                </p>
              </div>
            </form>
          </div>
        </div>
      </Wrap>
    </Section>
  );
};

const inputStyle = (singleLine) => ({
  width: "100%",
  minHeight: singleLine ? 50 : undefined,
  padding: "14px 16px",
  borderRadius: 16,
  border: "1px solid rgba(255,255,255,0.2)",
  background: "rgba(255,255,255,0.94)",
  color: C.dark,
  fontSize: 14,
  outline: "none",
});

const Footer = ({ isAboutPage = false }) => (
  <footer style={{ padding: "46px 22px 28px", background: C.cream, borderTop: `1px solid ${C.sand}44`, position: "relative", zIndex: 1 }}>
    <Wrap>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 32, flexWrap: "wrap" }}>
        <div style={{ maxWidth: 320 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: `linear-gradient(135deg, ${C.terracotta}, ${C.plum})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: C.white, fontWeight: 800, fontSize: 14, fontFamily: "'Libre Baskerville', serif" }}>T</span>
            </div>
            <span style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 18, fontWeight: 700, color: C.dark }}>
              Terra<span style={{ color: C.terracotta }}>.</span>
            </span>
          </div>
          <p style={{ fontSize: 13, lineHeight: 1.7, color: C.warmGray }}>
            Professional web design for small businesses. One-time investment, complete ownership, lasting results.
          </p>
        </div>
        <div style={{ display: "flex", gap: 48, flexWrap: "wrap" }}>
          <div>
            <h4 style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", marginBottom: 14, color: C.espresso }}>Navigate</h4>
            <a href={getSectionHref("services", isAboutPage)} style={{ display: "block", fontSize: 14, color: C.warmGray, textDecoration: "none", marginBottom: 10 }}>Services</a>
            <a href={getSectionHref("process", isAboutPage)} style={{ display: "block", fontSize: 14, color: C.warmGray, textDecoration: "none", marginBottom: 10 }}>Process</a>
            <a href={getSectionHref("pricing", isAboutPage)} style={{ display: "block", fontSize: 14, color: C.warmGray, textDecoration: "none", marginBottom: 10 }}>Pricing</a>
            <a href={getSectionHref("contact", isAboutPage)} style={{ display: "block", fontSize: 14, color: C.warmGray, textDecoration: "none", marginBottom: 10 }}>Contact</a>
            <a href="/about" style={{ display: "block", fontSize: 14, color: C.warmGray, textDecoration: "none" }}>About</a>
          </div>
          <div>
            <h4 style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", marginBottom: 14, color: C.espresso }}>Contact</h4>
            <a href={`mailto:${CONTACT_EMAIL}`} style={{ display: "block", fontSize: 14, color: C.warmGray, textDecoration: "none", marginBottom: 10 }}>{CONTACT_EMAIL}</a>
            <p style={{ fontSize: 14, color: C.warmGray }}>South Africa</p>
          </div>
        </div>
      </div>
      <div style={{ borderTop: `1px solid ${C.sand}44`, marginTop: 28, paddingTop: 20, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
        <p style={{ fontSize: 12, color: C.muted }}>(c) {new Date().getFullYear()} Terra Design. All rights reserved.</p>
        <p style={{ fontSize: 12, color: `${C.muted}88` }}>Designed and built in South Africa</p>
      </div>
    </Wrap>
  </footer>
);

const HomePage = () => {
  usePageMeta({
    title: "Terra Design | Professional Websites for Small Businesses",
    description:
      "Terra Design builds professional, high-performing websites for small businesses with mobile-first design, SEO foundations, and complete ownership from day one.",
    pathname: "/",
  });

  return (
    <>
      <Hero />
      <ServicesSection />
      <ProcessSection />
      <PricingSection />
      <CTASection />
    </>
  );
};

export default function App() {
  const pathname = typeof window !== "undefined" ? window.location.pathname.replace(/\/+$/, "") || "/" : "/";
  const isAboutPage = pathname === "/about";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;800&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        body{font-family:'DM Sans',sans-serif;background:${C.bg};color:${C.dark};overflow-x:hidden}
        a,button,input,textarea{font-family:inherit}
        ::selection{background:${C.terracotta}28;color:${C.dark}}
        @keyframes blobDrift{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-14px) rotate(7deg)}}
        @keyframes floatOne{0%,100%{transform:translateY(0)}50%{transform:translateY(-18px)}}
        @keyframes floatTwo{0%,100%{transform:translateY(0)}50%{transform:translateY(18px)}}
        @keyframes floatThree{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        .desktop-nav a:hover{background:${C.sand}55;color:${C.espresso}}
        .button:hover{transform:translateY(-2px)}
        input:focus,textarea:focus{border-color:${C.terracotta}66;box-shadow:0 0 0 3px ${C.terracotta}12}
        input::placeholder,textarea::placeholder{color:${C.muted}}
        @media (max-width: 900px){
          .desktop-nav{display:none !important}
          .mobile-menu-btn{display:block !important}
          .hero-grid,.about-grid,.cta-grid,.about-page-hero{grid-template-columns:1fr !important}
          .hero-grid{gap:20px !important}
        }
        @media (max-width: 680px){
          .services-grid,.pricing-grid,.process-grid,.about-strategy-grid{grid-template-columns:1fr !important}
          .hero-grid{grid-template-columns:1fr !important}
          .cta-grid{grid-template-columns:1fr !important}
          .button{width:100%}
        }
      `}</style>
      <AuroraGlow />
      <BouncingSpheres />
      <Navbar isAboutPage={isAboutPage} />
      {isAboutPage ? <AboutPage /> : <HomePage />}
      <Footer isAboutPage={isAboutPage} />
    </>
  );
}
