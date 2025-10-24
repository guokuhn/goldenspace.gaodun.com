import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import {
    Calendar,
    CheckCircle,
    Circle,
    Plus,
    BarChart3,
    ArrowRight,
    Smartphone,
    Loader2,
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
import {
    weeklyCheckInData,
    weeklyPointsData,
} from "../data/mockData";
import { TaskResponse } from "../types/api";
import { apiService } from "../services/api";
import { userStore } from "../stores/UserStore";
import { getWeekRange } from "../utils/scheduleGenerator";
import AddScheduleModal from "./AddScheduleModal";
import SyncScheduleModal from "./SyncScheduleModal";
import ReferralConfirmModal from "./ReferralConfirmModal";
import ContentModal from "./ContentModal";
import QRCodeModal from "./QRCodeModal";

interface MyScheduleProps {
    isLoggedIn: boolean;
    onLoginClick: () => void;
}

const MySchedule = observer(function MySchedule({
    isLoggedIn,
    onLoginClick,
}: MyScheduleProps) {
    const [schedules, setSchedules] = useState<TaskResponse[]>([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showSyncModal, setShowSyncModal] = useState(false);
    const [showReferralModal, setShowReferralModal] = useState(false);
    const [showContentModal, setShowContentModal] = useState(false);
    const [showQRCodeModal, setShowQRCodeModal] = useState(false);
    const [selectedSchedule, setSelectedSchedule] = useState<TaskResponse | null>(null);
    const [pendingScheduleId, setPendingScheduleId] = useState<string | null>(
        null
    );
    const [isLoading, setIsLoading] = useState(false);

    // 获取日程列表
    const fetchTasks = async () => {
      if (!isLoggedIn) {
          console.log("❌ 未登录，跳过加载日程");
          return;
      }

      if (!userStore.userId) {
          console.log("❌ userId 为空，跳过加载日程");
          return;
      }

      console.log("✅ 开始加载任务列表...");
      setIsLoading(true);
      try {
          // 获取本周的任务（周一到周日）
          const {
              startDateFormatted,
              endDateFormatted,
          } = getWeekRange();

          const response = await apiService.getTaskList({
              userId: userStore.userId,
              startDay: startDateFormatted,
              endDay: endDateFormatted,
          });

          if (response.status === 200) {
              setSchedules(response.result || []);
          } else {
              console.error("❌ 获取任务列表失败:", response.message);
          }
      } catch (error) {
          console.error("❌ 获取任务列表失败:", error);
      } finally {
          setIsLoading(false);
      }
    };

    // 加载用户的个性化日程
    useEffect(() => {
        fetchTasks();
    }, [isLoggedIn, userStore.userId]);

    // 轮询逻辑：当列表为空时每2秒请求一次
    useEffect(() => {
        if (!isLoggedIn || !userStore.userId) {
            return;
        }

        // 如果列表为空，开始轮询
        if (schedules.length === 0 && !isLoading) {
            const pollingInterval = setInterval(() => {
                console.log("📡 列表为空，执行轮询请求...");
                fetchTasks();
            }, 2000); // 每2秒轮询一次

            // 清理定时器
            return () => {
                console.log("🛑 停止轮询");
                clearInterval(pollingInterval);
            };
        }
    }, [schedules.length, isLoggedIn, userStore.userId, isLoading]);

    const toggleComplete = async (id: number) => {
        const schedule = schedules.find((s) => s.id === id);
        if (!schedule) return;

        // 如果已完成不处理
        if (schedule.taskStatus === 1) return;

        // 只比较年月日，不包括时间
        const today = new Date();
        const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
        
        const scheduleDate = schedule.taskDate?.substring(0, 10) || '';
        
        // 如果今天早于任务日期，不能提前完成
        if (todayStr < scheduleDate) {
            alert(`不能提前完成日程！此日程计划日期为 ${scheduleDate}，请在当天或之后标记完成。`);
            return;
        }
        
        // 如果今天晚于任务日期，需要拉新确认
        if (todayStr > scheduleDate) {
            setPendingScheduleId(schedule.id?.toString() || '');
            setShowReferralModal(true);
            return;
        }
        
        // 如果是当天，直接完成

        // 调用完成任务接口
        const response = await apiService.completeTask({
            taskId: Number(schedule.id),
            userId: userStore.userInfo?.userId || ''
        });
        if (response.status === 200) {
            setSchedules(schedules.map((s) => s.id === id ? { ...s, taskStatus: 1 } : s));
        }
    };

    const handleReferralConfirm = () => {
        if (!pendingScheduleId) return;

        // 标记日程完成
        const updatedSchedules = schedules.map((s) =>
            s.id === Number(pendingScheduleId)
                ? { ...s, taskStatus: 1 }
                : s
        );
        setSchedules(updatedSchedules);
        localStorage.setItem("userSchedules", JSON.stringify(updatedSchedules));

        // 重置状态
        setShowReferralModal(false);
        setPendingScheduleId(null);

        // 显示成功提示
        alert("恭喜完成拉新任务！日程已标记为完成，您获得了50积分奖励🎉");
    };

    // 去看看
    const goToSee = (schedule: TaskResponse) => {
        console.log('-----> ', schedule)
        setSelectedSchedule(schedule);
        if (schedule.jumpType === 'AI') {
            setShowContentModal(true);
        } 

        if (schedule.toolCodeImageUrl) {
            setShowQRCodeModal(true);
        }
    };
    if (!isLoggedIn) {
        return (
            <div className="card p-6 h-[750px] flex flex-col relative overflow-hidden">
                {/* 背景图片 */}
                <div 
                    className="absolute inset-0 bg-cover bg-center opacity-20 blur-sm"
                    style={{ backgroundImage: 'url(/images/xuejie3.png)' }}
                />
                
                {/* 内容层 */}
                <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                            <Calendar className="module-icon" size={24} />
                            <h2 className="text-xl font-bold module-title">
                                我的日程
                            </h2>
                        </div>
                    </div>
                    <div className="text-center py-12 flex-1 flex flex-col items-center justify-center">
                        {/* <Calendar
                            className="text-6xl module-secondary mb-4 mx-auto"
                            size={80}
                        /> */}
                        <p className="mb-12 text-4xl font-semibold bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 bg-clip-text text-transparent">
                            开始制定您的成长计划
                        </p>
                        <button
                            onClick={onLoginClick}
                            className="primary-button px-8 py-3"
                        >
                            立即开始
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="card p-6 h-[750px] flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                    <Calendar className="module-icon" size={24} />
                    <h2 className="text-xl font-bold module-title">我的日程</h2>
                </div>
                <Link
                    to="/schedule"
                    className="text-sm module-secondary hover:text-primary-600 flex items-center gap-1"
                >
                    <span>查看详情</span>
                    <ArrowRight size={16} />
                </Link>
            </div>

            {/* 左右两栏布局 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 overflow-hidden relative">
                {/* Loading遮罩层 - 覆盖整个模块 */}
                {isLoading && (
                    <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex items-center justify-center rounded-lg">
                        <div className="text-center">
                            <Loader2
                                className="animate-spin text-primary-400 mx-auto mb-2"
                                size={40}
                            />
                            <p className="text-neutral-500">
                                加载日程中...
                            </p>
                        </div>
                    </div>
                )}

                {/* 左侧：日程事项 */}
                <div className="flex flex-col h-full overflow-y-auto">
                    <>
                            <div className="space-y-3 mb-6 flex-1 overflow-y-auto scrollbar-hide">
                                {schedules.slice(0, 15).map((schedule) => {
                                    return (
                                        <div
                                            key={schedule.id}
                                            className="flex items-start space-x-3 p-3 rounded-lg bg-white border border-neutral-200 hover:border-primary-300 transition-all duration-300"
                                        >
                                            <button
                                                onClick={() =>
                                                    toggleComplete(schedule.id)
                                                }
                                                className="mt-1 flex-shrink-0 transition-transform hover:scale-110 checkbox-btn"
                                            >
                                                {schedule.taskStatus === 1 ? (
                                                    <CheckCircle
                                                        className="text-primary-400"
                                                        size={20}
                                                    />
                                                ) : (
                                                    <Circle
                                                        className="text-neutral-400 hover:text-primary-400 transition-colors"
                                                        size={20}
                                                    />
                                                )}
                                            </button>

                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between">
                                                    <p
                                                        className={`font-medium text-primary-400 ${
                                                            schedule.taskStatus === 1 ? "line-through opacity-60"
                                                                : ""
                                                        }`}
                                                    >
                                                        {schedule.taskName}
                                                    </p>
                                                </div>
                                                <p className="text-xs text-neutral-500 mt-1">
                                                    {schedule.taskDate} ·{" "}
                                                    {schedule.taskDesc}
                                                </p>
                                                <div className="flex items-center space-x-2 mt-2">
                                                    <span className="text-xs bg-primary-50 text-primary-400 px-2 py-1 rounded border border-primary-200">
                                                        +{schedule.taskPoints}积分
                                                    </span>
                                                </div>
                                            </div>

                                            {/** 去看看按钮 */}
                                            {!!schedule.jumpType && (
                                                <button
                                                    onClick={() => goToSee(schedule)}
                                                    className="flex-shrink-0 flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-primary-500 bg-primary-50 border border-primary-200 rounded-lg hover:bg-primary-100 hover:border-primary-300 hover:shadow-md transition-all duration-200 group"
                                                >
                                                    <span>去看看</span>
                                                    <ExternalLink 
                                                        size={14} 
                                                        className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
                                                    />
                                                </button>
                                            )}

                                            {/* 图片区域 */}
                                            {/* {schedule.imageUrl && (
                                                <div className="flex-shrink-0 w-26 h-20 rounded-lg overflow-hidden border border-neutral-200 bg-neutral-100">
                                                    <img
                                                        src={schedule.imageUrl || '/images/course1.png'}
                                                        alt={schedule.taskName || ''}
                                                        className="w-full h-full object-cover"
                                                        onError={(e) => {
                                                            // 图片加载失败时显示占位符
                                                            const target =
                                                                e.target as HTMLImageElement;
                                                            target.style.display =
                                                                "none";
                                                            if (
                                                                target.parentElement
                                                            ) {
                                                                target.parentElement.innerHTML =
                                                                    '<div class="w-full h-full flex items-center justify-center text-neutral-400 text-xs">📷</div>';
                                                            }
                                                        }}
                                                    />
                                                </div>
                                            )} */}
                                        </div>
                                    );
                                })}
                            </div>

                            <button
                                onClick={() => setShowAddModal(true)}
                                className="w-full flex items-center justify-center space-x-2 bg-module-bg-primary/5 module-primary py-3 rounded-lg hover:bg-module-bg-primary/10 transition-colors border border-module-bg-primary/10 hover:shadow-md"
                            >
                                <Plus size={20} />
                                <span>添加日程</span>
                            </button>
                    </>
                </div>

                {/* 右侧：趋势图 */}
                <div className="flex flex-col h-full">
                    <div className="space-y-6 flex-1 overflow-y-auto scrollbar-hide">
                        {/* 日程完成趋势 */}
                        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md border border-accent/10">
                            <div className="flex items-center space-x-2 mb-4">
                                <BarChart3
                                    className="text-primary-400"
                                    size={20}
                                />
                                <h3 className="font-semibold text-primary-400">
                                    日程完成趋势
                                </h3>
                            </div>
                            <ResponsiveContainer width="100%" height={180}>
                                <LineChart data={weeklyCheckInData}>
                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        stroke="#f3f4f6"
                                    />
                                    <XAxis
                                        dataKey="week"
                                        tick={{ fontSize: 10, fill: "#6b7280" }}
                                    />
                                    <YAxis
                                        tick={{ fontSize: 10, fill: "#6b7280" }}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            borderRadius: "8px",
                                            border: "1px solid #2790FD",
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
                                            r: 4,
                                            fill: "white",
                                        }}
                                        activeDot={{
                                            r: 6,
                                            stroke: "#2790FD",
                                            strokeWidth: 2,
                                            fill: "#2790FD",
                                        }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>

                        {/* 积分增长趋势 */}
                        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md border border-accent/10">
                            <div className="flex items-center space-x-2 mb-4">
                                <BarChart3
                                    className="text-primary-400"
                                    size={20}
                                />
                                <h3 className="font-semibold text-primary-400">
                                    积分增长趋势
                                </h3>
                            </div>
                            <ResponsiveContainer width="100%" height={180}>
                                <LineChart data={weeklyPointsData}>
                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        stroke="#f3f4f6"
                                    />
                                    <XAxis
                                        dataKey="week"
                                        tick={{ fontSize: 10, fill: "#6b7280" }}
                                    />
                                    <YAxis
                                        tick={{ fontSize: 10, fill: "#6b7280" }}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            borderRadius: "8px",
                                            border: "1px solid #FF5792",
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
                                            r: 4,
                                            fill: "white",
                                        }}
                                        activeDot={{
                                            r: 6,
                                            stroke: "#FF5792",
                                            strokeWidth: 2,
                                            fill: "#FF5792",
                                        }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="space-y-3 mt-6">
                        <button
                            onClick={() => setShowSyncModal(true)}
                            className="w-full flex items-center justify-center space-x-2 bg-secondary-50 text-secondary-400 py-3 rounded-lg hover:bg-secondary-100 transition-colors border border-secondary-200 hover:shadow-md"
                        >
                            <Smartphone size={20} />
                            <span>同步至手机</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* 添加日程模态框 */}
            {showAddModal && (
                <AddScheduleModal
                    onClose={() => setShowAddModal(false)}
                    onAdd={fetchTasks}
                />
            )}

            {/* 同步至手机模态框 */}
            {showSyncModal && (
                <SyncScheduleModal
                    onClose={() => setShowSyncModal(false)}
                    schedules={schedules}
                />
            )}

            {/* 拉新确认模态框 */}
            {showReferralModal && pendingScheduleId && (
                <ReferralConfirmModal
                    onClose={() => {
                        setShowReferralModal(false);
                        setPendingScheduleId(null);
                    }}
                    onConfirm={handleReferralConfirm}
                    scheduleTitle={
                        schedules.find((s) => s.id === Number(pendingScheduleId))
                            ?.taskName || ""
                    }
                    scheduleDate={
                        schedules.find((s) => s.id === Number(pendingScheduleId))
                            ?.taskDate || ""
                    }
                />
            )}

            {/* 内容查看模态框 */}
            {showContentModal && selectedSchedule && (
                <ContentModal
                    onClose={() => {
                        setShowContentModal(false);
                        setSelectedSchedule(null);
                    }}
                    title="Hi，我来帮你解惑了～"
                    taskId={selectedSchedule.id}
                    updateTime={selectedSchedule.taskDate}
                />
            )}

            {/* 二维码模态框 */}
            {showQRCodeModal && (
                <QRCodeModal
                    onClose={() => setShowQRCodeModal(false)}
                    qrImagePath={selectedSchedule?.toolCodeImageUrl}
                    title="学姐助你成长"
                    description="手机微信扫码立即体验"
                />
            )}
        </div>
    );
});

export default MySchedule;
