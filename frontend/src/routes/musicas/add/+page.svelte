<script lang="ts">
	import { addMusica } from '$lib/api/musicas';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	let nome = '';
	let tempo = '';
	let id_album = '';
	let message = '';
	let messageType = '';
	let albuns: { id: number; nome: string }[] = [];

	onMount(async () => {
		try {
			const res = await fetch('http://localhost:3000/api/albuns');
			if (!res.ok) {
				throw new Error('Erro ao carregar os álbuns');
			}
			albuns = await res.json();
		} catch (err) {
			console.error('Erro ao carregar os álbuns:', err);
			message = 'Não foi possível carregar os álbuns.';
			messageType = 'error';
		}
	});

	async function submitForm() {
		try {
			await addMusica({
				nome,
				tempo,
				id_album: Number(id_album)
			});
			message = 'Música criada com sucesso!';
			messageType = 'info';
			goto('/musicas');
		} catch (err) {
			console.error(err);
			message = 'Erro ao criar a música.';
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

<h1>Adicionar Música</h1>

<form on:submit|preventDefault={submitForm} class="submit-form">
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
		<select bind:value={id_album} required>
			<option value="" disabled selected>Selecione um álbum</option>
			{#each albuns as { id, nome }}
				<option value={id}>{nome}</option>
			{/each}
		</select>
	</label>
	<br />
	<button type="submit" class="view-details">Adicionar Música</button>
</form>

{#if message}
	<div class={messageType === 'info' ? 'info-message' : 'error-message'}>
		{message}
	</div>
{/if}
