// src/pages/Career.tsx
import { ArrowRight, MapPin, Briefcase, Clock } from "lucide-react";
import { benefits, openings } from "../data/CareerData";
import { motion } from "framer-motion";
import { useRef } from "react";

export default function Career() {

  const openPositionsRef = useRef<HTMLDivElement>(null);

  const scrollToOpenPositions = () => {
    openPositionsRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="min-h-screen">

      {/* Hero Section */}
      <motion.section
        className="relative bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-20"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Join Our{" "}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Amazing Team
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Build the future of technology with talented people who share your passion for innovation.
            </p>
            <button
              onClick={scrollToOpenPositions} // Scroll to Open Positions section
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-semibold hover:shadow-xl transition-shadow flex items-center space-x-2 mx-auto"
            >
              <span>View Open Positions</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.section>

      {/* Why Work Section */}
      <motion.section
        className="py-20 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{ visible: { transition: { staggerChildren: 0.2 } }, hidden: {} }}
      >
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold text-blue-600 mb-6">Why Work at Optenix?</h2>
              <p className="text-black mb-4">
                At Optenix Tech Solutions, we are more than just a company. We are a community of innovators,
                problem-solvers, and dreamers who are passionate about making a difference.
              </p>
              <p className="text-black mb-4">
                We believe in fostering a culture of creativity, collaboration, and continuous learning. Here,
                your ideas matter, your growth is prioritized, and your contributions make a real impact.
              </p>
              <p className="text-black">
                Join us in our mission to transform businesses through technology and innovation.
              </p>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <img
                src="https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Team working together"
                className="rounded-2xl shadow-2xl"
              />
            </motion.div>
          </div>

          {/* Benefits Section */}
          <div className="text-center mb-12">
            <motion.h2
              className="text-4xl font-bold text-blue-600 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              Benefits & Perks
            </motion.h2>
            <motion.p
              className="text-xl text-black max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              We invest in our team members and their wellbeing.
            </motion.p>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.2 } }, hidden: {} }}
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="p-6 rounded-xl border-2 border-gray-100 hover:border-blue-500 hover:shadow-lg transition-all text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full flex items-center justify-center mb-4 text-blue-600 mx-auto">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Open Positions Section */}
      <motion.section
      ref = {openPositionsRef}
        className="py-20 bg-gradient-to-br from-gray-50 to-blue-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{ visible: { transition: { staggerChildren: 0.15 } }, hidden: {} }}
      >
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-blue-600 mb-4">Open Positions</h2>
            <p className="text-xl text-black max-w-2xl mx-auto">
              Find your next opportunity and make an impact.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-6">
            {openings.map((job, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-shadow"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="mb-4 md:mb-0">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{job.title}</h3>
                    <p className="text-gray-600 mb-3">{job.description}</p>
                    <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                      <span className="flex items-center space-x-1">
                        <Briefcase className="w-4 h-4" />
                        <span>{job.department}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{job.location}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{job.type}</span>
                      </span>
                    </div>
                  </div>
                  <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-semibold hover:shadow-lg transition-shadow whitespace-nowrap">
                    Apply Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-gray-600 mb-4">
              Do not see a role that fits? We are always looking for talented people.
            </p>
            <button className="px-8 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              Send Us Your Resume
            </button>
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="py-20 bg-gradient-to-r from-blue-600 to-cyan-500 text-white"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join a team that values innovation, collaboration, and your personal growth.
          </p>
          <button className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:shadow-xl transition-shadow">
            <span>Explore Opportunities</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </motion.section>
    </div>
  );
}
