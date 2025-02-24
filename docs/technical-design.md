# EasyTodo 技术方案文档

## 1. 项目概述

EasyTodo 是一个基于 Web 的任务管理工具，旨在帮助用户更好地管理日常任务。该工具区分主干任务和额外任务，并通过活动热图直观展示任务完成情况。

## 2. 技术栈

- **前端框架**: Next.js 14 (React Framework)
- **开发语言**: TypeScript
- **样式解决方案**: TailwindCSS
- **图标库**: Lucide Icons
- **日期处理**: date-fns
- **数据存储**: localStorage
- **状态管理**: React Context

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

2. **TodoList**
   - 展示任务列表
   - 处理任务添加、完成、删除操作
   - 支持不同类型任务的展示

3. **ActivityHeatmap**
   - 展示90天活动记录
   - 使用颜色深浅表示完成率
   - 提供任务完成情况的可视化展示

## 4. 功能特性

### 4.1 任务管理
- 添加新任务
- 标记任务完成/未完成
- 删除任务
- 区分主干任务和额外任务

### 4.2 数据持久化
- 使用 localStorage 存储任务数据
- 自动保存数据变更
- 页面刷新后保持数据状态

### 4.3 活动记录
- 展示最近90天的任务完成情况
- 使用不同深度的颜色表示完成率
- 鼠标悬停显示具体日期和完成率

## 5. 用户界面

### 5.1 响应式设计
- 移动端单列布局
- 桌面端双列布局
- 自适应容器宽度

### 5.2 交互设计
- 简洁的任务添加表单
- 直观的完成状态切换
- 清晰的删除操作
- 可视化的活动热图

## 6. 性能优化

### 6.1 状态管理
- 使用 React Context 避免 prop drilling
- 优化渲染性能

### 6.2 数据处理
- 本地数据持久化
- 高效的数据结构设计

## 7. 未来规划

### 7.1 潜在功能扩展
- 任务优先级
- 任务截止日期
- 任务分类标签
- 数据导出功能
- 云端同步

### 7.2 性能优化方向
- 虚拟列表
- 数据分页
- 离线支持 