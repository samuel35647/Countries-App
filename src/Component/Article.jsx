import  { Link } from "react-router-dom"

const Article = ({ flags, name, population, region, subregion, capital }) => {
    return (
        <div className="dark:text-white text-black">
            <Link to={`/${name.common}`}>
                <article className="bg-white dark:bg-gray-700 rounded-lg shadow overflow-hidden hover:bg-gray-200 hover:dark:bg-red-900">
                    <img src={flags.svg} alt="" 
                    className="md:h-64 lg:h-64 xl:h-64 w-full object-cover border-1 border-gray-100 transition-all duration-200"
                    />

                    <div className="p-4">
                        <h2
                        className="font-bold text-lg dark:text-white text-black mb-2">
                            {name.common}
                        </h2>
                        <ul className="flex flex-col items-start justify-start gap-2">
                            <li>Population: {population.toLocaleString()}</li>                
                            <li>Region: {region}</li>                
                            <li>Subregion: {subregion}</li>                
                            <li>Capital: {capital}</li>                
                        </ul>
                    </div>
                </article>
            </Link>
        </div>
    )
}

export default Article