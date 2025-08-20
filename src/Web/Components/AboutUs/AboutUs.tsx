import { motion } from "framer-motion";

export function AboutUs() {
    const fadeIn  = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94] as const
            }
        }
    };

    return (
        <div className="bg-white py-20">
            <div className="container mx-auto px-4 max-w-5xl">
                <motion.div
                    className="text-center mb-16"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={fadeIn}
                >
                    <h1 className="text-5xl font-bold text-gray-900 mb-5 tracking-tight">
                        About <span className="text-transparent bg-clip-text bg-[#2b4887] ">Lost & Found</span>
                    </h1>
                    <div className="h-1.5 w-24 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mb-8 rounded-full"></div>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        We're dedicated to reuniting people with their lost belongings through innovative technology and community.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-16 mb-20">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={fadeIn}
                        className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-sm border border-gray-100"
                    >
                        <div className="flex items-center mb-6">
                            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mr-4">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
                        </div>
                        <p className="text-gray-700 mb-5 leading-relaxed">
                            At Lost & Found, we believe that every lost item has a story and someone who misses it.
                            Our mission is to leverage technology to create connections between finders and owners,
                            transforming moments of loss into stories of recovery.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            We combine advanced matching algorithms and community networks to make the process of
                            recovering lost items simpler, faster, and more effective than ever before.
                        </p>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={fadeIn}
                        transition={{ delay: 0.2 }}
                        className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-sm border border-gray-100"
                    >
                        <div className="flex items-center mb-6">
                            <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center mr-4">
                                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Our Story</h2>
                        </div>
                        <p className="text-gray-700 mb-5 leading-relaxed">
                            Lost & Found was born when our founder lost a cherished family heirloom.
                            Despite best efforts, the traditional lost and found systems failed.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            This frustrating experience sparked an idea: what if technology could create a smarter,
                            more connected way to reunite people with their belongings? Today, that idea has helped
                            return thousands of items to their rightful owners.
                        </p>
                    </motion.div>
                </div>


            </div>
        </div>
    );
}