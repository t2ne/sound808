<script lang="ts">
	import { addArtista } from '$lib/api/artistas';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	let nome = '';
	let nacionalidade = '';
	let idade = 0;
	let message = '';
	let messageType = '';

	async function submitForm() {
		try {
			await addArtista({
				nome,
				idade,
				nacionalidade
			});
			message = 'Artista criado com sucesso!';
			messageType = 'info';
			goto('/artistas');
		} catch (err) {
			console.error(err);
			message = 'Erro ao criar o artista.';
			messageType = 'error';
		}
	}

	function goBack() {
		window.location.href = '/artistas';
	}
</script>

<button
	class="back-button"
	on:click={goBack}
	type="button"
	aria-label="Voltar para a lista de artistas"
>
	← Voltar
</button>

<h1>Adicionar Artista</h1>

<form on:submit|preventDefault={submitForm} class="submit-form">
	<label>
		Nome:
		<input type="text" bind:value={nome} required />
	</label>
	<br />
	<label>
		Idade:
		<input type="number" bind:value={idade} required min="0" />
	</label>
	<br />
	<label>
		Nacionalidade:
		<input type="text" bind:value={nacionalidade} required />
	</label>
	<br />
	<button type="submit" class="view-details">Adicionar Artista</button>
</form>

{#if message}
	<div class={messageType === 'info' ? 'info-message' : 'error-message'}>
		{message}
	</div>
{/if}
