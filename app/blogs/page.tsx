import { getBlogs } from '../services/blogs'
import Link from 'next/link'

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
	const allBlogs = getBlogs()

	const blogs = filter
		? allBlogs.filter((blog) =>
				blog.title.toLowerCase().includes(filter.toLowerCase()),
			)
		: allBlogs
	blogs.sort((a: Blog, b: Blog) => b.likes - a.likes)
	return (
		<div>
			<h2>Blogs</h2>

			<form>
				<input type='text' name='filter' defaultValue={filter} />
				<button type='submit'>Search</button>
			</form>
			<ul>
				{blogs.map((blog) => (
					<li key={blog.id}>
						<Link href={`/blogs/${blog.id}`}>{blog.title}</Link>
						{blog.author} {blog.url} {blog.likes}
					</li>
				))}
			</ul>
		</div>
	)
}
export default Blogs

