import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "RevUp — Earn Turnkey Mortgage Revenue | Free for Real Estate Agents",
  description:
    "RevUp empowers real estate agents to generate transactional and passive mortgage revenue at zero cost. Join 100% free. Compliant and turn-key.",
  icons: { icon: "/favicon.png" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* MegaTag tracking */}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.MEGA_TAG_CONFIG={siteKey:"sk_PLACEHOLDER"};window.API_ENDPOINT="https://optimizer.gomega.ai";window.TRACKING_API_ENDPOINT="https://events-api.gomega.ai";`,
          }}
        />
        <meta name="mega-site-id" content="PLACEHOLDER_SITE_ID" />
        <script
          id="optimizer-script"
          data-site-id="PLACEHOLDER_SITE_ID"
          src="https://cdn.gomega.ai/scripts/optimizer.min.js"
          async
        />
      </head>
      <body className="antialiased">
        {children}
        {/* CTM universal script */}
        <Script
          src="https://572388.tctm.co/t.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
