<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	let nome = '';
	let data = '';
	let id_artista = '';
	let id_genero = '';
	let message = '';
	let messageType = '';
	let albumId: string = '';
	let artistas: { id: number; nome: string }[] = [];
	let generos: { id: number; nome: string }[] = [];

	onMount(async () => {
		const albumIdFromParams = $page.params.id;
		albumId = albumIdFromParams;

		const res = await fetch(`http://localhost:3000/api/albuns/${albumId}`);
		const album = await res.json();
		nome = album.nome;
		data = new Date(album.data).toISOString().split('T')[0];
		id_artista = album.id_artista.toString();
		id_genero = album.id_genero.toString();

		const artistasRes = await fetch('http://localhost:3000/api/artistas');
		if (artistasRes.ok) {
			artistas = await artistasRes.json();
		} else {
			console.error('Erro ao carregar artistas');
		}

		const generosRes = await fetch('http://localhost:3000/api/generos');
		if (generosRes.ok) {
			generos = await generosRes.json();
		} else {
			console.error('Erro ao carregar géneros');
		}
	});

	async function submitForm() {
		try {
			const res = await fetch(`http://localhost:3000/api/albuns/${albumId}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					nome,
					data: new Date(data),
					id_artista: Number(id_artista),
					id_genero: Number(id_genero)
				})
			});

			if (!res.ok) {
				throw new Error('Erro ao atualizar o álbum');
			}

			message = 'Álbum atualizado com sucesso!';
			messageType = 'info';
			goto('/albuns');
		} catch (err) {
			console.error('Erro ao atualizar o álbum:', err);
			message = 'Erro ao atualizar o álbum. Por favor, tente novamente mais tarde.';
			messageType = 'error';
		}
	}

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

<h1>Atualizar Álbum</h1>

<form on:submit|preventDefault={submitForm} class="submit-form">
	<label>
		Nome:
		<input type="text" bind:value={nome} required />
	</label>
	<br />
	<label>
		Data:
		<input type="date" bind:value={data} required />
	</label>
	<br />

	<!-- Artista Select -->
	<label>
		Artista:
		{#if artistas.length > 0}
			<select bind:value={id_artista} required>
				<option value="" disabled selected>Selecione um artista</option>
				{#each artistas as { id, nome }}
					<option value={id.toString()} selected={id.toString() === id_artista}>{nome}</option>
				{/each}
			</select>
		{/if}
	</label>
	<br />

	<!-- Genero Select -->
	<label>
		Género:
		{#if generos.length > 0}
			<select bind:value={id_genero} required>
				<option value="" disabled selected>Selecione um género</option>
				{#each generos as { id, nome }}
					<option value={id.toString()} selected={id.toString() === id_genero}>{nome}</option>
				{/each}
			</select>
		{/if}
	</label>
	<br />

	<button type="submit" class="view-details">Atualizar Álbum</button>
</form>

{#if message}
	<div class={messageType === 'info' ? 'info-message' : 'error-message'}>
		{message}
	</div>
{/if}
