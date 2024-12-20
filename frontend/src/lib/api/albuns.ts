export type Album ={
    id: number;
    nome: string;
    ano: number;
    id_artista: number;
  }
  
  // Fetch all albuns
  export async function getAlbuns(): Promise<Album[]> {
    const res = await fetch('http://localhost:3000/api/albuns');
    if (!res.ok) throw new Error('Erro no fetch de álbuns...');
    return await res.json();
  }
  
  // Add a new album
  export async function addAlbum(album: Omit<Album, 'id'>): Promise<Album> {
    const res = await fetch('http://localhost:3000/api/albuns', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(album),
    });
  
    if (!res.ok) throw new Error('Erro na adição do álbum...');
    return await res.json();
  }
  
  // Update an existing album
  export async function updateAlbum(id: number, album: Album): Promise<Album> {
    const res = await fetch(`http://localhost:3000/api/albuns/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(album),
    });
  
    if (!res.ok) throw new Error('Erro no update do álbum...');
    return await res.json();
  }
  
  // Delete an album
  export async function deleteAlbum(id: number): Promise<void> {
    const res = await fetch(`http://localhost:3000/api/albuns/${id}`, {
      method: 'DELETE',
    });
  
    if (!res.ok) throw new Error('Erro na remoção do álbum...');
  }
  
  // Fetch an album by its ID
  export async function getAlbumById(id: number): Promise<Album> {
    const res = await fetch(`http://localhost:3000/api/albuns/${id}`);
    if (!res.ok) throw new Error('Erro no fetch do álbum...');
    return await res.json();
  }
  