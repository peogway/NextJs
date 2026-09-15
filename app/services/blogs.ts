import { eq, and, ilike } from 'drizzle-orm'
import { db } from '../../db'
import { blogs, readingList, users } from '../../db/schema'
import { getCurrentUser } from './session'

export const getBlogs = async (filter: string | undefined) => {
	if (filter) {
		return db.query.blogs.findMany({
			where: ilike(blogs.title, `%${filter}`),
		})
	}
	return db.query.blogs.findMany()
}

export const getBlogById = async (id: number) => {
	return db.query.blogs.findFirst({
		where: eq(blogs.id, id),
	})
}

export const addBlog = async (title: string, author: string, url: string) => {
	const user = await getCurrentUser()
	if (!user) {
		throw new Error('Not logged in')
	}
	const [blog] = await db
		.insert(blogs)
		.values({ title, author, url, userId: user.id })
		.returning()

	await db
		.insert(readingList)
		.values({ blogId: blog.id, userId: (user as any)?.id })
}

export const likeBlog = async (id: number) => {
	// const user = await getCurrentUser()
	// if (!user) {
	// 	throw new Error('Not logged in')
	// }
	const blog = await getBlogById(id)
	if (blog)
		await db
			.update(blogs)
			.set({ likes: blog.likes + 1 })
			.where(eq(blogs.id, id))
}

export const addToReadingList = async (blogId: number) => {
	const user = await getCurrentUser()
	if (!user) {
		throw new Error('Not logged in')
	}
	const userId = (user as any)?.id

	const existingReadingList = await db.query.readingList.findFirst({
		where: and(eq(readingList.userId, userId), eq(readingList.blogId, blogId)),
	})

	if (!existingReadingList) {
		await db.insert(readingList).values({ blogId, userId })
	}
}

export const getReadingList = async () => {
	const user = await getCurrentUser()
	if (!user) {
		throw new Error('Not logged in')
	}
	const userId = (user as any)?.id

	return await db.query.readingList.findMany({
		where: eq(readingList.userId, userId),
		with: { blog: true },
	})
}

export const updateReadingList = async (id: number) => {
	const user = await getCurrentUser()
	if (!user) {
		throw new Error('Not logged in')
	}

	await db.update(readingList).set({ read: true }).where(eq(readingList.id, id))
}

