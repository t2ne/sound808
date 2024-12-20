<script lang="ts">
	import { addMusica } from '$lib/api/musicas';
	let nome = '';
	let tempo = '';
	let id_album = '';

	async function submitForm() {
		try {
			await addMusica({
				nome,
				tempo,
				id_album: Number(id_album) // Converter para número
			});
			alert('Música criada com sucesso!');
			// Redirecionar ou limpar formulário
			nome = '';
			tempo = '';
			id_album = '';
		} catch (err) {
			console.error(err);
			alert('Erro ao criar a música.');
		}
	}
</script>

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
