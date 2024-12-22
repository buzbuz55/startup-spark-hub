import Header from "@/components/Header";

const Terms = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-violet-800 to-indigo-900">
      <Header />
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-sm rounded-xl p-8 text-white">
          <h1 className="text-4xl font-bold mb-8">Terms and Conditions</h1>
          
          <div className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Acceptance of Terms</h2>
              <p className="text-lg text-gray-200">
                By accessing and using StartupSparkHub, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you may not use our platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">User Responsibilities</h2>
              <p className="text-lg text-gray-200">
                Users are responsible for maintaining the confidentiality of their account information and for all activities that occur under their account. Users must not misuse the platform or engage in any harmful activities.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Intellectual Property</h2>
              <p className="text-lg text-gray-200">
                All content on StartupSparkHub, including text, graphics, logos, and software, is protected by intellectual property rights. Users retain ownership of their content but grant us a license to use it on our platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
              <p className="text-lg text-gray-200">
                StartupSparkHub is provided "as is" without any warranties. We are not liable for any damages arising from your use of our platform or any content posted by users.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;