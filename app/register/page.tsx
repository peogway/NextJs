'use client'

import Link from 'next/link'
import { registerUser } from '../actions/users'
import { useActionState } from 'react'

export default function RegisterPage() {
	const [state, formAction] = useActionState(registerUser, {
		error: '',
		values: {
			username: '',
			name: '',
			password: '',
			confirmPassword: '',
		},
	})
	return (
		<div className='flex flex-col items-center justify-center min-h-screen py-2'>
			<h2 className='text-2xl font-bold mb-4'>Register</h2>
			<form action={formAction} className='space-y-4'>
				<div>
					<label className='block text-sm font-medium text-muted-foreground'>
						Username
						<input
							type='text'
							name='username'
							defaultValue={state.values.username}
							className='border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
						/>
					</label>
				</div>
				<div>
					<label className='block text-sm font-medium text-muted-foreground'>
						Name
						<input
							type='text'
							name='name'
							defaultValue={state.values.name}
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
							defaultValue={state.values.password}
							className='border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
						/>
					</label>
				</div>

				<div>
					<label className='block text-sm font-medium text-muted-foreground'>
						Confirm Password
						<input
							type='password'
							name='confirmPassword'
							defaultValue={state.values.confirmPassword}
							className='border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
						/>
					</label>
				</div>
				{state.error && state.error.includes('Username') && (
					<p style={{ color: 'red' }} data-testid='username-error'>
						{state.error}
					</p>
				)}
				{state.error && state.error.includes('Password') && (
					<p style={{ color: 'red' }} data-testid='passwordConfirm-error'>
						{state.error}
					</p>
				)}
				<button
					type='submit'
					className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600'
					data-testid='register-button'
				>
					Register
				</button>
			</form>
		</div>
	)
}

