<script lang="ts">
	import { getGeneros, deleteGenero } from '$lib/api/generos'; // Adaptar API
	import { onMount } from 'svelte';
	import type { Genero } from '$lib/api/generos'; // Importar tipo de Genero

	let generos: Genero[] = [];

	onMount(async () => {
		try {
			generos = await getGeneros();
		} catch (err) {
			console.error(err);
		}
	});

	async function removeGenero(id: number) {
		if (confirm('Tem certeza que deseja remover este género?')) {
			try {
				await deleteGenero(id);
				generos = generos.filter((genero) => genero.id !== id);
				alert('Género removido com sucesso.');
			} catch (err) {
				console.error(err);
				alert('Erro ao remover o género.');
			}
		}
	}
</script>

<h1>Géneros</h1>

<!-- Lista de géneros -->
<ul class="list">
	{#each generos as genero}
		<li class="item">
			<div class="item-info">
				<strong class="item-name">{genero.nome}</strong>
			</div>
			<div class="item-actions">
				<button class="remove-button" on:click={() => removeGenero(genero.id)}>Remover</button>
				<a class="view-details" href={`/generos/${genero.id}`}>Ver Detalhes</a>
			</div>
		</li>
	{/each}
</ul>
