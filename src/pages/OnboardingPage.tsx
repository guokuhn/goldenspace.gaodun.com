import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Check, Sparkles, Target, BookOpen } from 'lucide-react';
import { User } from '../types';
import { generatePersonalizedSchedule, getRecommendedCourses, getRecommendedLives } from '../utils/scheduleGenerator';

interface OnboardingPageProps {
  user: User | null;
  onUpdateUser: (userData: {
    grade: string;
    major: string;
    school: string;
    goal: string;
  }) => Promise<boolean>;
}

export default function OnboardingPage({ user, onUpdateUser }: OnboardingPageProps) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    school: user?.school || '',
    major: user?.major || '',
    grade: user?.grade || '',
    goal: user?.goal || ''
  });

  const totalSteps = 2;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleComplete = async () => {
    try {
      // 调用后端接口更新用户信息
      const success = await onUpdateUser({
        school: formData.school,
        major: formData.major,
        grade: formData.grade,
        goal: formData.goal
      });

      if (!success) {
        // 如果更新失败，可以显示错误提示
        alert('更新用户信息失败，请重试');
        return;
      }

      // 生成个性化日程计划
      const schedules = generatePersonalizedSchedule({
        grade: formData.grade,
        goal: formData.goal,
        interests: [],
        studyHoursPerDay: 3
      });

      // 保存日程到localStorage（实际应该保存到后端）
      localStorage.setItem('userSchedules', JSON.stringify(schedules));

      // 获取推荐内容
      const recommendedCourses = getRecommendedCourses(formData.goal);
      const recommendedLives = getRecommendedLives([]);
      
      // 保存推荐内容
      localStorage.setItem('recommendedCourses', JSON.stringify(recommendedCourses));
      localStorage.setItem('recommendedLives', JSON.stringify(recommendedLives));

      // 显示成功提示并跳转到首页
      setTimeout(() => {
        navigate('/');
      }, 500);
    } catch (error) {
      console.error('完成设置失败:', error);
      alert('设置失败，请重试');
    }
  };

  const grades = ['大一', '大二', '大三', '大四'];
  const goals = ['就业', '公务员', '事业单位', '央国企', '银行', '保研', '考研', "留学"];

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-3xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* 进度条 */}
        <div className="bg-gradient-to-r from-primary-500 to-accent h-2">
          <div 
            className="bg-white h-full transition-all duration-500"
            style={{ width: `${((totalSteps - step) / totalSteps) * 100}%`, marginLeft: 'auto' }}
          />
        </div>

        <div className="p-8 md:p-12">
          {/* 头部 */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-accent rounded-full mb-4">
              <Sparkles className="text-white" size={32} />
            </div>
            <h1 className="text-3xl font-bold text-gradient mb-2">欢迎来到 Golden Space</h1>
            <p className="text-gray-600">让我们了解你，为你定制专属成长计划</p>
            <div className="flex justify-center items-center space-x-2 mt-4">
              {[1, 2].map((s) => (
                <div
                  key={s}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    s === step ? 'w-8 bg-gradient-to-r from-primary-500 to-accent' : 
                    s < step ? 'w-2 bg-primary-300' : 'w-2 bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* 步骤内容 */}
          <div className="min-h-[400px]">
            {/* 第一步：基本信息 */}
            {step === 1 && (
              <div className="space-y-6 animate-fadeIn">
                <div className="text-center mb-8">
                  <BookOpen className="mx-auto text-primary-500 mb-4" size={48} />
                  <h2 className="text-2xl font-bold module-title mb-2">告诉我们你的基本信息</h2>
                  <p className="text-gray-600">这将帮助我们为你推荐合适的内容</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold module-secondary mb-2">
                    学校名称 *
                  </label>
                  <input
                    type="text"
                    value={formData.school}
                    onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                    placeholder="请输入你的学校名称"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold module-secondary mb-2">
                    专业 *
                  </label>
                  <input
                    type="text"
                    value={formData.major}
                    onChange={(e) => setFormData({ ...formData, major: e.target.value })}
                    placeholder="例如：计算机科学与技术"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold module-secondary mb-2">
                    年级 *
                  </label>
                  <div className="grid grid-cols-4 gap-3">
                    {grades.map((grade) => (
                      <button
                        key={grade}
                        onClick={() => setFormData({ ...formData, grade })}
                        className={`py-3 px-4 rounded-xl font-medium transition-all ${
                          formData.grade === grade
                            ? 'bg-gradient-to-r from-primary-500 to-accent text-white shadow-lg scale-105'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {grade}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 第二步：目标设定 */}
            {step === 2 && (
              <div className="space-y-6 animate-fadeIn">
                <div className="text-center mb-8">
                  <Target className="mx-auto text-accent mb-4" size={48} />
                  <h2 className="text-2xl font-bold module-title mb-2">你的未来目标是什么？</h2>
                  <p className="text-gray-600">选择一个最符合你当前规划的目标</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {goals.map((goal) => (
                    <button
                      key={goal}
                      onClick={() => setFormData({ ...formData, goal })}
                      className={`p-6 rounded-2xl font-medium transition-all border-2 ${
                        formData.goal === goal
                          ? 'border-primary-500 bg-gradient-to-br from-primary-50 to-accent/10 shadow-lg scale-105'
                          : 'border-gray-200 bg-white hover:border-primary-300 hover:shadow-md'
                      }`}
                    >
                      <div className="text-left">
                        <div className={`text-xl font-bold mb-2 ${
                          formData.goal === goal ? 'module-primary' : 'text-gray-700'
                        }`}>
                          {goal}
                        </div>
                        {formData.goal === goal && (
                          <Check className="text-accent" size={20} />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* 底部按钮 */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={handleBack}
              disabled={step === 1}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all ${
                step === 1
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <ArrowLeft size={20} />
              <span>上一步</span>
            </button>

            <div className="text-sm text-gray-500">
              第 {step} / {totalSteps} 步
            </div>

            <button
              onClick={handleNext}
              disabled={
                (step === 1 && (!formData.school || !formData.major || !formData.grade)) ||
                (step === 2 && !formData.goal)
              }
              className="primary-button px-8 py-3 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>{step === totalSteps ? '完成设置' : '下一步'}</span>
              {step === totalSteps ? <Check size={20} /> : <ArrowRight size={20} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

