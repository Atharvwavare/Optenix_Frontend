import { Target, Award, Users, Heart } from "lucide-react";
import { motion } from "framer-motion";

export default function About() {
  /* ---------- Animation Variants ---------- */
  const fadeUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const stagger = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  /* ---------- Data ---------- */
  const values = [
    {
      icon: <Target className="w-8 h-8" />,
      title: "Innovation",
      description: "We constantly push boundaries to deliver cutting-edge solutions.",
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Customer First",
      description: "Your success is our priority. We build lasting relationships.",
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Excellence",
      description: "We maintain the highest standards in everything we do.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Collaboration",
      description: "Teamwork and partnership drive our success.",
    },
  ];

  const stats = [
    { number: "10K+", label: "Happy Clients" },
    { number: "50+", label: "Countries Served" },
    { number: "100+", label: "Products Launched" },
    { number: "15+", label: "Years Experience" },
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      name: "Michael Chen",
      role: "CTO",
      image:
        "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      name: "David Kim",
      role: "Lead Developer",
      image:
        "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
  ];

  return (
    <div className="min-h-screen">

      {/* HERO */}
      <motion.section
        className="bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-20"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
      >
        <div className="container mx-auto px-6 text-center max-w-4xl">
           <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              About Opt
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                enix Tech Solutions
              </span>
            </h1>
          <p className="text-xl text-black">
          Optenix Tech Solutions is a Pune-based OEM and technology service provider redefining how India learns and works through intelligent, affordable, and future-ready digital solutions.
          </p>
        </div>
      </motion.section>

      {/* OUR STORY */}
      <motion.section
        className="py-14 bg-white"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl  text-blue-700 font-bold mb-6">Our Story</h2>
             <p className="text-black mb-4 text-lg">
                Founded in 2009, Optenix Tech Solutions began with a simple mission: to make enterprise-grade
                technology accessible to businesses of all sizes. What started as a small team of passionate
                developers has grown into a global leader in digital solutions.
              </p>
              <p className="text-black mb-4 text-lg">
                Today, we serve over 10,000 clients across 50+ countries, delivering innovative products that
                drive business growth and digital transformation. Our commitment to excellence and customer
                satisfaction remains unwavering.
              </p>
              <p className="text-black text-lg">
                We believe in the power of technology to transform businesses and improve lives. Every product
                we create is designed with this vision in mind.
              </p>
          </div>

          <motion.img
            src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800"
            className="rounded-2xl shadow-2xl"
            whileHover={{ scale: 1.03 }}
          />
        </div>
      </motion.section>

     {/* WHAT WE DO */}
<motion.section
  className="py-20 bg-gradient-to-br from-gray-50 to-white"
  variants={stagger}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
>
  <div className="container mx-auto px-6">

    {/* Heading */}
    <motion.div variants={fadeUp} className="text-center mb-16">
      <h2 className="text-4xl font-bold text-blue-700 mb-3">
        What We Do
      </h2>
      <p className="text-lg text-black">
        Delivering intelligent, scalable, and future-ready technology solutions.
      </p>
    </motion.div>

    {/* Cards */}
    <div className="grid md:grid-cols-3 gap-10">

      {/* Card 1 */}
      <motion.div
        variants={fadeUp}
        className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1"
      >
        <h3 className="text-2xl font-semibold text-blue-700 mb-4">
          Interactive Hardware
        </h3>
        <p className="text-black mb-4">
          Design and manufacture high-performance interactive devices for modern
          classrooms and enterprises.
        </p>
        <ul className="text-black list-disc ml-5 space-y-2">
          <li>4K / 8K Interactive Flat Panels</li>
          <li>Digital Podiums & AI Cameras</li>
          <li>Professional AV & Smart Displays</li>
        </ul>
      </motion.div>

      {/* Card 2 */}
      <motion.div
        variants={fadeUp}
        className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1"
      >
        <h3 className="text-2xl font-semibold text-blue-700 mb-4">
          Digital Platforms
        </h3>
        <p className="text-black mb-4">
          Build powerful cloud-based platforms that simplify learning and
          institutional management.
        </p>
        <ul className="text-black list-disc ml-5 space-y-2">
          <li>Learning Management Systems (LMS)</li>
          <li>ERP & Admin Automation</li>
          <li>Secure Cloud-Hosted Solutions</li>
        </ul>
      </motion.div>

      {/* Card 3 */}
      <motion.div
        variants={fadeUp}
        className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1"
      >
        <h3 className="text-2xl font-semibold text-blue-700 mb-4">
          Integrated Solutions
        </h3>
        <p className="text-black mb-4">
          Deliver end-to-end smart environments with seamless hardware and software
          integration.
        </p>
        <ul className="text-black list-disc ml-5 space-y-2">
          <li>Smart Classrooms & Hybrid Learning</li>
          <li>Automated Conference Rooms</li>
          <li>End-to-End Deployment & Support</li>
        </ul>
      </motion.div>

    </div>
  </div>
</motion.section>


      {/* STATS */}
      <motion.section
        className="py-20 bg-gradient-to-br from-gray-50 to-blue-50"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s, i) => (
            <motion.div key={i} variants={fadeUp}>
              <div className="text-5xl font-bold text-blue-600">{s.number}</div>
              <p className="text-gray-600">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CORE VALUES */}
      <motion.section
        className="py-20 bg-gradient-to-br from-gray-50 to-blue-50"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-blue-700 mb-16">Our Core Values</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="bg-white p-8 rounded-xl shadow-lg text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                  {v.icon}
                </div>
                <h3 className="font-semibold text-xl mb-2">{v.title}</h3>
                <p className="text-black">{v.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* OUR MISSION & OUR IMPACT */}
<motion.section
  className="py-20 bg-white"
  variants={stagger}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
>
  <div className="container mx-auto px-6">

    <div className="grid md:grid-cols-2 gap-16 items-center">

      {/* OUR MISSION */}
      <motion.div variants={fadeUp}>
        <h2 className="text-4xl font-bold text-blue-700 mb-6">
          Our Mission
        </h2>
        <p className="text-black text-lg leading-relaxed mb-6">
          Our mission is to empower educational institutions and enterprises with
          intelligent, reliable, and future-ready technology that transforms
          the way people learn, collaborate, and grow.
        </p>

        <ul className="space-y-4 text-black">
          <li className="flex items-start gap-3">
            <span className="text-blue-600 text-xl">✓</span>
            Deliver innovative and scalable digital solutions
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-600 text-xl">✓</span>
            Bridge the gap between technology and real-world needs
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-600 text-xl">✓</span>
            Enable smarter, more connected environments
          </li>
        </ul>
      </motion.div>

      {/* OUR IMPACT */}
      <motion.div
        variants={fadeUp}
        className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-10 shadow-lg"
      >
        <h2 className="text-4xl font-bold text-blue-700 mb-8">
          Our Impact
        </h2>

        <div className="grid grid-cols-2 gap-8">

          <div>
            <h3 className="text-3xl font-bold text-blue-600">500+</h3>
            <p className="text-black mt-2">Institutions Empowered</p>
          </div>

          <div>
            <h3 className="text-3xl font-bold text-blue-600">10K+</h3>
            <p className="text-black mt-2">Smart Devices Deployed</p>
          </div>

          <div>
            <h3 className="text-3xl font-bold text-blue-600">99%</h3>
            <p className="text-black mt-2">Customer Satisfaction</p>
          </div>

          <div>
            <h3 className="text-3xl font-bold text-blue-600">24/7</h3>
            <p className="text-black mt-2">Dedicated Support</p>
          </div>

        </div>
      </motion.div>

    </div>
  </div>
</motion.section>


      {/* TEAM */}
      <motion.section
        className="py-16 bg-white"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="container mx-auto ">
          <h2 className="text-4xl font-bold text-blue-700 text-center mb-16">
            Meet Our Leadership
          </h2>
          <div className="grid md:grid-cols-3   gap-10">
            {team.map((m, i) => (
              <motion.div key={i} variants={fadeUp} className="text-center">
                <img
                  src={m.image}
                  className="rounded-2xl mb-4 hover:scale-105 transition"
                />
                <h3 className="font-semibold">{m.name}</h3>
                <p className="text-blue-600">{m.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

    </div>
  );
}
