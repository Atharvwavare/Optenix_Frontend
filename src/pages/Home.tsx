import { Link } from 'react-router-dom';
import {
  Zap, Shield, Cloud, Code, TrendingUp, Users,
  ArrowRight, Check
} from 'lucide-react';

import { motion } from "framer-motion";

import HomeImg from "../images/bg1.jpg";
 import ImageCarousel from "../others/Imagecarousel";



export default function Home() {
  const features = [
    {
      icon: <Cloud className="w-8 h-8" />,
      title: 'Cloud Solutions',
      description: 'Scalable cloud infrastructure tailored to your business needs.',
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Enterprise Security',
      description: 'Advanced security measures to protect your digital assets.',
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: 'Developer Tools',
      description: 'Powerful tools and APIs for seamless integration.',
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Analytics & AI',
      description: 'Data-driven insights powered by artificial intelligence.',
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Fast Performance',
      description: 'Lightning-fast solutions optimized for peak efficiency.',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: '24/7 Support',
      description: 'Round-the-clock assistance from our expert team.',
    },
  ];

  const products = [
    {
      name: 'OptenixCloud Pro',
      price: '$99/mo',
      features: ['Unlimited Storage', 'Advanced Analytics', 'Priority Support', 'Custom Integrations'],
    },
    {
      name: 'OptenixAI Suite',
      price: '$149/mo',
      features: ['AI-Powered Insights', 'Machine Learning', 'Predictive Analytics', 'API Access'],
    },
    {
      name: 'OptenixSecure',
      price: '$79/mo',
      features: ['Enterprise Security', 'Threat Detection', 'Data Encryption', 'Compliance Tools'],
    },
  ];

  

  return (
    <div className="min-h-screen">
          <section className="relative min-h-[90vh] overflow-hidden bg-[#120024] flex items-center">

      {/* ================= 3D CUBE BACKGROUND ================= */}
      <div className="absolute inset-0 perspective-[1200px]">
        <motion.div
          className="absolute inset-[-40%] flex items-center justify-center"
          animate={{
            rotateX: [0, 360],
            rotateY: [0, 360],
          }}
          transition={{
            duration: 40,
            ease: "linear",
            repeat: Infinity,
          }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Cube Faces */}
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-[900px] h-[900px] bg-gradient-to-br from-[#2b0057] via-[#3b007a] to-[#2f1fff] opacity-70 blur-xl"
              style={{
                transform: [
                  "rotateY(0deg) translateZ(450px)",
                  "rotateY(90deg) translateZ(450px)",
                  "rotateY(180deg) translateZ(450px)",
                  "rotateY(-90deg) translateZ(450px)",
                  "rotateX(90deg) translateZ(450px)",
                  "rotateX(-90deg) translateZ(450px)",
                ][i],
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* Soft overlay for readability */}
      <div className="absolute inset-0 bg-black/40 z-[1]" />

      {/* ================= CONTENT ================= */}
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Transform Your Business with{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Digital Excellence
            </span>
          </h1>

          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Discover cutting-edge digital products and solutions designed to
            accelerate your growth and innovation.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-semibold hover:shadow-2xl transition-all flex items-center gap-2 group"
            >
              Get a Free Call
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

             <a
           href="https://docs.google.com/forms/d/e/1FAIpQLSda0JF1onHKb4w2jqcYjPOahtPBMaynaTrdI65646A_irBddA/viewform?usp=header"
           target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-4 bg-white text-gray-900 rounded-lg font-semibold border-2 border-white hover:bg-transparent hover:text-white transition-all"
          >
  Learn More
</a>
          </div>
        </motion.div>
      </div>
    </section>


    <section className="py-20 bg-white">
  <div className="container mx-auto px-6">
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="text-center mb-16"
    >
      <h2 className="text-4xl font-bold text-blue-700 mb-4">
        Why Choose Optenix?
      </h2>
      <p className="text-xl text-black max-w-2xl mx-auto">
       We provide comprehensive digital solutions that empower businesses to thrive in the modern world.
      </p>
    </motion.div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {features.map((feature, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="p-6 rounded-xl border-2 border-gray-100 hover:border-blue-500 hover:shadow-lg transition-all"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg flex items-center justify-center mb-4 text-blue-600">
            {feature.icon}
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {feature.title}
          </h3>
          <p className="text-black text-md">{feature.description}</p>
        </motion.div>
      ))}
    </div>
  </div>
</section>


      <section className="py-10 bg-white">
  <div className="container mx-auto px-6">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      
      {/* LEFT IMAGE */}
      <div className=" overflow-hidden shadow-xl">
        <motion.div
  initial={{ opacity: 1, x: -20 }}
  whileInView={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.8 }}
  viewport={{ once: true }}
  className="overflow-hidden shadow-xl"
>
  <img src={HomeImg} alt="" className="w-full h-full object-cover" />
</motion.div>

      </div>

      {/* RIGHT CONTENT */}
      <div>
        <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
          Transforming Education <br /> & Enterprises
        </h2>

        <p className="text-lg text-black mb-6">
          Optenix Tech Solutions is a <span className="font-semibold text-gray-900">Make in India OEM</span> and
          digital transformation partner delivering intelligent, scalable, and future-ready platforms.
        </p>

        <ul className="space-y-4 mb-8 text-black text-lg">
          <li className="flex items-start space-x-3">
            <span className="text-blue-600 mt-1">•</span>
            <span>Smart Classrooms & Hybrid Learning</span>
          </li>
          <li className="flex items-start space-x-3">
            <span className="text-blue-600 mt-1">•</span>
            <span>AI-Powered Conferencing Systems</span>
          </li>
          <li className="flex items-start space-x-3">
            <span className="text-blue-600 mt-1">•</span>
            <span>LMS, ERP & Enterprise Platforms</span>
          </li>
        </ul>

        <Link
          to="/shop"
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition"
        >
          Explore Our Products
        </Link>
      </div>

    </div>
  </div>
</section>


            <ImageCarousel/>

      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-blue-700 mb-4">Featured Products</h2>
            <p className="text-xl text-black max-w-2xl mx-auto">
              Choose the perfect solution for your business needs.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {products.map((product, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h3>
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-6">
                  {product.price}
                </div>
                <ul className="space-y-3 mb-8">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center space-x-2 text-gray-600">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-semibold hover:shadow-lg transition-shadow">
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Business?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of companies already using Optenix solutions to drive innovation and growth.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:shadow-xl transition-shadow"
          >
            <span>Contact Us Today</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
