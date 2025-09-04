import { useState } from 'react';
import { FaTimes, FaCheck, FaEllipsisV, FaEnvelope, FaArrowLeft, FaImage } from 'react-icons/fa';

interface message {
    id: number;
    postTitle: string;
    claimantName: string;
    message: string;
    claimImage: string;
    timestamp: string;
    status: string;
    contact: string;
    itemDetails: string;
}
const MessageModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<message | null>(null);
  const [messages, setMessages] = useState<message[]>([
    {
      id: 1,
      postTitle: "Found: Black Wallet near Central Park",
      claimantName: "Sarah Johnson",
      message: "I believe this is my wallet. I lost it yesterday while jogging. It has my ID and credit cards inside. The wallet is black leather with a small scratch on the front. I can provide additional identification if needed.",
      claimImage: "https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80",
      timestamp: "2 hours ago",
      status: "pending",
      contact: "sarah.j@example.com",
      itemDetails: "Black leather wallet, contains ID cards, credit cards, and some cash"
    },
    {
      id: 2,
      postTitle: "Found: iPhone 12 Pro at Coffee Shop",
      claimantName: "Michael Chen",
      message: "This looks exactly like the phone I lost. It has a blue case with a star wars logo on the back. The screen has a small crack on the top left corner. I can provide the IMEI number and purchase receipt for verification.",
      claimImage: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
      timestamp: "1 day ago",
      status: "pending",
      contact: "michael.chen@example.com",
      itemDetails: "iPhone 12 Pro, blue case with Star Wars design, slight screen damage"
    },
    {
      id: 3,
      postTitle: "Found: Gold Bracelet in Restaurant",
      claimantName: "Emma Rodriguez",
      message: "I think this might be my grandmother's bracelet that I lost last week. It's a gold chain with a small heart pendant. There's an inscription on the inside that says 'Forever in my heart' which I can verify.",
      claimImage: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      timestamp: "3 days ago",
      status: "accepted",
      contact: "emma.r@example.com",
      itemDetails: "Gold bracelet with heart pendant, sentimental value"
    }
  ]);

  const openMessage = (message: message) => {
    setSelectedMessage(message);
  };

  const closeMessage = () => {
    setSelectedMessage(null);
  };

  const handleAccept = (id: number) => {
    setMessages(messages.map(msg =>
      msg.id === id ? {...msg, status: "accepted"} : msg
    ));
    closeMessage();
  };

  const handleReject = (id: number) => {
    setMessages(messages.map(msg =>
      msg.id === id ? {...msg, status: "rejected"} : msg
    ));
    closeMessage();
  };

  const handleMoreOptions = (id:number, e:React.MouseEvent) => {
    e.stopPropagation();
    console.log("More options for message:", id);
  };

  return (
    <div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="relative p-2 hover:bg-[#2c4a8a] rounded-lg transition-all duration-200 ease-in-out"
        title="Messages"
      >
        <FaEnvelope className="text-xl" />
        {messages.filter(msg => msg.status === 'pending').length > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-red-600 rounded-full transform translate-x-1/2 -translate-y-1/2">
            {messages.filter(msg => msg.status === 'pending').length}
          </span>
        )}
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60  z-50 flex items-center justify-center p-4 transition-opacity duration-300 ease-in-out">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col transform transition-transform duration-300 ease-out">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-gradient-to-r from-[#2c4a8a] to-[#3a63b8] text-white">
              <div className="flex items-center">
                {selectedMessage && (
                  <button
                    onClick={closeMessage}
                    className="mr-4 p-1 rounded-full hover:bg-white/20 transition-colors duration-200"
                  >
                    <FaArrowLeft className="h-5 w-5" />
                  </button>
                )}
                <h3 className="text-xl font-semibold">
                  {selectedMessage ? 'Claim Details' : 'Received Claims'}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-full hover:bg-white/20 transition-colors duration-200"
              >
                <FaTimes className="h-5 w-5" />
              </button>
            </div>

            <div className="overflow-y-auto flex-1 p-6">
              {selectedMessage ? (
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <h4 className="text-xl font-semibold text-gray-900">{selectedMessage.postTitle}</h4>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-500">{selectedMessage.timestamp}</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        selectedMessage.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          selectedMessage.status === 'accepted' ? 'bg-green-100 text-green-800' :
                            'bg-red-100 text-red-800'
                      }`}>
                        {selectedMessage.status.charAt(0).toUpperCase() + selectedMessage.status.slice(1)}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-gray-50 p-5 rounded-xl">
                      <h5 className="font-medium text-gray-900 mb-3 text-lg">Claimant Information</h5>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-gray-500">Name</p>
                          <p className="font-medium text-gray-900">{selectedMessage.claimantName}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Contact</p>
                          <p className="font-medium text-gray-900">{selectedMessage.contact}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Item Description</p>
                          <p className="font-medium text-gray-900">{selectedMessage.itemDetails}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-5 rounded-xl">
                      <h5 className="font-medium text-gray-900 mb-3 text-lg">Message</h5>
                      <p className="text-gray-700 whitespace-pre-line">{selectedMessage.message}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h5 className="font-medium text-gray-900 text-lg flex items-center gap-2">
                      <FaImage className="text-[#2c4a8a]" />
                      Claimant's Proof Photo
                    </h5>
                    <div className="border rounded-xl overflow-hidden">
                      <img
                        src={selectedMessage.claimImage}
                        alt="Proof of claim"
                        className="w-full h-72 object-contain bg-gray-100"
                      />
                    </div>
                  </div>

                  {selectedMessage.status === 'pending' && (
                    <div className="flex flex-col sm:flex-row gap-3 justify-end pt-4 border-t border-gray-200">
                      <button
                        onClick={() => handleReject(selectedMessage.id)}
                        className="px-5 py-2.5 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-200 flex items-center justify-center gap-2"
                      >
                        <FaTimes />
                        Reject Claim
                      </button>
                      <button
                        onClick={() => handleAccept(selectedMessage.id)}
                        className="px-5 py-2.5 bg-[#2c4a8a] text-white rounded-lg hover:bg-[#1e3269] transition-colors duration-200 flex items-center justify-center gap-2"
                      >
                        <FaCheck />
                        Accept Claim
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.length === 0 ? (
                    <div className="text-center py-10 text-gray-500">
                      <FaEnvelope className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                      <p className="text-lg font-medium">No claims received yet</p>
                      <p className="text-sm mt-1">When someone claims your found items, they'll appear here.</p>
                    </div>
                  ) : (
                    <>
                      <div className="mb-4">
                        <h4 className="text-lg font-medium text-gray-900">Pending Claims</h4>
                        <p className="text-sm text-gray-500">Review and respond to these claims</p>
                      </div>

                      {messages.filter(msg => msg.status === 'pending').length === 0 ? (
                        <div className="text-center py-6 bg-gray-50 rounded-xl">
                          <p className="text-gray-500">No pending claims</p>
                        </div>
                      ) : (
                        messages.filter(msg => msg.status === 'pending').map(message => (
                          <div
                            key={message.id}
                            onClick={() => openMessage(message)}
                            className="p-5 border rounded-xl cursor-pointer hover:border-[#2c4a8a] transition-all duration-200 ease-in-out bg-white shadow-sm hover:shadow-md"
                          >
                            <div className="flex justify-between items-start gap-4">
                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-gray-900 truncate">{message.postTitle}</h4>
                                <p className="text-sm text-gray-500 mt-1 line-clamp-2">{message.message}</p>
                                <div className="flex items-center mt-3 flex-wrap gap-2">
                                  <span className="text-xs text-gray-400">{message.timestamp}</span>
                                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                    {message.claimantName}
                                  </span>
                                </div>
                              </div>
                              <div className="flex flex-col items-end space-y-2">
                                <button
                                  onClick={(e) => handleMoreOptions(message.id, e)}
                                  className="p-1.5 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors duration-200"
                                >
                                  <FaEllipsisV className="h-4 w-4" />
                                </button>
                                <div className="flex space-x-2">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleReject(message.id);
                                    }}
                                    className="p-1.5 text-red-500 hover:text-red-700 rounded-full hover:bg-red-50 transition-colors duration-200"
                                    title="Reject"
                                  >
                                    <FaTimes />
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleAccept(message.id);
                                    }}
                                    className="p-1.5 text-green-500 hover:text-green-700 rounded-full hover:bg-green-50 transition-colors duration-200"
                                    title="Accept"
                                  >
                                    <FaCheck />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      )}

                      {messages.filter(msg => msg.status !== 'pending').length > 0 && (
                        <>
                          <div className="mt-8 mb-4">
                            <h4 className="text-lg font-medium text-gray-900">Resolved Claims</h4>
                            <p className="text-sm text-gray-500">Previously accepted or rejected claims</p>
                          </div>

                          {messages.filter(msg => msg.status !== 'pending').map(message => (
                            <div
                              key={message.id}
                              onClick={() => openMessage(message)}
                              className="p-5 border rounded-xl cursor-pointer hover:border-gray-400 transition-all duration-200 ease-in-out bg-gray-50"
                            >
                              <div className="flex justify-between items-start gap-4">
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-medium text-gray-900 truncate">{message.postTitle}</h4>
                                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">{message.message}</p>
                                  <div className="flex items-center mt-3 flex-wrap gap-2">
                                    <span className="text-xs text-gray-400">{message.timestamp}</span>
                                    <span className={`text-xs px-2 py-1 rounded-full ${
                                      message.status === 'accepted' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                    }`}>
                                      {message.status}
                                    </span>
                                  </div>
                                </div>
                                <button
                                  onClick={(e) => handleMoreOptions(message.id, e)}
                                  className="p-1.5 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-200 transition-colors duration-200"
                                >
                                  <FaEllipsisV className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>

            <div className="border-t p-5 bg-gray-50">
              {selectedMessage ? (
                <button
                  onClick={closeMessage}
                  className="px-5 py-2.5 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <FaArrowLeft className="mr-2" />
                  Back to All Messages
                </button>
              ) : (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {messages.filter(msg => msg.status === 'pending').length} pending claims
                  </span>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2.5 bg-[#2c4a8a] text-white rounded-lg hover:bg-[#1e3269] transition-colors duration-200"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageModal;