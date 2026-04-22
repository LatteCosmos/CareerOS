import React, { useState } from "react";
import {
  ArrowLeft, ArrowRight, Home, GraduationCap, Target, Users, User,
  Search, Bell, ChevronRight, ChevronDown, Star, Check, X, AlertCircle,
  Sparkles, Briefcase, Code2, Database, Cloud, Layout, Upload, FileText,
  Download, Share2, Globe, Code as GithubIcon, Link as LinkedinIcon, Mail, Lock, Eye, EyeOff,
  Calendar, Clock, MessageCircle, Filter, TrendingUp, Zap, Award,
  BookOpen, ChevronLeft, Plus, MapPin, Building2, Languages, Play
} from "lucide-react";

/* =========================================================
   CAREEROS — Mobile App Prototype
   12 screens, iPhone 15 Pro (393 × 852)
   Design: Indigo #4F46E5, Emerald #10B981
   ========================================================= */

const COLORS = {
  indigo: "#4F46E5",
  indigoLight: "#EEF2FF",
  emerald: "#10B981",
  emeraldLight: "#ECFDF5",
  gray50: "#F9FAFB",
  gray200: "#E5E7EB",
  gray500: "#6B7280",
  gray900: "#111827",
};

/* ---------- Reusable primitives ---------- */

const StatusBar = ({ dark = false }) => (
  <div className={`h-11 px-6 flex items-center justify-between text-[14px] font-semibold shrink-0 ${dark ? "text-white" : "text-gray-900"}`}>
    <span>9:41</span>
    <div className="flex items-center gap-1">
      <svg width="17" height="11" viewBox="0 0 17 11" fill="none"><path d="M1 7h2v3H1zM5 5h2v5H5zM9 3h2v7H9zM13 1h2v9h-2z" fill="currentColor"/></svg>
      <svg width="15" height="11" viewBox="0 0 15 11" fill="none"><path d="M7.5 2c2 0 3.9.7 5.4 2l1-1A9 9 0 001 3l1 1a7.8 7.8 0 015.5-2zm0 3c1.2 0 2.4.4 3.3 1.2l1-1A6.4 6.4 0 003 5.2l1 1A4.8 4.8 0 017.5 5zm0 3c.6 0 1.2.2 1.6.7l1-1a3.4 3.4 0 00-5.2 0l1 1c.4-.5 1-.7 1.6-.7zm0 3L9 9.5A2 2 0 006 9.5L7.5 11z" fill="currentColor"/></svg>
      <div className="ml-1 w-6 h-[11px] border border-current rounded-[3px] relative">
        <div className="absolute inset-[1px] bg-current rounded-[1px]" style={{width: "calc(100% - 2px)"}}/>
        <div className="absolute -right-[3px] top-[3px] w-[2px] h-[5px] bg-current rounded-r"/>
      </div>
    </div>
  </div>
);

const HomeIndicator = ({ dark = false }) => (
  <div className="h-[34px] flex items-center justify-center shrink-0">
    <div className={`w-[134px] h-[5px] rounded-full ${dark ? "bg-white/80" : "bg-gray-900"}`}/>
  </div>
);

const PhoneFrame = ({ children, label, screenBg = "#FFFFFF" }) => (
  <div className="flex flex-col items-center gap-3">
    <div
      className="relative w-[393px] h-[852px] rounded-[48px] overflow-hidden shadow-2xl border-[6px] border-gray-900"
      style={{ background: screenBg }}
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[32px] bg-gray-900 rounded-b-[20px] z-50"/>
      <div className="w-full h-full flex flex-col">{children}</div>
    </div>
    {label && (
      <div className="text-center">
        <div className="text-xs font-mono text-gray-500 tracking-wider">{label.num}</div>
        <div className="text-sm font-semibold text-gray-900 mt-0.5">{label.title}</div>
      </div>
    )}
  </div>
);

const BottomNav = ({ active = "home", onNav }) => {
  const items = [
    { id: "home", Icon: Home, label: "Home" },
    { id: "electives", Icon: GraduationCap, label: "Electives" },
    { id: "skills", Icon: Target, label: "Skills" },
    { id: "mentors", Icon: Users, label: "Mentors" },
    { id: "profile", Icon: User, label: "Profile" },
  ];
  return (
    <div className="mt-auto border-t border-gray-100 bg-white/95 backdrop-blur px-2 pt-2 pb-1">
      <div className="flex justify-around">
        {items.map(({ id, Icon, label }) => {
          const isActive = id === active;
          return (
            <button
              key={id}
              onClick={() => onNav?.(id)}
              className="flex flex-col items-center gap-0.5 px-3 py-1.5 transition"
            >
              <Icon size={22} strokeWidth={isActive ? 2.4 : 1.8} color={isActive ? COLORS.indigo : COLORS.gray500}/>
              <span className="text-[10px] font-medium" style={{color: isActive ? COLORS.indigo : COLORS.gray500}}>
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

const TopBar = ({ title, onBack, right, dark = false }) => (
  <div className={`flex items-center h-12 px-4 shrink-0 ${dark ? "text-white" : "text-gray-900"}`}>
    {onBack ? (
      <button onClick={onBack} className="-ml-2 p-2"><ChevronLeft size={24}/></button>
    ) : <div className="w-8"/>}
    <div className="flex-1 text-center font-semibold text-[16px]">{title}</div>
    <div className="w-8 flex justify-end">{right}</div>
  </div>
);

const PrimaryBtn = ({ children, onClick, full = true, icon }) => (
  <button
    onClick={onClick}
    className={`${full ? "w-full" : ""} h-12 rounded-2xl text-white font-semibold text-[15px] flex items-center justify-center gap-2 active:scale-[0.98] transition shadow-sm`}
    style={{ background: COLORS.indigo, boxShadow: "0 4px 14px 0 rgba(79,70,229,0.25)" }}
  >
    {children}
    {icon}
  </button>
);

const SecondaryBtn = ({ children, onClick, full = true }) => (
  <button
    onClick={onClick}
    className={`${full ? "w-full" : ""} h-12 rounded-2xl font-semibold text-[15px] flex items-center justify-center active:scale-[0.98] transition`}
    style={{ color: COLORS.indigo, border: `1.5px solid ${COLORS.indigo}`, background: "transparent" }}
  >
    {children}
  </button>
);

const Chip = ({ children, active, onClick, color = "indigo" }) => {
  const activeStyles = color === "indigo"
    ? { background: COLORS.indigo, color: "white", borderColor: COLORS.indigo }
    : { background: COLORS.emerald, color: "white", borderColor: COLORS.emerald };
  return (
    <button
      onClick={onClick}
      className="h-8 px-3.5 rounded-full text-[13px] font-medium border transition whitespace-nowrap"
      style={active ? activeStyles : { background: "white", color: COLORS.gray900, borderColor: COLORS.gray200 }}
    >
      {children}
    </button>
  );
};

const Tag = ({ children, variant = "indigo" }) => {
  const styles = {
    indigo: { bg: COLORS.indigoLight, fg: COLORS.indigo },
    emerald: { bg: COLORS.emeraldLight, fg: COLORS.emerald },
    gray: { bg: COLORS.gray50, fg: COLORS.gray500 },
    amber: { bg: "#FEF3C7", fg: "#B45309" },
    rose: { bg: "#FEE2E2", fg: "#BE123C" },
  }[variant];
  return (
    <span className="inline-flex items-center h-6 px-2.5 rounded-full text-[11px] font-medium" style={{background: styles.bg, color: styles.fg}}>
      {children}
    </span>
  );
};

const Input = ({ label, placeholder, icon: Icon, type = "text", value = "" }) => (
  <div className="space-y-1.5">
    <label className="text-[13px] font-medium text-gray-700">{label}</label>
    <div className="relative">
      {Icon && <Icon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"/>}
      <input
        type={type}
        defaultValue={value}
        placeholder={placeholder}
        className={`w-full h-12 rounded-xl border border-gray-200 bg-white text-[15px] ${Icon ? "pl-11" : "pl-4"} pr-4 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100`}
      />
    </div>
  </div>
);

const Avatar = ({ name, size = 40, gradient }) => {
  const initials = name.split(" ").map(n => n[0]).slice(0,2).join("");
  const gradients = [
    "linear-gradient(135deg, #818CF8 0%, #4F46E5 100%)",
    "linear-gradient(135deg, #34D399 0%, #059669 100%)",
    "linear-gradient(135deg, #F472B6 0%, #DB2777 100%)",
    "linear-gradient(135deg, #FBBF24 0%, #D97706 100%)",
    "linear-gradient(135deg, #60A5FA 0%, #2563EB 100%)",
  ];
  const g = gradient ?? gradients[name.length % gradients.length];
  return (
    <div
      className="rounded-full flex items-center justify-center text-white font-semibold shrink-0"
      style={{ width: size, height: size, background: g, fontSize: size * 0.38 }}
    >
      {initials}
    </div>
  );
};

/* =========================================================
   SCREEN 1 — SPLASH / ONBOARDING
   ========================================================= */
const ScreenSplash = ({ go }) => (
  <>
    <StatusBar dark />
    <div
      className="flex-1 flex flex-col px-7 pb-6 relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #4F46E5 0%, #6366F1 55%, #8B5CF6 100%)" }}
    >
      {/* Decorative blobs */}
      <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full opacity-30" style={{background: "radial-gradient(circle, #A5B4FC 0%, transparent 70%)"}}/>
      <div className="absolute bottom-40 -left-16 w-56 h-56 rounded-full opacity-25" style={{background: "radial-gradient(circle, #34D399 0%, transparent 70%)"}}/>

      <div className="flex-1 flex flex-col items-center justify-center relative z-10">
        {/* Logo */}
        <div className="relative mb-8">
          <div className="w-24 h-24 rounded-3xl bg-white flex items-center justify-center shadow-2xl rotate-6">
            <div className="relative">
              <div className="w-11 h-11 rounded-xl" style={{background: `linear-gradient(135deg, ${COLORS.indigo} 0%, ${COLORS.emerald} 100%)`}}/>
              <ArrowRight size={28} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white" strokeWidth={3}/>
            </div>
          </div>
          <div className="absolute -top-2 -right-3 w-8 h-8 rounded-xl bg-emerald-400 flex items-center justify-center -rotate-12">
            <Sparkles size={16} className="text-white" strokeWidth={2.5}/>
          </div>
        </div>

        <h1 className="text-[36px] font-bold text-white tracking-tight">CareerOS</h1>
        <p className="text-[15px] text-indigo-100 mt-3 text-center leading-relaxed max-w-[280px]">
          Your bridge to an Australian tech career
        </p>

        <div className="flex gap-2 mt-12 items-center">
          <div className="flex -space-x-2">
            <Avatar name="Alex Chen" size={28}/>
            <Avatar name="Ben Park" size={28}/>
            <Avatar name="Raj Patel" size={28}/>
          </div>
          <span className="text-[12px] text-indigo-100 ml-2">4,200+ IT students</span>
        </div>
      </div>

      <div className="space-y-3 relative z-10">
        <button
          onClick={() => go("signup")}
          className="w-full h-14 rounded-2xl bg-white font-semibold text-[16px] flex items-center justify-center gap-2 shadow-xl"
          style={{color: COLORS.indigo}}
        >
          Get Started <ArrowRight size={18}/>
        </button>
        <button onClick={() => go("signup")} className="w-full h-12 rounded-2xl font-semibold text-[15px] text-white border border-white/30">
          Log In
        </button>
        <p className="text-center text-[12px] text-indigo-200 mt-3">
          By continuing you agree to our <span className="underline">Terms</span> & <span className="underline">Privacy</span>
        </p>
      </div>
    </div>
    <HomeIndicator dark/>
  </>
);

/* =========================================================
   SCREEN 2 — SIGN UP
   ========================================================= */
const ScreenSignUp = ({ go }) => (
  <>
    <StatusBar/>
    <TopBar onBack={() => go("splash")}/>
    <div className="flex-1 overflow-y-auto px-6 pb-6">
      <h1 className="text-[28px] font-bold text-gray-900 leading-tight">Create your account</h1>
      <p className="text-[14px] text-gray-500 mt-2">Join thousands of IT students building careers in Australia</p>

      {/* Social */}
      <div className="grid grid-cols-2 gap-3 mt-6">
        <button className="h-12 rounded-xl border border-gray-200 flex items-center justify-center gap-2 font-medium text-[14px] text-gray-900">
          <svg width="18" height="18" viewBox="0 0 18 18"><path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.17-1.84H9v3.48h4.84a4.14 4.14 0 01-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62z"/><path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26a5.4 5.4 0 01-3.04.86 5.37 5.37 0 01-5.04-3.72H.96v2.34A9 9 0 009 18z"/><path fill="#FBBC05" d="M3.96 10.7A5.4 5.4 0 013.68 9c0-.59.1-1.16.28-1.7V4.96H.96A9 9 0 000 9c0 1.45.35 2.82.96 4.04l3-2.34z"/><path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58A9 9 0 009 0 9 9 0 00.96 4.96l3 2.34A5.36 5.36 0 019 3.58z"/></svg>
          Google
        </button>
        <button className="h-12 rounded-xl border border-gray-200 flex items-center justify-center gap-2 font-medium text-[14px] text-gray-900">
          <LinkedinIcon size={18} className="text-[#0A66C2]" fill="#0A66C2"/> LinkedIn
        </button>
      </div>

      <div className="flex items-center gap-3 my-5">
        <div className="flex-1 h-px bg-gray-200"/>
        <span className="text-[12px] text-gray-400">or with email</span>
        <div className="flex-1 h-px bg-gray-200"/>
      </div>

      <div className="space-y-4">
        <Input label="Full name" placeholder="Alex Chen" icon={User} value="Alex Chen"/>
        <Input label="Email" placeholder="you@student.uts.edu.au" icon={Mail} type="email" value="Alex.chen@student.uts.edu.au"/>
        <Input label="Password" placeholder="Min. 8 characters" icon={Lock} type="password" value="••••••••••"/>

        <div className="space-y-1.5">
          <label className="text-[13px] font-medium text-gray-700">University</label>
          <div className="relative">
            <Building2 size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"/>
            <div className="w-full h-12 rounded-xl border border-gray-200 bg-white text-[15px] pl-11 pr-4 flex items-center justify-between">
              <span className="text-gray-900">University of Technology Sydney</span>
              <ChevronDown size={18} className="text-gray-400"/>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="text-[13px] font-medium text-gray-700">Degree</label>
            <div className="h-12 rounded-xl border border-gray-200 bg-white text-[15px] px-4 flex items-center justify-between">
              <span className="text-gray-900 text-[13px]">Master of IT</span>
              <ChevronDown size={16} className="text-gray-400"/>
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[13px] font-medium text-gray-700">Graduation</label>
            <div className="h-12 rounded-xl border border-gray-200 bg-white text-[15px] px-4 flex items-center justify-between">
              <span className="text-gray-900 text-[13px]">Nov 2026</span>
              <ChevronDown size={16} className="text-gray-400"/>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <PrimaryBtn onClick={() => go("questionnaire")}>Create Account</PrimaryBtn>
      </div>
      <p className="text-center text-[12px] text-gray-400 mt-4">
        By creating an account you agree to our <span className="text-indigo-600 font-medium">Terms</span> and <span className="text-indigo-600 font-medium">Privacy Policy</span>
      </p>
    </div>
    <HomeIndicator/>
  </>
);

/* =========================================================
   SCREEN 3 — ONBOARDING QUESTIONNAIRE
   ========================================================= */
const ScreenQuestionnaire = ({ go }) => {
  const [selected, setSelected] = useState(["Junior Java Dev"]);
  const toggle = (v) => setSelected(s => s.includes(v) ? s.filter(x => x!==v) : [...s, v]);
  const goals = [
    { v: "Junior Java Dev", icon: Code2 },
    { v: "Full-Stack Developer", icon: Layout },
    { v: "Data Engineer", icon: Database },
    { v: "Cloud Engineer", icon: Cloud },
    { v: "DevOps", icon: Zap },
    { v: "Mobile Developer", icon: Briefcase },
    { v: "QA / Test Automation", icon: Check },
    { v: "AI / ML Engineer", icon: Sparkles },
  ];
  return (
    <>
      <StatusBar/>
      <TopBar onBack={() => go("signup")} right={<button className="text-[13px] font-medium text-gray-500">Skip</button>}/>

      {/* Progress */}
      <div className="px-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[12px] font-semibold" style={{color: COLORS.indigo}}>STEP 1 OF 3</span>
          <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full rounded-full" style={{width: "33%", background: COLORS.indigo}}/>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pt-4">
        <h1 className="text-[26px] font-bold text-gray-900 leading-tight">What's your career goal?</h1>
        <p className="text-[14px] text-gray-500 mt-2">Pick one or more roles you're targeting in Australia</p>

        <div className="mt-6 grid grid-cols-2 gap-3">
          {goals.map(({ v, icon: Icon }) => {
            const active = selected.includes(v);
            return (
              <button
                key={v}
                onClick={() => toggle(v)}
                className="h-[104px] rounded-2xl border-2 p-4 flex flex-col items-start justify-between text-left transition"
                style={{
                  borderColor: active ? COLORS.indigo : COLORS.gray200,
                  background: active ? COLORS.indigoLight : "white",
                }}
              >
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{background: active ? COLORS.indigo : COLORS.gray50}}>
                  <Icon size={18} color={active ? "white" : COLORS.gray500} strokeWidth={2}/>
                </div>
                <span className="text-[13px] font-semibold text-gray-900 leading-tight">{v}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-6 p-4 rounded-2xl border border-dashed border-gray-300 bg-gray-50 flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shrink-0">
            <Sparkles size={16} style={{color: COLORS.emerald}}/>
          </div>
          <div>
            <p className="text-[13px] font-semibold text-gray-900">We'll personalise everything</p>
            <p className="text-[12px] text-gray-500 mt-0.5 leading-relaxed">Electives, skill plans and mentors will match these goals.</p>
          </div>
        </div>
      </div>

      <div className="px-6 py-4 border-t border-gray-100">
        <PrimaryBtn onClick={() => go("dashboard")} icon={<ArrowRight size={18}/>}>Continue</PrimaryBtn>
      </div>
      <HomeIndicator/>
    </>
  );
};

/* =========================================================
   SCREEN 4 — HOME / DASHBOARD
   ========================================================= */
const ScreenDashboard = ({ go }) => (
  <div className="flex flex-col flex-1" style={{background: COLORS.gray50}}>
    <StatusBar/>
    {/* Header */}
    <div className="px-5 pt-2 pb-4 flex items-center justify-between">
      <div>
        <p className="text-[13px] text-gray-500">Good morning ☀️</p>
        <h1 className="text-[22px] font-bold text-gray-900">Alex Chen</h1>
      </div>
      <div className="flex items-center gap-2">
        <button className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center relative">
          <Bell size={18} className="text-gray-700"/>
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-rose-500"/>
        </button>
        <Avatar name="Alex Chen" size={40}/>
      </div>
    </div>

    <div className="flex-1 overflow-y-auto px-5 pb-4">
      {/* Skill Gap Hero Card */}
      <div
        className="rounded-3xl p-5 text-white relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #4F46E5 0%, #6366F1 100%)" }}
      >
        <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full opacity-20" style={{background: "radial-gradient(circle, white 0%, transparent 70%)"}}/>
        <div className="flex items-center gap-2 mb-3">
          <Target size={16}/>
          <span className="text-[12px] font-medium opacity-90">Your skill readiness</span>
        </div>
        <div className="flex items-end justify-between">
          <div>
            <div className="text-[44px] font-bold leading-none">68%</div>
            <p className="text-[13px] opacity-90 mt-2 max-w-[200px]">Ready for <span className="font-semibold">Junior Java Developer</span></p>
          </div>
          <button
            onClick={() => go("skillResults")}
            className="h-9 px-3 rounded-full bg-white/20 backdrop-blur text-[12px] font-semibold flex items-center gap-1"
          >
            View gap <ArrowRight size={14}/>
          </button>
        </div>
        <div className="mt-4 h-1.5 bg-white/20 rounded-full overflow-hidden">
          <div className="h-full bg-white rounded-full" style={{width: "68%"}}/>
        </div>
      </div>

      {/* 2x2 Feature Grid */}
      <div className="grid grid-cols-2 gap-3 mt-5">
        {[
          { id: "electives", icon: GraduationCap, title: "Smart Electives", sub: "3 new matches", color: COLORS.indigo, bg: COLORS.indigoLight },
          { id: "portfolio", icon: Layout, title: "Portfolio Builder", sub: "Auto-generate", color: "#EC4899", bg: "#FCE7F3" },
          { id: "skillScan", icon: Target, title: "Skill Scanner", sub: "68% ready", color: COLORS.emerald, bg: COLORS.emeraldLight },
          { id: "mentors", icon: Users, title: "Mentor Match", sub: "12 available", color: "#F59E0B", bg: "#FEF3C7" },
        ].map(f => (
          <button
            key={f.id}
            onClick={() => go(f.id)}
            className="bg-white rounded-2xl p-4 text-left border border-gray-100"
            style={{boxShadow: "0 1px 3px rgba(0,0,0,0.04)"}}
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{background: f.bg}}>
              <f.icon size={20} color={f.color} strokeWidth={2}/>
            </div>
            <p className="text-[14px] font-semibold text-gray-900">{f.title}</p>
            <p className="text-[11px] text-gray-500 mt-0.5">{f.sub}</p>
          </button>
        ))}
      </div>

      {/* Recommendations */}
      <div className="mt-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[16px] font-bold text-gray-900">Recommended this week</h2>
          <button className="text-[12px] font-semibold" style={{color: COLORS.indigo}}>See all</button>
        </div>
        <div className="flex gap-3 overflow-x-auto -mx-5 px-5 pb-2" style={{scrollbarWidth: "none"}}>
          {[
            { tag: "ELECTIVE", color: "indigo", title: "Enterprise Software Architecture", sub: "32998 · UTS · Spring", match: "92%"},
            { tag: "MENTOR", color: "emerald", title: "Sarah Kim", sub: "Senior Eng @ Atlassian", match: "New"},
            { tag: "EVENT", color: "amber", title: "Canva Grad Info Session", sub: "Apr 28 · Online", match: "Soon"},
          ].map((r,i) => (
            <div key={i} className="w-[240px] shrink-0 bg-white rounded-2xl p-4 border border-gray-100">
              <div className="flex items-center justify-between">
                <Tag variant={r.color}>{r.tag}</Tag>
                <span className="text-[11px] font-semibold text-gray-400">{r.match}</span>
              </div>
              <p className="text-[14px] font-bold text-gray-900 mt-3 leading-snug">{r.title}</p>
              <p className="text-[12px] text-gray-500 mt-1">{r.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly progress */}
      <div className="mt-6 bg-white rounded-2xl p-4 border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[13px] font-semibold text-gray-900">This week's streak 🔥</p>
            <p className="text-[11px] text-gray-500 mt-0.5">Keep it going!</p>
          </div>
          <span className="text-[20px] font-bold" style={{color: COLORS.emerald}}>5 days</span>
        </div>
        <div className="flex gap-1.5 mt-3">
          {["M","T","W","T","F","S","S"].map((d,i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full h-8 rounded-lg" style={{background: i < 5 ? COLORS.emerald : COLORS.gray200}}/>
              <span className="text-[10px] text-gray-400">{d}</span>
            </div>
          ))}
        </div>
      </div>
    </div>

    <BottomNav active="home" onNav={(id) => { if(id==="electives") go("electives"); if(id==="mentors") go("mentors"); if(id==="skills") go("skillScan"); }}/>
    <HomeIndicator/>
  </div>
);

/* =========================================================
   SCREEN 5 — ELECTIVE RECOMMENDER RESULTS
   ========================================================= */
const ScreenElectives = ({ go }) => {
  const [filter, setFilter] = useState("All");
  const filters = ["All", "Autumn", "Spring", "6cp", "8cp", "Beginner"];
  const electives = [
    {
      code: "32998", name: "Enterprise Software Architecture",
      match: 92, skills: ["Java", "Spring Boot", "Microservices", "AWS"],
      prereq: "32555", cp: 6, sem: "Spring 2026",
    },
    {
      code: "31927", name: "Applications Development with .NET",
      match: 78, skills: ["C#", ".NET", "OOP", "SQL Server"],
      prereq: "None", cp: 6, sem: "Autumn 2026",
    },
    {
      code: "41039", name: "Programming 2",
      match: 85, skills: ["Java", "Data Structures", "Algorithms"],
      prereq: "41038", cp: 6, sem: "Spring 2026",
    },
    {
      code: "32933", name: "Software Testing & Quality",
      match: 74, skills: ["JUnit", "Selenium", "CI/CD", "TDD"],
      prereq: "32555", cp: 6, sem: "Autumn 2026",
    },
  ];
  return (
    <div className="flex flex-col flex-1" style={{background: COLORS.gray50}}>
      <StatusBar/>
      <TopBar title="Smart Electives" onBack={() => go("dashboard")} right={<Search size={20} className="text-gray-600"/>}/>

      {/* Hero context */}
      <div className="px-5 mt-1">
        <div className="rounded-2xl p-4" style={{background: COLORS.indigoLight}}>
          <div className="flex items-center gap-2">
            <Target size={16} style={{color: COLORS.indigo}}/>
            <span className="text-[12px] font-semibold" style={{color: COLORS.indigo}}>MATCHED TO YOUR GOAL</span>
          </div>
          <p className="text-[15px] font-bold text-gray-900 mt-1.5">Junior Java Developer · Sydney</p>
          <p className="text-[12px] text-gray-500 mt-0.5">Based on 2,400+ job postings this month</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto px-5 mt-4 pb-1" style={{scrollbarWidth: "none"}}>
        <button className="h-8 px-3 rounded-full border border-gray-200 bg-white flex items-center gap-1 text-[13px] font-medium text-gray-700 whitespace-nowrap shrink-0">
          <Filter size={14}/> Filters
        </button>
        {filters.map(f => <Chip key={f} active={filter===f} onClick={() => setFilter(f)}>{f}</Chip>)}
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto px-5 mt-4 space-y-3">
        {electives.map(e => (
          <button
            key={e.code}
            onClick={() => go("electiveDetail")}
            className="w-full bg-white rounded-2xl p-4 border border-gray-100 text-left"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[11px] font-mono font-semibold text-gray-400">{e.code}</span>
                  <span className="text-[11px] text-gray-300">·</span>
                  <span className="text-[11px] text-gray-500">{e.sem}</span>
                </div>
                <p className="text-[15px] font-bold text-gray-900 leading-snug">{e.name}</p>
              </div>
              <div className="shrink-0 flex flex-col items-center px-2.5 py-1.5 rounded-xl" style={{background: e.match >= 85 ? COLORS.emeraldLight : COLORS.indigoLight}}>
                <span className="text-[14px] font-bold leading-none" style={{color: e.match >= 85 ? COLORS.emerald : COLORS.indigo}}>{e.match}%</span>
                <span className="text-[9px] font-semibold mt-0.5" style={{color: e.match >= 85 ? COLORS.emerald : COLORS.indigo}}>MATCH</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 mt-3">
              {e.skills.map(s => <Tag key={s} variant="indigo">{s}</Tag>)}
            </div>

            <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-50">
              <div className="flex items-center gap-1 text-[11px] text-gray-500">
                <BookOpen size={12}/> Prereq: {e.prereq}
              </div>
              <div className="flex items-center gap-1 text-[11px] text-gray-500">
                <Award size={12}/> {e.cp} cp
              </div>
              <ChevronRight size={16} className="text-gray-300 ml-auto"/>
            </div>
          </button>
        ))}
      </div>

      <BottomNav active="electives" onNav={(id) => id==="home" && go("dashboard")}/>
      <HomeIndicator/>
    </div>
  );
};

/* =========================================================
   SCREEN 6 — ELECTIVE DETAIL
   ========================================================= */
const ScreenElectiveDetail = ({ go }) => (
  <div className="flex flex-col flex-1 bg-white">
    <StatusBar dark/>
    <div className="px-5 pt-2 pb-5" style={{background: "linear-gradient(135deg, #4F46E5 0%, #6366F1 100%)"}}>
      <TopBar
        title=""
        dark
        onBack={() => go("electives")}
        right={<button className="text-white"><Share2 size={18}/></button>}
      />
      <div className="px-1 mt-2">
        <div className="flex items-center gap-2">
          <Tag variant="emerald">92% Match</Tag>
          <span className="text-[11px] font-mono text-indigo-100">32998 · 6 CP</span>
        </div>
        <h1 className="text-[22px] font-bold text-white mt-2 leading-tight">Enterprise Software Architecture</h1>
        <p className="text-[13px] text-indigo-100 mt-1">Spring 2026 · Advanced · UTS</p>
        <div className="flex items-center gap-3 mt-4 text-white">
          <div className="flex items-center gap-1 text-[12px]"><Star size={14} fill="white"/> 4.6</div>
          <div className="text-white/40">·</div>
          <div className="text-[12px]">312 reviews</div>
          <div className="text-white/40">·</div>
          <div className="text-[12px]">1.2k enrolled</div>
        </div>
      </div>
    </div>

    <div className="flex-1 overflow-y-auto px-5 pt-4 pb-4">
      {/* Why recommended */}
      <div className="rounded-2xl p-4 border border-emerald-100" style={{background: COLORS.emeraldLight}}>
        <div className="flex items-center gap-2 mb-2">
          <Sparkles size={14} style={{color: COLORS.emerald}}/>
          <span className="text-[12px] font-bold" style={{color: COLORS.emerald}}>WHY THIS MATCHES YOU</span>
        </div>
        <p className="text-[13px] text-gray-700 leading-relaxed">
          Covers 4 of your 5 missing Java skills — Spring Boot, microservices, REST API design and AWS deployment. Alumni from this course landed at Atlassian, Canva and CommBank.
        </p>
      </div>

      {/* Skills */}
      <h3 className="text-[14px] font-bold text-gray-900 mt-5 mb-2">Skills you'll gain</h3>
      <div className="flex flex-wrap gap-1.5">
        {["Spring Boot", "Microservices", "REST APIs", "Docker", "AWS EC2", "PostgreSQL", "System Design"].map(s => (
          <Tag key={s} variant="indigo">{s}</Tag>
        ))}
      </div>

      {/* Learning outcomes */}
      <h3 className="text-[14px] font-bold text-gray-900 mt-5 mb-2">Learning outcomes</h3>
      <div className="space-y-2.5">
        {[
          "Design scalable backend systems with Spring Boot",
          "Deploy containerised Java apps to AWS",
          "Apply design patterns in enterprise codebases",
          "Build production-grade REST APIs with testing",
        ].map((o,i) => (
          <div key={i} className="flex items-start gap-2.5">
            <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{background: COLORS.emeraldLight}}>
              <Check size={12} style={{color: COLORS.emerald}} strokeWidth={3}/>
            </div>
            <span className="text-[13px] text-gray-700 leading-relaxed">{o}</span>
          </div>
        ))}
      </div>

      {/* Student reviews */}
      <h3 className="text-[14px] font-bold text-gray-900 mt-5 mb-2">Student reviews</h3>
      <div className="space-y-3">
        {[
          { name: "Mei Zhang", role: "Now @ Afterpay", quote: "Best prep for my Spring Boot interviews. Projects went straight on my resume." },
          { name: "Arjun Singh", role: "Master of IT '25", quote: "Challenging but fair. The group microservices project was a portfolio standout." },
        ].map((r,i) => (
          <div key={i} className="rounded-2xl p-3.5 bg-gray-50 border border-gray-100">
            <div className="flex items-center gap-2.5">
              <Avatar name={r.name} size={32}/>
              <div>
                <p className="text-[13px] font-semibold text-gray-900">{r.name}</p>
                <p className="text-[11px] text-gray-500">{r.role}</p>
              </div>
              <div className="ml-auto flex gap-0.5">
                {[1,2,3,4,5].map(n => <Star key={n} size={11} fill="#F59E0B" color="#F59E0B"/>)}
              </div>
            </div>
            <p className="text-[12px] text-gray-700 mt-2.5 leading-relaxed">"{r.quote}"</p>
          </div>
        ))}
      </div>
    </div>

    <div className="px-5 py-3 border-t border-gray-100 flex gap-3">
      <button className="h-12 w-12 rounded-2xl border border-gray-200 flex items-center justify-center shrink-0">
        <Plus size={20} className="text-gray-700"/>
      </button>
      <PrimaryBtn onClick={() => {}}>Add to My Plan</PrimaryBtn>
    </div>
    <HomeIndicator/>
  </div>
);

/* =========================================================
   SCREEN 7 — PORTFOLIO CONVERTER UPLOAD
   ========================================================= */
const ScreenPortfolioUpload = ({ go }) => (
  <div className="flex flex-col flex-1 bg-white">
    <StatusBar/>
    <TopBar title="Portfolio Builder" onBack={() => go("dashboard")}/>
    <div className="flex-1 overflow-y-auto px-5 pb-6">
      {/* Stepper */}
      <div className="flex items-center gap-2 mt-1 mb-5">
        {[
          {n: 1, label: "Upload", active: true},
          {n: 2, label: "AI analysis", active: false},
          {n: 3, label: "Generate", active: false},
        ].map((s, i) => (
          <React.Fragment key={s.n}>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-bold"
                style={{background: s.active ? COLORS.indigo : COLORS.gray200, color: s.active ? "white" : COLORS.gray500}}>
                {s.n}
              </div>
              <span className="text-[12px] font-semibold" style={{color: s.active ? COLORS.indigo : COLORS.gray500}}>{s.label}</span>
            </div>
            {i < 2 && <div className="flex-1 h-px bg-gray-200"/>}
          </React.Fragment>
        ))}
      </div>

      <h1 className="text-[22px] font-bold text-gray-900 leading-tight">Let's build your portfolio</h1>
      <p className="text-[13px] text-gray-500 mt-1.5">Drop in your GitHub, resume or projects — our AI does the rest.</p>

      {/* Drop zone */}
      <div className="mt-5 rounded-2xl border-2 border-dashed p-6 flex flex-col items-center justify-center text-center"
        style={{borderColor: COLORS.indigo, background: COLORS.indigoLight}}>
        <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center mb-3">
          <Upload size={24} style={{color: COLORS.indigo}}/>
        </div>
        <p className="text-[14px] font-semibold text-gray-900">Drag files here</p>
        <p className="text-[12px] text-gray-500 mt-1">or tap to browse</p>
        <p className="text-[10px] text-gray-400 mt-3">PDF, DOCX, ZIP · Max 25 MB</p>
      </div>

      {/* Or */}
      <div className="flex items-center gap-3 my-4">
        <div className="flex-1 h-px bg-gray-200"/>
        <span className="text-[12px] text-gray-400">or connect a source</span>
        <div className="flex-1 h-px bg-gray-200"/>
      </div>

      <div className="space-y-2.5">
        {[
          { icon: GithubIcon, label: "GitHub", sub: "Import repos & commits", color: "#111827", bg: "#F3F4F6" },
          { icon: LinkedinIcon, label: "LinkedIn", sub: "Sync profile & experience", color: "#0A66C2", bg: "#E0EFFD" },
          { icon: FileText, label: "Upload Resume", sub: "PDF or DOCX", color: COLORS.emerald, bg: COLORS.emeraldLight },
        ].map(s => (
          <button key={s.label} className="w-full rounded-2xl p-3.5 border border-gray-100 bg-white flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{background: s.bg}}>
              <s.icon size={18} color={s.color}/>
            </div>
            <div className="flex-1">
              <p className="text-[14px] font-semibold text-gray-900">{s.label}</p>
              <p className="text-[11px] text-gray-500">{s.sub}</p>
            </div>
            <ChevronRight size={16} className="text-gray-300"/>
          </button>
        ))}
      </div>

      {/* Preview styles */}
      <h3 className="text-[13px] font-bold text-gray-900 mt-6 mb-2.5">Output styles</h3>
      <div className="flex gap-3 overflow-x-auto -mx-5 px-5 pb-2" style={{scrollbarWidth: "none"}}>
        {[
          { name: "Minimal", grad: "linear-gradient(135deg, #F9FAFB 0%, #E5E7EB 100%)", dot: "#111827"},
          { name: "Bold", grad: "linear-gradient(135deg, #4F46E5 0%, #8B5CF6 100%)", dot: "#FFFFFF"},
          { name: "Dark", grad: "linear-gradient(135deg, #111827 0%, #374151 100%)", dot: COLORS.emerald},
        ].map((t,i) => (
          <div key={i} className="w-[120px] shrink-0">
            <div className="w-full h-[150px] rounded-xl border border-gray-100 p-3 flex flex-col justify-between" style={{background: t.grad}}>
              <div className="w-6 h-6 rounded-full" style={{background: t.dot}}/>
              <div className="space-y-1">
                <div className="h-1.5 rounded-full w-3/4" style={{background: t.dot, opacity: 0.8}}/>
                <div className="h-1.5 rounded-full w-1/2" style={{background: t.dot, opacity: 0.5}}/>
              </div>
            </div>
            <p className="text-[11px] font-medium text-gray-700 mt-1.5 text-center">{t.name}</p>
          </div>
        ))}
      </div>
    </div>
    <div className="px-5 py-3 border-t border-gray-100">
      <PrimaryBtn onClick={() => go("portfolioResult")} icon={<ArrowRight size={18}/>}>Analyse & Continue</PrimaryBtn>
    </div>
    <HomeIndicator/>
  </div>
);

/* =========================================================
   SCREEN 8 — PORTFOLIO CONVERTER RESULT
   ========================================================= */
const ScreenPortfolioResult = ({ go }) => (
  <div className="flex flex-col flex-1" style={{background: COLORS.gray50}}>
    <StatusBar/>
    <TopBar title="Your Portfolio" onBack={() => go("portfolio")} right={<button className="text-[13px] font-semibold" style={{color: COLORS.indigo}}>Save</button>}/>

    <div className="flex-1 overflow-y-auto px-5 pb-4">
      {/* Preview */}
      <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-100 bg-white">
        <div className="px-3 py-2 bg-gray-50 border-b border-gray-100 flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-gray-300"/>
          <div className="w-2 h-2 rounded-full bg-gray-300"/>
          <div className="w-2 h-2 rounded-full bg-gray-300"/>
          <div className="ml-2 px-2 py-0.5 bg-white rounded text-[10px] font-mono text-gray-400 flex-1 truncate">
            Alex-chen.careeros.app
          </div>
        </div>
        <div className="p-5" style={{background: "linear-gradient(180deg, #FAFAFF 0%, #FFFFFF 100%)"}}>
          <div className="flex items-center gap-3">
            <Avatar name="Alex Chen" size={56}/>
            <div>
              <p className="text-[16px] font-bold text-gray-900">Alex Chen</p>
              <p className="text-[12px] text-gray-500">Junior Java Developer · Sydney</p>
            </div>
          </div>
          <p className="text-[11px] text-gray-600 mt-3 leading-relaxed">
            Master of IT student at UTS building backend systems with Java & Spring Boot. Previously automated invoice processing at a Sydney retail chain.
          </p>
          <div className="flex gap-1.5 mt-3 flex-wrap">
            {["Java", "Spring Boot", "SQL", "AWS"].map(s => <Tag key={s} variant="indigo">{s}</Tag>)}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-[11px] font-bold text-gray-900 mb-2">FEATURED PROJECTS</p>
            {[
              {name: "Invoice Automation System", desc: "Java · Spring Boot · PostgreSQL"},
              {name: "Elasticsearch Web Crawler", desc: "Java · ES · Docker"},
            ].map((p,i) => (
              <div key={i} className="rounded-lg p-2.5 mb-1.5 border border-gray-100">
                <p className="text-[12px] font-semibold text-gray-900">{p.name}</p>
                <p className="text-[10px] text-gray-500">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Customise */}
      <h3 className="text-[14px] font-bold text-gray-900 mt-5 mb-3">Customise</h3>
      <div className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-50">
        {[
          { label: "About me", on: true },
          { label: "Projects", on: true },
          { label: "Skills", on: true },
          { label: "Experience", on: true },
          { label: "Testimonials", on: false },
        ].map(s => (
          <div key={s.label} className="px-4 py-3 flex items-center justify-between">
            <span className="text-[13px] font-medium text-gray-900">{s.label}</span>
            <div className={`w-10 h-6 rounded-full p-0.5 transition ${s.on ? "" : "bg-gray-200"}`} style={{background: s.on ? COLORS.indigo : undefined}}>
              <div className={`w-5 h-5 rounded-full bg-white shadow transition ${s.on ? "ml-4" : ""}`}/>
            </div>
          </div>
        ))}
      </div>

      {/* Theme */}
      <h3 className="text-[14px] font-bold text-gray-900 mt-5 mb-3">Theme</h3>
      <div className="flex gap-3">
        {[
          {c: "linear-gradient(135deg, #4F46E5, #8B5CF6)", active: true},
          {c: "linear-gradient(135deg, #10B981, #059669)", active: false},
          {c: "linear-gradient(135deg, #111827, #374151)", active: false},
          {c: "linear-gradient(135deg, #F59E0B, #D97706)", active: false},
        ].map((t,i) => (
          <button key={i} className={`w-12 h-12 rounded-2xl ${t.active ? "ring-2 ring-offset-2" : ""}`}
            style={{background: t.c, "--tw-ring-color": COLORS.indigo}}/>
        ))}
      </div>
    </div>

    {/* Export */}
    <div className="px-5 py-3 border-t border-gray-100 bg-white flex gap-2">
      <button className="flex-1 h-11 rounded-xl border border-gray-200 flex items-center justify-center gap-1.5 text-[13px] font-semibold text-gray-900">
        <Share2 size={15}/> Link
      </button>
      <button className="flex-1 h-11 rounded-xl border border-gray-200 flex items-center justify-center gap-1.5 text-[13px] font-semibold text-gray-900">
        <FileText size={15}/> PDF
      </button>
      <button className="flex-1 h-11 rounded-xl flex items-center justify-center gap-1.5 text-[13px] font-semibold text-white"
        style={{background: COLORS.indigo}}>
        <Download size={15}/> HTML
      </button>
    </div>
    <HomeIndicator/>
  </div>
);

/* =========================================================
   SCREEN 9 — SKILL GAP SCANNER INPUT
   ========================================================= */
const ScreenSkillScan = ({ go }) => (
  <div className="flex flex-col flex-1 bg-white">
    <StatusBar/>
    <TopBar title="Skill Scanner" onBack={() => go("dashboard")}/>

    <div className="flex-1 overflow-y-auto px-5 pb-6">
      <h1 className="text-[22px] font-bold text-gray-900 leading-tight mt-1">What role are you targeting?</h1>
      <p className="text-[13px] text-gray-500 mt-1.5">We'll compare your skills to real Australian job listings.</p>

      {/* Target role card */}
      <div className="mt-5 rounded-2xl p-5 relative overflow-hidden"
        style={{background: "linear-gradient(135deg, #4F46E5 0%, #6366F1 100%)"}}>
        <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-20" style={{background: "white"}}/>
        <div className="relative">
          <div className="flex items-center gap-2 mb-1">
            <Target size={14} color="white"/>
            <span className="text-[11px] font-semibold text-white/90">TARGET ROLE</span>
          </div>
          <p className="text-[22px] font-bold text-white leading-tight">Junior Java Developer</p>
          <p className="text-[12px] text-white/80 mt-1">Sydney, NSW · AUD 70–90k</p>
          <button className="mt-4 h-9 px-4 rounded-full bg-white/20 backdrop-blur text-[12px] font-semibold text-white flex items-center gap-1.5">
            Change role <ChevronRight size={14}/>
          </button>
        </div>
      </div>

      {/* Sources */}
      <h3 className="text-[13px] font-bold text-gray-900 mt-6 mb-3">Analyse from</h3>
      <div className="space-y-2.5">
        {[
          { icon: LinkedinIcon, label: "LinkedIn profile", sub: "Auto-import experience", color: "#0A66C2", bg: "#E0EFFD", on: true },
          { icon: FileText, label: "Resume (PDF/DOCX)", sub: "Alex-chen-resume.pdf", color: COLORS.emerald, bg: COLORS.emeraldLight, on: true },
          { icon: Plus, label: "Add manually", sub: "Type your skills", color: COLORS.gray500, bg: COLORS.gray50, on: false },
        ].map((s,i) => (
          <div key={i} className="w-full rounded-2xl p-3.5 border flex items-center gap-3"
            style={{borderColor: s.on ? COLORS.indigo : COLORS.gray200, background: s.on ? COLORS.indigoLight : "white"}}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{background: s.bg}}>
              <s.icon size={18} color={s.color}/>
            </div>
            <div className="flex-1">
              <p className="text-[14px] font-semibold text-gray-900">{s.label}</p>
              <p className="text-[11px] text-gray-500">{s.sub}</p>
            </div>
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center`}
              style={{borderColor: s.on ? COLORS.indigo : COLORS.gray200, background: s.on ? COLORS.indigo : "white"}}>
              {s.on && <Check size={11} color="white" strokeWidth={3.5}/>}
            </div>
          </div>
        ))}
      </div>

      {/* Info box */}
      <div className="mt-6 rounded-2xl p-4 border border-gray-100 flex items-start gap-3 bg-gray-50">
        <AlertCircle size={18} className="text-gray-400 shrink-0 mt-0.5"/>
        <div>
          <p className="text-[12px] font-semibold text-gray-900">Powered by live job data</p>
          <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">
            We scan Seek, LinkedIn and Grad Australia for current Junior Java roles and benchmark your skills in real time.
          </p>
        </div>
      </div>
    </div>

    <div className="px-5 py-3 border-t border-gray-100">
      <PrimaryBtn onClick={() => go("skillResults")} icon={<Sparkles size={18}/>}>Scan My Skills</PrimaryBtn>
    </div>
    <HomeIndicator/>
  </div>
);

/* =========================================================
   SCREEN 10 — SKILL GAP SCANNER RESULTS
   ========================================================= */
const ScreenSkillResults = ({ go }) => {
  const R = 58;
  const C = 2 * Math.PI * R;
  const progress = 68;
  return (
    <div className="flex flex-col flex-1" style={{background: COLORS.gray50}}>
      <StatusBar/>
      <TopBar title="Your Readiness" onBack={() => go("skillScan")} right={<Share2 size={18} className="text-gray-600"/>}/>

      <div className="flex-1 overflow-y-auto px-5 pb-4">
        {/* Hero: Circular progress */}
        <div className="bg-white rounded-3xl p-5 border border-gray-100 flex items-center gap-5">
          <div className="relative w-[140px] h-[140px] shrink-0">
            <svg width="140" height="140" viewBox="0 0 140 140" className="-rotate-90">
              <circle cx="70" cy="70" r={R} stroke={COLORS.gray200} strokeWidth="10" fill="none"/>
              <circle cx="70" cy="70" r={R} stroke={COLORS.indigo} strokeWidth="10" fill="none"
                strokeDasharray={C} strokeDashoffset={C - (C * progress / 100)} strokeLinecap="round"/>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-[32px] font-bold text-gray-900 leading-none">{progress}%</span>
              <span className="text-[10px] font-semibold text-gray-400 mt-1 tracking-wider">READY</span>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-semibold text-gray-400 tracking-wider">FOR JUNIOR JAVA DEV</p>
            <p className="text-[15px] font-bold text-gray-900 mt-1 leading-tight">You're almost there, Alex 🎯</p>
            <p className="text-[11px] text-gray-500 mt-1.5 leading-relaxed">Close 3 key gaps to hit 85%+ — the threshold most Sydney grads need.</p>
          </div>
        </div>

        {/* Strong */}
        <div className="mt-5">
          <div className="flex items-center gap-2 mb-2.5">
            <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{background: COLORS.emeraldLight}}>
              <Check size={13} style={{color: COLORS.emerald}} strokeWidth={3}/>
            </div>
            <span className="text-[13px] font-bold text-gray-900">Strong · 5 skills</span>
          </div>
          <div className="bg-white rounded-2xl p-3.5 border border-gray-100 space-y-2.5">
            {[
              {n: "Java", lvl: 85}, {n: "OOP", lvl: 90}, {n: "SQL", lvl: 78},
            ].map(s => (
              <div key={s.n}>
                <div className="flex justify-between text-[12px] mb-1">
                  <span className="font-medium text-gray-900">{s.n}</span>
                  <span className="text-gray-400">{s.lvl}%</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{width: `${s.lvl}%`, background: COLORS.emerald}}/>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Developing */}
        <div className="mt-4">
          <div className="flex items-center gap-2 mb-2.5">
            <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{background: "#FEF3C7"}}>
              <AlertCircle size={13} color="#B45309" strokeWidth={2.5}/>
            </div>
            <span className="text-[13px] font-bold text-gray-900">Developing · 2 skills</span>
          </div>
          <div className="bg-white rounded-2xl p-3.5 border border-gray-100 space-y-2.5">
            {[
              {n: "Spring Boot", lvl: 45}, {n: "Git / GitHub", lvl: 55},
            ].map(s => (
              <div key={s.n}>
                <div className="flex justify-between text-[12px] mb-1">
                  <span className="font-medium text-gray-900">{s.n}</span>
                  <span className="text-gray-400">{s.lvl}%</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{width: `${s.lvl}%`, background: "#F59E0B"}}/>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Missing */}
        <div className="mt-4">
          <div className="flex items-center gap-2 mb-2.5">
            <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{background: "#FEE2E2"}}>
              <X size={13} color="#BE123C" strokeWidth={3}/>
            </div>
            <span className="text-[13px] font-bold text-gray-900">Missing · 3 skills</span>
          </div>
          <div className="space-y-2.5">
            {[
              {n: "AWS", rec: "32998 Enterprise Software Architecture", type: "UTS Elective", via: "elective"},
              {n: "Docker", rec: "Docker Mastery · Udemy", type: "External · AUD $29", via: "external"},
              {n: "REST APIs", rec: "32556 Software Development Studio", type: "UTS Elective", via: "elective"},
            ].map(m => (
              <div key={m.n} className="bg-white rounded-2xl p-3.5 border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[14px] font-bold text-gray-900">{m.n}</span>
                  <Tag variant="rose">Missing</Tag>
                </div>
                <div className="rounded-xl p-2.5 flex items-center gap-2.5" style={{background: COLORS.gray50}}>
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                    style={{background: m.via === "elective" ? COLORS.indigoLight : "#FEF3C7"}}>
                    {m.via === "elective"
                      ? <GraduationCap size={14} style={{color: COLORS.indigo}}/>
                      : <Globe size={14} color="#B45309"/>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-semibold text-gray-900 truncate">{m.rec}</p>
                    <p className="text-[10px] text-gray-500">{m.type}</p>
                  </div>
                  <ChevronRight size={14} className="text-gray-300"/>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-5 py-3 border-t border-gray-100 bg-white">
        <PrimaryBtn onClick={() => {}} icon={<Sparkles size={18}/>}>Generate 8-week plan</PrimaryBtn>
      </div>
      <HomeIndicator/>
    </div>
  );
};

/* =========================================================
   SCREEN 11 — MENTOR MATCHING LIST
   ========================================================= */
const ScreenMentors = ({ go }) => {
  const mentors = [
    { name: "Sarah Kim", role: "Senior Engineer", company: "Atlassian", exp: 8, rating: 4.9, reviews: 42, lang: "EN", price: "Free", available: "This week" },
    { name: "Wei Zhang", role: "Backend Engineer", company: "Canva", exp: 5, rating: 4.8, reviews: 28, lang: "中/EN", price: "Free", available: "Today" },
    { name: "Priya Sharma", role: "Tech Lead", company: "Afterpay", exp: 10, rating: 5.0, reviews: 67, lang: "EN", price: "$40/hr", available: "Next week" },
    { name: "James O'Brien", role: "Software Engineer", company: "CommBank", exp: 4, rating: 4.7, reviews: 19, lang: "EN", price: "Free", available: "Today" },
  ];
  return (
    <div className="flex flex-col flex-1" style={{background: COLORS.gray50}}>
      <StatusBar/>
      <TopBar title="Find a Mentor" onBack={() => go("dashboard")} right={<Search size={20} className="text-gray-600"/>}/>

      {/* Filter bar */}
      <div className="px-5 mt-1">
        <div className="flex gap-2 overflow-x-auto pb-2" style={{scrollbarWidth: "none"}}>
          <button className="h-9 px-3 rounded-full border border-gray-200 bg-white flex items-center gap-1.5 text-[12px] font-medium text-gray-700 whitespace-nowrap shrink-0">
            <Filter size={13}/> All filters
          </button>
          {[
            { icon: Building2, label: "Company" },
            { icon: Languages, label: "中文 OK" },
            { icon: Clock, label: "Available now" },
            { icon: Briefcase, label: "Fintech" },
          ].map(f => (
            <button key={f.label} className="h-9 px-3 rounded-full bg-white border border-gray-200 flex items-center gap-1.5 text-[12px] font-medium text-gray-700 whitespace-nowrap shrink-0">
              <f.icon size={13}/> {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Count */}
      <div className="px-5 mt-2 flex items-center justify-between">
        <p className="text-[12px] text-gray-500"><span className="font-bold text-gray-900">12 mentors</span> matched</p>
        <button className="text-[12px] font-semibold flex items-center gap-1" style={{color: COLORS.indigo}}>
          Sort: Top matches <ChevronDown size={13}/>
        </button>
      </div>

      {/* Mentor list */}
      <div className="flex-1 overflow-y-auto px-5 mt-3 space-y-3 pb-4">
        {mentors.map((m, i) => (
          <button key={m.name} onClick={() => go("mentorProfile")}
            className="w-full bg-white rounded-2xl p-4 border border-gray-100 text-left">
            <div className="flex items-start gap-3">
              <div className="relative shrink-0">
                <Avatar name={m.name} size={52}/>
                <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2 border-white" style={{background: m.available.includes("Today") ? COLORS.emerald : "#FBBF24"}}/>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-[15px] font-bold text-gray-900 truncate">{m.name}</p>
                  <span className="text-[11px] font-bold shrink-0 px-2 py-0.5 rounded-full" style={{background: m.price === "Free" ? COLORS.emeraldLight : COLORS.gray50, color: m.price === "Free" ? COLORS.emerald : COLORS.gray900}}>
                    {m.price}
                  </span>
                </div>
                <p className="text-[12px] text-gray-600 mt-0.5">{m.role} <span className="text-gray-300">·</span> <span className="font-semibold">{m.company}</span></p>
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex items-center gap-1 text-[11px]">
                    <Star size={11} fill="#F59E0B" color="#F59E0B"/>
                    <span className="font-bold text-gray-900">{m.rating}</span>
                    <span className="text-gray-400">({m.reviews})</span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-gray-500">
                    <Briefcase size={11}/> {m.exp}y
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-gray-500">
                    <Languages size={11}/> {m.lang}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
              <div className="flex items-center gap-1 text-[11px] text-gray-500">
                <Clock size={11}/> Available {m.available.toLowerCase()}
              </div>
              <div className="flex items-center gap-1 text-[11px] font-semibold" style={{color: COLORS.indigo}}>
                Book session <ChevronRight size={13}/>
              </div>
            </div>
          </button>
        ))}
      </div>

      <BottomNav active="mentors" onNav={(id) => id==="home" && go("dashboard")}/>
      <HomeIndicator/>
    </div>
  );
};

/* =========================================================
   SCREEN 12 — MENTOR PROFILE
   ========================================================= */
const ScreenMentorProfile = ({ go }) => (
  <div className="flex flex-col flex-1 bg-white">
    <StatusBar dark/>

    {/* Hero */}
    <div className="relative pb-5" style={{background: "linear-gradient(135deg, #4F46E5 0%, #6366F1 60%, #8B5CF6 100%)"}}>
      <TopBar title="" dark onBack={() => go("mentors")} right={<button className="text-white"><Share2 size={18}/></button>}/>
      <div className="px-5 flex items-center gap-4 mt-2">
        <Avatar name="Sarah Kim" size={72}/>
        <div className="flex-1 min-w-0">
          <p className="text-[20px] font-bold text-white">Sarah Kim</p>
          <p className="text-[13px] text-indigo-100">Senior Software Engineer</p>
          <div className="flex items-center gap-1.5 mt-2 bg-white/20 backdrop-blur rounded-full px-2.5 py-1 w-fit">
            <div className="w-5 h-5 rounded bg-white flex items-center justify-center">
              <span className="text-[8px] font-black text-indigo-600">A</span>
            </div>
            <span className="text-[11px] font-semibold text-white">Atlassian · Sydney</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-0 mt-5 bg-white/10 backdrop-blur mx-5 rounded-2xl overflow-hidden">
        <div className="p-3 text-center border-r border-white/15">
          <p className="text-[18px] font-bold text-white leading-none">4.9</p>
          <p className="text-[10px] text-indigo-100 mt-1">Rating</p>
        </div>
        <div className="p-3 text-center border-r border-white/15">
          <p className="text-[18px] font-bold text-white leading-none">42</p>
          <p className="text-[10px] text-indigo-100 mt-1">Mentees</p>
        </div>
        <div className="p-3 text-center">
          <p className="text-[18px] font-bold text-white leading-none">8 yrs</p>
          <p className="text-[10px] text-indigo-100 mt-1">Experience</p>
        </div>
      </div>
    </div>

    <div className="flex-1 overflow-y-auto px-5 pt-5 pb-4">
      {/* Bio */}
      <h3 className="text-[14px] font-bold text-gray-900 mb-2">About</h3>
      <p className="text-[13px] text-gray-600 leading-relaxed">
        Ex-international student, now Senior Engineer on Jira Cloud. I love coaching grads through Spring Boot, system design, and Australian tech interviews. Happy to chat in English or Korean.
      </p>

      {/* Expertise */}
      <h3 className="text-[14px] font-bold text-gray-900 mt-5 mb-2.5">Expertise</h3>
      <div className="flex flex-wrap gap-1.5">
        {["Java", "Spring Boot", "System Design", "Interview Prep", "AWS", "Resume Review", "Microservices"].map(s => (
          <Tag key={s} variant="indigo">{s}</Tag>
        ))}
      </div>

      {/* Availability */}
      <h3 className="text-[14px] font-bold text-gray-900 mt-5 mb-3">Pick a time · This week</h3>
      <div className="grid grid-cols-4 gap-2">
        {[
          {d:"Mon", date:"22", free: false},
          {d:"Tue", date:"23", free: true},
          {d:"Wed", date:"24", free: true},
          {d:"Thu", date:"25", free: false},
        ].map((d, i) => (
          <button key={i} className="rounded-xl p-2.5 border text-center"
            style={{borderColor: d.free ? COLORS.indigo : COLORS.gray200, background: i === 1 ? COLORS.indigo : "white"}}>
            <p className="text-[10px] font-medium" style={{color: i === 1 ? "white" : COLORS.gray500}}>{d.d}</p>
            <p className="text-[16px] font-bold mt-0.5" style={{color: i === 1 ? "white" : (d.free ? COLORS.gray900 : COLORS.gray200)}}>{d.date}</p>
            <p className="text-[9px] mt-1" style={{color: i === 1 ? "white" : (d.free ? COLORS.emerald : COLORS.gray200)}}>
              {d.free ? "3 slots" : "Full"}
            </p>
          </button>
        ))}
      </div>
      <div className="flex gap-2 mt-3 flex-wrap">
        {["5:30 PM", "6:00 PM", "7:30 PM"].map((t,i) => (
          <button key={t} className={`h-9 px-3.5 rounded-full text-[12px] font-semibold border`}
            style={i === 1
              ? {background: COLORS.indigo, color: "white", borderColor: COLORS.indigo}
              : {background: "white", color: COLORS.gray900, borderColor: COLORS.gray200}}>
            {t}
          </button>
        ))}
      </div>

      {/* Reviews */}
      <div className="flex items-center justify-between mt-6 mb-3">
        <h3 className="text-[14px] font-bold text-gray-900">Reviews</h3>
        <button className="text-[12px] font-semibold" style={{color: COLORS.indigo}}>See all 42</button>
      </div>
      <div className="space-y-3">
        {[
          {name: "Mei Zhang", quote: "Sarah helped me land Afterpay. Her mock interview feedback was gold.", ago: "2w ago"},
          {name: "David Nguyen", quote: "Super patient explaining Spring Boot. Transformed my portfolio.", ago: "1mo ago"},
        ].map((r,i) => (
          <div key={i} className="rounded-2xl p-3.5 bg-gray-50 border border-gray-100">
            <div className="flex items-center gap-2.5">
              <Avatar name={r.name} size={32}/>
              <div>
                <p className="text-[13px] font-semibold text-gray-900">{r.name}</p>
                <p className="text-[10px] text-gray-400">{r.ago}</p>
              </div>
              <div className="ml-auto flex gap-0.5">
                {[1,2,3,4,5].map(n => <Star key={n} size={11} fill="#F59E0B" color="#F59E0B"/>)}
              </div>
            </div>
            <p className="text-[12px] text-gray-700 mt-2.5 leading-relaxed">"{r.quote}"</p>
          </div>
        ))}
      </div>
    </div>

    <div className="px-5 py-3 border-t border-gray-100 flex gap-3 bg-white">
      <button className="h-12 px-4 rounded-2xl border border-gray-200 flex items-center justify-center gap-1.5 text-[13px] font-semibold text-gray-900">
        <MessageCircle size={16}/> Intro
      </button>
      <button className="flex-1 h-12 rounded-2xl flex items-center justify-center gap-1.5 text-[14px] font-semibold text-white"
        style={{background: COLORS.indigo, boxShadow: "0 4px 14px rgba(79,70,229,0.25)"}}>
        <Calendar size={16}/> Book 30-min session
      </button>
    </div>
    <HomeIndicator/>
  </div>
);

/* =========================================================
   APP SHELL — Screen manager + gallery
   ========================================================= */

const SCREENS = [
  { id: "splash",          num: "01",  title: "Splash",                    Component: ScreenSplash },
  { id: "signup",          num: "02",  title: "Sign Up",                   Component: ScreenSignUp },
  { id: "questionnaire",   num: "03",  title: "Onboarding",                Component: ScreenQuestionnaire },
  { id: "dashboard",       num: "04",  title: "Dashboard",                 Component: ScreenDashboard },
  { id: "electives",       num: "05",  title: "Electives — Results",       Component: ScreenElectives },
  { id: "electiveDetail",  num: "06",  title: "Elective Detail",           Component: ScreenElectiveDetail },
  { id: "portfolio",       num: "07",  title: "Portfolio — Upload",        Component: ScreenPortfolioUpload },
  { id: "portfolioResult", num: "08",  title: "Portfolio — Result",        Component: ScreenPortfolioResult },
  { id: "skillScan",       num: "09",  title: "Skill Scan — Input",        Component: ScreenSkillScan },
  { id: "skillResults",    num: "10",  title: "Skill Scan — Results",      Component: ScreenSkillResults },
  { id: "mentors",         num: "11",  title: "Mentors — List",            Component: ScreenMentors },
  { id: "mentorProfile",   num: "12",  title: "Mentor — Profile",          Component: ScreenMentorProfile },
];

export default function App() {
  const [mode, setMode] = useState("gallery"); // "gallery" | "prototype"
  const [current, setCurrent] = useState("splash");

  const go = (id) => {
    const target = SCREENS.find(s => s.id === id);
    if (target) setCurrent(target.id);
  };

  const currentIdx = SCREENS.findIndex(s => s.id === current);
  const CurrentComponent = SCREENS[currentIdx]?.Component;

  return (
    <div className="min-h-screen" style={{background: "#F4F4F8", fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"}}>
      {/* Toolbar */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-[1800px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{background: `linear-gradient(135deg, ${COLORS.indigo} 0%, ${COLORS.emerald} 100%)`}}>
              <ArrowRight size={18} className="text-white" strokeWidth={3}/>
            </div>
            <div>
              <p className="text-[15px] font-bold text-gray-900 leading-none">CareerOS</p>
              <p className="text-[11px] text-gray-500 mt-1">Mobile Prototype · 12 screens</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex bg-gray-100 rounded-xl p-1">
              <button onClick={() => setMode("gallery")}
                className={`h-8 px-3 rounded-lg text-[12px] font-semibold flex items-center gap-1.5 transition ${mode === "gallery" ? "bg-white shadow-sm text-gray-900" : "text-gray-500"}`}>
                <Layout size={13}/> Gallery
              </button>
              <button onClick={() => setMode("prototype")}
                className={`h-8 px-3 rounded-lg text-[12px] font-semibold flex items-center gap-1.5 transition ${mode === "prototype" ? "bg-white shadow-sm text-gray-900" : "text-gray-500"}`}>
                <Play size={13}/> Prototype
              </button>
            </div>
          </div>
        </div>
      </header>

      {mode === "gallery" ? (
        <main className="max-w-[1800px] mx-auto px-6 py-12">
          <div className="mb-10">
            <p className="text-[13px] font-semibold tracking-wider" style={{color: COLORS.indigo}}>IT STUDENT CAREER PLATFORM</p>
            <h1 className="text-[42px] font-bold text-gray-900 mt-2 leading-tight">CareerOS — Mobile App</h1>
            <p className="text-[15px] text-gray-500 mt-3 max-w-[640px] leading-relaxed">
              A career-acceleration app for international IT Master's students in Australia. Click <span className="font-semibold text-gray-900">Prototype</span> above to walk through the interactive user flow, or browse all 12 screens below.
            </p>
            <div className="flex gap-4 mt-5 text-[12px]">
              <div className="flex items-center gap-1.5 text-gray-600"><div className="w-3 h-3 rounded-full" style={{background: COLORS.indigo}}/>Primary · Indigo #4F46E5</div>
              <div className="flex items-center gap-1.5 text-gray-600"><div className="w-3 h-3 rounded-full" style={{background: COLORS.emerald}}/>Accent · Emerald #10B981</div>
              <div className="flex items-center gap-1.5 text-gray-600"><div className="w-3 h-3 rounded-full bg-gray-900"/>Text · Gray #111827</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-x-8 gap-y-16 justify-items-center">
            {SCREENS.map(s => (
              <PhoneFrame key={s.id} label={{num: s.num, title: s.title}}>
                <s.Component go={(id) => { setCurrent(id); setMode("prototype"); }}/>
              </PhoneFrame>
            ))}
          </div>

          <footer className="mt-20 pt-8 border-t border-gray-200 text-center text-[12px] text-gray-400">
            Designed with Inter · iPhone 15 Pro (393 × 852) · Lucide icons
          </footer>
        </main>
      ) : (
        <main className="max-w-[1800px] mx-auto px-6 py-10 flex flex-col items-center">
          {/* Prototype controls */}
          <div className="w-full max-w-[500px] mb-6 flex items-center justify-between">
            <button
              onClick={() => setCurrent(SCREENS[Math.max(0, currentIdx - 1)].id)}
              disabled={currentIdx === 0}
              className="h-10 px-3 rounded-xl bg-white border border-gray-200 flex items-center gap-1.5 text-[13px] font-semibold text-gray-900 disabled:opacity-40"
            >
              <ArrowLeft size={15}/> Prev
            </button>
            <div className="text-center">
              <p className="text-[11px] font-mono text-gray-400">{SCREENS[currentIdx].num} / 12</p>
              <p className="text-[14px] font-semibold text-gray-900">{SCREENS[currentIdx].title}</p>
            </div>
            <button
              onClick={() => setCurrent(SCREENS[Math.min(SCREENS.length - 1, currentIdx + 1)].id)}
              disabled={currentIdx === SCREENS.length - 1}
              className="h-10 px-3 rounded-xl bg-white border border-gray-200 flex items-center gap-1.5 text-[13px] font-semibold text-gray-900 disabled:opacity-40"
            >
              Next <ArrowRight size={15}/>
            </button>
          </div>

          <PhoneFrame>
            {CurrentComponent && <CurrentComponent go={go}/>}
          </PhoneFrame>

          {/* Jump to */}
          <div className="mt-8 flex flex-wrap gap-2 justify-center max-w-[640px]">
            {SCREENS.map(s => (
              <button key={s.id} onClick={() => setCurrent(s.id)}
                className={`h-8 px-3 rounded-full text-[12px] font-medium border transition ${current === s.id ? "text-white" : "text-gray-600 bg-white"}`}
                style={current === s.id ? {background: COLORS.indigo, borderColor: COLORS.indigo} : {borderColor: COLORS.gray200}}>
                {s.num} · {s.title}
              </button>
            ))}
          </div>
        </main>
      )}
    </div>
  );
}