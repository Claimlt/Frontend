import { useState, useRef, type FormEvent } from 'react';
import { X, Image, Video, MapPin, Smile, Globe, UserCheck } from 'lucide-react';

interface MakePostProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (content: string, privacy: string) => void;
}

function MakePost({ isOpen, onClose, onSubmit }: MakePostProps) {
  const [postContent, setPostContent] = useState<string>('');
  const [selectedPrivacy, setSelectedPrivacy] = useState<string>('public');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(postContent, selectedPrivacy);
    setPostContent('');
    onClose();
  };

  const handleClose = () => {
    setPostContent('');
    onClose();
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostContent(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div 
        className="bg-white rounded-xl w-full max-w-2xl shadow-2xl overflow-hidden transform transition-all duration-300 scale-95 opacity-0 animate-fade-in"
        style={{ 
          animation: 'fadeIn 0.2s ease-out forwards',
          maxHeight: '90vh'
        }}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">Create Post</h2>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Close post creation modal"
          >
            <X size={22} className="text-gray-600" />
          </button>
        </div>
        <div className="p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex-shrink-0"></div>
          <div>
            <p className="font-semibold text-gray-800">Alex Johnson</p>
            <div className="flex items-center gap-1">
              <select 
                value={selectedPrivacy}
                onChange={(e) => setSelectedPrivacy(e.target.value)}
                className="text-xs border-none p-0 pr-5 bg-transparent focus:ring-0 text-gray-500 cursor-pointer"
              >
                <option value="public" className="flex items-center">
                  <Globe size={12} className="inline mr-1" /> Public
                </option>
                <option value="friends" className="flex items-center">
                  <UserCheck size={12} className="inline mr-1" /> Friends
                </option>
                <option value="only-me">Only me</option>
              </select>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          <div className="px-4 pb-4 flex-grow overflow-auto">
            <textarea
              ref={textareaRef}
              value={postContent}
              onChange={handleTextareaChange}
              placeholder="What's on your mind?"
              className="w-full min-h-[150px] resize-none border-none focus:ring-0 text-lg p-0 placeholder-gray-400 focus:outline-none"
              style={{ minHeight: '150px' }}
            />
          </div>

          <div className="border-t p-4">
            <p className="text-sm font-medium mb-2 text-gray-700">Add to your post</p>
            <div className="flex items-center gap-3">
              <button 
                type="button" 
                className="p-2.5 rounded-full hover:bg-blue-50 text-blue-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-200"
                aria-label="Add image"
              >
                <Image size={20} />
              </button>
              <button 
                type="button" 
                className="p-2.5 rounded-full hover:bg-green-50 text-green-500 transition-colors focus:outline-none focus:ring-2 focus:ring-green-200"
                aria-label="Add video"
              >
                <Video size={20} />
              </button>
              <button 
                type="button" 
                className="p-2.5 rounded-full hover:bg-red-50 text-red-500 transition-colors focus:outline-none focus:ring-2 focus:ring-red-200"
                aria-label="Add location"
              >
                <MapPin size={20} />
              </button>
              <button 
                type="button" 
                className="p-2.5 rounded-full hover:bg-yellow-50 text-yellow-500 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-200"
                aria-label="Add emoji"
              >
                <Smile size={20} />
              </button>
            </div>
          </div>
          <div className="p-4 border-t">
            <button
              type="submit"
              disabled={!postContent.trim()}
              className={`w-full py-3 rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                postContent.trim() 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500' 
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed focus:ring-gray-300'
              }`}
            >
              Post
            </button>
          </div>
        </form>
      </div>
      
      <style >{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export default MakePost;