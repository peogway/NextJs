'use server'

import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import {
	addBlog,
	likeBlog,
	addToReadingList,
	updateReadingList,
} from '../services/blogs'

export const createBlog = async (
	prevState: {
		errors: Record<string, string>
		values: Record<string, string>
		success?: boolean
	},
	formData: FormData,
) => {
	const session = await auth()
	if (!session) {
		redirect('/login')
	}
	const author = formData.get('author') as string
	const title = formData.get('title') as string
	const url = formData.get('url') as string

	const errors = {} as Record<string, string>

	if (!title) {
		errors['title'] = 'Title is required'
	}
	if (!author) {
		errors['author'] = 'Author is required'
	}
	if (!url) {
		errors['url'] = 'URL is required'
	}

	if (title.length < 5) {
		errors['title'] = 'Title must be at least 5 characters long'
	}

	if (author.length < 5) {
		errors['author'] = 'Author must be at least 5 characters long'
	}

	if (url.length < 5) {
		errors['url'] = 'URL must be at least 5 characters long'
	}

	if (Object.keys(errors).length > 0) {
		return { errors, values: { title, author, url }, success: false }
	}

	await addBlog(title, author, url)
	revalidatePath('/blogs')
	return { errors, values: { title, author, url }, success: true }
	// redirect('/blogs')
}

export const likeBlogAction = async (formData: FormData) => {
	const session = await auth()
	if (!session) {
		redirect('/login')
	}
	const id = Number(formData.get('id'))
	await likeBlog(id)
	revalidatePath(`/blogs/${id}`)
	redirect('/blogs')
}

export const addToReadingListAction = async (formData: FormData) => {
	const session = await auth()
	if (!session) {
		redirect('/login')
	}
	const id = Number(formData.get('id'))
	await addToReadingList(id)
	revalidatePath(`/me`)
	redirect('/blogs')
}

export const readBlogAction = async (formData: FormData) => {
	const session = await auth()
	if (!session) {
		redirect('/login')
	}
	const id = Number(formData.get('id'))
	await updateReadingList(id)
	revalidatePath(`/me`)
	redirect('/me')
}

