import { eq } from 'drizzle-orm'
import { db } from '../../db'
import { users } from '../../db/schema'

export const getUsers = async () => {
	return db.query.users.findMany()
}

export const getUserWithBlogs = async (username: string) => {
	return db.query.users.findFirst({
		where: eq(users.username, username),
		with: { blogs: true },
	})
}

export const getUserByToken = async (token: string) => {
	return db.query.users.findFirst({
		where: eq(users.token, token),
		columns: {
			passwordHash: false,
			token: false,
		},
		with: {
			blogs: true,
		},
	})
}

export const generateToken = async (token: string, username: string) => {
	await db.update(users).set({ token }).where(eq(users.username, username))
}

export const getUserByUsername = async (username: string) => {
	return await db.query.users.findFirst({
		where: eq(users.username, username),
	})
}

export const addUser = async (
	username: string,
	name: string,
	passwordHash: string,
) => {
	await db.insert(users).values({ username, name, passwordHash })
}

