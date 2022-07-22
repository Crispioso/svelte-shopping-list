<script lang="ts">
	let email = ''
	let submitting = false
	export let errors: string[] = []
</script>

<h1>Login</h1>

<main>
	<form method="post">
		<label for="email">Email address</label>
		<input type="text" id="email" name="email" bind:value={email} />

		<button disabled={submitting} type="submit">{submitting ? 'Submitting...' : 'Log in'}</button>
	</form>
	{#each errors as error}
		<p>{error}</p>
	{/each}
</main>
