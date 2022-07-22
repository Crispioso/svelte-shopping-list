export function redirectIfNotLoggedIn(
	session: App.Session,
	loggedInResponse: Record<string, string | number> = {},
) {
	if (!session.loggedIn) {
		return {
			redirect: '/login',
			status: 303,
		}
	}
	return loggedInResponse
}
