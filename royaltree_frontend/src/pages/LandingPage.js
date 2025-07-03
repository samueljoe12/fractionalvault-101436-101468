import React, { useEffect } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

// PUBLIC_INTERFACE
export default function LandingPage() {
  useEffect(() => {
    AOS.init({ duration: 900, once: true, offset: 70 });
  }, []);

  const features = [
    {
      name: "Fractional Ownership",
      desc: "Split digital assets into shares. Anyone can invest—from superfans to institutions.",
      icon: (
        <svg className="w-8 h-8 text-neon-mint drop-shadow" fill="none" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke="#00FFC2" strokeWidth="2.5" fill="rgba(0,255,194,0.1)" />
          <path d="M19 12A7 7 0 0 1 12 19" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      name: "Royalties For All",
      desc: "Earn passive income as a creator or investor. Royalties distributed to all shareholders.",
      icon: (
        <svg className="w-8 h-8 text-gold drop-shadow" fill="none" viewBox="0 0 24 24">
          <ellipse cx="12" cy="12" rx="8" ry="10" fill="#FFD700" fillOpacity="0.16" />
          <path d="M12 8v4l3 2" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      name: "Marketplace & Discovery",
      desc: "Browse an open marketplace of unique music, art, books, designs. Invest, follow, and track trends.",
      icon: (
        <svg className="w-8 h-8 text-neon-mint" fill="none" viewBox="0 0 24 24">
          <rect x="4" y="4" width="16" height="16" rx="5" stroke="#00FFC2" strokeWidth="2.5" fill="#00ffc218" />
          <path d="M9 9h6v6H9z" stroke="#FFD700" strokeWidth="2" />
        </svg>
      ),
    },
    {
      name: "Creator Empowerment",
      desc: "Creators stay in control. Set royalty rates, unlock new funding, and build community wealth.",
      icon: (
        <svg className="w-8 h-8 text-gold" fill="none" viewBox="0 0 24 24">
          <path d="M8 13l4-7 4 7" stroke="#FFD700" strokeWidth="2.3" strokeLinecap="round" />
          <circle cx="12" cy="17" r="3" stroke="#FFD700" strokeWidth="2" fill="#FFD70033"/>
        </svg>
      ),
    },
    {
      name: "Secure & Transparent",
      desc: "Blockchain-inspired records. Ownership, transactions, and royalties all tracked for you—no guesswork.",
      icon: (
        <svg className="w-8 h-8 text-neon-mint" fill="none" viewBox="0 0 24 24">
          <rect x="7" y="7" width="10" height="10" rx="3" stroke="#00FFC2" strokeWidth="2.2" fill="#00ffc221" />
          <path d="M12 12v-2m0 2v2m0-2h2m-2 0H10" stroke="#FFD700" strokeWidth="2"/>
        </svg>
      ),
    }
  ];

  // Animation variants for staggered feature cards
  const featureCardVariants = {
    hidden: { opacity: 0, y: 36, scale: 0.97 },
    show: i => ({
      opacity: 1, y: 0, scale: 1,
      transition: { delay: 0.10 + i * 0.11, type: "spring", stiffness: 110, damping: 13 }
    }),
  };

  // Blobby background shapes for effect
  function BackgroundDecor() {
    return (
      <>
        <motion.div
          className="fixed left-[-7%] top-[-13%] w-[420px] h-[420px] z-[-2] rounded-full"
          style={{ background: "radial-gradient(ellipse at 55% 30%, #00FFC245 50%, transparent 100%)", filter: "blur(10px)" }}
          initial={{ scale: 0.78, opacity: 0.65 }}
          animate={{ scale: 1.02, opacity: 0.83 }}
          transition={{ duration: 2.2, yoyo: Infinity }}
        />
        <motion.div
          className="fixed right-[-6%] bottom-[-12%] w-[350px] h-[340px] z-[-2] rounded-full"
          style={{ background: "radial-gradient(ellipse at 55% 70%, #FFD70051 50%, transparent 100%)", filter: "blur(22px)" }}
          initial={{ scale: 0.85, opacity: 0.6 }}
          animate={{ scale: 1.07, opacity: 0.8 }}
          transition={{ duration: 2.8, yoyo: Infinity }}
        />
      </>
    );
  }

  // Gradient animated CTA button
  function CTAButton({ to, children, variant = "mint", ...props }) {
    const gradient =
      variant === "mint"
        ? "from-neon-mint via-white/20 to-gold"
        : "from-gold via-neon-mint/80 to-gold";
    return (
      <motion.a
        href={to}
        className={`inline-block px-8 py-3 rounded-2xl font-heading font-extrabold text-lg shadow-neon text-background bg-gradient-to-r ${gradient} transition transform hover:scale-110 hover:shadow-goldish`}
        whileHover={{ scale: 1.09, boxShadow: "0 0 24px 4px #00FFC2aa" }}
        whileTap={{ scale: 1.03 }}
        data-aos="zoom-in"
        {...props}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center min-h-[86vh] py-4 sm:py-10 px-2 md:px-0 overflow-x-hidden">
      <BackgroundDecor />

      <motion.header
        className="w-full max-w-3xl text-center relative z-10 mb-10"
        initial={{ opacity: 0, y: 45 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.82, type: "spring", delay: 0.18 }}
      >
        <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-5 neon-mint drop-shadow"
          style={{ textShadow: "0 0 16px #00ffc2cc, 0 0 24px #1A1A1A" }}
        >
          Royaltree
        </h1>
        <motion.div
          className="rounded-2xl px-6 py-6 bg-glass-black/90 backdrop-blur-lg border border-gold/20 shadow-glass inline-block"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.25, delay: 0.33, type: "spring" }}
        >
          <h2 className="font-heading neon-mint text-xl md:text-2xl font-bold mb-3"
            style={{ textShadow: "0 0 9px #00FFC2BB" }}>
            Unlock the Creative Economy.
          </h2>
          <p className="font-body text-white/85 text-base md:text-lg max-w-xl mx-auto mb-3"
            style={{ letterSpacing: "0.02em" }}>
            <span className="gold">
              Fractionalize your music, art, books, and designs
            </span>
            . Empower your community to invest, own a stake, and share in the royalties—<span className="neon-mint">all on Royaltree</span>, the platform where ownership meets creativity.
          </p>
          <p className="font-body text-white/70 text-base md:text-lg max-w-lg mx-auto">
            Transform fans into backers, unlock new revenue, and let your work earn for everyone—forever.
          </p>
        </motion.div>
        <div className="mt-8 flex flex-col sm:flex-row gap-5 justify-center">
          <CTAButton to="/register" variant="mint">Get Started</CTAButton>
          <CTAButton to="/marketplace" variant="gold">Explore Marketplace</CTAButton>
        </div>
      </motion.header>

      {/* Features section */}
      <section
        className="relative grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-7 max-w-6xl w-full mx-auto z-10"
        style={{ marginBottom: "4.5rem" }}
      >
        {features.map((f, i) => (
          <motion.div
            key={f.name}
            className="feature-card col-span-1 bg-glass-black/80 border border-neon-mint/10 backdrop-blur-md rounded-3xl shadow-glass px-7 py-7 flex flex-col gap-4 items-center text-center hover:scale-105 focus-within:scale-105 transition-transform"
            custom={i}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            variants={featureCardVariants}
            data-aos="fade-up"
            data-aos-delay={160 + i * 80}
          >
            <div className="mb-1">{f.icon}</div>
            <h4 className="font-heading text-xl font-bold gold mb-1">{f.name}</h4>
            <p className="font-body text-white/80 text-base">{f.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* Brand statement */}
      <motion.footer
        className="relative w-full text-center mt-10 mb-6 z-10"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.3, type: "spring" }}
      >
        <div className="inline-block px-6 py-4 rounded-2xl bg-glass-black/85 border border-gold/15 backdrop-blur-xl shadow-glass">
          <span className="font-heading text-lg font-bold neon-mint"
            style={{ textShadow: "0 0 8px #00FFC299" }}>
            Royaltree: The future of creator-first economics starts here.
          </span>
        </div>
      </motion.footer>
    </div>
  );
}
