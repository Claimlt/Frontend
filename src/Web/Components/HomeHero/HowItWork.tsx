export function HowItWorks() {
    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12 text-blue-700">How It Works</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                        <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                            <span className="text-blue-700 text-2xl font-bold">1</span>
                        </div>
                        <h3 className="text-xl font-semibold text-center mb-3">Report Lost Item</h3>
                        <p className="text-gray-600 text-center">
                            Create a detailed post about your lost item with photos, location, and description.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                        <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                            <span className="text-blue-700 text-2xl font-bold">2</span>
                        </div>
                        <h3 className="text-xl font-semibold text-center mb-3">Community Notified</h3>
                        <p className="text-gray-600 text-center">
                            Our system alerts users in the area where your item was lost.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                        <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                            <span className="text-blue-700 text-2xl font-bold">3</span>
                        </div>
                        <h3 className="text-xl font-semibold text-center mb-3">Get Matched</h3>
                        <p className="text-gray-600 text-center">
                            When someone finds your item, we'll connect you to arrange return.
                        </p>
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <button className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-medium transition">
                        Watch Video Tutorial
                    </button>
                </div>
            </div>
        </section>
    );
}