import React, { useState } from "react";
import { ArrowUpRight, Mail, MessageCircle, Users } from "lucide-react";
import { INQUIRY_TYPES, ORG, SOCIAL_LINKS } from "../lib/tsc";

export default function Contact() {
  const [inquiry, setInquiry] = useState("sponsorship");

  const selectedInquiry =
    INQUIRY_TYPES.find((type) => type.key === inquiry)?.label || "General";

  const emailSubject = encodeURIComponent(`TSC ${selectedInquiry} Inquiry`);
  const emailBody = encodeURIComponent(
    `Name:\nCompany / Brand:\nInquiry Type: ${selectedInquiry}\n\nMessage:\n`
  );

  const emailHref = `mailto:${ORG.email}?subject=${emailSubject}&body=${emailBody}`;

  const discord = SOCIAL_LINKS.find((social) => social.key === "discord");

  return (
    <div data-testid="contact-page" className="pt-28 md:pt-36">
      <section className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            <div className="md:col-span-7">
              <p className="overline text-gold">▸ Contact / Business</p>

              <h1 className="display-xl mt-5 text-[13vw] md:text-[7rem] text-white">
                Work with
                <br />
                <span className="text-gold">the shadows</span>
              </h1>

              <p className="mt-6 text-lg md:text-xl text-white/70 max-w-xl">
                Sponsorships, brand collabs, content partnerships, press, and
                business inquiries. Choose an inquiry type, then reach out
                directly.
              </p>
            </div>

            <div className="md:col-span-5">
              <div className="tsc-card p-8">
                <p className="overline text-gold">Direct</p>

                <a
                  href={emailHref}
                  data-testid="contact-direct-email"
                  className="mt-3 flex items-center gap-3 text-xl md:text-2xl font-display uppercase tracking-tight text-white hover:text-gold transition-colors break-all"
                >
                  <Mail className="w-5 h-5 shrink-0" />
                  {ORG.email}
                </a>

                <div className="gold-rule my-6" />

                <p className="text-sm text-white/60">
                  Business inquiries only. Recruitment goes through the Apply
                  page or Discord headquarters.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="tsc-card p-6 md:p-10 space-y-8">
            <div>
              <p className="overline mb-3">Inquiry type</p>

              <div className="flex flex-wrap gap-2" data-testid="inquiry-type-selector">
                {INQUIRY_TYPES.map((t) => (
                  <button
                    type="button"
                    key={t.key}
                    onClick={() => setInquiry(t.key)}
                    data-testid={`inquiry-${t.key}`}
                    className={`px-4 py-2 font-mono text-xs uppercase tracking-[0.2em] border transition-colors ${
                      inquiry === t.key
                        ? "border-gold text-gold bg-gold/5"
                        : "border-white/10 text-white/60 hover:text-white"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a
                href={emailHref}
                data-testid="contact-email-cta"
                className="border border-white/10 p-6 hover:border-gold transition-colors group"
              >
                <Mail className="w-6 h-6 text-gold" />
                <p className="overline text-white/40 mt-5">Email</p>
                <h3 className="font-display mt-2 text-2xl uppercase tracking-tighter">
                  Send Inquiry
                </h3>
                <p className="mt-3 text-sm text-white/60">
                  Opens your email app with the selected inquiry type already
                  filled in.
                </p>
                <p className="mt-5 inline-flex items-center gap-2 text-sm text-gold">
                  Open email <ArrowUpRight className="w-4 h-4" />
                </p>
              </a>

              <a
                href={ORG.discordInvite}
                target="_blank"
                rel="noreferrer"
                data-testid="contact-discord-cta"
                className="border border-white/10 p-6 hover:border-gold transition-colors group"
              >
                <MessageCircle className="w-6 h-6 text-gold" />
                <p className="overline text-white/40 mt-5">Discord</p>
                <h3 className="font-display mt-2 text-2xl uppercase tracking-tighter">
                  Headquarters
                </h3>
                <p className="mt-3 text-sm text-white/60">
                  Join the TSC Discord for recruitment, updates, and community
                  contact.
                </p>
                <p className="mt-5 inline-flex items-center gap-2 text-sm text-gold">
                  Join Discord <ArrowUpRight className="w-4 h-4" />
                </p>
              </a>

              <a
                href={discord?.url || ORG.discordInvite}
                target="_blank"
                rel="noreferrer"
                data-testid="contact-community-cta"
                className="border border-white/10 p-6 hover:border-gold transition-colors group"
              >
                <Users className="w-6 h-6 text-gold" />
                <p className="overline text-white/40 mt-5">Community</p>
                <h3 className="font-display mt-2 text-2xl uppercase tracking-tighter">
                  Connect
                </h3>
                <p className="mt-3 text-sm text-white/60">
                  For creators, players, staff, editors, and devs who want to
                  get involved.
                </p>
                <p className="mt-5 inline-flex items-center gap-2 text-sm text-gold">
                  Enter network <ArrowUpRight className="w-4 h-4" />
                </p>
              </a>
            </div>

            <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <p className="text-xs text-white/40 font-mono uppercase tracking-[0.2em]">
                Response time — 3 / 5 business days
              </p>

              <a href={emailHref} className="btn-tsc inline-flex justify-center">
                Contact TSC
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}