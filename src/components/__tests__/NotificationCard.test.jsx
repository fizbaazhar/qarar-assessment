import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import NotificationCard from '../NotificationCard'

// Mock the SVG imports
vi.mock('../assets/icons/system-update.svg', () => ({
  default: 'system-update-icon'
}))
vi.mock('../assets/icons/message.svg', () => ({
  default: 'message-icon'
}))
vi.mock('../assets/icons/tick.svg', () => ({
  default: 'tick-icon'
}))

describe('NotificationCard Component', () => {
  const mockNotification = {
    id: '1',
    title: 'Test notification',
    message: 'This is a test notification',
    type: 'info',
    timestamp: new Date().toISOString(),
    isRead: false
  }

  const mockProps = {
    notification: mockNotification,
    onToggleRead: vi.fn(),
    onDelete: vi.fn(),
    formatTimeAgo: vi.fn(() => '2 minutes ago')
  }

  // Test basic rendering
  it('renders notification with title and timestamp', () => {
    render(<NotificationCard {...mockProps} />)
    
    expect(screen.getByText('Test notification')).toBeInTheDocument()
    expect(screen.getByText('2 minutes ago')).toBeInTheDocument()
  })

  // Test different notification types
  it('renders info notification with correct icon and styling', () => {
    render(<NotificationCard {...mockProps} />)
    
    const icon = screen.getByAltText('info notification')
    expect(icon).toBeInTheDocument()
    // The icon is now an SVG data URL, so we check for the alt text instead
    expect(icon).toHaveAttribute('alt', 'info notification')
  })

  it('renders warning notification with correct icon and styling', () => {
    const warningNotification = {
      ...mockNotification,
      type: 'warning',
      title: 'Warning notification'
    }
    
    render(<NotificationCard {...mockProps} notification={warningNotification} />)
    
    const icon = screen.getByAltText('warning notification')
    expect(icon).toBeInTheDocument()
    expect(icon).toHaveAttribute('alt', 'warning notification')
  })

  it('renders success notification with correct icon and styling', () => {
    const successNotification = {
      ...mockNotification,
      type: 'success',
      title: 'Success notification'
    }
    
    render(<NotificationCard {...mockProps} notification={successNotification} />)
    
    const icon = screen.getByAltText('success notification')
    expect(icon).toBeInTheDocument()
    expect(icon).toHaveAttribute('alt', 'success notification')
  })

  // Test read/unread states
  it('shows unread indicator when notification is unread', () => {
    render(<NotificationCard {...mockProps} />)
    
    const unreadDot = screen.getByTestId('unread-indicator')
    expect(unreadDot).toHaveClass('bg-blue-500')
  })

  it('hides unread indicator when notification is read', () => {
    const readNotification = { ...mockNotification, isRead: true }
    render(<NotificationCard {...mockProps} notification={readNotification} />)
    
    const unreadDot = screen.queryByTestId('unread-indicator')
    expect(unreadDot).not.toBeInTheDocument()
  })

  it('applies different opacity for read notifications', () => {
    const readNotification = { ...mockNotification, isRead: true }
    render(<NotificationCard {...mockProps} notification={readNotification} />)
    // The outermost card div has the opacity class
    const card = screen.getByText('Test notification').closest('.py-2')
    expect(card).toHaveClass('opacity-75')
  })

  it('applies full opacity for unread notifications', () => {
    render(<NotificationCard {...mockProps} />)
    // The outermost card div has the opacity class
    const card = screen.getByText('Test notification').closest('.py-2')
    expect(card).toHaveClass('opacity-100')
  })

  // Test toggle read/unread functionality
  it('calls onToggleRead when toggle button is clicked', async () => {
    const user = userEvent.setup()
    render(<NotificationCard {...mockProps} />)
    
    const toggleButton = screen.getByTitle('Mark as read')
    await user.click(toggleButton)
    
    expect(mockProps.onToggleRead).toHaveBeenCalledWith(mockNotification)
  })

  it('shows correct toggle button icon for unread notification', () => {
    render(<NotificationCard {...mockProps} />)
    
    const toggleButton = screen.getByTitle('Mark as read')
    expect(toggleButton).toBeInTheDocument()
  })

  it('shows correct toggle button icon for read notification', () => {
    const readNotification = { ...mockNotification, isRead: true }
    render(<NotificationCard {...mockProps} notification={readNotification} />)
    
    const toggleButton = screen.getByTitle('Mark as unread')
    expect(toggleButton).toBeInTheDocument()
  })

  // Test delete functionality
  it('calls onDelete when delete button is clicked', async () => {
    const user = userEvent.setup()
    render(<NotificationCard {...mockProps} />)
    
    const deleteButton = screen.getByTitle('Delete notification')
    await user.click(deleteButton)
    
    expect(mockProps.onDelete).toHaveBeenCalledWith(mockNotification.id)
  })

  // Test accessibility
  it('provides proper accessibility attributes', () => {
    render(<NotificationCard {...mockProps} />)
    
    const toggleButton = screen.getByTitle('Mark as read')
    const deleteButton = screen.getByTitle('Delete notification')
    
    expect(toggleButton).toHaveAttribute('title', 'Mark as read')
    expect(deleteButton).toHaveAttribute('title', 'Delete notification')
  })

  // Test formatTimeAgo integration
  it('calls formatTimeAgo with notification timestamp', () => {
    const formatTimeAgo = vi.fn(() => '5 minutes ago')
    render(<NotificationCard {...mockProps} formatTimeAgo={formatTimeAgo} />)
    
    expect(formatTimeAgo).toHaveBeenCalledWith(mockNotification.timestamp)
    expect(screen.getByText('5 minutes ago')).toBeInTheDocument()
  })

  // Test error notification type
  it('renders error notification with correct styling', () => {
    const errorNotification = {
      ...mockNotification,
      type: 'error',
      title: 'Error notification'
    }
    
    render(<NotificationCard {...mockProps} notification={errorNotification} />)
    
    const icon = screen.getByAltText('error notification')
    expect(icon).toBeInTheDocument()
    expect(icon).toHaveAttribute('alt', 'error notification')
  })

  // Test unknown notification type
  it('renders unknown notification type with default styling', () => {
    const unknownNotification = {
      ...mockNotification,
      type: 'unknown',
      title: 'Unknown notification'
    }
    
    render(<NotificationCard {...mockProps} notification={unknownNotification} />)
    
    const icon = screen.getByAltText('unknown notification')
    expect(icon).toBeInTheDocument()
    expect(icon).toHaveAttribute('alt', 'unknown notification')
  })

  // Test hover states
  it('applies hover styles to toggle button', () => {
    render(<NotificationCard {...mockProps} />)
    
    const toggleButton = screen.getByTitle('Mark as read')
    expect(toggleButton).toHaveClass('hover:text-blue-600')
  })

  it('applies hover styles to delete button', () => {
    render(<NotificationCard {...mockProps} />)
    
    const deleteButton = screen.getByTitle('Delete notification')
    expect(deleteButton).toHaveClass('hover:text-red-500')
  })

  // Test snapshot
  it('matches snapshot for unread notification', () => {
    const { container } = render(<NotificationCard {...mockProps} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('matches snapshot for read notification', () => {
    const readNotification = { ...mockNotification, isRead: true }
    const { container } = render(
      <NotificationCard {...mockProps} notification={readNotification} />
    )
    expect(container.firstChild).toMatchSnapshot()
  })
}) 