import { getReadingList } from '../../services/blogs'
import { readBlogAction } from '../../actions/blogs'

const ReadingList = async () => {
	const readingList = await getReadingList()

	if (readingList.length === 0) {
		return (
			<>
				<div
					className='my-4 h-px w-full bg-black'
					data-testid='reading-list-section'
				></div>
				<h1 className='text-2xl font-bold mb-4'>Reading List</h1>
				{readingList.length === 0 && (
					<div data-testid='empty-reading-list'>Reading list is empty</div>
				)}
			</>
		)
	}

	const readBlogs = readingList.filter((blog) => (blog as any).read)
	const unreadBlogs = readingList.filter((blog) => !(blog as any).read)

	return (
		<>
			<div
				className='my-4 h-px w-full bg-black'
				data-testid='reading-list-section'
			></div>

			<h1 className='text-2xl font-bold mb-4'>Reading List</h1>
			<h2 className='text-lg font-bold mb-4'>Unread ({unreadBlogs.length})</h2>

			<div className='ml-2'>
				<ul>
					{unreadBlogs.map((blog) => {
						return (
							<div
								key={blog.id}
								className='bg-yellow-100 my-2 p-4 flex items-center justify-between'
							>
								<p className='text-blue-600'>{blog.blog.title}</p>
								<form action={readBlogAction} className='ml-5'>
									<div>
										<input type='hidden' name='id' value={blog.id} />
										<button
											type='submit'
											className='bg-green-500 text-white px-2 py-1 rounded-md hover:bg-blue-600'
										>
											mark as read
										</button>
									</div>
								</form>
							</div>
						)
					})}
				</ul>
				{unreadBlogs.length === 0 && (
					<div data-testid='no-unread-blogs'>No unread blogs</div>
				)}
			</div>

			<h2 className='text-lg font-bold mb-4 mt-3'>Read ({readBlogs.length})</h2>
			<div className='ml-2' data-testid='unread-section'>
				<ul>
					{readBlogs.map((blog) => {
						return (
							<div
								key={blog.id}
								className='bg-green-100 my-2 p-4 flex items-center'
							>
								<p className='text-blue-600'>{blog.blog.title}</p>
							</div>
						)
					})}
				</ul>
				{readBlogs.length === 0 && (
					<div data-testid='no-read-blogs'>No read blogs</div>
				)}
			</div>
		</>
	)
}

export default ReadingList

