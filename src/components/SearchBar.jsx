import React, { useEffect, useState } from 'react'
import { IoSearchOutline } from "react-icons/io5";
import { useLocation, useNavigate } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';


const SearchBar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isSearchPage, setIsSearchPage] = useState(false);

    useEffect(() =>{
        const isSearch = location.pathname === "/search"
        setIsSearchPage(isSearch)
    }, [location])
    
    const redirectToSearchPage = () => {
        navigate("/search")
    }

  return (
    <div className='flex items-center max-w-2xl h-full mx-auto mb-10 border rounded-xl gap-2'>
        <button className='p-3'>
            <IoSearchOutline size={20}/>
        </button>

        <div className='w-full h-full'>
            {
                !isSearchPage ? (
                     <div onClick={redirectToSearchPage} className='w-full h-full flex items-center'>
                        <TypeAnimation
                            sequence={[
                                // Same substring at the start will only be typed out once, initially
                                'AI Use in "farming"',
                                1000, // wait 1s before replacing "Mice" with "Hamsters"
                                'AI Use in "dairy"',
                                1000,
                                'AI Use in "energy"',
                                1000,
                                'AI Use in "crops"',
                                1000,
                                'AI Use in "soil"',
                                1000,
                                'AI Use in "education"',
                                1000,
                                'AI Use in "health"',
                                1000,
                            ]}
                        wrapper="span"
                        speed={50}
                        repeat={Infinity}
                    />
                    </div>
                ) : (
                    <div className='w-full h-full'>
                        <input type="text" placeholder='Search for farming, crops and more...' className='bg-transparent w-full h-full outline-none'/>
                    </div>
                )
            }
        </div>
     
    </div>
  )
}

export default SearchBar
