import Link from 'next/link';
import Layout from '../components/layout'

export default function Home({ pokemon }) {

  return (
    <Layout title="NextJS Test">
        <h1 className="text-4xl mb-8 text-center text-cyan-300 hover:shadow-2xl">NextJS Test</h1>
        <h2 className='text-4xl mb-8 text-center text-cyan-300'>Escolha seu Pokemon favorito!</h2>
        <ul className="flex space-x-2">
          {pokemon.map((item, index) => (
            <li key={index}>
              <Link legacyBehavior href={`/pokemon/${index + 1}`}>
                <a className="border p-4 border-grey my-2 border-separate box-content hover:shadow-2xl capitalize inline-table justify-items-center text-lg bg-red-50 rounded-md">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 mr-3"
                  />
                  <span className="mr-2 font-bold">
                      {index + 1}.
                  </span>
                  {item.name}
                </a>
              </Link>
            </li>
          ))}
        </ul>
    </Layout>
  )
}

export const getStaticProps = async () =>{
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=150`);
  const {results} = await res.json();
  const pokemon = results.map((pokeman, index) => {
    const paddedId = ('00' + (index + 1)).slice(-3);
    const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedId}.png`;
    return { ...pokeman, image};
  });
  return {
    props: {pokemon},
  };
}