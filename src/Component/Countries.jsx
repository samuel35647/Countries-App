import { useState, useEffect } from "react";
import Article from "./Article";

const Countries = () => {
    const [countries, setCountries] = useState([]);
    const [search, setSearch] = useState("");
    const regions = [
        {
            name: "Europe",
        },
        {
            name: "Asia",
        },
        {
            name: "Africa",
        },
        {
            name: "Oceania",
        },
        {
            name: "Americas",
        },
        {
            name: "Antarctic",
        },
    ]

    useEffect(() => {
        document.title = `Countries App | Showing All Countries Available`;
    }, [])

    useEffect(() => {
        const getCountries = async () => {
            try {
                const res = await fetch("https://restcountries.com/v3.1/all");
                const data = await res.json();
                setCountries(data);
            } catch (error) {
                console.error(error);
            }
        };

        getCountries();
    }, []);

    async function searchCountry() {
        try {
            const res = await fetch(`https://restcountries.com/v3.1/name/${search}`)
            const data = await res.json();
            setCountries(data)
        } catch (error) {
            console.error(error)
        }
    }

    async function filterRegion(region) {
        try {
            const res = await fetch(`https://restcountries.com/v3.1/region/${region}`)
            const data = await res.json();
            setCountries(data)
        } catch (error) {
            console.error(error)
        }
    } 

    function handleSearchCountry (e) {
            e.preventDefault()
            searchCountry()
    }

    function handleFilterRegion(e) {
        e.preventDefault()
        filterRegion()
    }

    return (
        <div>
            {countries.length === 0 ? (
                <h1 className="text-black dark:text-white font-bold uppercase tracking-wide flex items-center justify-center text-center h-screen text-4xl">
                    Loading...
                </h1>
            ) : (
                <section className="container mx-auto p-8">
                    {/* form  */}
                    <div className="flex sm:flex-col mb-8 gap-4  xl:flex-row xl:items-center xl:justify-between">
                        <form onSubmit={handleSearchCountry} autoComplete="off" className="max-w-4xl  xl:flex-1">
                            <input 
                                type="text" 
                                name="search" 
                                id="search" 
                                placeholder="Search for a Country" 
                                required
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="py-3 px-4 text-white shadow outline-none rounded-lg w-full dark:text-gray-400 dark:placeholder-gray-100 dark:bg-gray-400 dark:focus:bg-gray-700 transition-all duration-200"
                                />
                        </form>

                        <form onSubmit={handleFilterRegion}>
                            <select 
                                name="filterByRegion" 
                                id="filterByRegion"
                                className="w-52 py-3 px-4 outline-none shadow rounded-lg text-gray-700 dark:bg-gray-500 dark:text-white dark:focus:bg-gray-700"
                                value={regions.name}
                                onChange={e => filterRegion(e.target.value)}
                                >
                                    {regions.map((region, index) => (
                                    <option 
                                        key={index} 
                                        value={region.name}
                                    >
                                        {region.name}
                                    </option>
                                ))}
                            </select>
                        </form>
                    </div>

                    <div 
                    className="grid grid-cols-1 gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                        {countries.map((country) => (
                            <Article key={country.name.common} {...country} />
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};

export default Countries;
