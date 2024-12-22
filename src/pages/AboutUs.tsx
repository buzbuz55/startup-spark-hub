import Header from "@/components/Header";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-violet-800 to-indigo-900">
      <Header />
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-sm rounded-xl p-8 text-white">
          <h1 className="text-4xl font-bold mb-8">About Startup Nation</h1>
          
          <div className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
              <p className="text-lg text-gray-200">
                Startup Nation is dedicated to empowering student entrepreneurs and fostering innovation in the academic community. We believe that great ideas can come from anywhere, and we're here to provide the platform, resources, and connections needed to turn those ideas into reality.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">What We Do</h2>
              <p className="text-lg text-gray-200">
                We connect student entrepreneurs with mentors, investors, and fellow innovators. Our platform facilitates idea sharing, team building, and access to vital resources that can help transform concepts into successful ventures.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
              <ul className="list-disc list-inside text-lg text-gray-200 space-y-2">
                <li>Innovation and Creativity</li>
                <li>Collaboration and Community</li>
                <li>Education and Growth</li>
                <li>Integrity and Transparency</li>
                <li>Diversity and Inclusion</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;