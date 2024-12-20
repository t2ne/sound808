<script lang="ts">
	import { page } from '$app/stores';
	import { deleteMusica } from '$lib/api/musicas';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	let musicaId: string | null = null;
	let confirmationMessage: string = '';
	let messageClass: string = '';
	let error: string | null = null;
	let hideButtons = false;

	onMount(() => {
		musicaId = $page.params.id;
		if (musicaId) {
			confirmationMessage = `Tem certeza que deseja remover esta música?`;
		} else {
			confirmationMessage = 'ID inválido!';
			messageClass = 'error-message';
			error = 'Não foi possível obter o ID da música.';
		}
	});

	// Confirm delete
	async function deleteMusicaConfirm() {
		if (musicaId) {
			try {
				hideButtons = true;
				await deleteMusica(parseInt(musicaId));
				messageClass = 'info-message';
				confirmationMessage = 'Música removida com sucesso!';
				setTimeout(() => {
					goto('/musicas');
				}, 1500);
			} catch (err) {
				console.error('Erro ao remover a música:', err);
				messageClass = 'error-message';
				confirmationMessage = 'Erro ao tentar remover a música. Por favor, tente novamente.';
				hideButtons = false;
			}
		}
	}

	function cancelDelete() {
		goto('/musicas');
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
				<button on:click={deleteMusicaConfirm} class="remove-button">Sim, remover</button>
				<button on:click={cancelDelete} class="view-details">Cancelar</button>
			{/if}
		</div>
	{/if}
</div>
