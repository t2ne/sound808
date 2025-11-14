<script lang="ts">
	import { page } from '$app/stores';
	import { deleteArtista } from '$lib/api/artistas';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	let artistaId: string | null = null;
	let confirmationMessage: string = '';
	let messageClass: string = '';
	let error: string | null = null;
	let hideButtons = false;

	onMount(() => {
		artistaId = $page.params.id;
		if (artistaId) {
			confirmationMessage = `Tem certeza que deseja remover este artista?`;
		} else {
			confirmationMessage = 'ID inválido!';
			messageClass = 'error-message';
			error = 'Não foi possível obter o ID do artista.';
		}
	});

	async function deleteArtistaConfirm() {
		if (artistaId) {
			try {
				hideButtons = true;
				await deleteArtista(parseInt(artistaId));
				messageClass = 'info-message';
				confirmationMessage = 'Artista removido com sucesso!';
				setTimeout(() => {
					goto('/artistas');
				}, 1500);
			} catch (err) {
				console.error('Erro ao remover o artista:', err);
				messageClass = 'error-message';
				confirmationMessage = 'Erro ao tentar remover o artista. Por favor, tente novamente.';
				hideButtons = false;
			}
		}
	}

	function cancelDelete() {
		goto('/artistas');
	}
</script>

<div class="confirmation-container" style="text-align: center;">
	{#if error}
		<p class="error-message">{error}</p>
	{:else}
		<h2 style="margin-top:15%">{confirmationMessage}</h2>
		{#if messageClass}
			<p class={messageClass}></p>
		{/if}
		<div style="margin-top: 4%;">
			{#if !hideButtons}
				<button on:click={deleteArtistaConfirm} class="remove-button">Sim, remover</button>
				<button on:click={cancelDelete} class="view-details">Cancelar</button>
			{/if}
		</div>
	{/if}
</div>
