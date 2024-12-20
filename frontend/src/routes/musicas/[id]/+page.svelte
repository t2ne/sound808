<script lang="ts">
	import { onMount } from 'svelte';
	import type { Musica } from '$lib/api/musicas';
	import { page } from '$app/stores';

	let musica: Musica | null = null;
	let loading = true;
	let error: string | null = null;

	onMount(async () => {
		try {
			// Extract the ID from the URL using SvelteKit's `page` store
			const id = $page.params.id;
			console.log('Fetching musica with ID:', id);

			// Fetch the musica data
			const res = await fetch(`http://localhost:3000/api/musicas/${id}`);
			if (!res.ok) {
				throw new Error(`Failed to fetch musica with ID ${id}`);
			}
			musica = await res.json();
			console.log('Fetched musica:', musica); // Log the fetched data
		} catch (err) {
			console.error('Error fetching musica:', err);
			error = 'Erro ao carregar a música.';
		} finally {
			loading = false; // Set loading to false after the fetch
		}
	});
</script>

{#if loading}
	<p>Carregando...</p>
{:else if error}
	<p>{error}</p>
{:else if musica}
	<h1>{musica.nome}</h1>
	<p>Tempo: {musica.tempo}</p>
	<p>ID do álbum: {musica.id_album}</p>
{/if}
