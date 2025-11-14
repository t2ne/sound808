<script lang="ts">
	import { getArtistas, deleteArtista } from '$lib/api/artistas';
	import { onMount } from 'svelte';
	import type { Artista } from '$lib/api/artistas';
	import { goto } from '$app/navigation';

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

	function goToAddArtista() {
		goto('/artistas/add');
	}
</script>

<h1>Artistas</h1>

<div style="text-align: center; margin-bottom: 20px;">
	<button on:click={goToAddArtista} class="view-details">Adicionar Artista</button>
</div>

<!-- Lista de artistas -->
<ul class="list">
	{#each artistas as artista}
		<li class="item">
			<div class="item-info">
				<strong class="item-name">{artista.nome}</strong>
			</div>
			<div class="item-actions">
				<a href={`/artistas/delete/${artista.id}`} class="remove-button">Remover</a>
				<a class="view-details" href={`/artistas/${artista.id}`}>Ver Detalhes</a>
			</div>
		</li>
	{/each}
</ul>
