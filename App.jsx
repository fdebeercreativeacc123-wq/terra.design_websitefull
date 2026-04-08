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
    desc: "A tailored website built around your business, with a premium feel and a clear path that turns attention into enquiries.",
    color: C.terracotta,
  },
  {
    num: "02",
    title: "SEO Setup",
    desc: "Clean structure, page titles, metadata, and search-friendly foundations so your business is easier to find when people are already looking.",
    color: C.amber,
  },
  {
    num: "03",
    title: "Hosting Setup & Handoff",
    desc: "We handle setup and deployment, then hand everything over so you stay in control of your website from day one.",
    color: C.sage,
  },
  {
    num: "04",
    title: "Speed & Performance",
    desc: "Fast-loading pages, lighter effects, and cleaner code so the site feels smooth on real phones, tablets, and laptops.",
    color: C.sky,
  },
  {
    num: "05",
    title: "Contact & Enquiry Forms",
    desc: "A clearer enquiry flow with validation and basic anti-spam friction, designed to help serious leads reach you with less noise.",
    color: C.coral,
  },
  {
    num: "06",
    title: "Google Business Integration",
    desc: "Maps, local business visibility, and the right trust signals so nearby customers can find you and trust you faster.",
    color: C.plum,
  },
];

const processSteps = [
  {
    step: "1",
    title: "Chat",
    desc: "We learn about your business, your customers, and what the website needs to do for you.",
    time: "Day 1",
  },
  {
    step: "2",
    title: "Design",
    desc: "You get a visual direction early, then we refine the look and feel before the build is locked in.",
    time: "Day 2-5",
  },
  {
    step: "3",
    title: "Build",
    desc: "The site is coded to be responsive, fast, and easier to maintain, while still feeling visually rich.",
    time: "Day 5-10",
  },
  {
    step: "4",
    title: "Launch",
    desc: "We test, deploy, and hand over access so the final result is live and fully yours.",
    time: "Day 10-14",
  },
];

const plans = [
  {
    name: "Starter",
    price: "R2,000",
    desc: "For businesses that need a clean, confident online presence.",
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
    desc: "The strongest option for businesses ready to grow online.",
    best: true,
    features: [
      "Multi-page website (up to 5 pages)",
      "Mobile responsive design",
      "Enquiry form",
      "SEO setup & Google indexing",
      "Hosting setup & deployment",
      "Google Maps integration",
      "Speed optimisation",
      "2 rounds of revisions",
    ],
  },
  {
    name: "Premium",
    price: "R5,000",
    desc: "For businesses that want the most refined and complete result.",
    best: false,
    features: [
      "Multi-page website (up to 8 pages)",
      "Advanced forms",
      "SEO & analytics setup",
      "Image optimisation",
      "Social links integration",
      "3 rounds of revisions",
      "30 days post-launch support",
    ],
  },
];

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

  const links = ["Services", "How It Works", "Contact", "Pricing"];
  const hrefs = isAboutPage
    ? ["/#services", "/#process", "/#contact", "/#pricing"]
    : ["#services", "#process", "#contact", "#pricing"];

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
          <Button href={isAboutPage ? "/#contact" : "#contact"} style={{ marginLeft: 10, padding: "12px 24px", fontSize: 14 }}>
            Get a Quote
          </Button>
        </div>

        <button className="mobile-menu-btn" onClick={() => setMenuOpen((v) => !v)} style={{ display: "none", background: "none", border: "none", padding: 8 }}>
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
            <span style={{ fontSize: 12, fontWeight: 700, color: C.warmGray, letterSpacing: 1.5, textTransform: "uppercase" }}>Now taking clients</span>
          </div>

          <h1 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "clamp(42px, 7vw, 76px)", lineHeight: 1.02, letterSpacing: -1.2, color: C.dark, marginBottom: 24 }}>
            Your business
            <br />
            deserves a site
            <br />
            <span style={{ color: C.terracotta, fontStyle: "italic", fontWeight: 400 }}>that gets remembered</span>
            <span style={{ color: C.plum }}>.</span>
          </h1>

          <p style={{ fontSize: 18, lineHeight: 1.8, color: C.warmGray, maxWidth: 560, marginBottom: 38 }}>
            Terra builds premium small-business websites that feel alive, look polished on mobile, and help the right customers trust you faster. When people search for businesses like yours and you barely show up, we are here to change that.
          </p>

          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 46 }}>
            <Button href="#pricing">See Pricing</Button>
            <Button href="#services" variant="secondary">
              What&apos;s Included
            </Button>
          </div>

          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            {[
              { label: "Built in 1-2 weeks", color: C.amber },
              { label: "Mobile-first", color: C.sky },
              { label: "SEO included", color: C.sage },
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
        <Label>What You Get</Label>
        <h2 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "clamp(30px,4vw,50px)", lineHeight: 1.14, marginTop: 16, color: C.dark }}>
          Everything your business
          <br />
          needs online<span style={{ color: C.terracotta }}>.</span>
        </h2>
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
        <Label>How It Works</Label>
        <h2 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "clamp(30px,4vw,50px)", lineHeight: 1.14, marginTop: 16, color: C.dark }}>
          Simple, clear
          <span style={{ color: C.terracotta }}>.</span>
        </h2>
        <p style={{ fontSize: 16, color: C.warmGray, margin: "16px auto 0", maxWidth: 520, lineHeight: 1.8 }}>
          A smooth process with clear feedback points, so the final website feels intentional instead of rushed.
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
            One-time payment<span style={{ color: C.terracotta }}>.</span>
          </h2>
          <p style={{ fontSize: 16, color: C.warmGray, marginTop: 12 }}>No subscriptions. No hidden fees. You own everything.</p>
        </div>
        <div className="pricing-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: 20, alignItems: "start" }}>
          {plans.map((plan, index) => (
            <div key={plan.name} onMouseEnter={() => setHovered(index)} style={{ background: plan.best ? `linear-gradient(160deg, ${C.espresso}, #443026)` : C.card, color: plan.best ? C.white : C.dark, borderRadius: 24, padding: 34, border: plan.best ? "none" : `1px solid ${C.sand}66`, boxShadow: hovered === index ? "0 24px 50px rgba(28,22,18,0.08)" : "none", transform: hovered === index ? "translateY(-4px)" : "none", transition: "all 0.35s ease", position: "relative" }}>
              {plan.best ? <div style={{ position: "absolute", top: -12, right: 24, background: `linear-gradient(135deg, ${C.terracotta}, ${C.plum})`, color: C.white, padding: "7px 16px", borderRadius: 999, fontSize: 11, fontWeight: 800, letterSpacing: 1.5, textTransform: "uppercase" }}>Most Popular</div> : null}
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
      </Wrap>
    </Section>
  );
};

const AboutSection = () => (
  <Section id="about">
    <Wrap>
      <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "minmax(280px, 0.9fr) minmax(320px, 1.1fr)", gap: 48, alignItems: "center" }}>
        <div style={{ minHeight: 390, borderRadius: 24, background: `linear-gradient(155deg, ${C.espresso}, #3d2e25)`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 30px 60px ${C.espresso}22`, position: "relative", overflow: "hidden" }}>
          <div style={{ textAlign: "center", padding: 40, zIndex: 1 }}>
            <div style={{ width: 102, height: 102, borderRadius: "50%", margin: "0 auto 20px", background: `linear-gradient(135deg, ${C.terracotta}, ${C.plum})`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 12px 32px ${C.terracotta}44` }}>
              <span style={{ fontSize: 40, fontFamily: "'Libre Baskerville', serif", color: C.white, fontWeight: 700 }}>F</span>
            </div>
            <p style={{ fontSize: 22, color: C.white, fontFamily: "'Libre Baskerville', serif", fontWeight: 700 }}>Franko de Beer</p>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", marginTop: 6 }}>Founder - Terra Design</p>
          </div>
          <div style={{ position: "absolute", width: 220, height: 220, bottom: -50, right: -30, borderRadius: "50%", background: `${C.sky}16` }} />
        </div>

        <div>
          <Label>About Terra</Label>
          <h2 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "clamp(28px,3.5vw,44px)", lineHeight: 1.18, marginTop: 16, marginBottom: 22, color: C.dark }}>
            Built for small
            <br />
            businesses<span style={{ color: C.terracotta }}>.</span>
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: C.warmGray, marginBottom: 18 }}>
            Terra is a South African web design studio focused on small businesses that want a professional website without being locked into endless monthly contracts.
          </p>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: C.warmGray }}>
            The goal is simple: a website that feels premium, performs beautifully on mobile, and gives your business a real presence when people go looking for you online.
          </p>
        </div>
      </div>
    </Wrap>
  </Section>
);

const AboutPage = () => {
  usePageMeta({
    title: "About Terra Design | Built for Small Businesses",
    description:
      "Learn how Terra Design approaches affordable one-time website builds for small businesses that need a stronger online presence without long-term retainers.",
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
                Premium websites
                <br />
                for businesses that
                <br />
                need to be found<span style={{ color: C.terracotta }}>.</span>
              </h1>
              <p style={{ fontSize: 17, lineHeight: 1.9, color: C.warmGray, marginBottom: 20 }}>
                Terra Design is built around a simple idea: most small businesses do not need an overpriced agency retainer. They need a sharp, trustworthy website that gives them a real presence when customers search online.
              </p>
              <p style={{ fontSize: 17, lineHeight: 1.9, color: C.warmGray, marginBottom: 28 }}>
                The approach is intentionally practical: one-time pricing, focused scope, fast turnarounds, and a result that feels more premium than the price suggests.
              </p>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                <Button href="/#contact">Start a Project</Button>
                <Button href="/#pricing" variant="secondary">
                  See Pricing
                </Button>
              </div>
            </div>
          </div>
        </Wrap>
      </section>

      <Section bg={C.cream}>
        <Wrap>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <Label>Positioning</Label>
            <h2 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "clamp(30px,4vw,48px)", lineHeight: 1.12, marginTop: 16, color: C.dark }}>
              Clear offer,
              <br />
              focused strategy<span style={{ color: C.terracotta }}>.</span>
            </h2>
          </div>
          <div className="about-strategy-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 250px), 1fr))", gap: 20 }}>
            {[
              {
                title: "Who it is for",
                text: "Service businesses, local brands, trades, salons, restaurants, studios, and owners who need a cleaner first impression online.",
                color: C.terracotta,
              },
              {
                title: "Why pricing stays accessible",
                text: "Terra keeps the scope focused on what most small businesses actually need: a polished website, clear positioning, and mobile-ready conversion flow.",
                color: C.sky,
              },
              {
                title: "What makes it work",
                text: "A premium visual identity, fast delivery, one-time pricing, and content that helps the business sound established instead of generic.",
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
                Ready for a stronger
                <br />
                online presence<span style={{ color: "rgba(255,255,255,0.6)" }}>?</span>
              </h2>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: "rgba(255,255,255,0.78)", maxWidth: 480, marginBottom: 26 }}>
                Send a quick brief and Terra will get back to you with a practical plan, timeline, and quote that fits your business. This form now submits to a real hosted backend instead of opening a draft email.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <Button variant="dark" href={`mailto:${CONTACT_EMAIL}`}>
                  Email Us
                </Button>
                {isAboutPage ? (
                  <Button variant="light" href="/#pricing">
                    See Pricing
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
                <input name="name" placeholder="Your name" style={inputStyle(true)} required />
                <input name="email" type="email" placeholder="Your email" style={inputStyle(true)} required />
                <input name="business" placeholder="Business name" style={inputStyle(true)} />
                <textarea name="message" placeholder="Tell us what you need from the website." style={{ ...inputStyle(false), minHeight: 120, resize: "vertical" }} required />
                <Button>Send Enquiry</Button>
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

const Footer = () => (
  <footer style={{ padding: "46px 22px 28px", background: C.cream, borderTop: `1px solid ${C.sand}44`, position: "relative", zIndex: 1 }}>
    <Wrap>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
        <div>
          <span style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 20, fontWeight: 700, color: C.dark }}>
            Terra<span style={{ color: C.terracotta }}>.</span>
          </span>
          <p style={{ fontSize: 13, lineHeight: 1.7, color: C.warmGray, marginTop: 10 }}>Professional websites for small businesses, built with personality, clarity, and real online presence.</p>
        </div>
        <p style={{ fontSize: 12, color: C.muted }}>{new Date().getFullYear()} Terra Design. South Africa.</p>
      </div>
    </Wrap>
  </footer>
);

const HomePage = () => {
  usePageMeta({
    title: "Terra Design | Premium Websites for Small Businesses",
    description:
      "Terra Design builds premium small-business websites with mobile-first design, SEO foundations, and a stronger online presence.",
    pathname: "/",
  });

  return (
    <>
      <Hero />
      <ServicesSection />
      <ProcessSection />
      <CTASection />
      <PricingSection />
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
        @keyframes blobDrift{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-14px) rotate(7deg)}}
        @keyframes floatOne{0%,100%{transform:translateY(0)}50%{transform:translateY(-18px)}}
        @keyframes floatTwo{0%,100%{transform:translateY(0)}50%{transform:translateY(18px)}}
        @keyframes floatThree{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        .desktop-nav a:hover{background:${C.sand}55;color:${C.espresso}}
        .button:hover{transform:translateY(-2px)}
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
      <Footer />
    </>
  );
}
