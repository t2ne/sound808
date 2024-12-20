<script lang="ts">
	import { addMusica } from '$lib/api/musicas';
	import { goto } from '$app/navigation';

	let nome = '';
	let tempo = '';
	let id_album = '';

	async function submitForm() {
		try {
			await addMusica({
				nome,
				tempo,
				id_album: Number(id_album) // Convert to number
			});
			alert('Música criada com sucesso!');
			goto('/musicas'); // Redirect back to the musicas list
		} catch (err) {
			console.error(err);
			alert('Erro ao criar a música.');
		}
	}
</script>

<h1>Adicionar Música</h1>

<form on:submit|preventDefault={submitForm}>
	<label>
		Nome:
		<input type="text" bind:value={nome} required />
	</label>
	<label>
		Tempo:
		<input type="text" bind:value={tempo} required />
	</label>
	<label>
		ID do Álbum:
		<input type="number" bind:value={id_album} required />
	</label>
	<button type="submit">Adicionar Música</button>
</form>
