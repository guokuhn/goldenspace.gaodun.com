import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    ArrowLeft,
    Calendar,
    CheckCircle,
    Circle,
    Plus,
    Settings,
    BarChart3,
    ExternalLink,
} from "lucide-react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { User } from "../types";
import {
    mockSchedules,
    weeklyCheckInData,
    weeklyPointsData,
} from "../data/mockData";
import apiService from "../services/api";
import { TaskResponse } from "../types/api";
import ContentModal from "../components/ContentModal";
import QRCodeModal from "../components/QRCodeModal";
import { userStore } from "../stores/UserStore";

interface ScheduleDetailPageProps {
    user: User | null;
}

export default function ScheduleDetailPage({ user }: ScheduleDetailPageProps) {
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    const [schedules, setSchedules] = useState<TaskResponse[]>([]);
    const [showSetupModal, setShowSetupModal] = useState(!user);
    const [loading, setLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(false);
    const [showContentModal, setShowContentModal] = useState(false);
    const [showQRCodeModal, setShowQRCodeModal] = useState(false);
    const [selectedSchedule, setSelectedSchedule] =
        useState<TaskResponse | null>(null);

    const formatDate = (date: Date): string => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    // 日期重置函数
    const resetToCurrentMonth = () => {
        const today = new Date();
        const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
        const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);

        setStartDate(formatDate(firstDay));
        setEndDate(formatDate(lastDay));
    };

    // 初始化日期为当前月份的第一天和最后一天
    useEffect(() => {
        resetToCurrentMonth();
    }, []);

    // 日期变化时自动加载日程
    useEffect(() => {
        if (startDate && endDate && user?.id) {
            loadSchedules();
        }
    }, [startDate, endDate, user]);

    const loadSchedules = async () => {
        if (!user?.id) return;

        try {
            setLoading(true);
            const response = await apiService.getTaskList({
                startDay: startDate,
                endDay: endDate,
                userId: user.id,
            });

            if (response.result) {
                setSchedules(response.result);
            }
        } catch (error) {
            console.error("加载日程失败:", error);
        } finally {
            setLoading(false);
        }
    };

    const toggleComplete = async (taskId: number) => {
        if (!user?.id) return;

        const task = schedules.find((s) => s.id === taskId);
        if (!task) return;

        // 如果已完成不处理
        if (task.taskStatus === 1) return;

        try {
            // 调用完成接口
            await apiService.completeTask({
                taskId: taskId,
                userId: user.id,
            });

            // 更新本地状态
            setSchedules(
                schedules.map((s) =>
                    s.id === taskId ? { ...s, taskStatus: 1 } : s
                )
            );
            
            // 完成任务后累加积分
            const earnedPoints = task.taskPoints || 0;
            if (earnedPoints > 0) {
                userStore.updatePoints(earnedPoints);
            }
        } catch (error) {
            console.error("更新任务状态失败:", error);
        }
    };

    // 去看看
    const goToSee = (schedule: TaskResponse) => {
        setSelectedSchedule(schedule);
        
        if (schedule.jumpType === "AI") {
            setShowContentModal(true);
        }

        if (schedule.toolCodeImageUrl) {
            setShowQRCodeModal(true);
        }
    };

    const learningTimeData = Array.from({ length: 12 }, (_, i) => ({
        month: `${i + 1}月`,
        hours: Math.floor(Math.random() * 40) + 20,
    }));

    const referralData = Array.from({ length: 12 }, (_, i) => ({
        month: `${i + 1}月`,
        count: Math.floor(Math.random() * 15) + 5,
    }));

    return (
        <div className="min-h-screen">
            <div className="bg-white shadow-md sticky top-0 z-10">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <Link
                        to="/"
                        className="flex items-center space-x-2 text-gray-600 hover:text-primary-500 transition-colors"
                    >
                        <ArrowLeft
                            size={20}
                            className="hover:text-primary-500 transition-colors"
                        />
                        <span>返回首页</span>
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-800">
                        我的日程
                    </h1>
                    <button
                        onClick={() => setShowSetupModal(true)}
                        className="flex items-center space-x-2 bg-primary-500 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all group"
                    >
                        <Settings
                            size={18}
                            className="group-hover:rotate-12 transition-transform duration-300"
                        />
                        <span>计划设置</span>
                    </button>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8 max-w-6xl">
                {/* 视图切换 */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="flex items-center gap-2">
                            <label className="text-sm font-medium text-gray-700">
                                开始日期:
                            </label>
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <label className="text-sm font-medium text-gray-700">
                                结束日期:
                            </label>
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                            />
                        </div>
                        <button
                            onClick={loadSchedules}
                            disabled={!startDate || !endDate || loading}
                            className="px-6 py-2 primary-button disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "加载中..." : "查询"}
                        </button>
                    </div>

                    {/* 日程列表 */}
                    <div className="space-y-3">
                        {loading ? (
                            <div className="text-center py-8 text-gray-500">
                                加载中...
                            </div>
                        ) : schedules.length === 0 ? (
                            <div className="text-center py-8 text-gray-500">
                                暂无日程数据
                            </div>
                        ) : (
                            schedules.map((schedule) => (
                                <div
                                    key={schedule.id}
                                    className="flex items-start space-x-4 p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all"
                                >
                                    <button
                                        onClick={() =>
                                            toggleComplete(schedule.id)
                                        }
                                        className="mt-1 flex-shrink-0"
                                    >
                                        {schedule.taskStatus === 1 ? (
                                            <CheckCircle
                                                className="text-accent-500 group-hover:scale-110 transition-transform duration-300"
                                                size={24}
                                            />
                                        ) : (
                                            <Circle
                                                className="text-gray-400 group-hover:text-primary-500 transition-colors cursor-pointer"
                                                size={24}
                                            />
                                        )}
                                    </button>
                                    <div className="flex-1 min-w-0">
                                        <h3
                                            className={`text-base font-semibold mb-2 ${
                                                schedule.taskStatus === 1
                                                    ? "text-gray-400 line-through"
                                                    : "module-secondary"
                                            }`}
                                        >
                                            {schedule.taskName}
                                        </h3>
                                        <p className="text-xs module-primary mb-2">
                                            {schedule.taskDesc}
                                        </p>
                                        <div className="flex items-center space-x-3">
                                            <div className="flex items-center space-x-2 group">
                                                <Calendar
                                                    size={14}
                                                    className="text-gray-400 group-hover:text-primary-500 transition-colors"
                                                />
                                                <span className="text-xs text-gray-500 group-hover:text-primary-600 transition-colors">
                                                    {schedule.taskDate}
                                                </span>
                                            </div>
                                            <span className="text-xs bg-primary-100 text-primary-700 px-2.5 py-1 rounded-full font-semibold">
                                                +{schedule.taskPoints || 0}积分
                                            </span>
                                        </div>
                                    </div>

                                    {/* 图片区域 */}
                                    <div className="flex-shrink-0 w-26 h-20 rounded-lg overflow-hidden border border-neutral-200 bg-neutral-100 relative">
                                        <img
                                            src={
                                                schedule.imageUrl ||
                                                "/images/course/course3.png"
                                            }
                                            alt={schedule.taskName || ""}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                const target =
                                                    e.target as HTMLImageElement;
                                                target.style.display = "none";
                                                if (target.parentElement) {
                                                    target.parentElement.innerHTML =
                                                        '<div class="w-full h-full flex items-center justify-center text-neutral-400 text-xs">📷</div>';
                                                }
                                            }}
                                        />
                                        {/* 任务类型标签 */}
                                        {(schedule.taskType === 1 || schedule.taskType === 2) && (
                                            <div className="absolute top-1 left-1 px-2 py-0.5 text-xs font-medium text-white bg-black/60 rounded">
                                                {schedule.taskType === 1 ? "直播" : "课程"}
                                            </div>
                                        )}
                                        {/* 去看看按钮 */}
                                        {!!schedule.jumpType && (
                                            <button
                                                onClick={() =>
                                                    goToSee(schedule)
                                                }
                                                className="absolute top-1 right-1 flex items-center gap-1 px-2 py-1 text-xs font-medium text-white bg-primary-500/90 rounded hover:bg-primary-600 hover:shadow-md transition-all duration-200 group"
                                            >
                                                {/* <span>去看看</span> */}
                                                <ExternalLink
                                                    size={12}
                                                    className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
                                                />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    <button className="w-full mt-6 flex items-center justify-center space-x-2 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-primary-500 hover:text-white transition-all duration-300 group">
                        <Plus
                            size={20}
                            className="transform group-hover:rotate-90 transition-transform duration-300"
                        />
                        <span>添加新日程</span>
                    </button>
                </div>

                {/* 统计图表 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* 成长轨迹 */}
                    <div className="bg-white rounded-xl shadow-lg p-6 border border-primary-50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                        <div className="flex items-center space-x-2 mb-4 group">
                            <BarChart3
                                className="text-primary-500 group-hover:text-primary-600 transition-colors"
                                size={20}
                            />
                            <h2 className="text-base font-bold text-gray-800">
                                成长轨迹 - 日程完成趋势
                            </h2>
                        </div>
                        <ResponsiveContainer width="100%" height={250}>
                            <LineChart data={weeklyCheckInData}>
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    stroke="#f3f4f6"
                                />
                                <XAxis
                                    dataKey="week"
                                    tick={{ fill: "#6b7280", fontSize: 11 }}
                                />
                                <YAxis
                                    tick={{ fill: "#6b7280", fontSize: 11 }}
                                />
                                <Tooltip
                                    contentStyle={{
                                        borderRadius: "8px",
                                        border: "1px solid #fcd34d",
                                        boxShadow:
                                            "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                                    }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="count"
                                    stroke="#2790FD"
                                    strokeWidth={3}
                                    dot={{
                                        stroke: "#2790FD",
                                        strokeWidth: 2,
                                        r: 5,
                                        fill: "white",
                                    }}
                                    activeDot={{
                                        r: 7,
                                        stroke: "#2790FD",
                                        strokeWidth: 2,
                                        fill: "#2790FD",
                                    }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6 border border-neutral-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                        <div className="flex items-center space-x-2 mb-4 group">
                            <BarChart3
                                className="text-primary-500 group-hover:text-primary-600 transition-colors"
                                size={20}
                            />
                            <h2 className="text-base font-bold text-neutral-800">
                                成长轨迹 - 积分增长趋势
                            </h2>
                        </div>
                        <ResponsiveContainer width="100%" height={250}>
                            <LineChart data={weeklyPointsData}>
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    stroke="#f3f4f6"
                                />
                                <XAxis
                                    dataKey="week"
                                    tick={{ fill: "#6b7280", fontSize: 11 }}
                                />
                                <YAxis
                                    tick={{ fill: "#6b7280", fontSize: 11 }}
                                />
                                <Tooltip
                                    contentStyle={{
                                        borderRadius: "8px",
                                        border: "1px solid #fcd34d",
                                        boxShadow:
                                            "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                                    }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="points"
                                    stroke="#FF5792"
                                    strokeWidth={3}
                                    dot={{
                                        stroke: "#FF5792",
                                        strokeWidth: 2,
                                        r: 5,
                                        fill: "white",
                                    }}
                                    activeDot={{
                                        r: 7,
                                        stroke: "#FF5792",
                                        strokeWidth: 2,
                                        fill: "#FF5792",
                                    }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    {/* 学习达人 */}
                    <div className="bg-white rounded-xl shadow-lg p-6 border border-primary-50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                        <div className="flex items-center space-x-2 mb-4 group">
                            <BarChart3
                                className="text-secondary-500 group-hover:text-secondary-600 transition-colors"
                                size={20}
                            />
                            <h2 className="text-base font-bold text-neutral-800">
                                学习达人 - 观看时长
                            </h2>
                        </div>
                        <ResponsiveContainer width="100%" height={250}>
                            <LineChart data={learningTimeData}>
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    stroke="#f3f4f6"
                                />
                                <XAxis
                                    dataKey="month"
                                    tick={{ fill: "#6b7280", fontSize: 11 }}
                                />
                                <YAxis
                                    tick={{ fill: "#6b7280", fontSize: 11 }}
                                />
                                <Tooltip
                                    contentStyle={{
                                        borderRadius: "8px",
                                        border: "1px solid #fcd34d",
                                        boxShadow:
                                            "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                                    }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="hours"
                                    stroke="#2790FD"
                                    strokeWidth={3}
                                    dot={{
                                        stroke: "#2790FD",
                                        strokeWidth: 2,
                                        r: 5,
                                        fill: "white",
                                    }}
                                    activeDot={{
                                        r: 7,
                                        stroke: "#2790FD",
                                        strokeWidth: 2,
                                        fill: "#2790FD",
                                    }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    {/* 朋友圈达人 */}
                    <div className="bg-white rounded-xl shadow-lg p-6 border border-primary-50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                        <div className="flex items-center space-x-2 mb-4 group">
                            <BarChart3
                                className="text-accent-500 group-hover:text-accent-600 transition-colors"
                                size={20}
                            />
                            <h2 className="text-base font-bold text-gray-800">
                                朋友圈达人 - 拉新助力
                            </h2>
                        </div>
                        <ResponsiveContainer width="100%" height={250}>
                            <LineChart data={referralData}>
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    stroke="#f3f4f6"
                                />
                                <XAxis
                                    dataKey="month"
                                    tick={{ fill: "#6b7280", fontSize: 11 }}
                                />
                                <YAxis
                                    tick={{ fill: "#6b7280", fontSize: 11 }}
                                />
                                <Tooltip
                                    contentStyle={{
                                        borderRadius: "8px",
                                        border: "1px solid #fcd34d",
                                        boxShadow:
                                            "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                                    }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="count"
                                    stroke="#1a92ff"
                                    strokeWidth={3}
                                    dot={{
                                        stroke: "#1a92ff",
                                        strokeWidth: 2,
                                        r: 5,
                                        fill: "white",
                                    }}
                                    activeDot={{
                                        r: 7,
                                        stroke: "#1a92ff",
                                        strokeWidth: 2,
                                        fill: "#1a92ff",
                                    }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* 计划设置模态框 */}
            {showSetupModal && (
                <PlanSetupModal
                    onClose={() => setShowSetupModal(false)}
                    userId={user?.id}
                    onSuccess={loadSchedules}
                    startDate={startDate}
                    endDate={endDate}
                    onDateReset={resetToCurrentMonth}
                    setPageLoading={setPageLoading}
                />
            )}

            {/* ContentModal 弹窗 */}
            {showContentModal && selectedSchedule && (
                <ContentModal
                    onClose={() => {
                        setShowContentModal(false);
                        setSelectedSchedule(null);
                    }}
                    taskId={selectedSchedule.id}
                    title={selectedSchedule.taskName}
                />
            )}

            {/* QRCodeModal 弹窗 */}
            {showQRCodeModal && (
                <QRCodeModal
                    onClose={() => setShowQRCodeModal(false)}
                    qrImagePath={selectedSchedule?.toolCodeImageUrl}
                    title="学姐助你成长"
                    description="手机微信扫码立即体验"
                />
            )}

            {/* 页面Loading遮罩 */}
            {pageLoading && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-8 flex flex-col items-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mb-4"></div>
                        <p className="text-gray-700">正在生成您的专属计划...</p>
                    </div>
                </div>
            )}
        </div>
    );
}

function PlanSetupModal({
    onClose,
    userId,
    onSuccess,
    startDate,
    endDate,
    onDateReset,
    setPageLoading,
}: {
    onClose: () => void;
    userId?: string;
    onSuccess?: () => void;
    startDate?: string;
    endDate?: string;
    onDateReset?: () => void;
    setPageLoading?: (loading: boolean) => void;
}) {
    const [step, setStep] = useState(0);
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        school: "",
        major: "",
        grade: "",
        goal: "",
    });

    const questions = [
        {
            key: "school",
            question: "请问您就读于哪所学校？",
            placeholder: "例如：清华大学",
        },
        {
            key: "major",
            question: "您的专业是什么？",
            placeholder: "例如：计算机科学与技术",
        },
        {
            key: "grade",
            question: "您目前是几年级？",
            options: ["大一", "大二", "大三", "大四"],
        },
        {
            key: "goal",
            question: "您的毕业目标是什么？",
            options: ['公务员', '事业单位', '央国企', '银行', '保研', '考研', "留学"],
        },
    ];

    const currentQuestion = questions[step];

    const handleNext = async (submittedGoal?: string) => {
        if (step < questions.length - 1) {
            setStep(step + 1);
        } else {
            // 提交用户信息并生成计划
            if (!userId) {
                alert("请先登录");
                return;
            }

            // 使用传入的 goal 值,如果没有则使用 formData 中的值
            const goalValue = submittedGoal || formData.goal;

            try {
                setSubmitting(true);

                // 显示页面loading - 在关闭模态框之前
                if (setPageLoading) {
                    setPageLoading(true);
                }

                // 打印调试信息
                console.log("提交的用户信息:", {
                    userId: userId,
                    grade: formData.grade,
                    major: formData.major,
                    school: formData.school,
                    target: goalValue,
                });

                // 调用更新用户信息接口
                await apiService.updateUser({
                    userId: userId,
                    grade: formData.grade,
                    major: formData.major,
                    school: formData.school,
                    target: goalValue,
                });

                // 重置日期为当月第一天和最后一天
                if (onDateReset) {
                    onDateReset();
                }

                // 关闭模态框
                onClose();

                // 立即开始轮询检查列表数据（移除2秒延迟）
                const pollInterval = setInterval(async () => {
                    try {
                        const response = await apiService.getTaskList({
                            startDay: startDate || "",
                            endDay: endDate || "",
                            userId: userId,
                        });

                        // 如果有数据,停止轮询
                        if (response.result && response.result.length > 0) {
                            clearInterval(pollInterval);
                            console.log("日程数据已生成");
                            // 隐藏页面loading
                            if (setPageLoading) {
                                setPageLoading(false);
                            }
                            alert("日程计划已生成！");
                            // 调用 onSuccess 更新界面
                            if (onSuccess) {
                                onSuccess();
                            }
                        }
                    } catch (error) {
                        console.error("轮询日程数据失败:", error);
                    }
                }, 3000); // 每3秒轮询一次

                // 设置最大轮询时间(60秒),避免无限轮询
                setTimeout(() => {
                    clearInterval(pollInterval);
                    // 隐藏页面loading
                    if (setPageLoading) {
                        setPageLoading(false);
                    }
                    console.log("停止轮询 - 已超时");
                    alert("生成计划时间较长，请稍后刷新页面查看");
                }, 60000);
            } catch (error) {
                console.error("更新用户信息失败:", error);
                alert("更新用户信息失败，请重试");
                // 隐藏页面loading
                if (setPageLoading) {
                    setPageLoading(false);
                }
            } finally {
                setSubmitting(false);
            }
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    制定您的成长计划
                </h2>

                <div className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">
                            步骤 {step + 1}/{questions.length}
                        </span>
                        <span className="text-sm text-gray-600">
                            {Math.round(((step + 1) / questions.length) * 100)}%
                        </span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-primary-gradient transition-all duration-300"
                            style={{
                                width: `${
                                    ((step + 1) / questions.length) * 100
                                }%`,
                            }}
                        />
                    </div>
                </div>

                <div className="mb-8">
                    <p className="text-xl font-semibold text-gray-800 mb-4">
                        {currentQuestion.question}
                    </p>

                    {currentQuestion.options ? (
                        <div className="grid grid-cols-2 gap-3">
                            {currentQuestion.options.map((option) => (
                                <button
                                    key={option}
                                    onClick={() => {
                                        setFormData({
                                            ...formData,
                                            [currentQuestion.key]: option,
                                        });
                                        // 最后一步时只选中不自动跳转,其他步骤自动跳转
                                        if (step !== questions.length - 1) {
                                            setTimeout(
                                                () => setStep(step + 1),
                                                300
                                            );
                                        }
                                    }}
                                    className={`p-4 rounded-xl border-2 transition-all ${
                                        formData[
                                            currentQuestion.key as keyof typeof formData
                                        ] === option
                                            ? "border-primary-500 bg-primary-50"
                                            : "border-gray-200 hover:border-primary-300 hover:bg-gray-50"
                                    }`}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    ) : (
                        <input
                            type="text"
                            value={
                                formData[
                                    currentQuestion.key as keyof typeof formData
                                ]
                            }
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    [currentQuestion.key]: e.target.value,
                                })
                            }
                            placeholder={currentQuestion.placeholder}
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                        />
                    )}
                </div>

                <div className="flex space-x-3">
                    {step > 0 && (
                        <button
                            onClick={() => setStep(step - 1)}
                            className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            上一步
                        </button>
                    )}
                    <button
                        onClick={() => handleNext()}
                        disabled={
                            !formData[
                                currentQuestion.key as keyof typeof formData
                            ] || submitting
                        }
                        className="flex-1 primary-button py-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                        {submitting
                            ? "提交中..."
                            : step === questions.length - 1
                            ? "生成计划"
                            : "下一步"}
                    </button>
                    <button
                        onClick={onClose}
                        className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        取消
                    </button>
                </div>
            </div>
        </div>
    );
}
