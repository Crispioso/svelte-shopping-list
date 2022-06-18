<script lang="ts">
	import type { List } from '../types/lists'

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
