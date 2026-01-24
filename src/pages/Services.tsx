// src/pages/Services.tsx
import { motion } from "framer-motion";
import { services } from "../data/ServicesData";

export default function Services() {
  return (
    <section className="bg-slate-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Services page 1 */}
        {/* Heading */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Our{' '}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Services
              </span>
            </h1>


          <h1 className="text-4xl md:text-4xl font-bold text-blue-900">
            Our Solutions: Transforming How India Learns & Works
          </h1>
        </motion.div>

        {/* Services page 2 */}
        {/* Service data cards */}
        {services.map((group, idx) => (
          <motion.div
            key={idx}
            className="mb-14"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: idx * 0.2 }}
          >
            <h2 className="text-2xl font-semibold text-blue-800 mb-2 text-center">
              {group.section}
            </h2>
            <p className="text-black text-lg mb-6 text-center">{group.description}</p>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1 } },
              }}
            >
              {group.items.map((item, i) => (
                <motion.div
                  key={i}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                >
                  <h3 className="text-blue-700 font-semibold mb-2 text-xl">
                    {item.title}
                  </h3>
                  <p className="text-black text-md">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        ))}

        {/* Services page 3 */}
        {/* Get a free Quote */}
        <motion.div
          className="flex flex-col sm:flex-row justify-center gap-4 mt-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <a
  href="https://docs.google.com/forms/d/e/1FAIpQLSdOsNrVjj5kOiI2SAdrRhXLXkHHYEFZnTO0urGXuoQq5IAYiA/viewform"
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-700 text-white font-medium hover:bg-blue-800 transition"
>
Get a Free Quote
</a>

        </motion.div>
      </div>
    </section>
  );
}
