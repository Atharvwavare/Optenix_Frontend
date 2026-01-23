export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
  url: string;        // 🔥 NEW FIELD
};

export const featuredPost: BlogPost = {
  id: "future-cloud",
  title: 'The Future of Cloud Computing: Trends to Watch in 2024',
  excerpt: 'Explore the latest innovations and emerging technologies shaping the cloud computing landscape.',
  image: 'https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&w=800',
  author: 'IBM Cloud Blog',
  date: 'January 2024',
  category: 'Cloud Technology',
  readTime: '8 min read',
  url: "https://www.ibm.com/blog/future-of-cloud-computing/"
};

export const posts: BlogPost[] = [
  {
    id: "ai-ml-business",
    title: 'AI and Machine Learning: Transforming Business Operations',
    excerpt: 'Discover how artificial intelligence is revolutionizing the way businesses operate and make decisions.',
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
    author: 'Harvard Business Review',
    date: '2024',
    category: 'Artificial Intelligence',
    readTime: '6 min read',
    url: "https://hbr.org/2023/07/how-ai-is-transforming-business"
  },
  {
    id: "cybersecurity",
    title: 'Cybersecurity Best Practices for Modern Enterprises',
    excerpt: 'Essential security measures every organization should implement to protect against digital threats.',
    image: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=800',
    author: 'Cisco Security Blog',
    date: '2024',
    category: 'Security',
    readTime: '7 min read',
    url: "https://www.cisco.com/c/en/us/products/security/what-is-cybersecurity.html"
  },
  {
    id: "microservices",
    title: 'Building Scalable Applications with Microservices',
    excerpt: 'A comprehensive guide to designing and implementing microservices architecture for your applications.',
    image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800',
    author: 'Martin Fowler',
    date: '2023',
    category: 'Development',
    readTime: '10 min read',
    url: "https://martinfowler.com/articles/microservices.html"
  },
  {
    id: "data-analytics",
    title: 'Data Analytics: Turning Information into Insights',
    excerpt: 'Learn how to leverage data analytics to make informed business decisions and drive growth.',
    image: 'https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=800',
    author: 'IBM Analytics',
    date: '2024',
    category: 'Analytics',
    readTime: '5 min read',
    url: "https://www.ibm.com/topics/data-analytics"
  },
  {
    id: "nep-2020",
    title: 'National Education Policy (NEP) 2020',
    excerpt: 'How NEP 2020 is transforming India’s education system.',
    image: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=800',
    author: 'Wikipedia',
    date: 'Updated 2024',
    category: 'NEP',
    readTime: '7 min read',
    url: "https://en.wikipedia.org/wiki/National_Education_Policy_2020"
  },
  {
    id: "scalable-systems",
    title: 'Engineering Scalable Systems for High Performance',
    excerpt: 'Principles behind building reliable, scalable, and high-performance systems.',
    image: 'https://images.pexels.com/photos/3862373/pexels-photo-3862373.jpeg?auto=compress&cs=tinysrgb&w=800',
    author: 'Google Cloud Blog',
    date: '2024',
    category: 'Engineering',
    readTime: '9 min read',
    url: "https://cloud.google.com/blog/topics/developers-practitioners/scalable-system-design"
  },
];

export const categories = [
  'All',
  'Cloud Technology',
  'Artificial Intelligence',
  'Security',
  'Development',
  'Analytics',
  'NEP',
  'Engineering'
];
