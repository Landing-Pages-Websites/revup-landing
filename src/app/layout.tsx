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
        {/* GTM */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-MN3BDCWH');`,
          }}
        />
        {/* MegaTag tracking */}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.MEGA_TAG_CONFIG={siteKey:"sk_mnewpwjx_qcvc38g7v9",siteId:"6ccdeb37-91ea-4358-b815-e5d372c9fbe9"};window.API_ENDPOINT="https://optimizer.gomega.ai";window.TRACKING_API_ENDPOINT="https://events-api.gomega.ai";`,
          }}
        />
        <meta name="mega-site-id" content="6ccdeb37-91ea-4358-b815-e5d372c9fbe9" />
        <script
          id="optimizer-script"
          data-site-id="6ccdeb37-91ea-4358-b815-e5d372c9fbe9"
          src="https://cdn.gomega.ai/scripts/optimizer.min.js"
          async
        />
      </head>
      <body className="antialiased">
        {/* GTM noscript */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MN3BDCWH"
            height="0" width="0" style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
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
