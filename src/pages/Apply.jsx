import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";
import { APPLY_CATEGORIES, ORG } from "../lib/tsc";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

function ApplyTrackCard({ category }) {
  return (
    <div className="tsc-card p-6 md:p-10 space-y-6">
      <div>
        <p className="overline text-gold">Track — {category.label}</p>

        <h3 className="font-display mt-4 text-3xl md:text-4xl font-light uppercase tracking-tighter">
          Join as a {category.label}
        </h3>

        <p className="mt-4 text-white/60 max-w-2xl">
          {category.blurb}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border border-white/10 p-5">
          <CheckCircle2 className="w-5 h-5 text-gold" />
          <p className="overline text-white/40 mt-4">Step 01</p>
          <p className="mt-2 text-white">Submit your application.</p>
        </div>

        <div className="border border-white/10 p-5">
          <CheckCircle2 className="w-5 h-5 text-gold" />
          <p className="overline text-white/40 mt-4">Step 02</p>
          <p className="mt-2 text-white">Join the Discord headquarters.</p>
        </div>

        <div className="border border-white/10 p-5">
          <CheckCircle2 className="w-5 h-5 text-gold" />
          <p className="overline text-white/40 mt-4">Step 03</p>
          <p className="mt-2 text-white">Wait for staff review or tryout info.</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <a
          href={ORG.applicationForm || ORG.discordInvite}
          target="_blank"
          rel="noreferrer"
          className="btn-tsc inline-flex items-center justify-center gap-2"
          data-testid={`apply-form-link-${category.key}`}
        >
          Start Application
          <ArrowUpRight className="w-4 h-4" />
        </a>

        <a
          href={ORG.discordInvite}
          target="_blank"
          rel="noreferrer"
          className="btn-tsc-outline inline-flex items-center justify-center gap-2"
          data-testid={`apply-discord-link-${category.key}`}
        >
          Join Discord
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>

      <p className="text-xs text-white/40 font-mono uppercase tracking-[0.2em]">
        Applications are reviewed manually by TSC staff.
      </p>
    </div>
  );
}

export default function Apply() {
  const [tab, setTab] = useState("player");

  return (
    <div data-testid="apply-page" className="pt-28 md:pt-36">
      <section className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <p className="overline text-gold">▸ Recruitment / Open</p>

          <h1 className="display-xl mt-5 text-[14vw] md:text-[7.5rem] text-white">
            Apply to<br />
            <span className="text-gold">The Shadow</span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-white/70 max-w-2xl">
            Four tracks. One movement. Pick the lane that matches your craft, then submit your application and join the headquarters.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs value={tab} onValueChange={setTab} className="w-full">
            <TabsList
              data-testid="apply-tabs"
              className="grid w-full grid-cols-2 md:grid-cols-4 h-auto p-1 bg-obsidian-surface border border-white/10 rounded-none"
            >
              {APPLY_CATEGORIES.map((c) => (
                <TabsTrigger
                  key={c.key}
                  value={c.key}
                  data-testid={`apply-tab-${c.key}`}
                  className="rounded-none data-[state=active]:bg-gold data-[state=active]:text-black font-mono uppercase tracking-[0.2em] text-[0.7rem] py-3"
                >
                  {c.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {APPLY_CATEGORIES.map((c) => (
              <TabsContent key={c.key} value={c.key} className="mt-8">
                <ApplyTrackCard category={c} />
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>
    </div>
  );
}