import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Lock } from "lucide-react";
import { supabase } from "../lib/supabase";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const update = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { error: loginError } = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password,
      });

      if (loginError) throw loginError;

      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-28 md:pt-36 min-h-screen" data-testid="login-page">
      <section className="border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
          <p className="overline text-gold">▸ Secure Access</p>

          <h1 className="display-xl mt-5 text-[14vw] md:text-[7rem] text-white">
            Shadow
            <br />
            <span className="text-gold">Login</span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-white/70 max-w-xl mx-auto">
            Member access for The Shadow Corp network.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <form
          onSubmit={handleLogin}
          className="tsc-card p-8 md:p-10 max-w-md mx-auto space-y-5"
        >
          <div className="w-12 h-12 border border-gold flex items-center justify-center text-gold">
            <Lock className="w-6 h-6" />
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
            />
          </label>

          {error && <p className="text-sm text-red-400 font-mono">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="btn-tsc w-full justify-center disabled:opacity-50"
          >
            {loading ? "Entering..." : "Enter"}
            <ArrowRight className="w-4 h-4" />
          </button>

          <p className="text-sm text-white/50">
            Need access?{" "}
            <Link to="/signup" className="text-gold hover:underline">
              Create account
            </Link>
          </p>
        </form>
      </section>
    </div>
  );
}