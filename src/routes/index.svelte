<script lang="ts" context="module">
	import { redirectIfNotLoggedIn } from '$lib/helpers'
	import type { Load } from '@sveltejs/kit'
	import { supabase } from '$lib/supabase/client'

	export const load: Load = async ({ session }) => {
		// const user = supabase.auth.user()
		// console.log('User: ', user)

		const rsp = await supabase.from('lists').select('*,list_items(*,items(*))')
		console.log('lists: ', rsp.data)
		return redirectIfNotLoggedIn(session, {})
	}
</script>

<script lang="ts">
	// import { supabase } from '$lib/supabase/client'
	import type { List } from '../types/lists'

	// const user = supabase.auth.user()
	// console.log('User: ', user)

	let lists: List[] = []
</script>

<h1>Shopping lists</h1>
{#if lists.length > 0}
	<ul>
		{#each lists as list}
			<li>{list.id}</li>
		{/each}
	</ul>
{:else}
	<p>You don't have any shopping lists yet!</p>
	<p>Why not <a href="/new-list">create one</a></p>
{/if}
