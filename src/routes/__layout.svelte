<script lang="ts">
	import { supabase } from '$lib/supabase/client'
	import Cookies from 'js-cookie'
	import { TOKEN_COOKIE_KEY } from '../constants'

	if (typeof window !== 'undefined') {
		supabase.auth.onAuthStateChange((event, session) => {
			switch (event) {
				case 'SIGNED_IN':
				case 'TOKEN_REFRESHED':
					if (session?.access_token == null) {
						throw Error('access token from supabase undefined')
					}
					Cookies.set(TOKEN_COOKIE_KEY, session.access_token, {
						sameSite: 'strict',
						expires: session?.expires_in,
					})
					if (window.location.pathname !== '/') {
						window.location.replace('/')
					}
					break
				case 'SIGNED_OUT':
					Cookies.remove(TOKEN_COOKIE_KEY)
					window.location.replace('/logged-out')
					break
				default:
					break
			}
		})
	}
</script>

<slot />
