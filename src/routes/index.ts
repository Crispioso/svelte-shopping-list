import { supabase } from '$lib/supabase/client'
import type { RequestHandler } from '$types/login'
import cookie from 'cookie'
import { TOKEN_COOKIE_KEY } from '../constants'

/** @type {import('./__types/index').RequestHandler} */
export const get: RequestHandler = async ({ request }) => {
	const cookieHeader = request.headers.get('Cookie')
	if (cookieHeader == null) {
		return {}
	}

	const cookies = cookie.parse(cookieHeader)
	const token = cookies[TOKEN_COOKIE_KEY]

	try {
		supabase.auth.setAuth(token)
		const rsp = await supabase.from('lists').select('*,list_items(*)')
		console.log(rsp)
		return {}
	} catch (error) {
		console.error('failed to auth', error)
		return {
			error,
		}
	}

	return {}
}
