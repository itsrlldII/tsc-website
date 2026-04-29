import React from "react";
import { Link } from "react-router-dom";
import { ORG, SOCIAL_LINKS } from "../lib/tsc";
import { SocialIcon } from "./SocialIcon";

export default function Footer() {
  return (
    <footer
      data-testid="site-footer"
      className="relative border-t border-white/10 bg-obsidian mt-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-6 relative">
            <img
              src={ORG.logo}
              alt="TSC Shield"
              className="absolute -top-6 -left-2 md:-top-10 md:-left-4 w-32 md:w-48 opacity-90 drop-shadow-[0_0_40px_rgba(157,142,196,0.45)] pointer-events-none select-none"
              draggable={false}
            />
            <h2
              data-testid="footer-wordmark"
              className="font-display font-light uppercase tracking-tighter leading-none text-[22vw] md:text-[10rem] text-white/5 select-none relative"
            >
              TSC
            </h2>
            <p className="mt-6 font-mono text-xs uppercase tracking-[0.3em] text-gold relative">
              {ORG.tagline}
            </p>
            <p className="mt-4 text-sm text-white/50 max-w-md relative">
              An esports, game development, content, and community organization
              — built from the shadows up.
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="overline mb-5">Navigate</p>
            <ul className="space-y-3">
              {["Home", "Members", "Apply", "Socials", "Contact"].map((n) => (
                <li key={n}>
                  <Link
                    to={n === "Home" ? "/" : `/${n.toLowerCase()}`}
                    data-testid={`footer-link-${n.toLowerCase()}`}
                    className="text-sm text-white/70 hover:text-gold transition-colors"
                  >
                    {n}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="overline mb-5">Business</p>
            <a
              href={`mailto:${ORG.email}`}
              data-testid="footer-email"
              className="text-sm text-white/80 hover:text-gold break-all"
            >
              {ORG.email}
            </a>
            <p className="overline mt-8 mb-4">Follow</p>
            <div className="flex flex-wrap gap-2">
              {SOCIAL_LINKS.slice(0, 7).map((s) => (
                <a
                  key={s.key}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  data-testid={`footer-social-${s.key}`}
                  aria-label={s.label}
                  className="w-9 h-9 border border-white/10 flex items-center justify-center text-white/70 hover:border-gold hover:text-gold transition-colors"
                >
                  <SocialIcon kind={s.key} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-white/10 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
          <p className="text-xs text-white/40 font-mono uppercase tracking-widest">
            © {ORG.year} The Shadow Corp. All Rights Reserved.
          </p>
          <p className="text-xs text-white/30 font-mono uppercase tracking-widest">
            v1.0 — Shadow Edition
          </p>
        </div>
      </div>
    </footer>
  );
}
