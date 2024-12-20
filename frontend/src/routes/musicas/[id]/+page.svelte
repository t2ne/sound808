<script lang="ts">
	import type { Musica } from '$lib/api/musicas';

	export let musica: Musica | null;
</script>

{#if musica}
	<h1>{musica.nome}</h1>
	<p>Tempo: {musica.tempo}</p>
	<p>ID do álbum: {musica.id_album}</p>
{:else}
	<p>Carregando...</p>
{/if}
