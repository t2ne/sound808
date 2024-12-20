<script lang="ts">
	import { getAlbuns, deleteAlbum } from '$lib/api/albuns'; // Adaptar API
	import { onMount } from 'svelte';
	import type { Album } from '$lib/api/albuns'; // Importar tipo de Album

	let albuns: Album[] = [];

	onMount(async () => {
		try {
			albuns = await getAlbuns();
		} catch (err) {
			console.error(err);
		}
	});

	async function removeAlbum(id: number) {
		if (confirm('Tem certeza que deseja remover este álbum?')) {
			try {
				await deleteAlbum(id);
				albuns = albuns.filter((album) => album.id !== id);
				alert('Álbum removido com sucesso.');
			} catch (err) {
				console.error(err);
				alert('Erro ao remover o álbum.');
			}
		}
	}
</script>

<h1>Álbuns</h1>

<!-- Lista de álbuns -->
<ul class="list">
	{#each albuns as album}
		<li class="item">
			<div class="item-info">
				<strong class="item-name">{album.nome}</strong>
			</div>
			<div class="item-actions">
				<button class="remove-button" on:click={() => removeAlbum(album.id)}>Remover</button>
				<a class="view-details" href={`/albuns/${album.id}`}>Ver Detalhes</a>
			</div>
		</li>
	{/each}
</ul>
