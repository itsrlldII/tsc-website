import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, UserPlus } from "lucide-react";
import { supabase } from "../lib/supabase";

export default function Signup() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    username: "",
    displayName: "",
    discord: "",
    twitchLogin: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const update = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const { error: signupError } = await supabase.auth.signUp({
        email: form.email.trim(),
        password: form.password,
        options: {
          data: {
            username: form.username.trim(),
            display_name: form.displayName.trim(),
            discord: form.discord.trim(),
            twitch_login: form.twitchLogin.trim(),
          },
          emailRedirectTo: `${window.location.origin}/login`,
        },
      });

      if (signupError) {
        throw signupError;
      }

      setMessage(
        "Account created. Check your email if confirmation is required, then log in."
      );

      setForm({
        email: "",
        password: "",
        username: "",
        displayName: "",
        discord: "",
        twitchLogin: "",
      });
    } catch (err) {
      setError(err.message || "Signup failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-28 md:pt-36 min-h-screen" data-testid="signup-page">
      <section className="border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
          <p className="overline text-gold">▸ Join The Network</p>

          <h1 className="display-xl mt-5 text-[14vw] md:text-[7rem] text-white">
            Create
            <br />
            <span className="text-gold">Account</span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-white/70 max-w-xl mx-auto">
            Start as a recruit. Staff approval unlocks deeper member access.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <form
          onSubmit={handleSignup}
          className="tsc-card p-8 md:p-10 max-w-xl mx-auto space-y-5"
        >
          <div className="w-12 h-12 border border-gold flex items-center justify-center text-gold">
            <UserPlus className="w-6 h-6" />
          </div>

          <label className="block">
            <span className="overline block mb-2">Email</span>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={update}
              className="tsc-input"
              required
            />
          </label>

          <label className="block">
            <span className="overline block mb-2">Password</span>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={update}
              className="tsc-input"
              required
              minLength={6}
            />
          </label>

          <label className="block">
            <span className="overline block mb-2">Username</span>
            <input
              name="username"
              value={form.username}
              onChange={update}
              className="tsc-input"
              placeholder="yoru"
              required
            />
          </label>

          <label className="block">
            <span className="overline block mb-2">Display Name</span>
            <input
              name="displayName"
              value={form.displayName}
              onChange={update}
              className="tsc-input"
              placeholder="Yoru"
              required
            />
          </label>

          <label className="block">
            <span className="overline block mb-2">Discord</span>
            <input
              name="discord"
              value={form.discord}
              onChange={update}
              className="tsc-input"
              placeholder="your discord username"
            />
          </label>

          <label className="block">
            <span className="overline block mb-2">Twitch Login</span>
            <input
              name="twitchLogin"
              value={form.twitchLogin}
              onChange={update}
              className="tsc-input"
              placeholder="twitch username only"
            />
          </label>

          {error && <p className="text-sm text-red-400 font-mono">{error}</p>}
          {message && <p className="text-sm text-mist font-mono">{message}</p>}

          <button
            type="submit"
            disabled={loading}
            className="btn-tsc w-full justify-center disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Account"}
            <ArrowRight className="w-4 h-4" />
          </button>

          <p className="text-sm text-white/50">
            Already have an account?{" "}
            <Link to="/login" className="text-gold hover:underline">
              Log in
            </Link>
          </p>
        </form>
      </section>
    </div>
  );
}