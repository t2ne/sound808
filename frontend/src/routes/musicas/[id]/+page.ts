// src/routes/musicas/[id]/+page.ts
import type { Musica } from '$lib/api/musicas';

export async function load({ params, fetch }: { params: { id: string }, fetch: typeof globalThis.fetch }) {
  const { id } = params;

  try {
    // Log the ID to ensure it's being passed correctly
    console.log('Fetching musica with ID:', id);

    // Make the API request using the provided fetch function
    const response = await fetch(`http://localhost:3000/api/musicas/${id}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch musica with ID ${id}`);
    }

    const musica: Musica = await response.json();
    console.log('Fetched musica:', musica); // Log the fetched data to verify

    return { props: { musica } }; // Pass the musica as a prop to the component
  } catch (err) {
    console.error('Error fetching musica:', err);
    return { props: { musica: null } }; // Return null if musica is not found
  }
}
