<script lang="ts">
	import { onMount } from 'svelte';
	import { getArtistaById } from '$lib/api/artistas';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import type { Artista } from '$lib/api/artistas';

	let artista: Artista | null = null;
	let errorMessage: string = '';

	onMount(async () => {
		const id = $page.params.id;

		try {
			artista = await getArtistaById(Number(id));
		} catch (error) {
			errorMessage = 'Erro ao carregar o artista.';
			console.error(error);
		}
	});

	function goBack() {
		goto('/artistas');
	}
</script>

<button
	class="back-button"
	on:click={goBack}
	type="button"
	aria-label="Voltar para a lista de artistas"
>
	← Voltar
</button>

{#if artista}
	<h1>{artista.nome}</h1>
	<div>
		<p><strong>Idade:</strong> {artista.idade}</p>
		<p><strong>Nacionalidade:</strong> {artista.nacionalidade}</p>
	</div>
	<div style="text-align: center; margin-top: 2.5%">
		<a class="view-details" href={`/artistas/update/${artista.id}`}>Atualizar</a>
		<a class="view-details" href={`/artistas/delete/${artista.id}`}>Remover</a>
	</div>
{:else if errorMessage}
	<p class="error-message">{errorMessage}</p>
{/if}
