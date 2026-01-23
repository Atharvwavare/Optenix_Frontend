// src/pages/Blogs.tsx
import { Calendar, ArrowRight, Tag } from "lucide-react";
import { motion } from "framer-motion";
import { featuredPost, posts, categories } from "../data/BlogsData";
import { useState, useMemo } from "react";


export default function Blogs() {

const [selectedCategory, setSelectedCategory] = useState("All");
 
  // Filter posts by selected category
  const filteredPosts = useMemo(() => {
    if (selectedCategory === "All") return posts;
    return posts.filter((post) => post.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Blogs Page 1 */}
      {/* Our Blogs */}
      <motion.section
        className="bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-20"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Our{" "}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Blog
              </span>
            </h1>
            <p className="text-xl text-black">
              Insights, trends, and expertise from the world of technology and
              innovation.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Blogs Page 2 */}
      {/* Similar Blogs  */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <motion.div
            className="flex flex-wrap gap-3 justify-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } },
            }}
          >
            {categories.map((category, index) => (
              <motion.button
                key={index}
                onClick={() => setSelectedCategory(category)} // 🔥 CLICK HANDLER
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>

          {/* Featured Post */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
              <motion.div
                className="relative h-64 lg:h-auto"
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium">
                    Featured
                  </span>
                </div>
              </motion.div>
              <motion.div
                className="p-8 lg:p-12 flex flex-col justify-center"
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                  <span className="flex items-center space-x-1">
                    <Tag className="w-4 h-4" />
                    <span>{featuredPost.category}</span>
                  </span>
                  <span>{featuredPost.readTime}</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {featuredPost.title}
                </h2>
                <p className="text-gray-600 mb-6">{featuredPost.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {featuredPost.author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {featuredPost.author}
                      </p>
                      <p className="text-sm text-gray-500 flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{featuredPost.date}</span>
                      </p>
                    </div>
                  </div>
                  <a
  href={featuredPost.url}
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center space-x-2 text-blue-600 font-semibold hover:space-x-3 transition-all"
>
  <span>Read More</span>
  <ArrowRight className="w-5 h-5" />
</a>

                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Other Posts */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } },
            }}
          >
            {filteredPosts.map((post, index) => (
              <motion.article
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center space-x-3 text-sm text-gray-500 mb-3">
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium">
                      {post.category}
                    </span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                        {post.author
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {post.author}
                        </p>
                        <p className="text-xs text-gray-500">{post.date}</p>
                      </div>
                    </div>
                    <a
  href={post.url}
  target="_blank"
  rel="noopener noreferrer"
  className="text-blue-600 hover:text-blue-700"
>
  <ArrowRight className="w-5 h-5" />
</a>

                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>

          {/* Load More */}
          {/* <motion.div className="text-center mt-12" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-semibold hover:shadow-lg transition-shadow">
              Load More Articles
            </button>
          </motion.div> */}
        </div>
      </section>
    </div>
  );
}
