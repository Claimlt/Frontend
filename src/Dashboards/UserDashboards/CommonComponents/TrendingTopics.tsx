import { useState, useEffect } from "react";
import axios from "axios";

interface Post {
  id: string;
  title: string;
  description: string;
  created_at: string;
  images?: Array<{
    url: string;
  }>;
}

interface TrendingTopic {
  tag: string;
  count: number;
}

function TrendingTopics() {
  const [topics, setTopics] = useState<TrendingTopic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrendingTopics = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Authentication required");
          setLoading(false);
          return;
        }

        const response = await axios.get("", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const posts: Post[] = response.data.data || [];
        extractTrendingTopics(posts);
      } catch (err: any) {
        console.error("Error fetching posts:", err);
        setError(err.response?.data?.message || "Failed to fetch trending topics");
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingTopics();
  }, []);

  const extractTrendingTopics = (posts: Post[]) => {
    const hashtagCount: Record<string, number> = {};
    
    const defaultTopics = [
      { tag: "#LostPhone", count: 125 },
      { tag: "#FoundWallet", count: 89 },
      { tag: "#MissingBook", count: 67 }
    ];
    
    let foundHashtags = false;
    
    posts.forEach(post => {
      const text = `${post.title || ''} ${post.description || ''}`;
      const hashtags = text.match(/#\w+/g) || [];
      
      if (hashtags.length > 0) {
        foundHashtags = true;
      }
      
      hashtags.forEach(tag => {
        const normalizedTag = tag.toLowerCase();
        hashtagCount[normalizedTag] = (hashtagCount[normalizedTag] || 0) + 1;
      });
    });

    if (foundHashtags) {
   
      const trendingTopics = Object.entries(hashtagCount)
        .map(([tag, count]) => ({ tag, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5); 

      setTopics(trendingTopics);
    } else {
      setTopics(defaultTopics);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
        <h3 className="font-semibold mb-4 text-gray-900">Trending Topics</h3>
        {[1, 2, 3].map(item => (
          <div key={item} className="mb-4 last:mb-0">
            <div className="h-4 bg-gray-200 rounded w-24 mb-2 animate-pulse"></div>
            <div className="h-3 bg-gray-200 rounded w-16 animate-pulse"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
        <h3 className="font-semibold mb-4 text-gray-900">Trending Topics</h3>
        <div className="text-center text-red-500 py-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">Trending Topics</h3>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#1a2d57]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      </div>
      
      {topics.map((topic, index) => (
        <div key={index} className="mb-4 last:mb-0 group cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
          <div className="flex items-center justify-between">
            <p className="font-medium text-sm text-[#1a2d57] hover:text-[#152547] transition-colors">
              {topic.tag}
            </p>
            <span className="text-xs bg-[#1a2d57] text-white px-2 py-1 rounded-full min-w-[2rem] flex justify-center">
              {topic.count}
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {topic.count} post{topic.count !== 1 ? 's' : ''}
          </p>
        </div>
      ))}
      
      <div className="pt-3 border-t border-gray-100">
        <button className="w-full text-center text-[#1a2d57] text-sm font-medium hover:text-[#152547] transition-colors">
          View all trends
        </button>
      </div>
    </div>
  );
}

export default TrendingTopics;