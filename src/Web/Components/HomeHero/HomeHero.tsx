import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export function HomeHero() {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <div className="overflow-hidden relative">
            <section className="bg-gradient-to-br from-[#1a2d57] via-[#2c4a8a] to-[#3a63b8] text-white py-24 md:py-32 pt-32">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-72 "></div>
                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-400/10 rounded-full"></div>
                    <div className="absolute bottom-10 left-10 w-80 h-80 bg-purple-400/10 rounded-full"></div>

                    {/*<div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PHBhdGggZD0iTTAgMGg2MHY2MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik02MCAwSDBWNk0wIDBoNjAiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9zdmc+')] opacity-20"></div>*/}
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        className="max-w-2xl mx-auto text-center"
                        initial="hidden"
                        animate={inView ? "visible" : "hidden"}
                        variants={fadeIn}
                        transition={{ duration: 0.8 }}
                        ref={ref}
                    >
                        <motion.h1
                            className="text-5xl md:text-7xl font-bold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                        >
                            Find What You <span className="text-blue-200">Lost</span>
                        </motion.h1>

                        <motion.p
                            className="text-xl md:text-2xl mb-8 text-blue-100 max-w-2xl mx-auto leading-relaxed"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                        >
                            Our intelligent platform helps reunite lost items with their owners through advanced matching technology.
                        </motion.p>

                        <motion.div
                            className="mb-8 max-w-xl mx-auto relative"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                        >
                            <div className="relative">
                                <motion.div
                                    whileHover={{ scale: 1.01 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <input
                                        type="text"
                                        placeholder="Search for your lost item..."
                                        className="w-full px-6 py-4 rounded-2xl border-2 bg-white/5 backdrop-blur-sm border-white/20 focus:border-blue-400/50 focus:outline-none shadow-2xl text-white placeholder-blue-200/70 font-medium"
                                    />
                                </motion.div>
                                <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-500 hover:bg-blue-400 p-2 rounded-xl transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </button>
                            </div>
                        </motion.div>

                        <motion.div
                            className="flex flex-col sm:flex-row gap-4 justify-center mt-12"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, duration: 0.8 }}
                        >
                            <motion.button
                                className="bg-white text-[#2c4a8a] hover:bg-blue-50 px-8 py-3.5 rounded-xl font-semibold text-md transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(255,255,255,0.2)" }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                Browse Found Items
                            </motion.button>
                            <motion.button
                                className="bg-transparent border-2 border-white/40 text-white hover:bg-white/10 px-8 py-3.5 rounded-xl font-semibold text-md transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(255,255,255,0.1)" }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Report Lost Item
                            </motion.button>
                        </motion.div>

                        <motion.div
                            className="mt-16 text-blue-200/60 text-sm flex items-center justify-center gap-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.2, duration: 0.8 }}
                        >
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                                <span>1,235+ items found today</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                <span>89% recovery rate</span>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>

                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#1a2d57] to-transparent"></div>
            </section>
        </div>
    );
}