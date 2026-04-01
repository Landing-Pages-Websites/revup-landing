"use client";

import { useState, FormEvent } from "react";
import { useMegaLeadForm } from "@/hooks/useMegaLeadForm";

interface LeadFormProps {
  id?: string;
}

// ===== Phone formatting & NANP validation =====
function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 10);
  if (digits.length === 0) return "";
  if (digits.length <= 3) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

function getDigits(formatted: string): string {
  return formatted.replace(/\D/g, "");
}

function validatePhoneNANP(digits: string): string | null {
  if (digits.length !== 10) return "Please enter a 10-digit phone number.";
  const area = digits.slice(0, 3);
  const exchange = digits.slice(3, 6);
  if (area[0] === "0" || area[0] === "1") return "Area code cannot start with 0 or 1.";
  if (exchange[0] === "0" || exchange[0] === "1") return "Invalid phone number format.";
  const n11 = ["211", "311", "411", "511", "611", "711", "811", "911"];
  if (n11.includes(area)) return "N11 service codes are not valid phone numbers.";
  if (exchange === "555") return "555 numbers are not valid.";
  const tollFree = ["800", "888", "877", "866", "855", "844", "833", "822"];
  const premium = ["900"];
  if (tollFree.includes(area) || premium.includes(area)) return "Toll-free/premium numbers not accepted.";
  if (/^(\d)\1{9}$/.test(digits)) return "Please enter a real phone number.";
  const fakes = ["1234567890", "0987654321", "1111111111"];
  if (fakes.includes(digits)) return "Please enter a real phone number.";
  return null;
}

// ===== Email validation =====
function validateEmail(email: string): string | null {
  if (!email) return "Email is required.";
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(email)) return "Please enter a valid email address.";
  return null;
}

const CALENDLY_URL = "https://calendly.com/dsanders-homesitedirect/revup-15-min-demo-mg-ds";

export default function LeadForm({ id }: LeadFormProps) {
  const { submit: submitLead } = useMegaLeadForm();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [experience, setExperience] = useState("");
  const [fullTime, setFullTime] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (submitting || submitted) return;

    const newErrors: Record<string, string> = {};
    const digits = getDigits(phone);
    const phoneErr = validatePhoneNANP(digits);
    if (phoneErr) newErrors.phone = phoneErr;
    const emailErr = validateEmail(email);
    if (emailErr) newErrors.email = emailErr;
    if (!name.trim()) newErrors.name = "Name is required.";
    if (!experience) newErrors.experience = "Please select an option.";
    if (!fullTime) newErrors.fullTime = "Please select an option.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setSubmitting(true);

    try {
      await submitLead({
        firstName: name.trim().split(" ")[0] || name.trim(),
        lastName: name.trim().split(" ").slice(1).join(" ") || "",
        email: email.trim(),
        phone: digits,
        threeYearsExperience: experience,
        fullTimeAgent: fullTime,
      });
      setSubmitted(true);
      // Redirect to Calendly after short delay
      setTimeout(() => {
        window.location.href = CALENDLY_URL;
      }, 1500);
    } catch (err) {
      console.error("Form submission error:", err);
      setSubmitted(true);
      setTimeout(() => {
        window.location.href = CALENDLY_URL;
      }, 1500);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div id={id} className="rounded-2xl bg-primary-dark/90 backdrop-blur-md p-8 text-white text-center">
        <div className="text-3xl mb-4 font-heading">Thank You!</div>
        <p className="text-lg text-white/90 mb-4">
          Redirecting you to book your 15-minute demo...
        </p>
        <a href={CALENDLY_URL} className="inline-block rounded-full bg-accent px-6 py-3 text-white font-semibold hover:bg-accent/90 transition-colors">
          Book Your Demo Now
        </a>
      </div>
    );
  }

  const radioClasses = "flex items-center gap-3 cursor-pointer rounded-lg border-2 border-white/20 bg-white/10 px-4 py-3 text-white hover:border-accent/50 transition-colors";
  const radioActiveClasses = "flex items-center gap-3 cursor-pointer rounded-lg border-2 border-accent bg-accent/20 px-4 py-3 text-white";

  return (
    <form id={id} onSubmit={handleSubmit} className="rounded-2xl bg-primary-dark/90 backdrop-blur-md p-6 md:p-8 space-y-4" noValidate>
      <h3 className="text-xl md:text-2xl font-heading text-white text-center mb-2">
        Request a 15-Minute Demo
      </h3>
      <p className="text-white/70 text-sm text-center mb-4">
        See how RevUp can generate mortgage revenue for your business.
      </p>

      {/* Name */}
      <div>
        <input
          type="text" name="name" placeholder="Full Name" required
          value={name} onChange={(e) => setName(e.target.value)}
          className="w-full rounded-lg border-2 border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/50 outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
        />
        {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
      </div>

      {/* Email */}
      <div>
        <input
          type="email" name="email" placeholder="Email Address" required
          value={email} onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg border-2 border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/50 outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
        />
        {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
      </div>

      {/* Phone */}
      <div>
        <input
          type="tel" name="phone" placeholder="Phone Number" required
          inputMode="numeric" value={phone}
          onChange={(e) => setPhone(formatPhone(e.target.value))}
          className="w-full rounded-lg border-2 border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/50 outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
        />
        {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
      </div>

      {/* Question 1: 3+ years experience */}
      <div>
        <p className="text-white text-sm font-semibold mb-2">Do you have at least 3 years of real estate experience?</p>
        <div className="grid grid-cols-2 gap-3">
          <label className={experience === "Yes" ? radioActiveClasses : radioClasses}>
            <input type="radio" name={`${id}-experience`} value="Yes" checked={experience === "Yes"} onChange={() => setExperience("Yes")} className="sr-only" />
            <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${experience === "Yes" ? "border-accent bg-accent" : "border-white/40"}`}>
              {experience === "Yes" && <span className="w-2 h-2 rounded-full bg-white" />}
            </span>
            Yes
          </label>
          <label className={experience === "No" ? radioActiveClasses : radioClasses}>
            <input type="radio" name={`${id}-experience`} value="No" checked={experience === "No"} onChange={() => setExperience("No")} className="sr-only" />
            <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${experience === "No" ? "border-accent bg-accent" : "border-white/40"}`}>
              {experience === "No" && <span className="w-2 h-2 rounded-full bg-white" />}
            </span>
            No
          </label>
        </div>
        {errors.experience && <p className="text-red-400 text-xs mt-1">{errors.experience}</p>}
      </div>

      {/* Question 2: Full-time agent */}
      <div>
        <p className="text-white text-sm font-semibold mb-2">Are you a full-time real estate agent?</p>
        <div className="grid grid-cols-2 gap-3">
          <label className={fullTime === "Yes" ? radioActiveClasses : radioClasses}>
            <input type="radio" name={`${id}-fulltime`} value="Yes" checked={fullTime === "Yes"} onChange={() => setFullTime("Yes")} className="sr-only" />
            <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${fullTime === "Yes" ? "border-accent bg-accent" : "border-white/40"}`}>
              {fullTime === "Yes" && <span className="w-2 h-2 rounded-full bg-white" />}
            </span>
            Yes
          </label>
          <label className={fullTime === "No" ? radioActiveClasses : radioClasses}>
            <input type="radio" name={`${id}-fulltime`} value="No" checked={fullTime === "No"} onChange={() => setFullTime("No")} className="sr-only" />
            <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${fullTime === "No" ? "border-accent bg-accent" : "border-white/40"}`}>
              {fullTime === "No" && <span className="w-2 h-2 rounded-full bg-white" />}
            </span>
            No
          </label>
        </div>
        {errors.fullTime && <p className="text-red-400 text-xs mt-1">{errors.fullTime}</p>}
      </div>

      <button
        type="submit" disabled={submitting || submitted}
        className="w-full rounded-lg bg-accent py-3.5 text-white font-semibold text-lg hover:bg-accent/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? "Submitting..." : "Request Your Demo"}
      </button>
    </form>
  );
}
