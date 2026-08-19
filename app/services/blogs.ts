import { eq, ilike, sql } from 'drizzle-orm'
import { db } from '../../db'
import { blogs } from '../../db/schema'

let nextId = 6

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
	const user = await db.query.users.findFirst({
		orderBy: sql`RANDOM()`,
	})
	if (!user) {
		throw new Error('No users found')
	}
	await db.insert(blogs).values({ title, author, url, userId: user.id })
}

export const likeBlog = async (id: number) => {
	const blog = await getBlogById(id)
	if (blog)
		await db
			.update(blogs)
			.set({ likes: blog.likes + 1 })
			.where(eq(blogs.id, id))
}

