import Link from 'next/link'
import Home from './Home'

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<>
			<Home />
			{children}
		</>
	)
}

