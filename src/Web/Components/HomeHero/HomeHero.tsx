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
        <div className="overflow-hidden">
            <section className="bg-gradient-to-br  h-screen from-blue-600 via-blue-700 to-indigo-800 text-white py-24 md:py-32 ">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                    <div className="absolute bottom-0 left-1/2 w-64 h-64 bg-sky-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
                </div>

                <div className="container mx-auto px-4 flex flex-col md:flex-row items-center relative z-10">
                    <motion.div
                        className="md:w-1/2 mb-12 md:mb-0"
                        initial="hidden"
                        animate={inView ? "visible" : "hidden"}
                        variants={fadeIn}
                        transition={{ duration: 0.8 }}
                        ref={ref}
                    >
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                            Reuniting Lost Items <span className="text-blue-200">With Their Owners</span>
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-lg">
                            Our platform connects people who've lost items with those who've found them.
                            Join thousands of users in our mission to return what's lost.
                        </p>


                        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                            <motion.button
                                className="bg-red-500 hover:bg-red-600 px-8 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 shadow-lg"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Report Lost Item
                            </motion.button>
                            <motion.button
                                className="bg-white text-blue-700 hover:bg-blue-50 px-8 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 shadow-lg"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Browse Found Items
                            </motion.button>
                        </div>
                    </motion.div>

                    <motion.div
                        className="md:w-1/2 flex justify-center"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className="relative">
                            <img
                                src="/HomeHero.png"
                                alt="Lost items"
                                className="max-w-md w-full rounded-2xl shadow-2xl border-4 border-white/20 transform rotate-1"
                            />
                            <motion.div
                                className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.6 }}
                            >
                                <div className="text-blue-800 font-bold text-sm">95% Success Rate</div>
                                <div className="text-green-600 text-xs">Items reunited daily</div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}