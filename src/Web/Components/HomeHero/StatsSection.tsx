import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export function StatsSection() {
  const [ref] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const stats = [
    {
      value: "0",
      label: "Items Reunited",
      description: "Lost items successfully returned to their owners",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
      color: "bg-[#2b80ff]",
    },
    {
      value: "0%",
      label: "Recovery Rate",
      description: "Success rate for lost item recovery",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
      color: "bg-[#2b80ff]",
    },
    {
      value: "0",
      label: "Active Users",
      description: "Community members helping each other",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      color: "bg-[#2b80ff]",
    },
    {
      value: "0",
      label: "Items Found Daily",
      description: "Average number of items found each day",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      ),
      color: "bg-[#2b80ff]",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-[#1a2d57] via-[#2c4a8a] to-[#3a63b8] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-72 bg-gradient-to-r from-blue-500/10 to-cyan-500/10"></div>
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-400/10 rounded-full"></div>
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-purple-400/10 rounded-full"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Our Impact in Numbers
          </h2>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            Join thousands of users who have successfully recovered their lost
            items
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          ref={ref}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur opacity-30 group-hover:opacity-70 transition duration-300"></div>
              <div className="relative bg-slate-800/70 backdrop-blur-sm p-6 rounded-2xl hover:bg-slate-800/90 transition-all duration-300 h-full flex flex-col items-center text-center">
                <div
                  className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} text-white shadow-lg mb-4`}
                >
                  {stat.icon}
                </div>
                <h3 className="text-4xl font-bold text-white mb-2">
                  {stat.value}
                </h3>
                <p className="text-lg font-semibold text-blue-200 mb-2">
                  {stat.label}
                </p>
                <p className="text-blue-100/80 text-sm">{stat.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white font-bold hover:from-blue-600 hover:to-cyan-600 text-[#182f70] px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center mx-auto gap-2"
          >
            Join Our Community
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
