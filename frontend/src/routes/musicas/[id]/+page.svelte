<script lang="ts" context="module">
	import { getMusicaById, updateMusica, deleteMusica } from '$lib/api/musicas';

	export async function load({ params }: { params: { id: string } }) {
		const id = parseInt(params.id, 10);
		const musica = await getMusicaById(id);
		return { props: { musica } };
	}
</script>

<script lang="ts">
	import { Musica, updateMusica, deleteMusica } from '$lib/api/musicas';

	export let musica: Musica;

	let nome = musica.nome;
	let tempo = musica.tempo;
	let id_album = musica.id_album;

	async function updateMusicaDetails() {
		try {
			const updatedMusica = await updateMusica(musica.id, { nome, tempo, id_album });
			alert('Musica updated successfully!');
		} catch (err) {
			alert('Error updating musica');
		}
	}

	async function deleteMusicaById() {
		try {
			await deleteMusica(musica.id);
			alert('Musica deleted successfully!');
		} catch (err) {
			alert('Error deleting musica');
		}
	}
</script>

<h2>Edit Musica</h2>

<form on:submit|preventDefault={updateMusicaDetails}>
	<label for="nome">Nome:</label>
	<input type="text" id="nome" bind:value={nome} required />

	<label for="tempo">Tempo (in minutes):</label>
	<input type="number" id="tempo" bind:value={tempo} required />

	<label for="id_album">ID Album:</label>
	<input type="number" id="id_album" bind:value={id_album} required />

	<button type="submit">Update Musica</button>
</form>

<button on:click={deleteMusicaById}>Delete Musica</button>
