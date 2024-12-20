<script lang="ts">
	import { getMusicas, deleteMusica } from '$lib/api/musicas';
	import { onMount } from 'svelte'; // Importa onMount de Svelte
	import type { Musica } from '$lib/api/musicas'; // Importa o tipo Musica da API

	let musicas: Musica[] = []; // Declaração com tipagem explícita

	// Busca todas as músicas na montagem do componente
	onMount(async () => {
		try {
			musicas = await getMusicas();
		} catch (err) {
			console.error(err);
		}
	});

	async function removeMusica(id: number) {
		if (confirm('Tem certeza que deseja remover esta música?')) {
			try {
				await deleteMusica(id);
				musicas = musicas.filter((musica) => musica.id !== id);
				alert('Música removida com sucesso.');
			} catch (err) {
				console.error(err);
				alert('Erro ao remover a música.');
			}
		}
	}
</script>

<h1>Músicas</h1>

<ul class="list">
	{#each musicas as musica}
		<li class="item">
			<div class="item-info">
				<strong class="item-name">{musica.nome}</strong> -
				<span class="item-time">{musica.tempo} minutos</span>
			</div>
			<div class="item-actions">
				<button class="remove-button" on:click={() => removeMusica(musica.id)}>Remover</button>
				<a class="view-details" href={`/musicas/${musica.id}`}>Ver Detalhes</a>
			</div>
		</li>
	{/each}
</ul>
