import Header from "@/components/Header";
import { motion } from "framer-motion";
import { Building, Users, Rocket, ChartBar, DollarSign, Heart } from "lucide-react";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-violet-800 to-indigo-900">
      <Header />
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-24 md:py-32"
      >
        <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-sm rounded-xl p-8 md:p-12 text-white mt-8">
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-pink-100"
          >
            About Startup Spark
          </motion.h1>
          
          <div className="space-y-8">
            <motion.section
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="backdrop-blur-md bg-white/5 rounded-lg p-6 md:p-8"
            >
              <div className="flex items-center gap-3 mb-4">
                <Building className="w-6 h-6 text-purple-300" />
                <h2 className="text-2xl md:text-3xl font-semibold text-purple-200">Our Mission</h2>
              </div>
              <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
                Startup Spark is dedicated to empowering the next generation of innovative companies. We provide a comprehensive platform that connects ambitious founders with the resources, talent, and capital they need to transform groundbreaking ideas into successful ventures.
              </p>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="backdrop-blur-md bg-white/5 rounded-lg p-6 md:p-8"
            >
              <div className="flex items-center gap-3 mb-4">
                <Rocket className="w-6 h-6 text-purple-300" />
                <h2 className="text-2xl md:text-3xl font-semibold text-purple-200">What We Do</h2>
              </div>
              <div className="space-y-4 text-lg md:text-xl text-gray-200 leading-relaxed">
                <p>
                  We've built a dynamic ecosystem that supports startups through every stage of their journey:
                </p>
                <ul className="space-y-3 list-disc pl-6">
                  <li><strong>Start:</strong> Access essential resources, mentorship, and founding team formation tools.</li>
                  <li><strong>Ship:</strong> Connect with top talent and leverage our network of experienced advisors to bring your product to market.</li>
                  <li><strong>Scale:</strong> Get introduced to leading venture capital firms and secure the funding needed to grow your business.</li>
                </ul>
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="backdrop-blur-md bg-white/5 rounded-lg p-6 md:p-8"
            >
              <div className="flex items-center gap-3 mb-4">
                <Heart className="w-6 h-6 text-purple-300" />
                <h2 className="text-2xl md:text-3xl font-semibold text-purple-200">Our Values</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-purple-300 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg text-purple-200">Community First</h3>
                      <p className="text-gray-200">Building strong connections and fostering collaboration</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Rocket className="w-5 h-5 text-purple-300 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg text-purple-200">Innovation</h3>
                      <p className="text-gray-200">Embracing new ideas and creative solutions</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <ChartBar className="w-5 h-5 text-purple-300 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg text-purple-200">Data-Driven</h3>
                      <p className="text-gray-200">Making informed decisions based on metrics</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <DollarSign className="w-5 h-5 text-purple-300 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg text-purple-200">Value Creation</h3>
                      <p className="text-gray-200">Focusing on sustainable growth and impact</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Building className="w-5 h-5 text-purple-300 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg text-purple-200">Transparency</h3>
                      <p className="text-gray-200">Operating with honesty and clarity</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-purple-300 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg text-purple-200">Inclusivity</h3>
                      <p className="text-gray-200">Supporting founders from all backgrounds</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutUs;