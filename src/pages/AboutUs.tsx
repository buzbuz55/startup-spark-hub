import Header from "@/components/Header";
import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-violet-800 to-indigo-900">
      <Header />
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-16 md:py-24"
      >
        <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-sm rounded-xl p-6 md:p-8 text-white mt-8">
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-pink-100"
          >
            About Startup Spark
          </motion.h1>
          
          <div className="space-y-6">
            <motion.section
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="backdrop-blur-md bg-white/5 rounded-lg p-4 md:p-6"
            >
              <h2 className="text-xl md:text-2xl font-semibold mb-3 text-purple-200">Our Mission</h2>
              <p className="text-base md:text-lg text-gray-200">
                We empower student entrepreneurs and foster innovation in the academic community. Our platform connects visionaries with the resources and talent they need to transform ideas into successful ventures.
              </p>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="backdrop-blur-md bg-white/5 rounded-lg p-4 md:p-6"
            >
              <h2 className="text-xl md:text-2xl font-semibold mb-3 text-purple-200">What We Do</h2>
              <p className="text-base md:text-lg text-gray-200">
                We provide a comprehensive platform for idea sharing, team building, and accessing vital resources. Our community brings together entrepreneurs, mentors, and investors to create meaningful connections.
              </p>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="backdrop-blur-md bg-white/5 rounded-lg p-4 md:p-6"
            >
              <h2 className="text-xl md:text-2xl font-semibold mb-3 text-purple-200">Our Values</h2>
              <ul className="list-none space-y-2 text-base md:text-lg text-gray-200">
                <li className="flex items-center">
                  <span className="mr-2">✨</span>
                  Innovation and Creativity
                </li>
                <li className="flex items-center">
                  <span className="mr-2">🤝</span>
                  Collaboration and Community
                </li>
                <li className="flex items-center">
                  <span className="mr-2">📚</span>
                  Education and Growth
                </li>
                <li className="flex items-center">
                  <span className="mr-2">⚖️</span>
                  Integrity and Transparency
                </li>
                <li className="flex items-center">
                  <span className="mr-2">🌈</span>
                  Diversity and Inclusion
                </li>
              </ul>
            </motion.section>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutUs;