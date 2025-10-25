import { useState, useEffect, useRef } from 'react';
import { Send, Sparkles, Bot, User as UserIcon, Volume2, VolumeX } from 'lucide-react';
import { User } from '../types';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import rehypeRaw from 'rehype-raw';

interface DailyReportProps {
  user: User | null;
  onLoginClick?: () => void;
}

interface Message {
  text: string;
  isUser: boolean;
  type: 'welcome' | 'report' | 'chat';
}

const we: Message = {
  text: `欢迎来到您的成长云空间，我是您的专属成长助理 Golden，下面为您提供每日成长记录和推荐内容，有任何问题都可以问我哦！`,
  isUser: false,
  type: 'welcome'
}

export default function DailyReport({ user, onLoginClick }: DailyReportProps) {
  const [messages, setMessages] = useState<Message[]>([we]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isLoadingReport, setIsLoadingReport] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reportControllerRef = useRef<AbortController | null>(null);
  const chatControllerRef = useRef<AbortController | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // 如果用户已登录,检查是否需要显示报告
    if (user?.id) {
      console.log('useEffect触发，准备检查报告'); // 调试日志
      checkAndFetchReport(user.id);
    }

    // 清理函数
    return () => {
      reportControllerRef.current?.abort();
      chatControllerRef.current?.abort();
    };
  }, [user?.id]);

  // 检测用户是否滚动到底部
  const isScrolledToBottom = () => {
    if (!messagesContainerRef.current) return true;
    const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
    return Math.abs(scrollHeight - clientHeight - scrollTop) < 10;
  };

  // 处理用户滚动事件
  const handleScroll = () => {
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    // 检查是否滚动到底部
    if (isScrolledToBottom()) {
      setIsUserScrolling(false);
    } else {
      setIsUserScrolling(true);
      // 2秒后重置用户滚动状态（防止用户停止滚动后仍然不自动滚动）
      scrollTimeoutRef.current = setTimeout(() => {
        if (isScrolledToBottom()) {
          setIsUserScrolling(false);
        }
      }, 2000);
    }
  };

  // 自动滚动到底部
  useEffect(() => {
    if (!isUserScrolling && messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages, isUserScrolling, isTyping, isLoadingReport]);

  // 清理滚动定时器
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  // 检查是否有报告并获取报告内容
  const checkAndFetchReport = async (userId: string) => {
    try {
      console.log('开始检查报告，userId:', userId); // 调试日志
      // 1. 先调用检查接口
      const checkResponse = await fetch(`https://gtech19.gaodun.com/api/v1/task-report/is-show?userId=${userId}`, {
        method: 'GET',
      });

      if (!checkResponse.ok) {
        console.error('检查报告接口调用失败');
        return;
      }

      const checkData = await checkResponse.json();
      console.log('检查报告接口返回:', checkData); // 调试日志
      const shouldShow = checkData?.result || false;
      console.log('是否显示报告:', shouldShow); // 调试日志

      // 2. 如果result为true，调用流式接口获取报告内容
      if (shouldShow) {
        console.log('开始获取报告内容'); // 调试日志
        await fetchStreamReport(userId);
      } else {
        console.log('报告不需要显示'); // 调试日志
      }
    } catch (error) {
      console.error('检查报告失败:', error);
    }
  };

  // 获取流式报告内容
  const fetchStreamReport = async (userId: string) => {
    try {
      console.log('fetchStreamReport开始调用create-report接口'); // 调试日志
      setIsLoadingReport(true);
      
      // 添加报告占位符消息
      setMessages(prev => [...prev, { text: '', isUser: false, type: 'report' }]);
      
      // 取消之前的报告请求（如果存在）
      if (reportControllerRef.current) {
        reportControllerRef.current.abort();
      }
      
      // 创建新的 AbortController
      const controller = new AbortController();
      reportControllerRef.current = controller;
      
      const response = await fetch(`https://gtech19.gaodun.com/api/v1/task-report/create-report?userId=${userId}`, {
        method: 'GET',
        headers: {
          'Accept': 'text/event-stream',
        },
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error('无法读取响应流');
      }

      let accumulatedContent = '';
      let buffer = '';
      let chunkCount = 0;

      while (true) {
        const { done, value } = await reader.read();
        
        if (done) {
          console.log(`流式响应完成，共接收 ${chunkCount} 个数据块，总字符数: ${accumulatedContent.length}`);
          break;
        }
        
        chunkCount++;

        const chunk = decoder.decode(value, { stream: true });
        buffer += chunk;

        const lines: string[] = buffer.split("\n\n");
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line === "") continue;
          let cleanLine = line.replace(/data:/g, "");
          if (!cleanLine) continue;
          
          let processedLine = cleanLine.replace(/\\n/g, '\n');
          processedLine = processedLine.replace(/(#{1,6})([^\s#])/g, '$1 $2');
          
          accumulatedContent += processedLine;
          
          // 更新报告消息内容
          setMessages(prev => {
            const newMessages = [...prev];
            const reportIndex = newMessages.findIndex(msg => msg.type === 'report');
            if (reportIndex !== -1) {
              newMessages[reportIndex] = { text: accumulatedContent, isUser: false, type: 'report' };
              console.log('报告内容更新:', accumulatedContent.substring(0, 100)); // 调试日志
            }
            return newMessages;
          });
        }
      }

    } catch (err) {
      console.error('获取报告内容失败:', err);
      console.error('错误类型:', err instanceof Error ? err.name : 'Unknown');
      console.error('错误详情:', err instanceof Error ? err.message : err);
      // 在报告消息中添加错误提示
      setMessages(prev => {
        const newMessages = [...prev];
        const reportIndex = newMessages.findIndex(msg => msg.type === 'report');
        if (reportIndex !== -1) {
          const currentContent = newMessages[reportIndex].text || '';
          newMessages[reportIndex] = { 
            text: currentContent + '\n\n---\n**报告生成过程中出现错误，请稍后重试**', 
            isUser: false, 
            type: 'report' 
          };
        }
        return newMessages;
      });
    } finally {
      setIsLoadingReport(false);
      // 清理报告控制器引用
      reportControllerRef.current = null;
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    // 如果未登录，拉起登录弹窗
    if (!user) {
      onLoginClick?.();
      return;
    }

    const userInput = input;
    setInput('');
    setIsTyping(true);

    // 添加用户消息和AI占位符到数组末尾
    setMessages(prev => [
      ...prev,
      { text: userInput, isUser: true, type: 'chat' },
      { text: '', isUser: false, type: 'chat' }
    ]);

    try {
      // 取消之前的对话请求（如果存在）
      if (chatControllerRef.current) {
        chatControllerRef.current.abort();
      }
      
      // 创建新的 AbortController
      const controller = new AbortController();
      chatControllerRef.current = controller;
      
      const response = await fetch(`https://gtech19.gaodun.com/api/v1/task-report/chat-sse?userId=${user.id}&userInput=${encodeURIComponent(userInput)}`, {
        method: 'GET',
        headers: {
          'Accept': 'text/event-stream',
        },
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error('请求失败');
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error('无法读取响应流');
      }

      let accumulatedContent = '';
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        
        if (done) {
          break;
        }

        const chunk = decoder.decode(value, { stream: true });
        buffer += chunk;

        const lines: string[] = buffer.split("\n\n");
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line === "") continue;
          let cleanLine = line.replace(/data:/g, "");
          if (!cleanLine) continue;
          
          let processedLine = cleanLine.replace(/\\n/g, '\n');
          processedLine = processedLine.replace(/(#{1,6})([^\s#])/g, '$1 $2');
          
          accumulatedContent += processedLine;
          
          // 更新AI消息内容（最后一条消息）
          setMessages(prev => {
            const newMessages = [...prev];
            newMessages[newMessages.length - 1] = { text: accumulatedContent, isUser: false, type: 'chat' };
            return newMessages;
          });
        }
      }

      setIsTyping(false);
    } catch (err) {
      console.error('发送消息失败:', err);
      setMessages(prev => [...prev, { text: '抱歉，发送消息失败，请稍后重试。', isUser: false, type: 'chat' }]);
      setIsTyping(false);
    } finally {
      // 清理对话控制器引用
      chatControllerRef.current = null;
    }
  };

  return (
    <div className="card p-6 bg-white h-[750px] flex flex-col overflow-hidden">
      <div className="flex items-center space-x-3 mb-4">
        <div className="text-4xl relative group bg-primary-50 rounded-2xl p-3 border-2 border-primary-400">
          <Bot className="text-primary-400" size={40} />
          <div className="absolute -top-2 -right-2 text-primary-400 opacity-0 group-hover:opacity-100 transition-opacity">
            <Sparkles size={20} className="animate-pulse" />
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-primary-400">每日报告</h2>
          <p className="text-sm text-neutral-400">AI助理 Golden 为您服务</p>
        </div>
      </div>

      {/* 学姐视频介绍区域 */}
      <div 
        className="relative rounded-xl overflow-hidden mb-4 group shadow-md"
      >
        <video
          ref={videoRef}
          src="/images/xuejie-video.mp4"
          className="w-full h-56 object-cover"
          style={{ objectPosition: 'center -80px' }}
          loop
          autoPlay
          muted={isMuted}
          playsInline
        />
        
        {/* 视频遮罩和标题 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-3 pointer-events-none">
          <div className="text-white">
            <div className="flex items-center space-x-2 mb-1">
              <Sparkles size={16} className="text-primary-300 animate-pulse" />
              <h3 className="text-sm font-semibold">Golden学姐为你提供每日成长报告</h3>
            </div>
          </div>
        </div>

        {/* 音量控制 */}
        <button
          onClick={toggleMute}
          className="absolute top-3 right-3 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all duration-300 opacity-0 group-hover:opacity-100 z-10"
        >
          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
      </div>

      <div 
        ref={messagesContainerRef}        onScroll={handleScroll}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className="bg-white rounded-xl p-4 mb-4 flex-1 space-y-4 scrollbar-hide border border-primary-400"
        style={{ overflowY: isHovering ? 'auto' : 'hidden' }}
      >
        {/* 统一消息列表 - 按顺序渲染所有消息 */}
        {messages.map((msg, index) => {
          console.log(`消息${index}:`, { type: msg.type, isUser: msg.isUser, hasText: !!msg.text });
          
          // 报告类型消息特殊处理
          if (msg.type === 'report') {
            console.log('渲染报告消息:', { text: msg.text?.substring(0, 50), isLoadingReport, hasText: !!msg.text }); // 调试日志
            
            // 如果报告内容为空且不在加载中，不渲染
            if (!msg.text && !isLoadingReport) {
              return null;
            }
            
            return (
              <div key={`msg-${index}`} className="flex justify-start items-start gap-2">
                <Bot size={16} className="text-primary-400 mt-1 flex-shrink-0" />
                <div className="max-w-[80%] p-3 rounded-lg bg-primary-50 text-neutral-800 border-2 border-primary-400">
                  {isLoadingReport && !msg.text ? (
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <span className="text-sm text-neutral-500 ml-2">正在生成每日报告...</span>
                    </div>
                  ) : (
                    <div className="prose prose-sm max-w-none">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm, remarkBreaks]}
                        rehypePlugins={[rehypeRaw]}
                      >
                        {msg.text}
                      </ReactMarkdown>
                    </div>
                  )}
                </div>
              </div>
            );
          }
          
          // 欢迎语和对话消息统一处理
          return (
            <div
              key={`msg-${index}`}
              className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'} items-start gap-2`}
            >
              {!msg.isUser && <Bot size={16} className="text-primary-400 mt-1 flex-shrink-0" />}
              <div
                className={`max-w-[80%] p-3 rounded-lg ${msg.isUser ? 'bg-primary-400 text-white' : 'bg-primary-50 text-neutral-800 border border-primary-400/20'}`}
              >
                {/* 如果是空的AI消息且isTyping为true，显示加载动画 */}
                {!msg.isUser && !msg.text && isTyping ? (
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                ) : msg.isUser ? (
                  <p className="whitespace-pre-line text-sm leading-relaxed">{msg.text}</p>
                ) : (
                  <div className="prose prose-sm max-w-none">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm, remarkBreaks]}
                      rehypePlugins={[rehypeRaw]}
                    >
                      {msg.text}
                    </ReactMarkdown>
                  </div>
                )}
              </div>
              {msg.isUser && <UserIcon size={16} className="text-neutral-400 mt-1 flex-shrink-0" />}
            </div>
          );
        })}
        {/* 用于滚动定位的元素 */}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="有什么问题尽管问我..."
          className="flex-1 px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-primary-400 outline-none transition-all placeholder:text-neutral-400"
        />
        <button
          onClick={handleSend}
          className="bg-primary-400 hover:bg-primary-500 text-white px-6 py-2 rounded-lg transition-all duration-300 transform hover:scale-105"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
}

