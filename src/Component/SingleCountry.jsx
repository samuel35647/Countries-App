import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

const SingleCountry = () => {
    const [country, setCountry] = useState({}); // Change to object
    const { name } = useParams();

    useEffect(() => {
        const getSingleCountry = async () => {
            try {
                const res = await fetch(`https://restcountries.com/v3.1/name/${name}`);
                const data = await res.json();
                setCountry(data[0]); // Assuming data is an array and we take the first item
            } catch (error) {
                console.error(error);
            }
        };

        getSingleCountry();
    }, [name]);

    useEffect(() => {
        document.title = `Countries | ${name}`
    }, [name])

    return (
        <div className="dark:text-white text-black">
            <section className="max-w-7xl mx-auto p-8 md:py-0">
                {/* Check if country is not empty before mapping */}
                {Object.keys(country).length > 0 && (
                    <div key={country.population}
                        className="h-screen mt-20 flex items-center justify-center gap-40 md:flex-col md:gap-10"
                    >
                        <article>
                            <img src={country.flags.svg} alt="" className="md:h-64 lg:h-64 xl:h-64 w-full" />
                        </article>

                        <div>
                        <article>
                            <h1 className="mb-8 font-semibold text-4xl lg:text-6xl">{country.name.official}</h1>
                        </article>

                        <ul className="mt-1 flex flex-col justify-start items-start gap-2">
                            <li>Capital: {country.capital[0]}</li>
                            <li>Population: {country.population.toLocaleString()}</li> 
                            <li>Region: {country.region}</li>
                            <li>Subregion: {country.subregion}</li>
                        </ul>

                        {country.borders && (
                            <>
                                <h3 className="mt-3 font-bold text-lg mb-2">Borders:</h3>
                                <ul className="flex flex-wrap item-start justify-start gap-2">
                                    {country.borders.map((border, index) => (
                                        <li key={index}
                                        className="dark:bg-black bg-white shadow-md p-2 rounded-lg text-xs tracking-wide">
                                            {border}
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}

                        <Link to="/" className="dark:bg-black bg-white hover:bg-red-700 inline-block mt-8 py-2 px-6 rounded-lg shadow-md transition-all duration-200">&larr; Back</Link>
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
};

export default SingleCountry;
