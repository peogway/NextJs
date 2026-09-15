import { NextRequest, NextResponse } from 'next/server'
import { getUserByToken } from '../../services/users'

export const GET = async (request: NextRequest) => {
	const authorization = request.headers.get('authorization')
	const token = authorization?.startsWith('Bearer ')
		? authorization.slice(7)
		: null
	if (!token) {
		return NextResponse.json({ error: 'token is not valid' }, { status: 401 })
	}

	const returnedUser = await getUserByToken(token)
	if (!returnedUser) {
		return NextResponse.json({ error: 'token is not valid' }, { status: 401 })
	}

	const { blogs, ...user } = returnedUser

	return NextResponse.json({
		...user,
		createdBlogs: blogs,
	})
}

