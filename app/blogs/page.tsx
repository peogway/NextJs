import Link from 'next/link'
import { getBlogs } from '../services/blogs'

type Blog = {
	id: number
	title: string
	author: string
	url: string
	likes: number
}

const Blogs = async ({
	searchParams,
}: {
	searchParams: Promise<{ filter?: string }>
}) => {
	const { filter } = await searchParams
	const blogs = await getBlogs(filter)

	blogs.sort((a: Blog, b: Blog) => b.likes - a.likes)
	return (
		<div className='max-w-2xl mx-auto p-6'>
			<h2 className='text-2xl font-bold mb-4'>Blogs</h2>

			<form>
				<input
					type='text'
					name='filter'
					defaultValue={filter}
					className='border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
					data-testid='filter-input'
				/>
				<button
					type='submit'
					className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600'
					data-testid='search-button'
				>
					Search
				</button>
			</form>
			<ul className='space-y-2' data-testid='blogs-list'>
				{blogs.map((blog) => (
					<li key={blog.id} className='border rounded p-3 hover:bg-gray-50'>
						<Link
							href={`/blogs/${blog.id}`}
							className='text-blue-600 hover:underline'
						>
							{blog.title}
						</Link>
						<p className='text-sm text-muted-foreground'>
							By {blog.author} | {blog.url} | {blog.likes} likes
						</p>
					</li>
				))}
			</ul>
		</div>
	)
}
export default Blogs

