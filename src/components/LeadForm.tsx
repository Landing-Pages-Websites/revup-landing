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

export default function LeadForm({ id }: LeadFormProps) {
  const { submit: submitLead } = useMegaLeadForm();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [consent, setConsent] = useState(false);
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
    if (!firstName.trim()) newErrors.firstName = "First name is required.";
    if (!lastName.trim()) newErrors.lastName = "Last name is required.";
    if (!role) newErrors.role = "Please select your professional role.";
    if (!consent) newErrors.consent = "You must agree to be contacted.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setSubmitting(true);

    try {
      await submitLead({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        phone: digits,
        professionalRole: role,
      });
      setSubmitted(true);
    } catch (err) {
      console.error("Form submission error:", err);
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div id={id} className="rounded-2xl bg-primary-dark/90 backdrop-blur-md p-8 text-white text-center">
        <div className="text-3xl mb-4 font-heading">Thank You!</div>
        <p className="text-lg text-white/90">
          Your demo request has been received. Our team will reach out to schedule your 15-minute demo.
        </p>
      </div>
    );
  }

  return (
    <form id={id} onSubmit={handleSubmit} className="rounded-2xl bg-primary-dark/90 backdrop-blur-md p-6 md:p-8 space-y-4" noValidate>
      <h3 className="text-xl md:text-2xl font-heading text-white text-center mb-2">
        Request a 15-Minute Demo
      </h3>
      <p className="text-white/70 text-sm text-center mb-4">
        See how RevUp can generate mortgage revenue for your business.
      </p>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <input
            type="text" name="firstName" placeholder="First Name" required
            value={firstName} onChange={(e) => setFirstName(e.target.value)}
            className="w-full rounded-lg border-2 border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/50 outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
          />
          {errors.firstName && <p className="text-red-400 text-xs mt-1">{errors.firstName}</p>}
        </div>
        <div>
          <input
            type="text" name="lastName" placeholder="Last Name" required
            value={lastName} onChange={(e) => setLastName(e.target.value)}
            className="w-full rounded-lg border-2 border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/50 outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
          />
          {errors.lastName && <p className="text-red-400 text-xs mt-1">{errors.lastName}</p>}
        </div>
      </div>

      <div>
        <input
          type="email" name="email" placeholder="Email Address" required
          value={email} onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg border-2 border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/50 outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
        />
        {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
      </div>

      <div>
        <input
          type="tel" name="phone" placeholder="Phone Number" required
          inputMode="numeric" value={phone}
          onChange={(e) => setPhone(formatPhone(e.target.value))}
          className="w-full rounded-lg border-2 border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/50 outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
        />
        {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
      </div>

      <div className="relative">
        <select
          name="professionalRole" required value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full appearance-none rounded-lg border-2 border-white/20 bg-white/10 px-4 py-3 pr-10 text-white outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
        >
          <option value="" disabled className="text-gray-900">Professional Role</option>
          <option value="Real Estate Agent" className="text-gray-900">Real Estate Agent</option>
          <option value="Real Estate Broker" className="text-gray-900">Real Estate Broker</option>
          <option value="Insurance Agent" className="text-gray-900">Insurance Agent</option>
          <option value="Investor" className="text-gray-900">Investor</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <svg className="w-5 h-5 text-white/50" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
        {errors.role && <p className="text-red-400 text-xs mt-1">{errors.role}</p>}
      </div>

      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox" name="privacyConsent" required
          checked={consent} onChange={(e) => setConsent(e.target.checked)}
          className="mt-1 h-4 w-4 rounded border-white/30 bg-white/10 text-accent focus:ring-accent shrink-0"
        />
        <span className="text-xs text-white/70 leading-relaxed">
          I agree to be contacted by Homesite Mortgage and RevUp via call, email or text.
          To opt out you can reply &apos;stop&apos; at any time or click the unsubscribe link via the emails.
          Message and data rates may apply.{" "}
          <a href="https://revup-team.com/terms-of-use/" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">
            Link to Privacy Policy
          </a>
        </span>
      </label>
      {errors.consent && <p className="text-red-400 text-xs mt-1">{errors.consent}</p>}

      <button
        type="submit" disabled={submitting || submitted}
        className="w-full rounded-lg bg-accent py-3.5 text-white font-semibold text-lg hover:bg-accent/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? "Submitting..." : "Request Your Demo"}
      </button>
    </form>
  );
}
