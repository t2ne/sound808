<script lang="ts">
	import { getArtistas, deleteArtista } from '$lib/api/artistas'; // Adaptar API
	import { onMount } from 'svelte';
	import type { Artista } from '$lib/api/artistas'; // Importar tipo de Artista

	let artistas: Artista[] = [];

	onMount(async () => {
		try {
			artistas = await getArtistas();
		} catch (err) {
			console.error(err);
		}
	});

	async function removeArtista(id: number) {
		if (confirm('Tem certeza que deseja remover este artista?')) {
			try {
				await deleteArtista(id);
				artistas = artistas.filter((artista) => artista.id !== id);
				alert('Artista removido com sucesso.');
			} catch (err) {
				console.error(err);
				alert('Erro ao remover o artista.');
			}
		}
	}
</script>

<h1>Artistas</h1>

<!-- Lista de artistas -->
<ul class="list">
	{#each artistas as artista}
		<li class="item">
			<div class="item-info">
				<strong class="item-name">{artista.nome}</strong>
			</div>
			<div class="item-actions">
				<button class="remove-button" on:click={() => removeArtista(artista.id)}>Remover</button>
				<a class="view-details" href={`/artistas/${artista.id}`}>Ver Detalhes</a>
			</div>
		</li>
	{/each}
</ul>
