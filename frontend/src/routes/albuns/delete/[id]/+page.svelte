<script lang="ts">
	import { page } from '$app/stores';
	import { deleteAlbum } from '$lib/api/albuns';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	let albumId: string | null = null;
	let confirmationMessage: string = '';
	let messageClass: string = '';
	let error: string | null = null;
	let hideButtons = false;

	onMount(() => {
		albumId = $page.params.id;
		if (albumId) {
			confirmationMessage = `Tem certeza que deseja remover este álbum?`;
		} else {
			confirmationMessage = 'ID inválido!';
			messageClass = 'error-message';
			error = 'Não foi possível obter o ID do álbum.';
		}
	});

	async function deleteAlbumConfirm() {
		if (albumId) {
			try {
				hideButtons = true;
				await deleteAlbum(parseInt(albumId));
				messageClass = 'info-message';
				confirmationMessage = 'Álbum removido com sucesso!';
				setTimeout(() => {
					goto('/albuns');
				}, 1500);
			} catch (err) {
				console.error('Erro ao remover o álbum:', err);
				messageClass = 'error-message';
				confirmationMessage = 'Erro ao tentar remover o álbum. Por favor, tente novamente.';
				hideButtons = false;
			}
		}
	}

	function cancelDelete() {
		goto('/albuns');
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
				<button on:click={deleteAlbumConfirm} class="remove-button">Sim, remover</button>
				<button on:click={cancelDelete} class="view-details">Cancelar</button>
			{/if}
		</div>
	{/if}
</div>
