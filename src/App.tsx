import { useEffect, useState } from 'react';


import { api } from './services/api';

import './styles/global.scss';

import './styles/sidebar.scss';
import './styles/content.scss';
import GenreResponseProps from './models/GenreResponseProps';
import { SideBar } from './components/SideBar';
import MovieProps from './models/MovieResponseProps';
import { Content } from './components/Content';




export function App() {
  const [selectedGenreId, setSelectedGenreId] = useState(1);


  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);


  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });

    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId]);

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <SideBar onGenreSelected={handleClickButton} selectedGenreId={selectedGenreId} />
      <Content movies={movies} selectedGenre={selectedGenre} />
    </div>
  )
}
