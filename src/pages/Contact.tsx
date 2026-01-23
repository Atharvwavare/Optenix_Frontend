// src/pages/Contact.tsx
import { Mail, Phone, MapPin, Send, MessageSquare, Clock } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Contact() {


  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { name, email, subject, message } = formData;

    const mailtoLink = `
    mailto:atharvwavare7@gmail.com
    ?subject=${encodeURIComponent(subject || "New Contact Form Submission")}
    &body=${encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    )}
  `;

    window.location.href = mailtoLink;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone",
      details: "+91 9766855918",
      subtext: "Mon-Fri 9am-6pm PST",
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      details: "sneha.sahare@optenix.in\nvinayak.raut@optenix.in",
      subtext: "We will respond within 24 hours",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Address",
      details: "428 Optenix Tech Solutions",
      subtext:
        "Geras Imperium Rise, Near Wipro Circle Metro Station, Hinjewadi Phase II, Pune, Maharashtra",
    },
  ];

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Contact page 1 */}
      {/* Get in Touch */}
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
              Get in{" "}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Touch
              </span>
            </h1>
            <p className="text-xl text-black">
              Reach out to us for queries, partnerships, or product
              demonstrations.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Contact page 2 */}
      {/* Contact Details */}
      <motion.section
        className="py-20 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          visible: { transition: { staggerChildren: 0.2 } },
          hidden: {},
        }}
      >
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                className="text-center p-8 rounded-xl border-2 border-gray-100 hover:border-blue-500 hover:shadow-lg transition-all"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full flex items-center justify-center mb-4 text-blue-600 mx-auto">
                  {info.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {info.title}
                </h3>
                <p className="text-gray-900 font-medium mb-1 whitespace-pre-line">{info.details}</p>
                <p className="text-md text-gray-600">{info.subtext}</p>
              </motion.div>
            ))}
          </div>

          {/* Form & Why Contact */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Send Us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                {["name", "email", "subject", "message"].map((field, idx) => {
                  if (field === "subject") {
                    return (
                      <div key={idx}>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Subject
                        </label>
                        <select
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                          required
                        >
                          <option value="">Select a subject</option>
                          <option value="general">General Inquiry</option>
                          <option value="sales">Sales</option>
                          <option value="support">Technical Support</option>
                          <option value="partnership">Partnership</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    );
                  } else if (field === "message") {
                    return (
                      <div key={idx}>
                        <label className="block text-sm font-medium text-black mb-2">
                          Message
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={6}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
                          placeholder="Tell us about your project or inquiry..."
                          required
                        />
                      </div>
                    );
                  } else {
                    return (
                      <div key={idx}>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {field === "name" ? "Full Name" : "Email Address"}
                        </label>
                        <input
                          type={field === "email" ? "email" : "text"}
                          name={field}
                          value={formData[field as keyof typeof formData]}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                          placeholder={
                            field === "name" ? "John Doe" : "john@example.com"
                          }
                          required
                        />
                      </div>
                    );
                  }
                })}

                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-semibold hover:shadow-xl transition-shadow flex items-center justify-center space-x-2"
                >
                  <span>Send Message</span>
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-black mb-6">
                Why Contact Us?
              </h2>
              <motion.div
                className="space-y-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  visible: { transition: { staggerChildren: 0.2 } },
                  hidden: {},
                }}
              >
                {[
                  {
                    icon: MessageSquare,
                    title: "Expert Consultation",
                    desc: "Get personalized advice from our team of technology experts to find the perfect solution for your needs.",
                  },
                  {
                    icon: Clock,
                    title: "Quick Response",
                    desc: "We value your time. Expect a response within 24 hours on business days.",
                  },
                  {
                    icon: Mail,
                    title: "Direct Communication",
                    desc: "Speak directly with decision-makers who can help move your project forward.",
                  },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    className="flex space-x-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                  >
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg flex items-center justify-center text-blue-600">
                        <item.icon className="w-6 h-6" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-black">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h3 className="text-xl font-semibold text-black mb-3">
                  Business Hours
                </h3>
                <div className="space-y-2 text-gray-600">
                  <p>Monday - Friday: 9:00 AM - 6:00 PM PST</p>
                  <p>Saturday: 10:00 AM - 4:00 PM PST</p>
                  <p>Sunday: Closed</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Contact page 3 */}
      {/* Goggle Map  */}
      <motion.section
        className="py-12 bg-gray-50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3422.073270161972!2d73.71542267465382!3d18.595934266868923!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bb006c6157fb%3A0x5482f6d4f4b3809b!2sOptenix%20Tech%20Solution!5e1!3m2!1sen!2sin!4v1767784815843!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
