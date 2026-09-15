'use client'

import { useActionState, useEffect } from 'react'
import { createBlog } from '../../actions/blogs'
import { useRouter } from 'next/navigation'
import { useNotification } from '../../components/NotificationContext'

const NewBlog = () => {
	const [state, formAction] = useActionState(createBlog, {
		errors: {},
		values: { title: '', author: '', url: '' },
		success: false,
	})
	const { showNotification } = useNotification()
	const router = useRouter()
	useEffect(() => {
		if (state.success) {
			showNotification('Blog created')
			router.push('/blogs')
		}
	}, [state, showNotification, router])

	return (
		<div className='flex flex-col min-h-screen py-2'>
			<h2 className='text-2xl font-bold mb-4'>New Blog</h2>
			<form action={formAction} className='space-y-4'>
				{state.errors.title && (
					<p className='text-red-500'>{state.errors.title}</p>
				)}
				<div>
					<label className='block text-sm font-medium text-muted-foreground'>
						Title
						<input
							type='text'
							name='title'
							defaultValue={state.values.title}
							className='border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
						/>
					</label>
				</div>

				{state.errors.author && (
					<p className='text-red-500'>{state.errors.author}</p>
				)}
				<div>
					<label className='block text-sm font-medium text-muted-foreground'>
						Author
						<input
							type='text'
							name='author'
							defaultValue={state.values.author}
							className='border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
						/>
					</label>
				</div>

				{state.errors.url && <p className='text-red-500'>{state.errors.url}</p>}
				<div>
					<label className='block text-sm font-medium text-muted-foreground'>
						URL
						<input
							type='text'
							name='url'
							defaultValue={state.values.url}
							className='border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
						/>
					</label>
				</div>
				<button
					type='submit'
					className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600'
					data-testid='create-blog-button'
				>
					Create
				</button>
			</form>
		</div>
	)
}

export default NewBlog

