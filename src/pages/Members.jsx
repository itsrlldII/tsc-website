import React, { useEffect, useState } from "react";
import { MEMBERS, TSC_OFFICIAL } from "../lib/members";
import { fetchTwitchLiveStatus } from "../lib/live";
import MemberCard from "../components/MemberCard";

export default function Members() {
  const [liveMap, setLiveMap] = useState({});

  useEffect(() => {
    fetchTwitchLiveStatus()
      .then(setLiveMap)
      .catch(() => setLiveMap({}));
  }, []);

  const members = [TSC_OFFICIAL, ...MEMBERS].map((member) => {
    const twitchLogin = String(member.twitch_login || "").toLowerCase();
    const liveData = liveMap[twitchLogin];

    return {
      ...member,
      live: Boolean(liveData),
      liveData,
    };
  });

  return (
    <div data-testid="members-page" className="pt-28 md:pt-36">
      {/* Header */}
      <section className="relative border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24">
          <p className="overline text-gold">▸ Roster / Active</p>

          <h1 className="display-xl mt-5 text-[14vw] md:text-[7.5rem] text-white">
            Meet The
            <br />
            <span className="text-gold">Shadow</span>{" "}
            <span className="text-mist">Corp</span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-white/70 max-w-2xl">
            The players, creators, and builders behind the movement. Every
            operative carries their own lane, their own title, and their own
            shadow.
          </p>

          <div className="mt-10 grid grid-cols-3 md:grid-cols-5 gap-4 max-w-xl">
            <div className="border-t border-gold/40 pt-3">
              <p className="overline text-gold">Active</p>
              <p className="font-display text-2xl mt-1">{members.length}</p>
            </div>

            <div className="border-t border-mist/50 pt-3">
              <p className="overline text-mist">Scope</p>
              <p className="font-display text-2xl mt-1">Multi</p>
            </div>

            <div className="border-t border-gold/40 pt-3">
              <p className="overline text-gold">Est.</p>
              <p className="font-display text-2xl mt-1">2025</p>
            </div>
          </div>
        </div>
      </section>

      {/* Roster */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {members.map((m, idx) => (
            <div
              key={m.id}
              className="reveal"
              style={{ animationDelay: `${idx * 0.08}s` }}
            >
              <MemberCard member={m} variant="full" />
            </div>
          ))}
        </div>
      </section>

      {/* Future members slot */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="border border-dashed border-white/15 p-10 md:p-14 text-center"
            data-testid="future-members-slot"
          >
            <p className="overline text-gold">Open Slots</p>

            <h3 className="font-display mt-4 text-3xl md:text-4xl font-light uppercase tracking-tighter">
              Future Operatives
            </h3>

            <p className="mt-3 text-white/60 max-w-xl mx-auto">
              New members will emerge from the shadows. Applications are open
              for players, creators, staff, editors, designers, and developers.
            </p>

            <a
              href="/apply"
              data-testid="future-apply-cta"
              className="btn-tsc mt-8 inline-flex"
            >
              Apply Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}