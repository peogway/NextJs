import { notFound } from 'next/navigation'
import { getBlogById } from '../../services/blogs'
import { addToReadingListAction, likeBlogAction } from '../../actions/blogs'

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
	const { id } = await params
	const blog = await getBlogById(Number(id))

	if (!blog) {
		notFound()
	}

	return (
		<div className='flex items-center justify-center min-h-screen'>
			<div
				className='flex flex-col bg-white p-8 rounded shadow-md w-[90%] max-w-lg shadow-md'
				data-testid='blog-detail'
			>
				<h2 className='text-2xl font-bold mb-4' data-testid='blog-title'>
					{blog.title}
				</h2>
				<p className='text-lg' data-testid='blog-author'>
					by {blog.author}
				</p>
				<br />
				<div className='flex items-center'>
					<p className='text-xl mr-5'>likes: {blog.likes}</p>
					<form action={likeBlogAction}>
						<div>
							<input
								type='hidden'
								name='id'
								value={blog.id}
								className='border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
							/>
							<button
								type='submit'
								className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600'
							>
								like
							</button>
						</div>
					</form>
					<form action={addToReadingListAction} className='ml-5'>
						<div>
							<input type='hidden' name='id' value={blog.id} />
							<button
								type='submit'
								className='bg-green-500 text-white px-4 py-2 rounded-md hover:bg-blue-600'
								data-testid='add-to-reading-list-button'
							>
								add to reading list
							</button>
						</div>
					</form>
				</div>

				<br />
				<p className='text-blue-600 underline'>{blog.url}</p>
			</div>
		</div>
	)
}

export default BlogPage

