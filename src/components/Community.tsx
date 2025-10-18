import { Link } from 'react-router-dom';
import { MessageCircle, Heart, Bookmark, ArrowRight } from 'lucide-react';
import { mockPosts } from '../data/mockData';

export default function Community() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <MessageCircle className="text-secondary-500" size={24} />
          <h2 className="text-xl font-bold text-gray-800">社区</h2>
        </div>
        <Link 
          to="/community"
          className="text-primary-500 hover:text-primary-600 flex items-center space-x-1 text-sm"
        >
          <span>更多</span>
          <ArrowRight size={16} />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-2 flex-1 overflow-y-auto">
        {mockPosts.slice(0, 10).map((post) => (
          <div
            key={post.id}
            className="border border-gray-200 rounded-xl p-3 hover:shadow-md transition-all cursor-pointer h-fit"
          >
            <div className="flex items-start space-x-2 mb-2">
              <div className="text-xl">{post.avatar}</div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-800 text-sm truncate">{post.author}</p>
                <p className="text-xs text-gray-500">{post.publishTime}</p>
              </div>
            </div>

            <p className="text-xs text-gray-700 mb-2 line-clamp-3">{post.content}</p>

            {post.images && (
              <div className="flex space-x-1 mb-2">
                {post.images.slice(0, 2).map((img, idx) => (
                  <div
                    key={idx}
                    className="w-12 h-12 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-lg flex items-center justify-center text-xl"
                  >
                    {img}
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
              <button className="flex items-center space-x-1 text-gray-600 hover:text-primary-500 transition-colors">
                <Heart size={14} />
                <span className="text-xs">{post.likes}</span>
              </button>
              <button className="flex items-center space-x-1 text-gray-600 hover:text-secondary-500 transition-colors">
                <MessageCircle size={14} />
                <span className="text-xs">评论</span>
              </button>
              <button className="flex items-center space-x-1 text-gray-600 hover:text-accent-500 transition-colors">
                <Bookmark size={14} />
                <span className="text-xs">{post.favorites}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

