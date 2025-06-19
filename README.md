# Dashboard Application - Qarar Assessment

A modern React dashboard application with authentication, task management, notifications, and user profile features. Built with React 19, Redux Toolkit, Tailwind CSS, and comprehensive testing.

## Setup & Run Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation
```bash
# Clone the repository
git clone https://github.com/fizbaazhar/qarar-assessment.git
cd qarar-assessment

# Install dependencies
npm install
```

### Development
```bash
# Start development server
npm run dev

```

### Testing
```bash
# Run all tests
npm test


# Run tests with coverage
npm run test:coverage
```

### Building for Production
```bash
# Build the application
npm run build

# Preview the production build
npm run preview
```

## 🏗️ Brief Overview of Approach

### Architecture & Technology Stack
- **Frontend Framework**: React 19 with modern hooks and functional components
- **State Management**: Redux Toolkit for centralized state management
- **Styling**: Tailwind CSS for utility-first styling with custom design system, MUI
- **Testing**: React Testing Library with Vitest for comprehensive testing
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: React Router for client-side navigation

### Key Features Implemented

#### 1. **Authentication System**
- Login/Signup pages with form validation
- Redux-based auth state management
- User-friendly name generation from email
- Persistent authentication state

#### 2. **Dashboard Interface**
- Modern, responsive design with gradient backgrounds
- Card-based layout for different data sections
- Real-time statistics and metrics display
- Intuitive navigation between sections

#### 3. **Task Management**
- Drag-and-drop task reordering
- Task creation, editing, and deletion
- Status tracking and progress visualization
- Persistent task state with localStorage

#### 4. **Notification System**
- Real-time notification display
- Mark as read/unread functionality
- Notification count badges
- Different notification types (info, warning, success, error)
- Bulk actions (mark all as read)

#### 5. **User Profile Management**
- Profile information editing
- Form validation and error handling
- Data persistence across sessions
- Integration with authentication system

### Component Architecture
- **Reusable Components**: Button, Input, Card, Modal components
- **Layout Components**: MainLayout, AuthLayout for consistent page structure
- **Feature Components**: DashboardCard, TasksCard, NotificationCard
- **Page Components**: Dashboard, Login, Signup, Profile, Tasks, Notifications

### State Management Strategy
- **Redux Slices**: Separate slices for auth, profile, tasks, and notifications
- **Local State**: Component-level state for forms and UI interactions
- **Persistence**: localStorage for user preferences and data persistence

## Assumptions & Trade-offs

### Assumptions Made

#### 1. **User Experience**
- Users prefer a modern, card-based interface over traditional table layouts
- Toaster are expected
- Real-time notification updates are expected
- Form validation should be immediate and user-friendly

#### 2. **Technical Decisions**
- React 19 provides better performance and developer experience
- Redux Toolkit simplifies state management complexity
- Tailwind CSS enables rapid UI development and consistency
- Client-side routing is sufficient for this application scope

#### 3. **Data Management**
- localStorage is adequate for data persistence in this assessment
- No backend API is required for demonstration purposes
- Mock data generation provides realistic testing scenarios
tity

## 🧪 Testing Strategy

### Test Coverage
- **85 tests** covering all major features
- **React Testing Library** for user-centric testing
- **Snapshot tests** for component consistency
- **Integration tests** for user workflows
- **Redux tests** for state management

### Testing Principles
- Test user behavior, not implementation details
- Focus on accessibility and user interactions
- Maintain test readability and maintainability
- Use meaningful test descriptions

## 🎨 Design System

### Color Palette
- Primary: Blue (#3B82F6) for main actions and branding
- Secondary: Gray scale for text and backgrounds
- Success: Green for positive actions
- Warning: Yellow for caution states
- Error: Red for error states

### Typography
- Headings: Bold, large text for hierarchy
- Body: Regular weight for readability
- Labels: Small, bold text for form elements

### Spacing & Layout
- Consistent spacing using Tailwind's spacing scale
- Card-based layout for content organization
- Responsive design for mobile and desktop


#### Testing Requirements
- "Write at least one unit test per feature" - 85 tests covering all features done
- "Use React Testing Library" - All tests use RTL, not just Jest DOM
- "Snapshot test for card"** - NotificationCard has comprehensive snapshot tests  done
- "Interaction test for form" - LoginPage has detailed form interaction tests done

#### Test Coverage Breakdown
- Component Tests: 51 tests (Button, Input, NotificationCard)
- Page Tests: 14 tests (LoginPage with form interactions)
- Redux Tests: 20 tests (State management and actions)
- Total: 85 tests with 100% pass rate

#### Testing Technologies Used
- React Testing Library for user-centric testing
- Vitest as the test runner
- @testing-library/user-event for user interactions
- @testing-library/jest-dom for custom matchers

