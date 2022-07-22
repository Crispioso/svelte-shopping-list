<script lang="ts" context="module">
	import { redirectIfNotLoggedIn } from '$lib/helpers'
	import type { Load } from '@sveltejs/kit'

	export const load: Load = async ({ session }) => {
		return redirectIfNotLoggedIn(session, {})
	}
</script>

<script lang="ts">
	import { v4 as generateId } from 'uuid'
	import fuzzysort from 'fuzzysort'
	import type { Item, ListItem } from '../types/lists'
	import { supabase } from '$lib/supabase/client'

	let listItems: ListItem[] = []
	let items: { [itemId: string]: Item } = {}

	let newItemName: string = ''
	let newItemQuantity: number = 1
	let previousItemMatches: Item[] = []

	const user = supabase.auth.user()
	// console.log(user)

	$: {
		const results = fuzzysort.go(newItemName, Object.values(items), { key: 'title' })
		previousItemMatches = results.map((result) => result.obj)
	}

	function resetNewItemValues() {
		newItemName = ''
		newItemQuantity = 1
	}

	function handleSubmit(event: SubmitEvent) {
		event.preventDefault()

		const newId = generateId()
		items = {
			...items,
			[newId]: {
				id: newId,
				title: newItemName,
			},
		}

		listItems = [
			...listItems,
			{
				itemId: newId,
				quantity: newItemQuantity,
			},
		]

		resetNewItemValues()
	}

	function handleRemoveItem(itemId: string) {
		listItems = listItems.filter((listItem) => listItem.itemId !== itemId)
	}

	function selectPreviousItem(previousItem: Item) {
		listItems = [...listItems, { itemId: previousItem.id, quantity: 1 }]
		resetNewItemValues()
	}
</script>

<h1>Shopping list</h1>

<ul>
	{#each listItems as listItem}
		{#if items[listItem.itemId]}
			<li>
				{items[listItem.itemId].title}
				{#if listItem.quantity > 1}
					({listItem.quantity})
				{/if}
				<button type="button" on:click={() => handleRemoveItem(listItem.itemId)}>Remove</button>
			</li>
		{:else}
			Unrecognised item id: {listItem.itemId}
		{/if}
	{/each}
</ul>

<form on:submit={handleSubmit}>
	<label for="item-title">Item description</label>
	<input
		bind:value={newItemName}
		type="text"
		name="item-title"
		id="item-title"
		autocomplete="off"
	/>

	<label for="item-quantity">Quantity</label>
	<input bind:value={newItemQuantity} type="number" name="item-quantity" id="item-quantity" />

	<button type="submit">Add item</button>
</form>
{#if previousItemMatches.length > 0}
	<ul>
		{#each previousItemMatches as match}
			<li>
				<button on:click={() => selectPreviousItem(match)} type="button">{match.title}</button>
			</li>
		{/each}
	</ul>
{/if}
