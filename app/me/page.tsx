import APIToken from './components/Token'
import ReadingList from './components/ReadingList'
import UserInfor from './components/UserInfor'

export default async function Profile() {
	return (
		<div className='flex items-center justify-center min-h-screen'>
			<div className='flex flex-col bg-white p-8 rounded shadow-md w-[90%] max-w-lg shadow-md my-10'>
				<UserInfor />
				<ReadingList />
				<APIToken />
			</div>
		</div>
	)
}

