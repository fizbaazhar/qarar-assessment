import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '../../test/test-utils'
import Button from '../Button'

describe('Button Component', () => {
  // Test basic rendering
  it('renders button with children text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
  })

  // Test different variants
  it('applies primary variant styles correctly', () => {
    render(<Button variant="primary">Primary Button</Button>)
    const button = screen.getByRole('button', { name: 'Primary Button' })
    expect(button).toHaveClass('bg-primary', 'text-white')
  })

  it('applies secondary variant styles correctly', () => {
    render(<Button variant="secondary">Secondary Button</Button>)
    const button = screen.getByRole('button', { name: 'Secondary Button' })
    expect(button).toHaveClass('bg-gray-200', 'text-gray-800')
  })

  it('applies danger variant styles correctly', () => {
    render(<Button variant="danger">Danger Button</Button>)
    const button = screen.getByRole('button', { name: 'Danger Button' })
    expect(button).toHaveClass('bg-red-500', 'text-white')
  })

  // Test different sizes
  it('applies small size styles correctly', () => {
    render(<Button size="sm">Small Button</Button>)
    const button = screen.getByRole('button', { name: 'Small Button' })
    expect(button).toHaveClass('px-2.5', 'text-[12px]')
  })

  it('applies medium size styles correctly', () => {
    render(<Button size="md">Medium Button</Button>)
    const button = screen.getByRole('button', { name: 'Medium Button' })
    expect(button).toHaveClass('px-3', 'text-xs')
  })

  it('applies large size styles correctly', () => {
    render(<Button size="lg">Large Button</Button>)
    const button = screen.getByRole('button', { name: 'Large Button' })
    expect(button).toHaveClass('px-4', 'text-xs')
  })

  // Test loading state
  it('shows loading spinner when loading is true', () => {
    render(<Button loading={true}>Loading Button</Button>)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeDisabled()
  })

  // Test disabled state
  it('disables button when disabled is true', () => {
    render(<Button disabled={true}>Disabled Button</Button>)
    const button = screen.getByRole('button', { name: 'Disabled Button' })
    expect(button).toBeDisabled()
    expect(button).toHaveClass('disabled:opacity-50', 'disabled:cursor-not-allowed')
  })

  // Test click handler
  it('calls onClick handler when clicked', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Clickable Button</Button>)
    
    const button = screen.getByRole('button', { name: 'Clickable Button' })
    fireEvent.click(button)
    
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  // Test that disabled button does not call onClick
  it('does not call onClick when disabled', () => {
    const handleClick = vi.fn()
    render(<Button disabled={true} onClick={handleClick}>Disabled Button</Button>)
    
    const button = screen.getByRole('button', { name: 'Disabled Button' })
    fireEvent.click(button)
    
    expect(handleClick).not.toHaveBeenCalled()
  })

  // Test custom className
  it('applies custom className', () => {
    render(<Button className="custom-class">Custom Button</Button>)
    const button = screen.getByRole('button', { name: 'Custom Button' })
    expect(button).toHaveClass('custom-class')
  })

  // Test button type
  it('applies correct button type', () => {
    render(<Button type="submit">Submit Button</Button>)
    const button = screen.getByRole('button', { name: 'Submit Button' })
    expect(button).toHaveAttribute('type', 'submit')
  })

  // Test accessibility
  it('supports aria-label for accessibility', () => {
    render(<Button aria-label="Custom label">Button</Button>)
    const button = screen.getByRole('button', { name: 'Custom label' })
    expect(button).toBeInTheDocument()
  })

  // Test snapshot
  it('matches snapshot for primary button', () => {
    const { container } = render(<Button variant="primary">Snapshot Button</Button>)
    expect(container.firstChild).toMatchSnapshot()
  })
}) 