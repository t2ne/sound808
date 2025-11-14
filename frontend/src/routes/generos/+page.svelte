<script lang="ts">
	import { getGeneros } from '$lib/api/generos';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import type { Genero } from '$lib/api/generos';

	let generos: Genero[] = [];

	onMount(async () => {
		try {
			generos = await getGeneros();
		} catch (err) {
			console.error(err);
		}
	});

	function goToAddGenero() {
		goto('/generos/add');
	}
</script>

<h1>Géneros</h1>

<div style="text-align: center; margin-bottom: 20px;">
	<button on:click={goToAddGenero} class="view-details">Adicionar Género</button>
</div>

<ul class="list">
	{#each generos as genero}
		<li class="item">
			<div class="item-info">
				<strong class="item-name">{genero.nome}</strong>
			</div>
			<div class="item-actions">
				<a class="remove-button" href={`/generos/delete/${genero.id}`}>Remover</a>
				<a class="view-details" href={`/generos/${genero.id}`}>Ver Detalhes</a>
			</div>
		</li>
	{/each}
</ul>
