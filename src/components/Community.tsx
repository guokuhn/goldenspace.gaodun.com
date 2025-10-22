import { Link } from 'react-router-dom';
import { MessageCircle, Heart, Bookmark, ChevronRight, User } from 'lucide-react';
import { mockPosts } from '../data/mockData';

export default function Community() {
  return (
    <div className="card p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2 group">
          <MessageCircle className="text-xl module-icon transition-transform group-hover:scale-110" size={24} />
          <h2 className="text-xl font-bold module-title">社区</h2>
        </div>
        <Link 
          to="/community"
          className="module-primary hover:module-secondary flex items-center space-x-1 text-sm group"
        >
          <span>更多</span>
          <ChevronRight size={16} className="transition-transform group-hover:translate-x-1 module-primary" />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {mockPosts.slice(0, 6).map((post) => (
          <div
                key={post.id}
                className="border border-neutral-200 rounded-xl p-3 hover:shadow-md transition-all cursor-pointer h-fit bg-white group"
          >
            <div className="flex items-start space-x-2 mb-2">
              <img 
                src={post.avatar} 
                alt={post.author} 
                className="w-10 h-10 rounded-full object-cover transition-transform group-hover:scale-110 border border-neutral-200"
              />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-neutral-800 text-sm truncate flex items-center">
                  {post.author}
                  <User size={10} className="ml-1 text-neutral-400" />
                </p>
                <p className="text-xs text-neutral-400">{post.publishTime}</p>
              </div>
            </div>

            <p className="text-xs text-neutral-700 mb-2 line-clamp-3">{post.content}</p>

            {post.images && (
              <div className="flex space-x-1 mb-2">
                {post.images.slice(0, 2).map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`Post image ${idx+1}`}
                    className="w-12 h-12 object-cover rounded-lg border border-neutral-200 transition-transform group-hover:scale-105"
                  />
                ))}
              </div>
            )}

            <div className="flex items-center justify-between pt-2 border-t border-neutral-100">
              <button className="flex items-center space-x-1 text-neutral-400 hover:text-secondary-400 transition-colors">
                <Heart size={14} className="hover:fill-secondary-400 hover:stroke-secondary-400" />
                <span className="text-xs">{post.likes}</span>
              </button>
              <button className="flex items-center space-x-1 text-neutral-400 hover:text-secondary-400 transition-colors">
                <MessageCircle size={14} />
                <span className="text-xs">评论</span>
              </button>
              <button className="flex items-center space-x-1 text-neutral-400 hover:text-secondary-400 transition-colors">
                <Bookmark size={14} className="hover:fill-secondary-400 hover:stroke-secondary-400" />
                <span className="text-xs">{post.favorites}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

