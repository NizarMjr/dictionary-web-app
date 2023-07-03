const { useState, useRef, useEffect } = require("react")
import { setSearch } from '@/redux/Actions';
import { BsSearch } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
const Search = () => {
    const inputRef = useRef();
    const [word, setWord] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        inputRef.current.focus();
    }, [])
    const searchForWord = (e) => {
        e.preventDefault();
        dispatch(setSearch(word));
    }

    return (
        <form onSubmit={(e) => searchForWord(e)} ref={inputRef} className='flex rounded p-2 items-center justify-between mb-8'>
            <input
                type="text"
                placeholder="Type Word to search"
                onChange={(e) => setWord(e.target.value)}
                className='flex-1 mr-2 bg-inherit border-b p-2'
                value={word}
            />
            <BsSearch className='cursor-pointer' onClick={(e) => searchForWord(e)} />
        </form>
    )
}
export default Search;