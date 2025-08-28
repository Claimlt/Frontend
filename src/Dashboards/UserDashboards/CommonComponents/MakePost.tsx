import { useState, useRef, type FormEvent, type ChangeEvent } from 'react';
import { X, Image, Globe, Trash2 } from 'lucide-react';
import axios from 'axios';

interface MakePostProps {
  isOpen: boolean;
  onClose: () => void;
  onPostCreated?: () => void;
}

interface ImagePreview {
  id: string;
  url: string;
  file: File;
}

function MakePost({ isOpen, onClose, onPostCreated }: MakePostProps) {
  const [postTitle, setPostTitle] = useState<string>('');
  const [postContent, setPostContent] = useState<string>('');
  const [selectedPrivacy, setSelectedPrivacy] = useState<string>('public');
  const [selectedImages, setSelectedImages] = useState<ImagePreview[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const storedName = localStorage.getItem("user");

  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('type', 'posts');
    formData.append('image', file);

    const response = await axios.post('http://127.0.0.1:8000/api/images', formData, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.data.id;
  };

  const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();
  setError(null);

  if (!postTitle.trim() && !postContent.trim() && selectedImages.length === 0) return;

  setIsUploading(true);

  try {
    const imageIds: string[] = [];
    for (const image of selectedImages) {
      try {
        const imageId = await uploadImage(image.file);
        imageIds.push(imageId); 
      } catch (err) {
        console.error('Error uploading image:', err);
      }
    }

    const payload: any = {
      title: postTitle.trim() || postContent.substring(0, 100),
      description: postContent,
    };

    if (imageIds.length > 0) {
      payload.images = imageIds;
    }

    await axios.post('http://127.0.0.1:8000/api/posts', payload, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
        'Content-Type': 'application/json',
      },
    });

    setPostTitle('');
    setPostContent('');
    setSelectedImages([]);
    if (onPostCreated) onPostCreated();
    onClose();
  } catch (err: any) {
    console.error('Error submitting post:', err);
    setError(err.response?.data?.message || 'Failed to create post. Please try again.');
  } finally {
    setIsUploading(false);
  }
};

  const handleClose = () => {
    setPostTitle('');
    setPostContent('');
    setSelectedImages([]);
    setError(null);
    onClose();
  };

  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setPostContent(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleImageSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages: ImagePreview[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type.startsWith('image/')) {
        newImages.push({
          id: Math.random().toString(36).substr(2, 9),
          url: URL.createObjectURL(file),
          file
        });
      }
    }
    setSelectedImages(prev => [...prev, ...newImages]);
    e.target.value = '';
  };

  const removeImage = (id: string) => {
    setSelectedImages(prev => {
      const img = prev.find(i => i.id === id);
      if (img) URL.revokeObjectURL(img.url);
      return prev.filter(i => i.id !== id);
    });
  };

  const triggerFileInput = () => fileInputRef.current?.click();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div
        className="bg-white rounded-xl w-full max-w-2xl shadow-2xl overflow-hidden transform transition-all duration-300 scale-95 opacity-0 animate-fade-in"
        style={{ animation: 'fadeIn 0.2s ease-out forwards', maxHeight: '90vh' }}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">Create Post</h2>
          <button onClick={handleClose} className="p-1.5 rounded-full hover:bg-gray-100" aria-label="Close">
            <X size={22} className="text-gray-600" />
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mx-4 mt-4 rounded">
            <p>{error}</p>
          </div>
        )}

        <div className="p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex-shrink-0"></div>
          <div>
            <p className="font-semibold text-gray-800">{storedName}</p>
            <div className="flex items-center gap-1">
              <select
                value={selectedPrivacy}
                onChange={(e) => setSelectedPrivacy(e.target.value)}
                className="text-xs border-none p-0 pr-5 bg-transparent focus:ring-0 text-gray-500 cursor-pointer"
              >
                <option value="public"><Globe size={12} className="inline mr-1" /> Public</option>
              </select>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          <div className="px-4 pb-4 flex-grow overflow-auto">
            <input
              type="text"
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
              placeholder="Post title (optional)"
              className="w-full text-gray-900 border-none focus:ring-0 text-xl font-semibold p-0 placeholder-gray-400 focus:outline-none mb-3"
              maxLength={100}
            />

            <textarea
              ref={textareaRef}
              value={postContent}
              onChange={handleTextareaChange}
              placeholder="What's on your mind?"
              className="w-full min-h-[120px] text-gray-900 resize-none border-none focus:ring-0 text-lg p-0 placeholder-gray-400 focus:outline-none"
            />

            <div className="text-xs text-gray-500 mt-1 text-right">{postContent.length}/∞</div>

            {selectedImages.length > 0 && (
              <div className="mt-4 grid grid-cols-2 gap-2">
                {selectedImages.map((image) => (
                  <div key={image.id} className="relative group">
                    <img src={image.url} alt="Preview" className="w-full h-32 object-cover rounded-lg" />
                    <button
                      type="button"
                      onClick={() => removeImage(image.id)}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="border-t p-4">
            <p className="text-sm font-medium mb-2 text-gray-700">Add to your post</p>
            <div className="flex items-center gap-3">
              <input type="file" ref={fileInputRef} onChange={handleImageSelect} accept="image/*" multiple className="hidden" />
              <button type="button" onClick={triggerFileInput} className="p-2.5 rounded-full hover:bg-blue-50 text-blue-500">
                <Image size={20} />
              </button>
            </div>
          </div>

          <div className="p-4 border-t">
            <button
              type="submit"
              disabled={(!postTitle.trim() && !postContent.trim() && selectedImages.length === 0) || isUploading}
              className={`w-full py-3 rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${(!postTitle.trim() && !postContent.trim() && selectedImages.length === 0) || isUploading
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed focus:ring-gray-300'
                  : 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500'
                }`}
            >
              {isUploading ? 'Posting...' : 'Post'}
            </button>
          </div>
        </form>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in { animation: fadeIn 0.2s ease-out forwards; }
      `}</style>
    </div>
  );
}

export default MakePost;
