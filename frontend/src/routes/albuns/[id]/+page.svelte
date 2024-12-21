<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	let album: { nome: string; id_artista: number; id_genero: number } | null = null;
	let artistaNome: string | null = null;
	let generoNome: string | null = null;
	let loading = true;
	let error: string | null = null;

	onMount(async () => {
		try {
			const id = $page.params.id;
			console.log('Fetching album with ID:', id);

			const res = await fetch(`http://localhost:3000/api/albuns/${id}`);
			if (!res.ok) {
				throw new Error(`Falha ao buscar o álbum de ID ${id}`);
			}
			album = await res.json();
			console.log('Album:', album);

			if (album?.id_artista) {
				const artistaRes = await fetch(`http://localhost:3000/api/artistas/${album.id_artista}`);
				if (!artistaRes.ok) {
					throw new Error('Falha ao buscar o artista.');
				}
				const artista = await artistaRes.json();
				artistaNome = artista?.nome;
			}

			if (album?.id_genero) {
				const generoRes = await fetch(`http://localhost:3000/api/generos/${album.id_genero}`);
				if (!generoRes.ok) {
					throw new Error('Falha ao buscar o género relacionado.');
				}
				const generoRelacionado = await generoRes.json();
				generoNome = generoRelacionado?.nome;
			}
		} catch (err) {
			console.error('Falha ao buscar o álbum:', err);
			error = 'Não foi possível carregar o álbum. Por favor, tente novamente mais tarde.';
		} finally {
			loading = false;
		}
	});

	function goBack() {
		window.location.href = '/albuns';
	}
</script>

<button
	class="back-button"
	on:click={goBack}
	type="button"
	aria-label="Voltar para a lista de álbuns"
>
	← Voltar
</button>

{#if loading}
	<p class="info-message">A carregar...</p>
{:else if error}
	<p class="error-message">{error}</p>
{:else if album}
	<h1>{album.nome}</h1>

	<p>
		Artista:
		{#if artistaNome}
			<a
				href={`/artistas/${album.id_artista}`}
				class="artista-link"
				style="cursor: pointer; color: #007BFF;"
			>
				{artistaNome}
			</a>
		{:else}
			<span>A carregar artista...</span>
		{/if}
	</p>

	<p>
		Género:
		{#if generoNome}
			<a
				href={`/generos/${album.id_genero}`}
				class="genero-link"
				style="cursor: pointer; color: #007BFF;"
			>
				{generoNome}
			</a>
		{:else}
			<span>A carregar género...</span>
		{/if}
	</p>

	<div style="text-align: center; margin-top: 2.5%">
		<a class="view-details" href={`/albuns/update/${$page.params.id}`}>Atualizar</a>
		<a class="view-details" href={`/albuns/delete/${$page.params.id}`}>Remover</a>
	</div>
{/if}
