"use client";

import Image from "next/image";
import Reveal from "@/components/Reveal";
import LeadForm from "@/components/LeadForm";
import QueryParamPersistence from "@/components/QueryParamPersistence";
import { useState } from "react";

const PHONE = "8888538679";
const PHONE_DISPLAY = "888.853.8679";

const VIDEOS = [
  { src: "https://revup-team.com/wp-content/uploads/2025/06/HM-VYD-1-APPROVED-FINAL.mp4", title: "How RevUp Works" },
  { src: "https://revup-team.com/wp-content/uploads/2025/06/HM-VYD-2-APPROVED-FINAL.mp4", title: "Agent Success Stories" },
  { src: "https://revup-team.com/wp-content/uploads/2025/06/HM-VYD-3-APPROVED-FINAL.mp4", title: "Revenue Potential" },
];

const PARTNER_LOGOS = [
  { src: "https://revup-team.com/wp-content/uploads/2025/05/0a10cb65e9e021fb07a2c2f1b3f408df615b0a9d.png", alt: "Partner brokerage" },
  { src: "https://revup-team.com/wp-content/uploads/2025/05/2fa4c24c4e1457f7da6dde7fe7a6a2f272e2b101.png", alt: "Partner brokerage" },
  { src: "https://revup-team.com/wp-content/uploads/2025/05/4eb478ad7242ce93e33ccf7d7c98b9b887203137.png", alt: "Partner brokerage" },
  { src: "https://revup-team.com/wp-content/uploads/2025/05/5c76e9a3424691837dc8c5eed8f58b6deb9912c1.png", alt: "Partner brokerage" },
  { src: "https://revup-team.com/wp-content/uploads/2025/05/70832ab21e9daa95b100e7067e5fa767c91af6f0.png", alt: "Partner brokerage" },
  { src: "https://revup-team.com/wp-content/uploads/2025/05/bd9ed1c79c60bdf76c4d4c94992f16aafbf7baa7.png", alt: "Partner brokerage" },
  { src: "https://revup-team.com/wp-content/uploads/2025/05/logo-bhhs-300x300.gif", alt: "Berkshire Hathaway" },
  { src: "https://revup-team.com/wp-content/uploads/2025/05/logo-real-state-300x300.gif", alt: "Real estate partner" },
  { src: "https://revup-team.com/wp-content/uploads/2025/05/e044a4725cabc9be8b649c20bda3bd0a34c22e03-300x212.png", alt: "Partner brokerage" },
];

const GOVERNMENT_LOGOS = [
  { src: "https://revup-team.com/wp-content/uploads/2025/05/380ba4b72487fc2f3879f2579652e361ad2e45d9.png", alt: "FHA Approved", name: "FHA" },
  { src: "https://revup-team.com/wp-content/uploads/2025/05/d5ca1c73852f21fedfa6e291b1d6f1ec855b2539.png", alt: "VA Approved", name: "VA" },
  { src: "https://revup-team.com/wp-content/uploads/2025/05/fbd5277a2c9e78b0a2d08854b2d1ea0935f6b78a-2.png", alt: "USDA Approved", name: "USDA" },
  { src: "https://revup-team.com/wp-content/uploads/2025/05/70ecffd9e598ef8fd0f37605a4b3f05a8ff10a7d-scaled.png", alt: "Fannie Mae & Freddie Mac", name: "Fannie Mae / Freddie Mac" },
];

const BENEFITS = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "No Additional Overhead Costs",
    description: "RevUp costs you absolutely nothing! Our member support services are exemplary and we cover 100% of cost for these services.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Focus on Your Core Business",
    description: "RevUp is designed to take you just minutes of your time on every transaction, yet be compensated at the maximum level!",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
    title: "Improve Your Customer's Experience",
    description: "Your customers trust you more than anybody. Streamline their home shopping process and provide below-market financing to elevate their experience and lead to more referrals!",
  },
];

const STEPS = [
  { step: "1", title: "Sign Up", description: "Request a demo and get onboarded in minutes. It is 100% free to join." },
  { step: "2", title: "We Manage the Pipeline", description: "RevUp handles compliance, processing, and support so you can focus on selling homes." },
  { step: "3", title: "You Earn Revenue", description: "Receive transactional and passive mortgage revenue on every closed loan." },
];

const FAQS = [
  { q: "What is RevUp?", a: "RevUp is a turnkey mortgage revenue program that allows real estate professionals to earn transactional and passive income from mortgage origination, all at zero cost." },
  { q: "How much does it cost to join?", a: "Nothing. RevUp is 100% free for real estate professionals. We cover all the costs of member support services." },
  { q: "How do I earn revenue?", a: "You earn revenue on every mortgage transaction processed through the RevUp program. This includes both per-transaction compensation and ongoing passive revenue streams." },
  { q: "Do I need a mortgage license?", a: "No. RevUp handles all licensing and compliance requirements. You focus on your real estate business while we manage the mortgage side." },
  { q: "How does RevUp handle compliance?", a: "Our program is fully compliant with all federal and state regulations. Homesite Mortgage is an approved lender for FHA, VA, USDA, Fannie Mae, Freddie Mac, and Ginnie Mae." },
  { q: "Can I keep my current brokerage?", a: "Yes. RevUp works alongside your existing brokerage. There is no need to switch or change your current setup." },
];

function DualCTA() {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
      <a href="#contact" className="rounded-full bg-accent px-8 py-3.5 text-white font-semibold hover:bg-accent/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-center">
        Request a Demo
      </a>
      <a href={`tel:${PHONE}`} className="rounded-full border-2 border-primary bg-white px-8 py-3.5 text-primary font-semibold hover:bg-primary hover:text-white transition-all text-center">
        Call {PHONE_DISPLAY}
      </a>
    </div>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-5 text-left group">
        <span className="font-heading text-lg text-primary-dark group-hover:text-primary transition-colors">{q}</span>
        <svg className={`h-5 w-5 text-primary shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
        </svg>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? "max-h-96 pb-5" : "max-h-0"}`}>
        <p className="text-gray-600 leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

function VideoCard({ src, title }: { src: string; title: string }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="relative rounded-2xl overflow-hidden bg-black aspect-video group shadow-lg">
      <video src={src} className="w-full h-full object-cover" controls={playing} playsInline preload="metadata" onPlay={() => setPlaying(true)} />
      {!playing && (
        <button
          onClick={(e) => {
            const video = (e.currentTarget.parentElement as HTMLElement).querySelector("video");
            video?.play();
            setPlaying(true);
          }}
          className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors"
        >
          <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <svg className="w-7 h-7 text-white ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <span className="sr-only">Play {title}</span>
        </button>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <QueryParamPersistence />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
          <Image
            src="https://revup-team.com/wp-content/uploads/2025/05/RevUp-Full-Color-scaled.png"
            alt="RevUp" width={160} height={56} className="h-14 w-auto" unoptimized
          />
          <div className="flex items-center gap-3">
            <a href={`tel:${PHONE}`} className="hidden sm:inline-flex rounded-full border-2 border-primary px-5 py-2.5 text-primary font-semibold text-sm hover:bg-primary hover:text-white transition-colors">
              {PHONE_DISPLAY}
            </a>
            <a href="#contact" className="rounded-full bg-accent px-5 py-2.5 text-white font-semibold text-sm hover:bg-accent/90 transition-colors shadow-md">
              Get Started
            </a>
          </div>
        </div>
      </header>

      {/* Floating Sticky CTA (mobile) */}
      <div className="fixed bottom-6 right-6 z-50 sm:hidden">
        <a href="#contact" className="flex items-center justify-center w-14 h-14 rounded-full bg-accent text-white shadow-lg hover:bg-accent/90 transition-colors">
          <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
          </svg>
          <span className="sr-only">Request a Demo</span>
        </a>
      </div>

      <main>
        {/* ===== HERO ===== */}
        <section id="hero" className="min-h-screen pt-20 flex items-center relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-light-bg/50 via-transparent to-transparent pointer-events-none" />
          <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-accent/5 blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 grid lg:grid-cols-2 gap-12 items-center w-full relative z-10">
            <Reveal>
              <div>
                <div className="inline-block bg-light-bg text-primary font-semibold text-sm px-4 py-1.5 rounded-full mb-6">
                  100% Free for Real Estate Professionals
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-heading text-primary-dark leading-[1.1] tracking-tight">
                  Start Earning Turnkey{" "}
                  <span className="relative">
                    <span className="relative z-10">Mortgage Revenue</span>
                    <span className="absolute bottom-1 left-0 w-full h-3 bg-accent/30 -z-0" />
                  </span>
                </h1>
                <p className="mt-6 text-lg md:text-xl text-gray-600 leading-relaxed max-w-xl">
                  RevUp empowers real estate agents, brokers, and investors to generate transactional and passive mortgage revenue, at zero cost to you.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row items-start gap-4">
                  <a href="#contact" className="rounded-full bg-accent px-8 py-3.5 text-white font-semibold hover:bg-accent/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                    Request a Demo
                  </a>
                  <a href={`tel:${PHONE}`} className="rounded-full border-2 border-primary px-8 py-3.5 text-primary font-semibold hover:bg-primary hover:text-white transition-all">
                    Call {PHONE_DISPLAY}
                  </a>
                </div>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <LeadForm id="hero-form" />
            </Reveal>
          </div>
        </section>

        {/* ===== STATS BAR ===== */}
        <section className="bg-gradient-to-r from-primary via-primary-dark to-primary py-8">
          <Reveal>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
              {["100% Free to Join", "Zero Overhead", "Compliant & Turn-Key", "Passive Revenue Monthly"].map((s) => (
                <div key={s} className="font-heading text-lg md:text-xl">{s}</div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* ===== PARTNER LOGOS ===== */}
        <section className="py-14 bg-light-bg/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
              <p className="text-center text-gray-500 font-semibold mb-8 tracking-wide uppercase text-sm">
                Trusted by agents at leading brokerages
              </p>
              <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
                {PARTNER_LOGOS.map((logo, i) => (
                  <Image key={i} src={logo.src} alt={logo.alt} width={120} height={60}
                    className="h-10 md:h-12 w-auto opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0" unoptimized />
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ===== VIDEOS ===== */}
        <section id="videos" className="py-20 md:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="text-center mb-14">
                <span className="inline-block bg-primary/10 text-primary font-semibold text-sm px-4 py-1.5 rounded-full mb-4">Why Work With Us</span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading text-primary-dark">
                  RevUp Your Bottom Line<br className="hidden md:block" /> with Mortgage Revenue
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto mt-4 text-lg">
                  Watch these short videos to learn how you can earn significant transactional mortgage revenue and lucrative passive mortgage revenue every month.
                </p>
              </div>
            </Reveal>
            <div className="grid md:grid-cols-3 gap-6">
              {VIDEOS.map((video, i) => (
                <Reveal key={video.src} delay={i * 150}>
                  <div>
                    <VideoCard src={video.src} title={video.title} />
                    <p className="mt-3 font-heading text-primary-dark text-center">{video.title}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <DualCTA />
          </div>
        </section>

        {/* ===== BENEFITS ===== */}
        <section id="benefits" className="py-20 md:py-28 bg-gradient-to-b from-light-bg/30 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading text-primary-dark">
                  Diversify Your Revenue Base
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto mt-4 text-lg">
                  RevUp is an innovative platform that allows real estate professionals to earn transactional and passive mortgage revenue.
                </p>
              </div>
            </Reveal>
            <div className="grid md:grid-cols-3 gap-8">
              {BENEFITS.map((b, i) => (
                <Reveal key={b.title} delay={i * 150}>
                  <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow border border-gray-100 group">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                      {b.icon}
                    </div>
                    <h3 className="text-xl font-heading text-primary-dark mb-3">{b.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{b.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <DualCTA />
          </div>
        </section>

        {/* ===== HOW IT WORKS ===== */}
        <section id="how-it-works" className="py-20 md:py-28 bg-primary-dark text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <Reveal>
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading">How It Works</h2>
                <p className="text-white/70 max-w-xl mx-auto mt-4 text-lg">
                  Getting started is simple. Three steps to start earning mortgage revenue.
                </p>
              </div>
            </Reveal>
            <div className="grid md:grid-cols-3 gap-8">
              {STEPS.map((step, i) => (
                <Reveal key={step.title} delay={i * 150}>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/10 hover:border-accent/50 transition-colors">
                    <div className="w-16 h-16 rounded-full bg-accent mx-auto flex items-center justify-center text-white text-2xl font-heading mb-6 shadow-lg">
                      {step.step}
                    </div>
                    <h3 className="text-xl font-heading mb-3">{step.title}</h3>
                    <p className="text-white/70">{step.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
              <a href="#contact" className="rounded-full bg-accent px-8 py-3.5 text-white font-semibold hover:bg-accent/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-center">
                Request a Demo
              </a>
              <a href={`tel:${PHONE}`} className="rounded-full border-2 border-white px-8 py-3.5 text-white font-semibold hover:bg-white hover:text-primary-dark transition-all text-center">
                Call {PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </section>

        {/* ===== GOVERNMENT APPROVALS ===== */}
        <section className="py-20 md:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="text-center mb-14">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading text-primary-dark">
                  Approved with These Government Institutions
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto mt-4 text-lg">
                  Enhance your value and your credentials as a real estate professional and become a member of RevUp today.
                </p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
                {GOVERNMENT_LOGOS.map((logo) => (
                  <div key={logo.name} className="flex flex-col items-center gap-3">
                    <div className="w-28 h-28 md:w-32 md:h-32 rounded-2xl bg-light-bg/50 flex items-center justify-center p-4">
                      <Image src={logo.src} alt={logo.alt} width={100} height={100} className="w-full h-full object-contain" unoptimized />
                    </div>
                    <span className="font-heading text-sm text-primary-dark">{logo.name}</span>
                  </div>
                ))}
              </div>
            </Reveal>
            <DualCTA />
          </div>
        </section>

        {/* ===== FAQ ===== */}
        <section id="faq" className="py-20 md:py-28 bg-light-bg/30">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-heading text-primary-dark text-center mb-12">
                Frequently Asked Questions
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
                {FAQS.map((faq) => (
                  <FAQItem key={faq.q} q={faq.q} a={faq.a} />
                ))}
              </div>
            </Reveal>
            <DualCTA />
          </div>
        </section>

        {/* ===== FINAL CTA / CONTACT ===== */}
        <section id="contact" className="py-20 md:py-28 bg-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-light-bg/30 via-transparent to-light-bg/20 pointer-events-none" />
          <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-heading text-primary-dark text-center mb-4">
                Request a 15-Minute Demo
              </h2>
              <p className="text-gray-600 text-center mb-8 text-lg">
                Find out exactly how much you can expect to earn. Fill out the form and we will be in touch.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <LeadForm id="contact-form" />
            </Reveal>
            <div className="flex items-center justify-center mt-8">
              <a href={`tel:${PHONE}`} className="rounded-full border-2 border-primary bg-white px-8 py-3.5 text-primary font-semibold hover:bg-primary hover:text-white transition-all text-center">
                Or Call {PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-primary-dark py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <Image
              src="https://revup-team.com/wp-content/uploads/2025/05/RevUp-Full-Color-White-scaled.jpg"
              alt="RevUp" width={140} height={40} className="h-10 w-auto" unoptimized
            />
            <div className="flex items-center gap-6">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            </div>
          </div>
          <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/50">
            <p>222 Main St, Suite 106, Rochester, MI 48307 | {PHONE_DISPLAY}</p>
            <p>&copy; 2025 RevUp. All rights reserved. Homesite Mortgage, LLC. NMLS #12901. Equal Housing Lender.</p>
          </div>
          <p className="text-white/30 text-xs mt-4 text-center">
            This is not an offer to lend or guarantee of rates. All loans subject to credit approval.
          </p>
        </div>
      </footer>
    </>
  );
}
