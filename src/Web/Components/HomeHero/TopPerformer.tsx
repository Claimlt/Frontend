import { motion } from "framer-motion";

export function TopPerformer() {
  const topUsers = [
    {
      id: 1,
      name: "Alex Johnson",
      itemsReturned: 42,
      badge: "Gold",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
    },
    {
      id: 2,
      name: "Maria Garcia",
      itemsReturned: 37,
      badge: "Gold",
      avatar: "https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
    },
    {
      id: 3,
      name: "James Wilson",
      itemsReturned: 29,
      badge: "Silver",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
    },
    {
      id: 4,
      name: "Sarah Lee",
      itemsReturned: 25,
      badge: "Silver",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-[#1a2d57] to-[#233b70] text-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Community Heroes</h2>
          <p className="text-blue-100 max-w-2xl mx-auto text-lg">
            Recognizing the amazing people who have helped reunite lost items with their owners
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {topUsers.map((user, index) => (
            <motion.div
              key={user.id}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 group"
              variants={itemVariants}
              whileHover={{
                y: -10,
                transition: { duration: 0.3 }
              }}
            >
              <div className="relative mb-6">
                <div className="w-28 h-28 rounded-full mx-auto overflow-hidden border-4 border-white/20 group-hover:border-blue-300/50 transition-colors duration-300">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 flex items-center justify-center text-white font-bold shadow-lg">
                  #{index + 1}
                </div>

                <div className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-full text-xs font-semibold ${
                  user.badge === "Gold"
                    ? "bg-gradient-to-r from-amber-400 to-amber-600 text-amber-900"
                    : "bg-gradient-to-r from-gray-300 to-gray-400 text-gray-800"
                }`}>
                  {user.badge}
                </div>
              </div>

              <h3 className="text-xl font-semibold text-center mb-2">{user.name}</h3>

              <div className="flex items-center justify-center mb-4">
                <div className="flex items-center bg-blue-400/10 px-3 py-1 rounded-full">
                  <svg className="w-5 h-5 mr-2 text-blue-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-blue-100 font-medium">{user.itemsReturned} items returned</span>
                </div>
              </div>

              <div className="w-full bg-gray-700/30 rounded-full h-2.5 mb-2">
                <div
                  className={`h-2.5 rounded-full ${
                    user.badge === "Gold"
                      ? "bg-gradient-to-r from-amber-400 to-amber-600"
                      : "bg-gradient-to-r from-gray-300 to-gray-400"
                  }`}
                  style={{ width: `${(user.itemsReturned / 42) * 100}%` }}
                ></div>
              </div>

              <p className="text-center text-blue-200 text-sm">
                {user.itemsReturned === 42 ? "Top contributor this month" : "Active community helper"}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <button className="group relative inline-flex items-center px-6 py-3 bg-white text-[#233b70] rounded-xl font-medium hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden">
            <span className="relative z-10">View All Community Heroes</span>
            <svg className="w-5 h-5 ml-2 relative z-10 transition-transform group-hover:translate-x-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </motion.div>
      </div>
    </section>
  );
}