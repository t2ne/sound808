<script lang="ts">
	import { getMusicas } from '$lib/api/musicas';
	import { onMount } from 'svelte';
	import type { Musica } from '$lib/api/musicas';
	import { goto } from '$app/navigation';

	let musicas: Musica[] = [];

	// Fetch all musicas on mount
	onMount(async () => {
		try {
			musicas = await getMusicas();
		} catch (err) {
			console.error(err);
		}
	});

	function goToAddMusica() {
		goto('/musicas/add');
	}
</script>

<h1>Músicas</h1>

<div style="text-align: center; margin-bottom: 20px;">
	<button on:click={goToAddMusica} class="view-details">Adicionar Música</button>
</div>

<ul class="list">
	{#each musicas as musica}
		<li class="item">
			<div class="item-info">
				<strong class="item-name">{musica.nome}</strong> -
				<span class="item-time">{musica.tempo} minutos</span>
			</div>
			<div class="item-actions">
				<a class="remove-button" href={`/musicas/delete/${musica.id}`}>Remover</a>
				<a class="view-details" href={`/musicas/${musica.id}`}>Ver Detalhes</a>
			</div>
		</li>
	{/each}
</ul>
