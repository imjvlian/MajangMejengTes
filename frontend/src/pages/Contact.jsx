import React from "react";
import { Handshake } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
const Contact = () => {
  const whatsappNumber = "6282139401193";

  const whatsappMessage = encodeURIComponent(
    "Halo Majang Mejeng, saya tertarik untuk bekerja sama. Saya ingin mendapatkan informasi lebih lanjut mengenai kerja sama yang tersedia."
  );

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <div className="max-w-3xl mx-auto px-4 py-20">

        {/* Header */}
        <div className="text-center">

          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-full bg-slate-100 dark:bg-slate-800">
              <Handshake className="w-10 h-10 text-slate-700 dark:text-slate-200" />
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-5">
            Let's Work Together
          </h1>

          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Majang Mejeng terbuka untuk berbagai peluang kerja sama,
            kolaborasi, partnership, media partnership, sponsorship, dan
            kebutuhan lainnya.
          </p>

          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mt-4 leading-relaxed">
            Punya ide atau ingin berdiskusi mengenai kerja sama?
            Jangan ragu untuk menghubungi kami.
          </p>

          {/* WhatsApp Button */}
          <div className="mt-8">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-7 py-3 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition"
            >
              <FaWhatsapp className="w-5 h-5" />
              Contact Us on WhatsApp
            </a>
          </div>

        </div>

        {/* Cooperation Info */}
        <div className="mt-16 border rounded-lg p-6 md:p-8 dark:border-slate-700">
          <h2 className="text-xl font-semibold text-slate-800 dark:text-white mb-4">
            Partnership & Collaboration
          </h2>

          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            Kami terbuka untuk bekerja sama dengan brand, perusahaan,
            komunitas, kreator, media, maupun pihak lainnya yang memiliki
            visi dan tujuan yang sejalan.
          </p>

          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-600 dark:text-slate-400">
            <div>• Media Partnership</div>
            <div>• Brand Collaboration</div>
            <div>• Sponsorship</div>
            <div>• Content Collaboration</div>
            <div>• Event Partnership</div>
            <div>• Advertising</div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;