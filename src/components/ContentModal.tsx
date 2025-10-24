import { useState, useEffect, useRef } from 'react';
import { X, ThumbsUp, ThumbsDown, Share2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import rehypeRaw from 'rehype-raw';

interface ContentModalProps {
    onClose: () => void;
    title?: string;
    content?: string;
    updateTime?: string;
    taskId?: number;
}

const ContentModal = ({ onClose, title = 'Hi，我来帮你解惑了～', updateTime, taskId }: ContentModalProps) => {
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const [content, setContent] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    // 缓存请求controllerRef
    const controllerRef = useRef<AbortController | null>(null);


    useEffect(() => {
        // 建立SSE连接获取AI生成的内容
        const fetchStreamContent = async () => {
            try {
                setIsLoading(true);
                setError(null);
                controllerRef.current = new AbortController();
                const response = await fetch(`https://gtech19.gaodun.com/api/v1/task/create-task-ai-detail?taskId=112`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'text/event-stream',
                    },
                    signal: controllerRef.current?.signal,
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
                let buffer = ''; // 添加缓冲区处理不完整的消息

                while (true) {
                    const { done, value } = await reader.read();
                    
                    if (done) {
                        break;
                    }

                    const chunk = decoder.decode(value, { stream: true });
                    buffer += chunk;

                    const lines: string[] = buffer.split("\n\n");
                    // 保留最后一个不完整的消息在缓冲区
                    buffer = lines.pop() || '';

                    for (const line of lines) {
                        if (line === "") continue;
                        // 移除 data: 前缀，但保留原始的空白字符和换行
                        let cleanLine = line.replace(/^data:\s*/g, "");
                        if (!cleanLine) continue;
                        
                        // 打印原始数据用于调试
                        console.log('收到数据片段:', JSON.stringify(cleanLine));
                        
                        // 如果数据中的换行符被转义成了字符串"\n"，需要替换为真实的换行符
                        let processedLine = cleanLine.replace(/\\n/g, '\n');
                        
                        // 修复Markdown格式：在#和文案之间添加空格（如果缺失）
                        processedLine = processedLine.replace(/(#{1,6})([^\s#])/g, '$1 $2');
                        
                        // 直接拼接处理后的文本
                        accumulatedContent += processedLine;
                        setContent(accumulatedContent); 
                    }
                    console.log('累积内容:', accumulatedContent);
                }

                setIsLoading(false);
            } catch (err) {
                // console.error('获取内容失败:', err);
                // setError(err instanceof Error ? err.message : '获取内容失败');
                setIsLoading(false);
            }
        };

        if (taskId) {
            fetchStreamContent();
        }

        // 清理函数
        return () => {
            // 如果需要，可以在这里中断请求
            controllerRef.current?.abort();
        };
    }, [taskId]);

    const handleLike = () => {
        setLiked(!liked);
        if (disliked) setDisliked(false);
    };

    const handleDislike = () => {
        setDisliked(!disliked);
        if (liked) setLiked(false);
    };

    const handleShare = () => {
        // 分享功能
        if (navigator.share) {
            navigator.share({
                title: title,
                text: content,
            }).catch((error) => console.log('分享失败', error));
        } else {
            // 复制到剪贴板
            navigator.clipboard.writeText(content);
            alert('内容已复制到剪贴板！');
        }
    };

    // 格式化当前时间
    const formatTime = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
            <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl animate-slideUp max-h-[90vh] flex flex-col">
                {/* 头部 */}
                <div className="relative px-8 pt-8 pb-6 border-b border-neutral-100">
                    <div className="flex items-start justify-between">
                        {/* Logo 和标题 */}
                        <div className="flex items-center gap-4 flex-1">
                            <div className="flex-shrink-0 w-16 h-16 rounded-full border-2 border-neutral-200 overflow-hidden bg-gradient-to-br from-primary-50 to-secondary-50">
                                <img 
                                    src="/images/xuejie2.png" 
                                    alt="学长学姐头像" 
                                    className="w-full h-full object-cover object-top"
                                    style={{
                                        objectPosition: 'center top',
                                        objectFit: 'cover',
                                    }}
                                />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
                                    {title}
                                </h2>
                                <p className="text-xs text-neutral-400 mt-2">
                                    更新时间：{updateTime || formatTime()}
                                </p>
                            </div>
                        </div>

                        {/* 关闭按钮 */}
                        <button
                            onClick={() => {
                                controllerRef.current?.abort();
                                onClose?.()
                            }}
                            className="flex-shrink-0 p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                            aria-label="关闭"
                        >
                            <X size={24} className="text-neutral-600" />
                        </button>
                    </div>
                </div>

                {/* 内容区域 */}
                <div className="flex-1 overflow-y-auto px-8 py-6">
                    <div className="prose prose-sm max-w-none">
                        {isLoading && !content && (
                            <div className="flex items-center justify-center py-12">
                                <div className="flex flex-col items-center gap-3">
                                    <div className="w-8 h-8 border-3 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                                    <p className="text-sm text-neutral-500">AI 正在生成内容...</p>
                                </div>
                            </div>
                        )}
                        {error && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                <p className="text-red-600 text-sm">{error}</p>
                            </div>
                        )}
                        {content && (
                            <div className="text-neutral-700 leading-relaxed">
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm, remarkBreaks]}
                                    rehypePlugins={[rehypeRaw]}
                                    components={{
                                        h1: ({node, ...props}) => <h1 className="text-2xl font-bold mt-6 mb-4 text-neutral-900" {...props} />,
                                        h2: ({node, ...props}) => <h2 className="text-xl font-bold mt-5 mb-3 text-neutral-900" {...props} />,
                                        h3: ({node, ...props}) => <h3 className="text-lg font-semibold mt-4 mb-2 text-neutral-800" {...props} />,
                                        p: ({node, ...props}) => <p className="mb-3 leading-7" {...props} />,
                                        ul: ({node, ...props}) => <ul className="list-disc list-inside mb-3 space-y-1" {...props} />,
                                        ol: ({node, ...props}) => <ol className="list-decimal list-inside mb-3 space-y-1" {...props} />,
                                        li: ({node, ...props}) => <li className="ml-4" {...props} />,
                                        code: ({node, inline, ...props}: any) => 
                                            inline ? (
                                                <code className="px-1.5 py-0.5 bg-neutral-100 text-primary-600 rounded text-sm font-mono" {...props} />
                                            ) : (
                                                <code className="block p-4 bg-neutral-900 text-neutral-100 rounded-lg overflow-x-auto text-sm font-mono mb-3" {...props} />
                                            ),
                                        pre: ({node, ...props}) => <pre className="mb-3" {...props} />,
                                        blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-primary-300 pl-4 italic text-neutral-600 mb-3" {...props} />,
                                        a: ({node, ...props}) => <a className="text-primary-500 hover:text-primary-600 underline" {...props} />,
                                        table: ({node, ...props}) => <table className="w-full border-collapse mb-3" {...props} />,
                                        thead: ({node, ...props}) => <thead className="bg-neutral-100" {...props} />,
                                        tbody: ({node, ...props}) => <tbody {...props} />,
                                        tr: ({node, ...props}) => <tr className="border-b border-neutral-200" {...props} />,
                                        th: ({node, ...props}) => <th className="px-4 py-2 text-left font-semibold" {...props} />,
                                        td: ({node, ...props}) => <td className="px-4 py-2" {...props} />,
                                        strong: ({node, ...props}) => <strong className="font-bold text-neutral-900" {...props} />,
                                        em: ({node, ...props}) => <em className="italic" {...props} />,
                                    }}
                                >
                                    {content}
                                </ReactMarkdown>
                                {isLoading && (
                                    <span className="inline-block w-2 h-4 bg-primary-500 animate-pulse ml-1"></span>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* 底部互动按钮 */}
                <div className="px-8 py-6 border-t border-neutral-100 bg-neutral-50/50">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            {/* 点赞按钮 */}
                            <button
                                onClick={handleLike}
                                className={`group flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-200 ${
                                    liked
                                        ? 'bg-primary-50 border-primary-300 text-primary-600'
                                        : 'bg-white border-neutral-200 text-neutral-600 hover:border-primary-300 hover:text-primary-600'
                                }`}
                            >
                                <ThumbsUp 
                                    size={18} 
                                    className={`transition-transform duration-200 ${
                                        liked ? 'fill-primary-600' : 'group-hover:scale-110'
                                    }`}
                                />
                                <span className="text-sm font-medium">
                                    {liked ? '已点赞' : '有帮助'}
                                </span>
                            </button>

                            {/* 点踩按钮 */}
                            <button
                                onClick={handleDislike}
                                className={`group flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-200 ${
                                    disliked
                                        ? 'bg-neutral-100 border-neutral-300 text-neutral-600'
                                        : 'bg-white border-neutral-200 text-neutral-600 hover:border-neutral-300'
                                }`}
                            >
                                <ThumbsDown 
                                    size={18} 
                                    className={`transition-transform duration-200 ${
                                        disliked ? 'fill-neutral-600' : 'group-hover:scale-110'
                                    }`}
                                />
                                <span className="text-sm font-medium">
                                    {disliked ? '已反馈' : '无帮助'}
                                </span>
                            </button>
                        </div>

                        {/* 分享按钮 */}
                        <button
                            onClick={handleShare}
                            className="group flex items-center gap-2 px-6 py-2 rounded-lg bg-gradient-to-r from-primary-500 to-secondary-500 text-white hover:shadow-lg transition-all duration-200 hover:scale-105"
                        >
                            <Share2 size={18} className="group-hover:rotate-12 transition-transform duration-200" />
                            <span className="text-sm font-medium">分享</span>
                        </button>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }

                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-fadeIn {
                    animation: fadeIn 0.2s ease-out;
                }

                .animate-slideUp {
                    animation: slideUp 0.3s ease-out;
                }
            `}</style>
        </div>
    );
};

export default ContentModal;

