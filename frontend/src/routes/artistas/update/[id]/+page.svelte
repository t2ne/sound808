<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import type { Artista } from '$lib/api/artistas';

	let nome = '';
	let idade = 0;
	let nacionalidade = '';
	let message = '';
	let messageType = '';
	let artistaId: string = '';

	onMount(async () => {
		try {
			const artistaIdFromParams = $page.params.id;
			artistaId = artistaIdFromParams;

			const res = await fetch(`http://localhost:3000/api/artistas/${artistaId}`);
			if (!res.ok) {
				throw new Error('Erro ao carregar o artista');
			}
			const artista = await res.json();
			nome = artista.nome;
			idade = artista.idade;
			nacionalidade = artista.nacionalidade;
		} catch (err) {
			console.error('Erro ao carregar dados:', err);
			message = 'Não foi possível carregar os dados. Por favor, tente novamente mais tarde.';
			messageType = 'error';
		}
	});

	async function submitForm() {
		try {
			const res = await fetch(`http://localhost:3000/api/artistas/${artistaId}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					nome,
					idade,
					nacionalidade
				})
			});

			if (!res.ok) {
				throw new Error('Erro ao atualizar o artista');
			}

			message = 'Artista atualizado com sucesso!';
			messageType = 'info';
			goto('/artistas');
		} catch (err) {
			console.error('Erro ao atualizar o artista:', err);
			message = 'Erro ao atualizar o artista. Por favor, tente novamente mais tarde.';
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

<h1>Atualizar Artista</h1>

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
	<button type="submit" class="view-details">Atualizar Artista</button>
</form>

{#if message}
	<div class={messageType === 'info' ? 'info-message' : 'error-message'}>
		{message}
	</div>
{/if}
