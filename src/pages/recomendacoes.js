import { useState, useEffect } from 'react';

export default function Recomendacoes({ query }) {
  const [recomendacoes, setRecomendacoes] = useState([]);
  const [avaliacoes, setAvaliacoes] = useState({});

  useEffect(() => {
    const fetchRecomendacoes = async () => {
      // Substitua com a lógica de busca de recomendações do seu backend.
      const res = await fetch(`http://seu-backend/recomendacoes?carros=${query.carros}`);
      const novasRecomendacoes = await res.json();
      setRecomendacoes(novasRecomendacoes);
    };

    fetchRecomendacoes();
  }, [query.carros]);

  const avaliar = (id, avaliacao) => {
    setAvaliacoes({ ...avaliacoes, [id]: avaliacao });
  };

  return (
    <div>
      <h1>Recomendações para você</h1>
      {recomendacoes.map((rec) => (
        <div key={rec.id}>
          <h2>{rec.marca} {rec.modelo}</h2>
          <button onClick={() => avaliar(rec.id, 'like')}>Like</button>
          <button onClick={() => avaliar(rec.id, 'dislike')}>Dislike</button>
        </div>
      ))}
    </div>
  );
}

Recomendacoes.getInitialProps = ({ query }) => {
  return { query };
};
