# TaskFlow — Personal Task Management App

## Overview
A simple personal task management web app where users can create, organize, and track their daily tasks with categories and priority levels.

## Target Users
- Individual users who want a clean, distraction-free task manager
- No team collaboration features needed (single-user only)

## Core Features

### 1. User Authentication
- Google OAuth login
- Session persistence across browser refreshes

### 2. Task CRUD
- Create tasks with: title, description (optional), due date (optional), priority (high/medium/low)
- Edit task details inline
- Delete tasks with confirmation
- Mark tasks as complete/incomplete (toggle)

### 3. Task Organization
- Categories: users can create custom categories (e.g., "Work", "Personal", "Shopping")
- Filter tasks by category, priority, or completion status
- Sort by due date, priority, or creation date

### 4. Dashboard
- Today's tasks view (tasks due today or overdue)
- Summary stats: total tasks, completed today, overdue count
- Quick-add task input at the top

## Non-Functional Requirements
- Mobile-responsive design
- Page load under 2 seconds
- Data persists across sessions (server-side database)

## Out of Scope
- Team collaboration / shared tasks
- File attachments
- Calendar integration
- Push notifications
