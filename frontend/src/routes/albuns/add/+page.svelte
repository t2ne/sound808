<script lang="ts">
	import { addAlbum } from '$lib/api/albuns';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	let nome = '';
	let data = '';
	let id_artista = '';
	let id_genero = '';
	let message = '';
	let messageType = '';
	let artistas: { id: number; nome: string }[] = [];
	let generos: { id: number; nome: string }[] = [];

	onMount(async () => {
		try {
			const artistaRes = await fetch('http://localhost:3000/api/artistas');
			if (!artistaRes.ok) {
				throw new Error('Erro ao carregar os artistas');
			}
			artistas = await artistaRes.json();

			const generoRes = await fetch('http://localhost:3000/api/generos');
			if (!generoRes.ok) {
				throw new Error('Erro ao carregar os géneros');
			}
			generos = await generoRes.json();
		} catch (err) {
			console.error('Erro ao carregar dados:', err);
			message = 'Não foi possível carregar os dados. Por favor, tente novamente mais tarde.';
			messageType = 'error';
		}
	});

	async function submitForm() {
		try {
			await addAlbum({
				nome,
				data: new Date(data),
				id_artista: Number(id_artista),
				id_genero: Number(id_genero)
			});
			message = 'Álbum criado com sucesso!';
			messageType = 'info';
			goto('/albuns');
		} catch (err) {
			console.error('Erro ao criar o álbum:', err);
			message = 'Erro ao criar o álbum. Por favor, tente novamente.';
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

<h1>Adicionar Álbum</h1>

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
	<label>
		Artista:
		<select bind:value={id_artista} required>
			<option value="" disabled selected>Selecione um artista</option>
			{#each artistas as { id, nome }}
				<option value={id}>{nome}</option>
			{/each}
		</select>
	</label>
	<br />
	<label>
		Género:
		<select bind:value={id_genero} required>
			<option value="" disabled selected>Selecione um género</option>
			{#each generos as { id, nome }}
				<option value={id}>{nome}</option>
			{/each}
		</select>
	</label>
	<br />
	<button type="submit" class="view-details">Adicionar Álbum</button>
</form>

{#if message}
	<div class={messageType === 'info' ? 'info-message' : 'error-message'}>
		{message}
	</div>
{/if}
