import Layout from '../../components/layout';
import Link from 'next/link';

const Pokemon = ({ pokemon }) => {
    return (
        <div className='justify-center flex'>
        <Layout title={pokemon.name}>
            <h1 className="text-4xl mb-2 capitalize">
                {pokemon.id}. {pokemon.name}
            </h1>
            <ul>
                <img src={pokemon.image} alt={pokemon.name} />
                <p>
                    <span className="font-bold mr-2 text-center">Altura: {pokemon.weight} cm</span>
                </p>
                <p>
                    <span className="font-bold mr-2 text-center">Peso: {pokemon.height} kg</span>
                    
                </p>
                <h2 className="text-2xl mt-6 mb-2 capitalize">Tipo:</h2>
                {pokemon.types.map((type, index) => (
                    <p key={index}>{type.type.name}</p>
                ))}
            </ul>
            <p className="mt-10">
                <Link legacyBehavior href="/">
                    <button className='font-bold '>Voltar</button>
                </Link>
            </p>
        </Layout>
        </div>
    )
}
export const getServerSideProps = async (context) => {
    const { id } = context.query;
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokemon = await res.json();
    const paddedId = ('00' + id).slice(-3);
    pokemon.image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedId}.png`;
    return {
        props: { pokemon },
    };
}
export default Pokemon


    