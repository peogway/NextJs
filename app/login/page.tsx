'use client'

import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useNotification } from '../components/NotificationContext'

export default function LoginPage() {
	const [error, setError] = useState<string | null>('')
	const { showNotification } = useNotification()
	const router = useRouter()

	const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)

		const result = await signIn('credentials', {
			username: formData.get('username'),
			password: formData.get('password'),
			redirect: false,
		})

		if (result?.error) {
			setError('Invalid username or password')
		} else {
			showNotification('Login Successfully')
			router.push('/')
			router.refresh()
		}
	}

	return (
		<div className='flex flex-col items-center justify-center min-h-screen py-2'>
			<h2 className='text-2xl font-bold mb-4'>Login</h2>
			{error && (
				<p className='text-red-500' data-testid='error-message'>
					{error}
				</p>
			)}
			<form onSubmit={handleSubmit} className='space-y-4'>
				<div>
					<label className='block text-sm font-medium text-muted-foreground'>
						Username
						<input
							type='text'
							name='username'
							required
							className='border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
						/>
					</label>
				</div>
				<div>
					<label className='block text-sm font-medium text-muted-foreground'>
						Password
						<input
							type='password'
							name='password'
							required
							className='border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
						/>
					</label>
				</div>
				<button
					type='submit'
					className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600'
					data-testid='login-button'
				>
					Login
				</button>
			</form>
		</div>
	)
}

