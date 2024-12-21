<script lang="ts">
	import { addGenero } from '$lib/api/generos';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	let nome = '';
	let message = '';
	let messageType = '';

	async function submitForm() {
		try {
			await addGenero({
				nome
			});
			message = 'Género criado com sucesso!';
			messageType = 'info';
			goto('/generos');
		} catch (err) {
			console.error(err);
			message = 'Erro ao criar o género.';
			messageType = 'error';
		}
	}

	function goBack() {
		window.location.href = '/generos';
	}
</script>

<button
	class="back-button"
	on:click={goBack}
	type="button"
	aria-label="Voltar para a lista de géneros"
>
	← Voltar
</button>

<h1>Adicionar Género</h1>

<form on:submit|preventDefault={submitForm} class="submit-form">
	<label>
		Nome:
		<input type="text" bind:value={nome} required />
	</label>
	<br />
	<button type="submit" class="view-details">Adicionar Género</button>
</form>

{#if message}
	<div class={messageType === 'info' ? 'info-message' : 'error-message'}>
		{message}
	</div>
{/if}
