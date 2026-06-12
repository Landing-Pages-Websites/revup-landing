import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Thank You | RevUp",
  description: "Thank you for your interest in RevUp. Our team has received your information.",
};

export default function ThankYouPage(): React.ReactElement {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-light-bg via-white to-light-bg/60">
      {/* Ambient background decorations */}
      <div className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full bg-primary/8 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full bg-accent/8 blur-[80px] pointer-events-none" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-6 py-20 text-center">
        <Image
          src="https://revup-team.com/wp-content/uploads/2025/05/RevUp-Full-Color-scaled.png"
          alt="RevUp" width={160} height={56} className="h-12 w-auto mb-10" unoptimized
        />

        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/15 text-accent mb-8">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>

        <h1 className="text-4xl md:text-5xl font-heading text-primary-dark leading-[1.1] tracking-tight">
          Thank You for Your Interest
        </h1>
        <p className="mt-6 text-lg text-gray-600 leading-relaxed max-w-xl">
          We&rsquo;ve received your information, and the RevUp team will be in touch if there&rsquo;s a
          fit. We appreciate you taking the time to learn more about earning turnkey mortgage revenue.
        </p>

        <Link
          href="/"
          className="mt-10 inline-block rounded-full bg-accent px-8 py-3.5 text-white font-semibold shadow-lg transition-all hover:bg-accent/90 hover:shadow-xl hover:-translate-y-0.5"
        >
          Return to Homepage
        </Link>
      </div>
    </main>
  );
}
