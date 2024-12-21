<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import type { Musica } from '$lib/api/musicas';

	let nome = '';
	let tempo = '';
	let id_album = '';
	let message = '';
	let messageType = '';
	let albuns: { id: number; nome: string }[] = [];
	let musicaId: string = '';

	onMount(async () => {
		try {
			const musicIdFromParams = $page.params.id;
			musicaId = musicIdFromParams;

			const res = await fetch(`http://localhost:3000/api/musicas/${musicaId}`);
			if (!res.ok) {
				throw new Error('Erro ao carregar a música');
			}
			const musica = await res.json();
			nome = musica.nome;
			tempo = musica.tempo;
			id_album = musica.id_album.toString();

			const albumRes = await fetch('http://localhost:3000/api/albuns');
			if (!albumRes.ok) {
				throw new Error('Erro ao carregar os álbuns');
			}
			albuns = await albumRes.json();
		} catch (err) {
			console.error('Erro ao carregar dados:', err);
			message = 'Não foi possível carregar os dados. Por favor, tente novamente mais tarde.';
			messageType = 'error';
		}
	});

	async function submitForm() {
		try {
			const res = await fetch(`http://localhost:3000/api/musicas/${musicaId}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					nome,
					tempo,
					id_album: Number(id_album)
				})
			});

			if (!res.ok) {
				throw new Error('Erro ao atualizar a música');
			}

			message = 'Música atualizada com sucesso!';
			messageType = 'info';
			goto('/musicas');
		} catch (err) {
			console.error('Erro ao atualizar a música:', err);
			message = 'Erro ao atualizar a música. Por favor, tente novamente mais tarde.';
			messageType = 'error';
		}
	}

	function goBack() {
		window.location.href = '/musicas';
	}
</script>

<button
	class="back-button"
	on:click={goBack}
	type="button"
	aria-label="Voltar para a lista de músicas"
>
	← Voltar
</button>

<h1>Atualizar Música</h1>

<form on:submit|preventDefault={submitForm} class="submit-form-album">
	<label>
		Nome:
		<input type="text" bind:value={nome} required />
	</label>
	<br />
	<label>
		Tempo:
		<input type="text" bind:value={tempo} required />
	</label>
	<br />
	<label>
		Álbum:
		{#if albuns.length > 0}
			<select bind:value={id_album} required>
				<option value="" disabled selected>Selecione um álbum</option>
				{#each albuns as { id, nome }}
					<option value={id.toString()} selected={id.toString() === id_album}>{nome}</option>
				{/each}
			</select>
		{/if}
	</label>
	<br />
	<button type="submit" class="view-details">Atualizar Música</button>
</form>

{#if message}
	<div class={messageType === 'info' ? 'info-message' : 'error-message'}>
		{message}
	</div>
{/if}
