<script lang="ts">
	import { getAlbuns } from '$lib/api/albuns';
	import { onMount } from 'svelte';
	import type { Album } from '$lib/api/albuns';
	import { goto } from '$app/navigation';

	let albuns: Album[] = [];

	onMount(async () => {
		try {
			albuns = await getAlbuns();
		} catch (err) {
			console.error('Erro ao carregar álbuns:', err);
		}
	});

	function goToAddAlbum() {
		goto('/albuns/add');
	}
</script>

<h1>Álbuns</h1>

<div style="text-align: center; margin-bottom: 20px;">
	<button on:click={goToAddAlbum} class="view-details">Adicionar Álbum</button>
</div>

<ul class="list">
	{#each albuns as album}
		<li class="item">
			<div class="item-info">
				<strong class="item-name">{album.nome}</strong>
			</div>
			<div class="item-actions">
				<a class="remove-button" href={`/albuns/delete/${album.id}`}>Remover</a>
				<a class="view-details" href={`/albuns/${album.id}`}>Ver Detalhes</a>
			</div>
		</li>
	{/each}
</ul>
