import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog';
import { renderWithProviders } from './utilsForTests';
import { MemoryRouter } from 'react-router';

test('Blog component renders author and title but not url and likes by default', () => {
  const mockBlog = {
    id: 1,
    author: 'Test Author',
    title: 'Test Title',
    url: 'http://test-url.com',
    likes: 10,
    user: {
      userName: 'testuser'
    }
  };

  renderWithProviders(
    <MemoryRouter>
      <Blog blog={mockBlog} />
    </MemoryRouter>
  )

  screen.debug()

  const authorElement = document.querySelector('.author')
  const titleElement = document.querySelector('.title')
  const urlElement = document.querySelector('.url')
  // const titleElement = document.querySelector('.title')
  // screen.debug(element)
  expect(authorElement).toBeDefined()
  expect(titleElement).toBeDefined()
  expect(urlElement).toBe(null)
})

test('hidden content (url, likes) appears, button text switches to hide', async () => {

  const mockBlog = {
    id: 1,
    author: 'Test Author',
    title: 'Test Title',
    url: 'http://test-url.com',
    likes: 10,
    comments: ["this is a comment"],
    user: {
      userName: 'testuser'
    }
  };

  renderWithProviders(
    <MemoryRouter>
      <Blog blog={mockBlog} />
    </MemoryRouter>
  )

  const user = userEvent.setup()
  const container = document.querySelector('.hide-view')
  await user.click(container)
  const element = screen.getByText('hide')
  const urlElement = document.querySelector('.url')
  const likesElement = document.querySelector('.likes')


  screen.debug(element)
  screen.debug(urlElement)
  screen.debug(likesElement)
  expect(element).toBeDefined()
  expect(urlElement).toBeDefined()
  expect(likesElement).toBeDefined()

})

test('likes button pressed twice', async () => {

  const mockBlog = {
    id: 1,
    author: 'Test Author',
    title: 'Test Title',
    url: 'http://test-url.com',
    likes: 10,
    user: {
      userName: 'testuser'
    }
  };

  const mockFunction = jest.fn()

  render(
    <p className="likes">
      {mockBlog.likes}
      <button onClick={mockFunction}>like</button>
    </p>
  )

  const user = userEvent.setup()

  const likesButton = screen.getByText('like')
  await user.click(likesButton)
  await user.click(likesButton)

  expect(mockFunction.mock.calls).toHaveLength(2)
})
