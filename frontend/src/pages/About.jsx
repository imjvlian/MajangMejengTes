import React, { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Building2,
  Camera,
  ChevronRight,
  Globe2,
  Newspaper,
  Play,
  ShieldCheck,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  const [team, setTeam] = useState([]);
  const [loadingTeam, setLoadingTeam] = useState(true);
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await fetch("/api/team");

        const data = await res.json();

        if (res.ok) {
          setTeam(Array.isArray(data.teams) ? data.teams : []);
        } else {
          console.log(data.message);
        }
      } catch (error) {
        console.log("Failed to fetch team:", error.message);
      } finally {
        setLoadingTeam(false);
      }
    };

    fetchTeam();
  }, []);

  const activeTeam = Array.isArray(team)
    ? [...team]
        .filter((member) => member.isActive)
        .sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0))
    : [];

  return (
    <main className="min-h-screen bg-background">
      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="relative overflow-hidden border-b">
        {/* Background decoration */}

        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-orange-500/10 blur-[120px]" />

          <div className="absolute -right-40 top-40 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-24 lg:py-32">
          <div className="grid items-center gap-16 lg:grid-cols-[1.1fr_.9fr]">
            {/* LEFT */}

            <div>
              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-2 text-sm font-semibold text-orange-500">
                <Building2 className="h-4 w-4" />
                About Majang Mejeng
              </div>

              <h1 className="max-w-4xl text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
                Stories from
                <br />
                <span className="text-orange-500">where we belong.</span>
              </h1>

              <p className="mt-8 max-w-2xl text-lg leading-8 text-muted-foreground">
                Majang Mejeng adalah media kreatif lokal yang hadir untuk
                merekam, mengabarkan, dan mengangkat pelbagai cerita yang tumbuh
                dan berkembang di Lumajang.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link to="/news">
                  <button className="group flex h-12 items-center gap-2 rounded-full bg-orange-500 px-7 font-semibold text-white transition hover:bg-orange-600">
                    Explore Our Stories
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </Link>

                <a
                  href="#team"
                  className="flex h-12 items-center gap-2 rounded-full border px-7 font-semibold transition hover:bg-muted"
                >
                  Meet Our Team
                  <ChevronRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* RIGHT */}

            <div className="relative">
              <div className="relative overflow-hidden rounded-[2rem] border bg-muted shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=1200&q=85"
                  alt="Majang Mejeng"
                  className="h-[420px] w-full object-cover transition duration-700 hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-7 text-white">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-orange-400">
                    Independent Digital Media
                  </p>

                  <h2 className="mt-3 text-3xl font-black">
                    From Lumajang,
                    <br />
                    for everyone.
                  </h2>
                </div>
              </div>

              {/* Floating card */}

              <div className="absolute -bottom-8 -left-6 hidden rounded-2xl border bg-background p-5 shadow-xl sm:block">
                <p className="text-3xl font-black text-orange-500">2026</p>

                <p className="mt-1 text-sm text-muted-foreground">
                  Building stories
                  <br />
                  with purpose.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          INTRO
      ====================================================== */}
      <section className="border-y bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-orange-500">
                Who We Are
              </p>

              <h2 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">
                Local stories.
                <br />
                Bigger perspective.
              </h2>
            </div>

            <div className="space-y-6 text-muted-foreground">
              <p className="text-lg leading-8">
                Kami percaya bahwa setiap daerah memiliki cerita yang layak
                untuk didengar. Mulai dari masyarakat, budaya, olahraga,
                ekonomi, hingga berbagai perkembangan yang terjadi di sekitar
                kita.
              </p>

              <p className="text-lg leading-8">
                Majang Mejeng hadir sebagai ruang digital untuk menyampaikan
                cerita tersebut dengan pendekatan yang modern, kreatif, dan
                mudah diakses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          VALUES
      ====================================================== */}
      <section>
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-orange-500">
              What We Stand For
            </p>

            <h2 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">
              Built around
              <br />
              meaningful stories.
            </h2>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Card */}
            <div className="group rounded-3xl border bg-card p-7 transition duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-500">
                <ShieldCheck />
              </div>

              <h3 className="mt-6 text-xl font-bold">Trusted Journalism</h3>

              <p className="mt-3 leading-7 text-muted-foreground">
                Mengutamakan informasi yang relevan, bertanggung jawab, dan
                dapat dipercaya.
              </p>
            </div>

            <div className="group rounded-3xl border bg-card p-7 transition duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-500">
                <Globe2 />
              </div>

              <h3 className="mt-6 text-xl font-bold">Local Perspective</h3>

              <p className="mt-3 leading-7 text-muted-foreground">
                Melihat berbagai peristiwa melalui perspektif masyarakat dan
                lingkungan lokal.
              </p>
            </div>

            <div className="group rounded-3xl border bg-card p-7 transition duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-500">
                <BadgeCheck />
              </div>

              <h3 className="mt-6 text-xl font-bold">Modern Publishing</h3>

              <p className="mt-3 leading-7 text-muted-foreground">
                Menggabungkan jurnalistik dengan pendekatan digital yang modern
                dan menarik.
              </p>
            </div>

            <div className="group rounded-3xl border bg-card p-7 transition duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-500">
                <Newspaper />
              </div>

              <h3 className="mt-6 text-xl font-bold">Daily Stories</h3>

              <p className="mt-3 leading-7 text-muted-foreground">
                Mengikuti berbagai cerita dan perkembangan yang terjadi setiap
                hari.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          MISSION
      ====================================================== */}
      <section className="bg-slate-950 text-white dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-2 text-sm font-semibold text-orange-400">
                <Sparkles size={16} />
                Our Mission
              </div>

              <h2 className="mt-7 text-4xl font-black leading-tight md:text-6xl">
                Make local stories
                <span className="text-orange-500"> impossible to ignore.</span>
              </h2>
            </div>

            <div>
              <p className="text-lg leading-8 text-slate-300">
                Kami ingin membangun media lokal yang tidak hanya menyampaikan
                berita, tetapi juga memberikan ruang bagi ide, komunitas,
                kreativitas, dan cerita-cerita yang sering kali luput dari
                perhatian.
              </p>

              <div className="mt-8">
                <Link to="/news">
                  <button className="inline-flex h-12 items-center rounded-full bg-orange-500 px-7 font-semibold text-white transition hover:bg-orange-600">
                    Read Our Stories
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          TEAM
      ====================================================== */}
      <section>
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-orange-500">
                Our Team
              </p>

              <h2 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">
                The people
                <br />
                behind the stories.
              </h2>
            </div>

            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="h-5 w-5" />
              <span>Meet our team</span>
            </div>
          </div>

          {/* Team */}
          <div className="mt-14">
            {loadingTeam ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="animate-pulse overflow-hidden rounded-3xl border"
                  >
                    <div className="aspect-[4/5] bg-muted" />

                    <div className="space-y-3 p-5">
                      <div className="h-5 w-1/2 rounded bg-muted" />
                      <div className="h-4 w-1/3 rounded bg-muted" />
                      <div className="h-4 w-full rounded bg-muted" />
                    </div>
                  </div>
                ))}
              </div>
            ) : activeTeam.length === 0 ? (
              <div className="rounded-3xl border border-dashed p-12 text-center">
                <Users className="mx-auto h-10 w-10 text-muted-foreground" />

                <h3 className="mt-4 text-xl font-bold">
                  Our team is coming soon.
                </h3>

                <p className="mt-2 text-muted-foreground">
                  Team information will be available here soon.
                </p>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {activeTeam.map((member) => (
                  <button
                    type="button"
                    key={member._id}
                    onClick={() => setSelectedMember(member)}
                    className="group overflow-hidden rounded-3xl border bg-card text-left transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    {/* Image */}
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <img
                        src={
                          member.image || "https://via.placeholder.com/600x750"
                        }
                        alt={member.name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />

                      {/* Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                      {/* Hover icon */}
                      <div className="absolute right-5 top-5 flex h-11 w-11 translate-y-2 items-center justify-center rounded-full bg-white/90 text-black opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                        <ArrowUpRight className="h-5 w-5" />
                      </div>

                      {/* Info */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <p className="text-sm font-semibold text-orange-400">
                          {member.position}
                        </p>

                        <h3 className="mt-1 text-2xl font-black">
                          {member.name}
                        </h3>
                      </div>
                    </div>

                    {/* Bio */}
                    <div className="p-5">
                      <p className="line-clamp-3 text-sm leading-6 text-muted-foreground">
                        {member.bio || "Member of Majang Mejeng."}
                      </p>

                      <div className="mt-4 flex items-center text-sm font-semibold text-orange-500">
                        View profile
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* =====================================================
          CREATIVE / MEDIA SECTION
      ====================================================== */}
      <section className="border-y bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="relative min-h-[320px] overflow-hidden rounded-3xl bg-orange-500 p-8 text-white lg:col-span-2">
              <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

              <Camera className="h-10 w-10" />

              <div className="absolute bottom-8 left-8 max-w-xl">
                <p className="text-sm font-semibold uppercase tracking-widest text-orange-100">
                  Digital Media
                </p>

                <h3 className="mt-3 text-3xl font-black md:text-5xl">
                  Stories don't stop at words.
                </h3>

                <p className="mt-4 max-w-lg leading-7 text-orange-50">
                  Kami memanfaatkan foto, video, desain, dan berbagai format
                  digital untuk membuat cerita lebih dekat dengan audiens.
                </p>
              </div>
            </div>

            <div className="relative min-h-[320px] overflow-hidden rounded-3xl bg-slate-950 p-8 text-white dark:bg-slate-800">
              <Play className="h-10 w-10 text-orange-500" />

              <div className="absolute bottom-8 left-8 right-8">
                <h3 className="text-3xl font-black">Follow the story.</h3>

                <p className="mt-4 leading-7 text-slate-300">
                  Ikuti perkembangan terbaru Majang Mejeng melalui platform
                  digital kami.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CTA
      ====================================================== */}
      <section>
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="relative overflow-hidden rounded-[2rem] bg-orange-500 px-8 py-16 text-center text-white md:px-16">
            <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

            <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-black/10 blur-3xl" />

            <div className="relative mx-auto max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-orange-100">
                Let's Work Together
              </p>

              <h2 className="mt-5 text-4xl font-black md:text-6xl">
                Have a story?
                <br />
                Let's tell it together.
              </h2>

              <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-orange-50">
                Punya informasi, cerita, ide kolaborasi, atau ingin bekerja sama
                dengan Majang Mejeng? Kami terbuka untuk berbagai bentuk
                kolaborasi.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link to="/contact">
                  <button className="inline-flex h-12 items-center rounded-full bg-white px-8 font-bold text-orange-500 transition hover:bg-orange-50">
                    Contact Us
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </button>
                </Link>

                <Link to="/news">
                  <button className="inline-flex h-12 items-center rounded-full border border-white/40 px-8 font-bold text-white transition hover:bg-white/10">
                    Explore Articles
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          TEAM PROFILE MODAL
      ====================================================== */}
      {selectedMember && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={() => setSelectedMember(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-[2rem] bg-background shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              type="button"
              onClick={() => setSelectedMember(null)}
              className="absolute right-5 top-5 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur transition hover:bg-black/80"
              aria-label="Close profile"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="grid max-h-[90vh] overflow-y-auto md:grid-cols-2">
              {/* Profile Image */}
              <div className="relative min-h-[400px] md:min-h-[600px]">
                <img
                  src={
                    selectedMember.image ||
                    "https://via.placeholder.com/600x750"
                  }
                  alt={selectedMember.name}
                  className="absolute inset-0 h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                <div className="absolute bottom-7 left-7 text-white md:hidden">
                  <p className="text-sm font-semibold text-orange-400">
                    {selectedMember.position}
                  </p>

                  <h2 className="mt-1 text-3xl font-black">
                    {selectedMember.name}
                  </h2>
                </div>
              </div>

              {/* Profile Content */}
              <div className="flex flex-col justify-center p-7 md:p-10">
                <p className="hidden text-sm font-bold uppercase tracking-[0.2em] text-orange-500 md:block">
                  {selectedMember.position}
                </p>

                <h2 className="mt-2 hidden text-4xl font-black md:block">
                  {selectedMember.name}
                </h2>

                <div className="mt-6 h-px w-16 bg-orange-500" />

                <p className="mt-6 text-base leading-8 text-muted-foreground">
                  {selectedMember.bio || "Member of Majang Mejeng."}
                </p>

                {/* Contact */}
                {(selectedMember.instagram || selectedMember.whatsapp) && (
                  <div className="mt-8">
                    <p className="text-sm font-semibold">Connect</p>

                    <div className="mt-3 flex flex-wrap gap-3">
                      {selectedMember.instagram && (
                        <a
                          href={selectedMember.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center rounded-full border px-5 py-2.5 text-sm font-semibold transition hover:border-orange-500 hover:bg-orange-500 hover:text-white"
                        >
                          Instagram
                          <ArrowUpRight className="ml-2 h-4 w-4" />
                        </a>
                      )}

                      {selectedMember.whatsapp && (
                        <a
                          href={`https://wa.me/${selectedMember.whatsapp.replace(
                            /\D/g,
                            "",
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center rounded-full bg-green-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-600"
                        >
                          WhatsApp
                          <ArrowUpRight className="ml-2 h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>
                )}

                <div className="mt-10">
                  <button
                    type="button"
                    onClick={() => setSelectedMember(null)}
                    className="inline-flex h-11 items-center rounded-full border px-6 text-sm font-semibold transition hover:bg-muted"
                  >
                    Close Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default About;
