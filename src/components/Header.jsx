import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, ORG } from "../lib/tsc";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header
      data-testid="site-header"
      className="fixed top-0 left-0 right-0 z-40 backdrop-blur-xl bg-black/70 border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link
            to="/"
            data-testid="brand-link"
            className="flex items-center gap-3 group"
          >
            <img
              src={ORG.logo}
              alt="TSC Shield"
              className="h-9 md:h-10 w-auto select-none drop-shadow-[0_0_18px_rgba(157,142,196,0.45)] group-hover:drop-shadow-[0_0_24px_rgba(157,142,196,0.7)] transition-all"
              draggable={false}
            />
            <span className="font-display text-lg md:text-xl font-medium tracking-[0.25em] uppercase text-white group-hover:text-gold transition-colors">
              {ORG.short}
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1" data-testid="primary-nav">
            {NAV_LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                data-testid={`nav-${l.label.toLowerCase()}`}
                className={({ isActive }) =>
                  `relative px-4 py-2 text-xs font-mono uppercase tracking-[0.22em] transition-colors ${
                    isActive ? "text-gold" : "text-white/70 hover:text-white"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link to="/apply" data-testid="nav-apply-cta" className="btn-tsc">
              Apply
            </Link>
          </div>

          <button
            data-testid="mobile-menu-toggle"
            className="md:hidden p-2 text-white"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/10 bg-black">
          <div className="px-4 py-4 flex flex-col gap-1">
            {NAV_LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                onClick={() => setOpen(false)}
                data-testid={`mobile-nav-${l.label.toLowerCase()}`}
                className={({ isActive }) =>
                  `px-3 py-3 text-sm font-mono uppercase tracking-[0.2em] border-b border-white/5 ${
                    isActive ? "text-gold" : "text-white/80"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <Link
              to="/apply"
              onClick={() => setOpen(false)}
              data-testid="mobile-apply-cta"
              className="btn-tsc mt-3"
            >
              Apply Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
