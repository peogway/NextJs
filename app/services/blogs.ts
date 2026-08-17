const blogs = [
	{
		id: 1,
		title: 'Understanding React Server Components',
		author: 'John Smith',
		url: '/blogs/react-server-components',
		likes: 42,
	},
	{
		id: 2,
		title: 'Getting Started with Next.js',
		author: 'Sarah Johnson',
		url: '/blogs/getting-started-nextjs',
		likes: 35,
	},
	{
		id: 3,
		title: 'JavaScript Async/Await Explained',
		author: 'Mike Brown',
		url: '/blogs/javascript-async-await',
		likes: 28,
	},
	{
		id: 4,
		title: 'Building APIs with Node.js',
		author: 'Emily Davis',
		url: '/blogs/nodejs-apis',
		likes: 51,
	},
	{
		id: 5,
		title: 'CSS Grid vs Flexbox',
		author: 'Alex Wilson',
		url: '/blogs/css-grid-vs-flexbox',
		likes: 19,
	},
]

let nextId = 6

export const getBlogs = () => {
	return blogs
}

export const addBlog = (title: string, author: string, url: string) => {
	blogs.push({ id: nextId++, title, author, url, likes: 0 })
}

export const getBlogById = (id: number) => {
	return blogs.find((blog) => blog.id === id)
}

export const likeBlog = (id: number) => {
	const blog = blogs.find((blog) => blog.id === id)
	if (blog) blog.likes++
}

