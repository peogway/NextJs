'use client'

import { useSession } from 'next-auth/react'
import { generateTokenAction } from '../../actions/users'

const APIToken = () => {
	const { data: session, update } = useSession()
	const token = (session?.user as any)?.token

	const generateToken = async () => {
		const newToken = await generateTokenAction()
		await update({ user: { ...session?.user, token: newToken } })
	}

	return (
		<div className='' data-testid='api-token-section'>
			<div className='my-4 h-px w-full bg-black'></div>

			<h1 className='text-2xl font-bold mb-4'>API Token</h1>
			<div className='bg-gray-100 p-4' data-testid='token-display'>
				<div className=''>Current token:</div>
				<div data-testid={'api-token'} className='bg-gray-200 py-2 px-4'>
					<div data-testid={token ? '' : 'no-token-message'}>
						{token ? token : 'No token generated yet'}
					</div>
				</div>
			</div>

			<form action={generateToken} className='mt-4'>
				<button
					type='submit'
					className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600'
					data-testid='generate-token-button'
				>
					Generate New Token
				</button>
			</form>
		</div>
	)
}

export default APIToken

