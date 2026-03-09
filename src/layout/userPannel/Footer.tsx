"use client";


const Footer = () => {
  return (
    <footer className="bg-[#1c1d1f] text-gray-300 ">
      
      {/* TOP BAR */}
      <div className="border-b border-gray-700 px-10 py-6 flex flex-col md:flex-row justify-between items-center">
        <h2 className="text-sm md:text-base font-semibold">
          Top companies choose{" "}
          <span className="text-[#c0a9ff] font-bold">Nexus Business</span> to
          build in-demand career skills.
        </h2>

        <div className="flex gap-8 mt-4 md:mt-0 opacity-80 text-sm">
          <span>Nasdaq</span>
          <span>Volkswagen</span>
          <span>NetApp</span>
          <span>Eventbrite</span>
        </div>
      </div>

      {/* LINKS SECTION */}
      <div className="px-10 py-10 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 text-sm">

        {/* SHORT SECTION 1 */}
        <div className="max-w-[180px]">
          <h3 className="text-white font-semibold mb-3">In-demand Careers</h3>
          <ul className="space-y-2">
            {["Data Scientist", "Full Stack Developer", "Cloud Engineer", "Project Manager"].map((item) => (
              <li key={item}>
                <button className="hover:text-white hover:underline transition">
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* SHORT SECTION 2 */}
        <div className="max-w-[180px]">
          <h3 className="text-white font-semibold mb-3">Web Development</h3>
          <ul className="space-y-2">
            {["JavaScript", "React JS", "Angular", "Java"].map((item) => (
              <li key={item}>
                <button className="hover:text-white hover:underline transition">
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* NORMAL SECTIONS */}
        <div>
          <h3 className="text-white font-semibold mb-3">IT Certifications</h3>
          <ul className="space-y-2">
            {["Amazon AWS", "Azure", "AWS Architect", "Kubernetes"].map((item) => (
              <li key={item}>
                <button className="hover:text-white hover:underline transition">
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3">Leadership</h3>
          <ul className="space-y-2">
            {["Leadership", "Management", "Productivity", "Emotional Intelligence"].map((item) => (
              <li key={item}>
                <button className="hover:text-white hover:underline transition">
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3">Business Analytics</h3>
          <ul className="space-y-2">
            {["Excel", "SQL", "Power BI", "Data Analysis"].map((item) => (
              <li key={item}>
                <button className="hover:text-white hover:underline transition">
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="border-t border-gray-700 px-10 py-6 flex flex-col md:flex-row justify-between items-center text-sm">
        <h1 className="text-white text-lg font-bold">Nexus</h1>

        <p className="mt-3 md:mt-0 opacity-70">
          © 2026 Nexus, Inc.
        </p>

        <button className="border border-gray-400 px-4 py-1 rounded hover:bg-white hover:text-black transition mt-3 md:mt-0">
          English
        </button>
      </div>
    </footer>
  );
};

export default Footer;