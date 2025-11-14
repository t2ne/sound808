export type Album ={
    id: number;
    nome: string;
    data: Date;
    id_artista: number;
    id_genero: number;
  }
  
  export async function getAlbuns(): Promise<Album[]> {
    const res = await fetch('http://localhost:3000/api/albuns');
    if (!res.ok) throw new Error('Erro no fetch de álbuns...');
    return await res.json();
  }
  
  export async function addAlbum(album: Omit<Album, 'id'>): Promise<Album> {
    const res = await fetch('http://localhost:3000/api/albuns', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(album),
    });
  
    if (!res.ok) throw new Error('Erro na adição do álbum...');
    return await res.json();
  }
  
  export async function updateAlbum(id: number, album: Album): Promise<Album> {
    const res = await fetch(`http://localhost:3000/api/albuns/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(album),
    });
  
    if (!res.ok) throw new Error('Erro no update do álbum...');
    return await res.json();
  }
  
  export async function deleteAlbum(id: number): Promise<void> {
    const res = await fetch(`http://localhost:3000/api/albuns/${id}`, {
      method: 'DELETE',
    });
  
    if (!res.ok) throw new Error('Erro na remoção do álbum...');
  }
  
  export async function getAlbumById(id: number): Promise<Album> {
    const res = await fetch(`http://localhost:3000/api/albuns/${id}`);
    if (!res.ok) throw new Error('Erro no fetch do álbum...');
    return await res.json();
  }
  