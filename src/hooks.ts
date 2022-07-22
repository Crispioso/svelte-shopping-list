import type { GetSession } from '@sveltejs/kit'
import { TOKEN_COOKIE_KEY } from './constants'
import cookie from 'cookie'

export const getSession: GetSession = ({ request }) => {
	const cookiesHeader = request.headers.get('Cookie')
	if (cookiesHeader == null) {
		return {
			loggedIn: false,
		}
	}

	const cookies = cookie.parse(cookiesHeader)
	const tokenCookie = cookies[TOKEN_COOKIE_KEY]

	return {
		loggedIn: tokenCookie != null,
	}
}
