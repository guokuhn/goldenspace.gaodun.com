import { useState, useEffect } from 'react';
import { MessageCircle, Send } from 'lucide-react';
import { User } from '../types';

interface DailyReportProps {
  user: User | null;
}

export default function DailyReport({ user }: DailyReportProps) {
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    // 初始欢迎语
    const welcomeMsg = `欢迎来到您的成长云空间，我是您的专属成长助理 Golden，下面为您提供每日成长记录和推荐内容，有任何问题都可以问我哦！`;
    
    setIsTyping(true);
    setTimeout(() => {
      setMessages([{ text: welcomeMsg, isUser: false }]);
      setIsTyping(false);
      
      // 播报每日数据
      if (user) {
        setTimeout(() => {
          const dailyReport = `📊 今日数据播报：
          
✅ 本周已完成打卡：5次
🏆 累计获得积分：${user.points}分
🎯 参与活动：2个
📚 推荐课程：Python编程基础、数据结构与算法
🛠️ 推荐工具：AI简历生成器

继续加油哦！`;
          setMessages(prev => [...prev, { text: dailyReport, isUser: false }]);
        }, 1500);
      }
    }, 1000);
  }, [user]);

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages(prev => [...prev, { text: input, isUser: true }]);
    setInput('');
    setIsTyping(true);

    // 模拟AI回复
    setTimeout(() => {
      const responses = [
        '好的，我理解您的问题。根据您的情况，我建议...',
        '这是一个很好的问题！让我为您查询相关信息...',
        '根据您的学习目标，我为您推荐以下内容...',
        '我已经为您找到了相关的课程和资料，请查看...'
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setMessages(prev => [...prev, { text: randomResponse, isUser: false }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="bg-gradient-to-br from-white to-primary-50 rounded-2xl shadow-lg p-6 border border-primary-100">
      <div className="flex items-center space-x-3 mb-4">
        <div className="text-4xl">👩‍🏫</div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">每日报告</h2>
          <p className="text-sm text-gray-600">AI助理 Golden 为您服务</p>
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 mb-4 max-h-96 overflow-y-auto space-y-4 scrollbar-hide">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                msg.isUser
                  ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <p className="whitespace-pre-line text-sm">{msg.text}</p>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 p-3 rounded-lg">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="有什么问题尽管问我..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
        />
        <button
          onClick={handleSend}
          className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 py-2 rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
}

