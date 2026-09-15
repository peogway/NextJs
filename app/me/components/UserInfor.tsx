import { getCurrentUser } from '../../services/session'
import { redirect } from 'next/navigation'

const UserInfor = async () => {
	const user = await getCurrentUser()

	if (!user) {
		redirect('/login')
	}

	return (
		<>
			<h1 className='text-2xl font-bold mb-4' data-testid='user-profile'>
				My Profile
			</h1>
			<div className='flex'>
				<label className='block mb-2 font-semibold'>Name:</label>
				<p data-testid='user-name' className='mb-4'>
					{user.name}
				</p>
			</div>

			<div className='flex'>
				<label className='block mb-2 font-semibold'>Username:</label>
				<p data-testid='user-username' className='mb-4'>
					{user.username}
				</p>
			</div>
		</>
	)
}

export default UserInfor

