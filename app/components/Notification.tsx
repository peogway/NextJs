'use client'

import { useNotification } from './NotificationContext'

export default function Notification() {
	const { message, type } = useNotification()

	if (!message) return null

	return (
		<div
			className={`px-4 py-2 mb-2.5 rounded text-white fixed mt-2 left-1/2 -translate-x-1/2 ${
				type === 'success' ? 'bg-green-600' : 'bg-red-600'
			}`}
			data-testid='notification'
		>
			{message}
		</div>
	)
}

