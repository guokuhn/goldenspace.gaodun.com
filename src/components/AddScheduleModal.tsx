import { useState } from 'react';
import { X, Calendar, FileText } from 'lucide-react';

interface AddScheduleModalProps {
  onClose: () => void;
  onAdd: (schedule: {
    title: string;
    description: string;
    date: string;
  }) => void;
  selectedDate?: string;
}

export default function AddScheduleModal({ onClose, onAdd, selectedDate }: AddScheduleModalProps) {
  const today = new Date().toISOString().split('T')[0];
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: selectedDate || today
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 验证表单
    const newErrors: {[key: string]: string} = {};
    if (!formData.title.trim()) {
      newErrors.title = '请输入日程标题';
    }
    if (!formData.description.trim()) {
      newErrors.description = '请输入日程描述';
    }
    if (!formData.date) {
      newErrors.date = '请选择日期';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // 提交数据
    onAdd({
      title: formData.title,
      description: formData.description,
      date: formData.date
    });
    
    onClose();
  };

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // 清除该字段的错误
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* 头部 */}
        <div className="sticky top-0 bg-white border-b border-neutral-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-2xl font-bold text-neutral-800">添加日程</h2>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-neutral-600 transition-colors p-1 hover:bg-neutral-100 rounded-lg"
          >
            <X size={24} />
          </button>
        </div>

        {/* 表单内容 */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* 日程标题 */}
          <div>
            <label className="flex items-center text-sm font-semibold text-neutral-700 mb-2">
              <FileText className="mr-2 text-primary-400" size={18} />
              日程标题 <span className="text-secondary-400 ml-1">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="例如：完成数据结构作业"
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-primary-400 outline-none transition-all ${
                errors.title ? 'border-secondary-400' : 'border-neutral-300'
              }`}
            />
            {errors.title && (
              <p className="text-secondary-400 text-xs mt-1">{errors.title}</p>
            )}
          </div>

          {/* 日程描述 */}
          <div>
            <label className="flex items-center text-sm font-semibold text-neutral-700 mb-2">
              <FileText className="mr-2 text-primary-400" size={18} />
              日程描述 <span className="text-secondary-400 ml-1">*</span>
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="详细描述这项日程的内容和目标..."
              rows={3}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-primary-400 outline-none transition-all resize-none ${
                errors.description ? 'border-secondary-400' : 'border-neutral-300'
              }`}
            />
            {errors.description && (
              <p className="text-secondary-400 text-xs mt-1">{errors.description}</p>
            )}
          </div>

          {/* 日期选择 */}
          <div>
            <label className="flex items-center text-sm font-semibold text-neutral-700 mb-2">
              <Calendar className="mr-2 text-primary-400" size={18} />
              选择日期 <span className="text-secondary-400 ml-1">*</span>
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => handleChange('date', e.target.value)}
              min={today}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-primary-400 outline-none transition-all ${
                errors.date ? 'border-secondary-400' : 'border-neutral-300'
              }`}
            />
            {errors.date && (
              <p className="text-secondary-400 text-xs mt-1">{errors.date}</p>
            )}
          </div>

          {/* 提示信息 */}
          <div className="bg-primary-50 border border-primary-200 rounded-xl p-4">
            <p className="text-sm text-neutral-600 leading-relaxed">
              💡 <span className="font-semibold">小贴士：</span>
              合理规划日程可以帮助你更高效地完成学习任务，养成良好的学习习惯！
            </p>
          </div>

            {/* 按钮组 */}
            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 border border-neutral-300 text-neutral-700 rounded-xl hover:bg-neutral-50 transition-all font-semibold"
              >
                取消
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-primary-400 hover:bg-primary-500 text-white rounded-xl transition-all font-semibold shadow-md hover:shadow-lg transform hover:scale-105"
              >
                确认添加
              </button>
            </div>
        </form>
      </div>
    </div>
  );
}

