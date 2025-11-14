<script lang="ts">
	import { onMount } from 'svelte';
	import { getGeneroById } from '$lib/api/generos';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import type { Genero } from '$lib/api/generos';

	let genero: Genero | null = null;
	let errorMessage: string = '';

	onMount(async () => {
		const id = $page.params.id;

		try {
			genero = await getGeneroById(Number(id));
		} catch (error) {
			errorMessage = 'Erro ao carregar o género.';
			console.error(error);
		}
	});

	function goBack() {
		goto('/generos');
	}
</script>

<button
	class="back-button"
	on:click={goBack}
	type="button"
	aria-label="Voltar para a lista de géneros"
>
	← Voltar
</button>

{#if genero}
	<h1>{genero.nome}</h1>
	<div>
		<p><strong>ID:</strong> {genero.id}</p>
	</div>
	<div style="text-align: center; margin-top: 2.5%">
		<a class="view-details" href={`/generos/update/${genero.id}`}>Atualizar</a>
		<a class="view-details" href={`/generos/delete/${genero.id}`}>Remover</a>
	</div>
{:else if errorMessage}
	<p class="error-message">{errorMessage}</p>
{/if}
