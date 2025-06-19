import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '../../test/test-utils'
import userEvent from '@testing-library/user-event'
import Input from '../Input'

describe('Input Component', () => {
  // Test basic rendering
  it('renders input with label', () => {
    render(<Input label="Email" id="email" />)
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
  })

  it('renders input with placeholder', () => {
    render(<Input label="Email" placeholder="Enter your email" />)
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument()
  })

  // Test different input types
  it('renders email input type correctly', () => {
    render(<Input label="Email" type="email" />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('type', 'email')
  })

  it('renders password input type correctly', () => {
    render(<Input label="Password" type="password" />)
    const input = screen.getByDisplayValue('')
    expect(input).toHaveAttribute('type', 'password')
  })

  it('renders number input type correctly', () => {
    render(<Input label="Age" type="number" />)
    const input = screen.getByRole('spinbutton')
    expect(input).toHaveAttribute('type', 'number')
  })

  // Test value and onChange
  it('displays the provided value', () => {
    render(<Input label="Email" value="test@example.com" onChange={() => {}} />)
    expect(screen.getByDisplayValue('test@example.com')).toBeInTheDocument()
  })

  it('calls onChange when user types', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    render(<Input label="Email" onChange={handleChange} />)
    
    const input = screen.getByRole('textbox')
    await user.type(input, 'test')
    
    expect(handleChange).toHaveBeenCalledTimes(4) // Once for each character
  })

  // Test error state
  it('displays error message when provided', () => {
    render(<Input label="Email" error="Email is required" />)
    expect(screen.getByText('Email is required')).toBeInTheDocument()
    expect(screen.getByText('Email is required')).toHaveClass('text-red-500')
  })

  it('applies error styling to input when error is present', () => {
    render(<Input label="Email" error="Email is required" />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveClass('border-red-300')
  })

  // Test disabled state
  it('disables input when disabled prop is true', () => {
    render(<Input label="Email" disabled={true} />)
    const input = screen.getByRole('textbox')
    expect(input).toBeDisabled()
  })

  // Test required attribute
  it('applies required attribute when required prop is true', () => {
    render(<Input label="Email" required={true} />)
    const input = screen.getByRole('textbox')
    expect(input).toBeRequired()
  })

  // Test name attribute
  it('applies name attribute correctly', () => {
    render(<Input label="Email" name="email" />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('name', 'email')
  })

  // Test id and htmlFor connection
  it('connects label to input via id and htmlFor', () => {
    render(<Input label="Email" id="email" />)
    const input = screen.getByRole('textbox')
    const label = screen.getByText('Email')
    
    expect(input).toHaveAttribute('id', 'email')
    expect(label).toHaveAttribute('for', 'email')
  })

  // Test focus states
  it('applies focus styles when input is focused', async () => {
    const user = userEvent.setup()
    render(<Input label="Email" />)
    
    const input = screen.getByRole('textbox')
    await user.click(input)
    
    expect(input).toHaveFocus()
  })

  // Test snapshot
  it('matches snapshot for basic input', () => {
    const { container } = render(<Input label="Email" placeholder="Enter email" />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('matches snapshot for input with error', () => {
    const { container } = render(
      <Input label="Email" error="Email is required" />
    )
    expect(container.firstChild).toMatchSnapshot()
  })
}) 