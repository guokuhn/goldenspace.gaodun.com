/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 主色系统
        primary: {
          DEFAULT: '#2790FD',    // 主色：清新蓝
          50: '#E8F3FF',         // 主色浅蓝（弱背景）
          100: '#BAE0FF',
          200: '#8CCCFF',
          300: '#5EB8FF',
          400: '#2790FD',
          500: '#1E7CD3',        // 主色深蓝（hover）
          600: '#1a7fd9',
          700: '#005f93',
          800: '#004f70',
          900: '#003f4d',
        },
        // 辅色系统
        secondary: {
          DEFAULT: '#FF5792',    // 辅色：活力红
          50: '#FFEFF5',         // 辅色浅红（弱背景）
          100: '#FFB3D6',
          200: '#FF80BB',
          300: '#FF4DA0',
          400: '#FF5792',
          500: '#E04A7F',        // 辅色深红（hover）
          600: '#CC2968',
          700: '#B31253',
          800: '#99003E',
          900: '#800029',
        },
        // 快捷访问
        accent: {
          DEFAULT: '#2790FD',
          light: '#E8F3FF',
        },
        // 中性色系统
        neutral: {
          50: '#F9FAFB',         // 极浅灰（页面背景）
          100: '#F3F4F6',
          200: '#E5E7EB',        // 边框灰（通用分隔）
          300: '#D1D5DB',        // 淡灰（禁用状态）
          400: '#9CA3AF',        // 浅灰（辅助文字）
          500: '#6B7280',        // 中灰（次要文字）
          600: '#4B5563',        // 中深灰（正文）
          700: '#374151',
          800: '#1F2937',        // 深灰（一级文字）
          900: '#111827',
        },
        // 状态色
        success: '#10B981',      // 成功提示
        warning: '#F59E0B',      // 警告提示
        error: '#FF5792',        // 错误提示（使用辅色）
        // 特殊色（排行榜）
        gold: '#FFD700',         // 第1名
        silver: '#E5E7EB',       // 第2名
        bronze: '#CD7F32',       // 第3名
        light: '#FFFFFF',
        dark: '#000000'
      },
      backgroundImage: {
        'primary-gradient': 'linear-gradient(135deg, #2790FD 0%, #5EB8FF 100%)',
        'secondary-gradient': 'linear-gradient(135deg, #FF5792 0%, #FF4DA0 100%)',
        'card-gradient': 'linear-gradient(145deg, #FFFFFF 0%, #F9FAFB 100%)',
        'accent-glow': '0 0 15px rgba(39,144,253,0.2)',
      }
    },
  },
  plugins: [],
}

