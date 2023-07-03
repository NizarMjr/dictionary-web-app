import { useEffect, useRef, useState } from 'react'
import { BiBookAlt, BiChevronDown } from 'react-icons/bi'
import { CiDark, CiLight } from 'react-icons/ci'
const TopBar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [font, setFont] = useState(true);
    const [cairo, setCairo] = useState(false);
    const [nightMode, setNightMode] = useState(true);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    })
    const showFont = () => {
        setIsDropdownOpen(!isDropdownOpen)
        setFont(!font);
    }
    const changeFont = (font) => {
        setCairo(font === 'mono' ? true : false)
        showFont();
    }
    useEffect(() => {
        setTimeout(() => {
            document.querySelector('body').style.backgroundColor = `${nightMode ? 'white' : '#16181d'}`;
            document.querySelector('body').style.color = `${nightMode ? '#16181d' : 'hsla( 223 , 15% , 65% , 100%)'}`;
            document.querySelector('body').style.transition = '.5s'
        }, 200)
    }, [nightMode])

    useEffect(() => {
        document.querySelector('body').style.cssText = `${!cairo ? 'font-family: Cairo, sans-serif;' : 'font-family: Roboto Mono, monospace;'}`
    }, [cairo])

    const changeMode = () => {
        setNightMode(!nightMode);
    }
    return (
        <main className='flex items-center justify-between h-24'>
            <BiBookAlt className='text-2xl' />
            <div className='relative'>
                <div className='flex items-center'>
                    <div onClick={() => showFont()} className='flex items-center cursor-pointer'>
                        <span>{cairo ? 'Mono' : 'Cairo'}</span>
                        <span><BiChevronDown /></span>
                    </div>
                    <div className='flex items-center'>
                        <div onClick={() => changeMode()} className={`${!nightMode ? 'shadow-lightShadow' : 'shadow-darkShadow'} ml-8 mr-4 rounded-full w-10 h-5 bg-current p-1 cursor-pointer`}>
                            <div className={`h-full w-1/2 rounded-full bg-white ${nightMode ? 'translate' : ''}`}></div>
                        </div>
                        {nightMode ? <CiLight className='text-xl shadow-sunShadow bg-transparent rounded-full bg-[yellow]' /> : <CiDark className='text-xl rounded-full' />}

                    </div>
                </div>
                {isDropdownOpen && <ul ref={dropdownRef} className={`${font ? 'none' : ''} absolute bottom-[-5rem] p-4 rounded ${nightMode ? 'bg-indigo-200' : 'bg-indigo-500'}`}>
                    <li onClick={() => changeFont('mono')} className='cursor-pointer'>Mono</li>
                    <li onClick={() => changeFont('cairo')} className='cursor-pointer'>Cairo</li>
                </ul>}
                <div>
                </div>
            </div>
        </main>
    )
}
export default TopBar;