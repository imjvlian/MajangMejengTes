import React from "react";

const About = () => {
  return (
    <div className="min-h-screen dark:bg-black bg-gray-50 flex flex-col items-center">
      {/* Content Section */}
      <div className="w-full max-w-6xl px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left */}
          <div>
            <h2 className="text-3xl font-bold dark:text-white text-gray-800 mb-4">
              Tentang Kami
            </h2>

            <p className="dark:text-gray-100 text-gray-600 leading-relaxed">
              Majang Mejeng adalah media kreatif lokal yang hadir untuk merekam,
              mengabarkan, dan mengangkat pelbagai cerita yang tumbuh dan
              berkembang di Lumajang. <br />
              <br /> Kami percaya, setiap daerah memiliki
              cerita yang layak untuk didengar. Bukan hanya tentang peristiwa
              besar, tetapi juga tentang kehidupan warga, budaya, komunitas,
              UMKM, hingga berbagai fenomena yang hangat diperbincangkan di
              tengah society.
              <br />
              <br />
               Melalui platform digital, Majang Mejeng mengemas
              informasi lewat konten kreatif, ringan, dan relevan dengan
              kebiasaan society hari ini. Lebih dari Sekadar Media Lokal Majang
              Mejeng tidak hanya berfokus pada apa yang sedang terjadi, tetapi
              juga agency yang menyediakan jasa layanan branding, marketing
              serta public relation melalui platform digital.
              <br />
              <br /> Karena itu, Majang
              Mejeng hadir dengan semangat: Kami ingin menjadi entitas yang
              tumbuh bersama masyarakat. Karena setiap daerah punya cerita, dan
              Lumajang punya banyak cerita untuk dipajang.
            </p>
          </div>

          {/* Right (image) */}
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/723072/pexels-photo-723072.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt=""
              className="rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="w-full dark:bg-black bg-gray-100 py-12">
        <h2 className="text-3xl font-bold dark:text-white text-gray-800 text-center mb-8">
          Meet Our Team
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="text-center">
            <img
              src="https://cdn-icons-png.flaticon.com/128/3135/3135715.png"
              alt="Team member"
              className="w-32 h-32 rounded-full mx-auto mb-4"
            />

            <h3 className="text-xl font-semibold text-gray-700">
              Jaime Lannister
            </h3>

            <p className="text-gray-500">CEO</p>
          </div>

          <div className="text-center">
            <img
              src="https://cdn-icons-png.flaticon.com/128/4140/4140037.png"
              alt="Team member"
              className="w-32 h-32 rounded-full mx-auto mb-4"
            />

            <h3 className="text-xl font-semibold text-gray-700">
              Cersei Lannister
            </h3>

            <p className="text-gray-500">CTO</p>
          </div>

          <div className="text-center">
            <img
              src="https://cdn-icons-png.flaticon.com/128/6997/6997662.png"
              alt="Team member"
              className="w-32 h-32 rounded-full mx-auto mb-4"
            />

            <h3 className="text-xl font-semibold text-gray-700">
              Daenerys Targaryen
            </h3>

            <p className="text-gray-500">Lead Designer</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
