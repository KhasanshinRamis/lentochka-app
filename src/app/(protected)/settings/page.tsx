'use client';

import { LogoutButton } from '@/components/auth/logoutButton';
import { useCurrentUser } from '@/hooks/useCurrentUser';

export default function SettingsPage() {
	const user = useCurrentUser();

	return (
		<>
			<div>
				id: {user?.id}
			</div>
			<div>
				email: {user?.email}
			</div>
			<div>
				name: {user?.name}
			</div>
			<div>
				isOAuth: {user?.isOAuth ? 'да' : 'нет'}
			</div>
			<div>
				role: {user?.role}
			</div>
			<LogoutButton>
				Выйти
			</LogoutButton>
		</>
	);
};