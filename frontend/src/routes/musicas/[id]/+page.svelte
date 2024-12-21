<script lang="ts">
	import { onMount } from 'svelte';
	import type { Musica } from '$lib/api/musicas';
	import { page } from '$app/stores';

	let musica: Musica | null = null;
	let albumNome: string | null = null;
	let loading = true;
	let error: string | null = null;

	onMount(async () => {
		try {
			const id = $page.params.id;
			console.log('Fetching musica with ID:', id);

			const res = await fetch(`http://localhost:3000/api/musicas/${id}`);
			if (!res.ok) {
				throw new Error(`Fetch falhado para a música de ID ${id}`);
			}
			musica = await res.json();
			console.log('Fetch da música:', musica);

			if (musica?.id_album) {
				const albumRes = await fetch(`http://localhost:3000/api/albuns/${musica.id_album}`);
				if (!albumRes.ok) {
					throw new Error('Falha ao buscar o álbum.');
				}
				const album = await albumRes.json();
				albumNome = album?.nome;
			}
		} catch (err) {
			console.error('Falha ao buscar a música:', err);
			error = 'Não foi possível carregar a música. Por favor, tente novamente mais tarde.';
		} finally {
			loading = false;
		}
	});

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

{#if loading}
	<p class="info-message">A carregar...</p>
{:else if error}
	<p class="error-message">{error}</p>
{:else if musica}
	<h1>{musica.nome}</h1>

	<p>ID: {musica.id}</p>
	<p>Tempo: {musica.tempo} minutos</p>

	<p>
		Álbum:
		{#if albumNome}
			<a
				href={`/albuns/${musica.id_album}`}
				class="album-link"
				style="cursor: pointer; color: #007BFF;"
			>
				{albumNome}
			</a>
		{:else}
			<span>A Carregar álbum...</span>
		{/if}
	</p>

	<div style="text-align: center; margin-top: 2.5%">
		<a class="view-details" href={`/musicas/update/${musica.id}`}>Atualizar</a>
		<a class="view-details" href={`/musicas/delete/${musica.id}`}>Remover</a>
	</div>
{/if}
