# EasyTodo 技术方案文档

## 1. 项目概述

EasyTodo 是一个简单高效的任务管理工具，旨在帮助用户更好地管理日常任务。该工具区分主干任务和额外任务，通过活动热图直观展示任务完成情况，并支持按年份查看历史记录。

## 2. 技术栈

- **前端框架**: Next.js 14 (React Framework)
- **开发语言**: TypeScript
- **样式解决方案**: TailwindCSS
- **UI 组件库**: Shadcn/ui
- **图标库**: Lucide Icons
- **日期处理**: date-fns
- **数据存储**: localStorage
- **状态管理**: React Context
- **工具库**: 
  - clsx (类名合并)
  - class-variance-authority (组件变体管理)
  - tailwind-merge (Tailwind 类名合并)

## 3. 系统架构

### 3.1 数据结构

```typescript
// Todo 项数据结构
interface Todo {
  id: string;          // 唯一标识符
  content: string;     // 任务内容
  isCompleted: boolean; // 完成状态
  createdAt: string;   // 创建日期
  type: 'main' | 'extra'; // 任务类型
}

// 每日记录数据结构
interface DailyRecord {
  date: string;            // 日期
  mainTodosCompleted: number; // 已完成的主干任务数
  totalMainTodos: number;     // 主干任务总数
}
```

### 3.2 核心组件

1. **TodoProvider**
   - 负责全局状态管理
   - 提供任务的 CRUD 操作
   - 处理数据持久化
   - 支持指定日期创建任务

2. **DailyTasks**
   - 展示任务列表
   - 处理任务添加、完成、删除操作
   - 支持不同类型任务的展示
   - 支持周切换和日期选择
   - 防止未来日期任务的完成

3. **ActivityHeatmap**
   - 展示年度活动记录
   - 支持年份切换
   - 使用颜色深浅表示完成率
   - 支持暗色模式适配
   - 提供详细的日期和完成率提示

4. **WeekTabs**
   - 周日期导航
   - 支持日期选择
   - 显示当前日期标记
   - 集成日历选择器

### 3.3 UI 组件

1. **Button**
   - 支持多种变体：default、destructive、outline、secondary、ghost、link
   - 支持多种尺寸：default、sm、lg、icon
   - 支持自定义样式和状态

2. **Checkbox**
   - 基于 Radix UI
   - 支持自定义样式和状态
   - 支持键盘操作和无障碍功能
   - 支持禁用状态（未来日期）

3. **Input**
   - 统一的输入框样式
   - 支持多种状态：focus、disabled、error
   - 支持自定义样式和属性

4. **Calendar**
   - 基于 react-day-picker
   - 支持日期选择
   - 自定义主题样式
   - 中文本地化

5. **Dialog**
   - 基于 Radix UI
   - 响应式设计
   - 移动端适配
   - 动画过渡效果

## 4. 功能特性

### 4.1 任务管理
- 添加新任务（支持指定日期）
- 标记任务完成/未完成
- 删除任务
- 区分主干任务和额外任务
- 防止操作未来日期任务

### 4.2 日期导航
- 周视图切换
- 日期选择器
- 当前日期标记
- 日历快速选择

### 4.3 数据可视化
- 年度活动热图
- 年份切换
- 完成率展示
- 详细的提示信息

### 4.4 数据持久化
- 使用 localStorage 存储任务数据
- 自动保存数据变更
- 页面刷新后保持数据状态

## 5. 用户界面

### 5.1 主题系统
- 支持亮色/暗色模式
- 使用 CSS 变量管理主题色
- 渐变色标题效果
- 统一的颜色系统
  - Primary: 主要操作
  - Secondary: 次要操作
  - Accent: 强调
  - Muted: 次要信息
  - Destructive: 危险操作

### 5.2 响应式设计
- 移动端单列布局
- 桌面端双列布局
- 自适应容器宽度
- 移动端活动热图弹窗

### 5.3 交互设计
- 简洁的任务添加表单
- 直观的完成状态切换
- 清晰的删除操作
- 可视化的活动热图
- 优雅的动画过渡效果

## 6. 性能优化

### 6.1 状态管理
- 使用 React Context 避免 prop drilling
- 优化渲染性能
- 合理的数据结构

### 6.2 样式优化
- 使用 Tailwind JIT 编译
- 组件样式变体管理
- 智能类名合并
- 渐变色文字效果

### 6.3 数据处理
- 本地数据持久化
- 高效的数据结构设计
- 日期格式化处理

## 7. 未来规划

### 7.1 功能扩展
- 任务优先级
- 任务截止日期
- 任务分类标签
- 数据导出功能
- 云端同步

### 7.2 性能优化
- 虚拟列表
- 数据分页
- 离线支持
- 缓存优化

### 7.3 UI/UX 改进
- 更多自定义主题选项
- 更丰富的动画效果
- 更多的快捷键支持
- 更完善的无障碍支持
- 任务拖拽排序 