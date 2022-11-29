import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'


test('Blog List', () => {
	const blog = {
		url : "Testing Url",
		id : "TestId",
		likes: 0,
		author: "Testing Author"
	}

	render(<Blog blog={blog} />)

	const element = screen.getByText('Testing Url')

	screen.debug()

	expect(element).toBeDefined()


})