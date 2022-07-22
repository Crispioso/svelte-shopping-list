import { supabase } from '$lib/supabase/client'

import type { RequestHandler } from '$types/login'

export const get: RequestHandler = async ({ request }) => {
	// console.log('get request: ', request)
	return {}
}

/** @type {import('./__types/login').RequestHandler} */
export const post: RequestHandler = async ({ request }) => {
	try {
		const data = await request.formData()
		const email = data.get('email')

		if (email == null || email === '' || typeof email !== 'string') {
			return {
				status: 400,
				body: {
					errors: ['Email address missing'],
				},
			}
		}

		await supabase.auth.signIn({ email }, { redirectTo: 'http://localhost:3000/callback' })
		return {
			status: 303,
			redirect: '/check-email',
		}
	} catch (error) {
		console.error('failed to login: ', error)
		return {
			status: 500,
			body: {
				errors: ['It went wrong'],
			},
		}
	}

	// `params.id` comes from [id].js
	// console.log(args)
	// const item = await db.get(params.id)

	// if (item) {
	// 	return {
	// 		body: { item },
	// 	}
	// }

	// return {
	// 	status: 404,
	// }
	return {}
}
