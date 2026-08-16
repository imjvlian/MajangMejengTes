import React, { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Building2,
  Camera,
  ChevronRight,
  Globe2,
  Mail,
  Newspaper,
  Play,
  ShieldCheck,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import { FaInstagram } from "react-icons/fa";

import { Link } from "react-router-dom";

const teamMembers = [
  {
    id: 1,
    name: "Adit Pratama",
    role: "Editorial Lead",
    category: "Editorial",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80",
    shortBio:
      "Mengembangkan arah editorial dan memastikan setiap cerita memiliki konteks yang kuat.",
    bio: "Bertanggung jawab dalam mengembangkan arah editorial Majang Mejeng, menyusun agenda pemberitaan, serta menjaga kualitas dan konsistensi setiap konten yang dipublikasikan.",
    expertise: ["Editorial", "Journalism", "Research"],
    social: {
      instagram: "#",
      email: "mailto:hello@majangmejeng.com",
    },
    works: [
      {
        title: "Cerita Lokal yang Layak Didengar",
        category: "Feature",
      },
      {
        title: "Melihat Lumajang dari Perspektif Berbeda",
        category: "Culture",
      },
    ],
  },

  {
    id: 2,
    name: "Nadia Putri",
    role: "Creative Director",
    category: "Creative",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80",
    shortBio:
      "Membangun identitas visual dan pengalaman kreatif Majang Mejeng.",
    bio: "Mengembangkan identitas visual Majang Mejeng serta mengarahkan berbagai kebutuhan kreatif, mulai dari desain editorial hingga konsep kampanye digital.",
    expertise: ["Creative Direction", "Design", "Branding"],
    social: {
      instagram: "#",
      email: "mailto:creative@majangmejeng.com",
    },
    works: [
      {
        title: "Visual Storytelling Majang Mejeng",
        category: "Creative",
      },
      {
        title: "Membangun Identitas Media Lokal",
        category: "Brand",
      },
    ],
  },

  {
    id: 3,
    name: "Raka Mahendra",
    role: "Digital Journalist",
    category: "Journalism",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
    shortBio:
      "Mengangkat cerita dan fenomena lokal melalui perspektif yang dekat dengan masyarakat.",
    bio: "Berfokus pada peliputan dan penulisan berbagai cerita lokal, komunitas, budaya, serta fenomena yang berkembang di masyarakat.",
    expertise: ["Reporting", "Writing", "Local Stories"],
    social: {
      instagram: "#",
      email: "mailto:editorial@majangmejeng.com",
    },
    works: [
      {
        title: "Kehidupan di Balik Kota",
        category: "Feature",
      },
      {
        title: "Cerita dari Komunitas Lokal",
        category: "Community",
      },
    ],
  },

  {
    id: 4,
    name: "Salsa Ramadhani",
    role: "Social Media & Content",
    category: "Digital",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    shortBio:
      "Menghubungkan cerita Majang Mejeng dengan audiens melalui platform digital.",
    bio: "Mengelola distribusi konten digital dan mengembangkan strategi media sosial agar cerita Majang Mejeng dapat menjangkau audiens yang lebih luas.",
    expertise: ["Social Media", "Content", "Digital Strategy"],
    social: {
      instagram: "#",
      email: "mailto:digital@majangmejeng.com",
    },
    works: [
      {
        title: "Membawa Cerita Lokal ke Media Sosial",
        category: "Digital",
      },
      {
        title: "Content Strategy 2026",
        category: "Strategy",
      },
    ],
  },
];

const values = [
  {
    icon: ShieldCheck,
    title: "Trusted",
    description:
      "Mengutamakan informasi yang relevan, bertanggung jawab, dan dapat dipercaya.",
  },
  {
    icon: Globe2,
    title: "Independent",
    description:
      "Mengembangkan perspektif editorial yang independen dan dekat dengan masyarakat.",
  },
  {
    icon: Sparkles,
    title: "Creative",
    description:
      "Mengemas informasi melalui pendekatan kreatif yang sesuai dengan perkembangan digital.",
  },
  {
    icon: Users,
    title: "Community",
    description:
      "Menjadikan masyarakat dan cerita lokal sebagai bagian penting dari perjalanan kami.",
  },
];

const About = () => {
  const [selectedMember, setSelectedMember] = useState(null);

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* =========================================================
          HERO
      ========================================================== */}

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
                merekam, mengabarkan, dan mengangkat pelbagai cerita yang
                tumbuh dan berkembang di Lumajang.
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

      {/* =========================================================
          OUR STORY
      ========================================================== */}

      <section className="mx-auto max-w-7xl px-6 py-24 lg:py-32">
        <div className="grid gap-16 lg:grid-cols-[.7fr_1.3fr]">
          {/* TITLE */}

          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-orange-500">
              Our Story
            </p>

            <h2 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl">
              More than
              <br />
              just a media.
            </h2>
          </div>

          {/* CONTENT */}

          <div className="max-w-3xl">
            <p className="text-xl leading-9">
              Kami percaya, setiap daerah memiliki cerita yang layak untuk
              didengar.
            </p>

            <p className="mt-7 leading-8 text-muted-foreground">
              Bukan hanya tentang peristiwa besar, tetapi juga tentang
              kehidupan warga, komunitas, UMKM, hingga berbagai fenomena yang
              hangat diperbincangkan di tengah masyarakat.
            </p>

            <p className="mt-7 leading-8 text-muted-foreground">
              Melalui platform digital, Majang Mejeng mengemas informasi lewat
              konten kreatif, ringan, dan relevan dengan kebiasaan masyarakat
              hari ini.
            </p>

            <p className="mt-7 leading-8 text-muted-foreground">
              Lebih dari sekadar media lokal, Majang Mejeng juga melihat
              dirinya sebagai creative platform yang dapat menjadi ruang untuk
              storytelling, marketing, dan public relations.
            </p>

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              <div className="rounded-2xl border bg-card p-6">
                <Newspaper className="h-7 w-7 text-orange-500" />

                <h3 className="mt-5 text-lg font-bold">
                  Stories that matter
                </h3>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Mengangkat cerita yang dekat dengan kehidupan masyarakat.
                </p>
              </div>

              <div className="rounded-2xl border bg-card p-6">
                <Sparkles className="h-7 w-7 text-orange-500" />

                <h3 className="mt-5 text-lg font-bold">
                  Creative perspective
                </h3>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Menyampaikan informasi dengan pendekatan yang modern dan
                  kreatif.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          VALUES
      ========================================================== */}

      <section className="border-y bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:py-28">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-orange-500">
              What We Believe
            </p>

            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
              The values behind
              <br />
              every story.
            </h2>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => {
              const Icon = value.icon;

              return (
                <div
                  key={value.title}
                  className="group rounded-3xl border bg-background p-7 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-500">
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="mt-6 text-xl font-bold">{value.title}</h3>

                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          TEAM
      ========================================================== */}

      <section id="team" className="mx-auto max-w-7xl px-6 py-24 lg:py-32">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-orange-500">
              The People
            </p>

            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
              Meet our team.
            </h2>

            <p className="mt-5 max-w-2xl leading-7 text-muted-foreground">
              Orang-orang di balik cerita, ide, dan berbagai karya kreatif
              Majang Mejeng.
            </p>
          </div>

          <div className="hidden items-center gap-2 text-sm text-muted-foreground md:flex">
            <Users className="h-4 w-4" />
            Click a profile to learn more
          </div>
        </div>

        {/* TEAM GRID */}

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member) => (
            <button
              key={member.id}
              type="button"
              onClick={() => setSelectedMember(member)}
              className="group text-left"
            >
              <div className="overflow-hidden rounded-3xl border bg-card transition duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl">
                {/* IMAGE */}

                <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="h-full w-full object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
                  />

                  {/* Overlay */}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-70" />

                  {/* View profile */}

                  <div className="absolute bottom-5 left-5 right-5 flex translate-y-3 items-center justify-between opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <span className="rounded-full bg-white px-4 py-2 text-xs font-bold text-black">
                      View Profile
                    </span>

                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-500 text-white">
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>

                {/* INFO */}

                <div className="p-5">
                  <p className="text-xs font-bold uppercase tracking-widest text-orange-500">
                    {member.category}
                  </p>

                  <h3 className="mt-2 text-xl font-bold">{member.name}</h3>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {member.role}
                  </p>

                  <p className="mt-4 line-clamp-2 text-sm leading-6 text-muted-foreground">
                    {member.shortBio}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* =========================================================
          CREATIVE CTA
      ========================================================== */}

      <section className="mx-auto max-w-7xl px-6 pb-24 lg:pb-32">
        <div className="relative overflow-hidden rounded-[2rem] bg-orange-500 px-8 py-16 text-white sm:px-12 lg:px-16">
          <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-white/10 blur-3xl" />

          <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-white/70">
                Let's create something
              </p>

              <h2 className="mt-4 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">
                Have a story worth telling?
              </h2>

              <p className="mt-5 max-w-2xl leading-7 text-white/80">
                Mari berkolaborasi dan membawa cerita, brand, atau ide kamu
                lebih jauh bersama Majang Mejeng.
              </p>
            </div>

            <Link to="/contact">
              <button className="flex h-12 items-center gap-2 rounded-full bg-white px-7 font-bold text-orange-500 transition hover:bg-white/90">
                Get in Touch
                <ArrowRight className="h-4 w-4" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================
          TEAM PROFILE MODAL
      ========================================================== */}

      {selectedMember && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedMember.name} profile`}
        >
          {/* BACKDROP */}

          <button
            type="button"
            aria-label="Close profile"
            onClick={() => setSelectedMember(null)}
            className="absolute inset-0 cursor-default bg-black/70 backdrop-blur-md"
          />

          {/* MODAL */}

          <div className="relative z-10 max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-[2rem] border bg-background shadow-2xl">
            {/* CLOSE */}

            <button
              type="button"
              onClick={() => setSelectedMember(null)}
              className="absolute right-5 top-5 z-20 flex h-10 w-10 items-center justify-center rounded-full border bg-background/90 transition hover:bg-muted"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="grid lg:grid-cols-[.8fr_1.2fr]">
              {/* PROFILE IMAGE */}

              <div className="relative min-h-[420px] bg-muted lg:min-h-[650px]">
                <img
                  src={selectedMember.image}
                  alt={selectedMember.name}
                  className="absolute inset-0 h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange-400">
                    {selectedMember.category}
                  </p>

                  <h2 className="mt-2 text-3xl font-black sm:text-4xl">
                    {selectedMember.name}
                  </h2>

                  <p className="mt-2 text-white/80">
                    {selectedMember.role}
                  </p>
                </div>
              </div>

              {/* CONTENT */}

              <div className="p-7 sm:p-10 lg:p-12">
                <p className="text-sm font-bold uppercase tracking-[0.25em] text-orange-500">
                  Profile
                </p>

                <h3 className="mt-4 text-3xl font-black">
                  About {selectedMember.name.split(" ")[0]}
                </h3>

                <p className="mt-6 leading-8 text-muted-foreground">
                  {selectedMember.bio}
                </p>

                {/* EXPERTISE */}

                <div className="mt-10">
                  <p className="text-sm font-bold uppercase tracking-widest">
                    Expertise
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {selectedMember.expertise.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full border bg-muted/50 px-4 py-2 text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* SELECTED WORK */}

                <div className="mt-10">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold uppercase tracking-widest">
                      Selected Work
                    </p>

                    <Newspaper className="h-5 w-5 text-orange-500" />
                  </div>

                  <div className="mt-4 space-y-3">
                    {selectedMember.works.map((work) => (
                      <div
                        key={work.title}
                        className="group flex items-center justify-between rounded-2xl border p-4 transition hover:bg-muted"
                      >
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-widest text-orange-500">
                            {work.category}
                          </p>

                          <h4 className="mt-1 font-semibold">
                            {work.title}
                          </h4>
                        </div>

                        <ArrowUpRight className="h-5 w-5 text-muted-foreground transition group-hover:text-orange-500" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* SOCIAL */}

                <div className="mt-10 flex flex-wrap gap-3 border-t pt-7">
                  <a
                    href={selectedMember.social.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition hover:bg-muted"
                  >
                    <FaInstagram className="h-4 w-4" />
                    Instagram
                  </a>

                  <a
                    href={selectedMember.social.email}
                    className="flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition hover:bg-muted"
                  >
                    <Mail className="h-4 w-4" />
                    Contact
                  </a>
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