'use server'

import { redirect } from 'next/navigation'
import bcrypt from 'bcryptjs'
import { auth } from '@/auth'
import { revalidatePath } from 'next/cache'
import { generateToken, getUserByUsername, addUser } from '../services/users'

export const registerUser = async (
	prevState: { error: string; values: Record<string, string> },
	formData: FormData,
) => {
	const username = (formData.get('username') as string)?.trim()
	const name = (formData.get('name') as string)?.trim()
	const password = formData.get('password') as string
	const confirmPassword = formData.get('confirmPassword') as string

	const values = { username, name, password, confirmPassword }

	if (!username || username.length < 4) {
		return { error: 'Username must be at least 4 characters long', values }
	}

	if (!confirmPassword || password !== confirmPassword) {
		return { error: 'Passwords do not match', values }
	}

	const existingUser = await getUserByUsername(username)

	if (existingUser) {
		return { error: 'Username already exists', values }
	}

	const passwordHash = await bcrypt.hash(password, 10)

	await addUser(username, name, passwordHash)

	redirect('/login')
}

export const generateTokenAction = async () => {
	const session = await auth()
	if (!session) {
		redirect('/login')
	}
	const newToken = crypto.randomUUID()

	await generateToken(newToken, (session?.user as any)?.email)
	revalidatePath('/me')
	return newToken
}

