import { describe, it, expect, vi, beforeEach } from 'vitest'
import notificationsReducer, {
  markAsRead,
  markAsUnread,
  markAllAsRead,
  addNotification,
  deleteNotification,
  setFilter,
  clearAllNotifications,
  selectAllNotifications,
  selectUnreadCount,
  selectUnreadNotifications,
  selectReadNotifications,
  selectFilteredNotifications
} from '../notificationsSlice'

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}
global.localStorage = localStorageMock

describe('Notifications Slice', () => {
  const initialState = {
    notifications: [],
    filter: 'all'
  }

  const mockNotification = {
    id: 1,
    type: 'info',
    title: 'Test notification',
    timestamp: new Date().toISOString(),
    isRead: false
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Reducer', () => {
    it('should return initial state', () => {
      const state = notificationsReducer(undefined, { type: 'unknown' })
      expect(state.notifications).toBeDefined()
      expect(state.filter).toBe('all')
    })

    it('should handle markAsRead', () => {
      const state = {
        ...initialState,
        notifications: [mockNotification]
      }
      
      const newState = notificationsReducer(state, markAsRead(1))
      
      expect(newState.notifications[0].isRead).toBe(true)
      expect(localStorage.setItem).toHaveBeenCalled()
    })

    it('should handle markAsUnread', () => {
      const readNotification = { ...mockNotification, isRead: true }
      const state = {
        ...initialState,
        notifications: [readNotification]
      }
      
      const newState = notificationsReducer(state, markAsUnread(1))
      
      expect(newState.notifications[0].isRead).toBe(false)
      expect(localStorage.setItem).toHaveBeenCalled()
    })

    it('should handle markAllAsRead', () => {
      const state = {
        ...initialState,
        notifications: [
          { ...mockNotification, id: 1 },
          { ...mockNotification, id: 2, isRead: true },
          { ...mockNotification, id: 3 }
        ]
      }
      
      const newState = notificationsReducer(state, markAllAsRead())
      
      expect(newState.notifications[0].isRead).toBe(true)
      expect(newState.notifications[1].isRead).toBe(true)
      expect(newState.notifications[2].isRead).toBe(true)
      expect(localStorage.setItem).toHaveBeenCalled()
    })

    it('should handle addNotification', () => {
      const state = initialState
      const newNotification = {
        type: 'SUCCESS',
        customTitle: 'New notification'
      }
      
      const newState = notificationsReducer(state, addNotification(newNotification))
      
      expect(newState.notifications).toHaveLength(1)
      expect(newState.notifications[0].title).toBe('New notification')
      expect(newState.notifications[0].type).toBe('success')
      expect(newState.notifications[0].isRead).toBe(false)
      expect(localStorage.setItem).toHaveBeenCalled()
    })

    it('should handle deleteNotification', () => {
      const state = {
        ...initialState,
        notifications: [mockNotification]
      }
      
      const newState = notificationsReducer(state, deleteNotification(1))
      
      expect(newState.notifications).toHaveLength(0)
      expect(localStorage.setItem).toHaveBeenCalled()
    })

    it('should handle setFilter', () => {
      const state = initialState
      const newState = notificationsReducer(state, setFilter('unread'))
      
      expect(newState.filter).toBe('unread')
    })

    it('should handle clearAllNotifications', () => {
      const state = {
        ...initialState,
        notifications: [mockNotification]
      }
      
      const newState = notificationsReducer(state, clearAllNotifications())
      
      expect(newState.notifications).toHaveLength(0)
      expect(localStorage.setItem).toHaveBeenCalled()
    })
  })

  describe('Selectors', () => {
    const state = {
      notifications: {
        notifications: [
          { ...mockNotification, id: 1, isRead: false },
          { ...mockNotification, id: 2, isRead: true },
          { ...mockNotification, id: 3, isRead: false }
        ],
        filter: 'all'
      }
    }

    it('should select all notifications', () => {
      const result = selectAllNotifications(state)
      expect(result).toHaveLength(3)
    })

    it('should select unread notifications', () => {
      const result = selectUnreadNotifications(state)
      expect(result).toHaveLength(2)
      expect(result.every(n => !n.isRead)).toBe(true)
    })

    it('should select read notifications', () => {
      const result = selectReadNotifications(state)
      expect(result).toHaveLength(1)
      expect(result.every(n => n.isRead)).toBe(true)
    })

    it('should select unread count', () => {
      const result = selectUnreadCount(state)
      expect(result).toBe(2)
    })

    it('should select filtered notifications - all', () => {
      const result = selectFilteredNotifications(state)
      expect(result).toHaveLength(3)
    })

    it('should select filtered notifications - unread', () => {
      const unreadState = {
        notifications: {
          ...state.notifications,
          filter: 'unread'
        }
      }
      const result = selectFilteredNotifications(unreadState)
      expect(result).toHaveLength(2)
      expect(result.every(n => !n.isRead)).toBe(true)
    })

    it('should select filtered notifications - read', () => {
      const readState = {
        notifications: {
          ...state.notifications,
          filter: 'read'
        }
      }
      const result = selectFilteredNotifications(readState)
      expect(result).toHaveLength(1)
      expect(result.every(n => n.isRead)).toBe(true)
    })
  })

  describe('Edge Cases', () => {
    it('should handle markAsRead with non-existent notification', () => {
      const state = {
        ...initialState,
        notifications: [mockNotification]
      }
      
      const newState = notificationsReducer(state, markAsRead(999))
      
      expect(newState.notifications).toEqual(state.notifications)
    })

    it('should handle deleteNotification with non-existent notification', () => {
      const state = {
        ...initialState,
        notifications: [mockNotification]
      }
      
      const newState = notificationsReducer(state, deleteNotification(999))
      
      expect(newState.notifications).toEqual(state.notifications)
    })

    it('should handle empty notifications array', () => {
      const state = {
        ...initialState,
        notifications: []
      }
      
      const newState = notificationsReducer(state, markAllAsRead())
      
      expect(newState.notifications).toHaveLength(0)
    })
  })

  describe('localStorage Integration', () => {
    it('should save to localStorage when adding notification', () => {
      const state = initialState
      const newNotification = {
        type: 'INFO',
        customTitle: 'Test'
      }
      
      notificationsReducer(state, addNotification(newNotification))
      
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'notifications',
        expect.any(String)
      )
    })

    it('should save to localStorage when marking as read', () => {
      const state = {
        ...initialState,
        notifications: [mockNotification]
      }
      
      notificationsReducer(state, markAsRead(1))
      
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'notifications',
        expect.any(String)
      )
    })
  })
}) 