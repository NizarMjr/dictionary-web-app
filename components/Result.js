import { useEffect, useRef, useState } from 'react'
import { BsPlayCircle } from 'react-icons/bs'
import { useSelector } from 'react-redux'

const Result = () => {
    const getWord = useSelector(state => state.searchedWord);
    const [result, setResult] = useState([])
    const [audioURL, setAudioURL] = useState();
    const [err, setErr] = useState(false);
    const audioRef = useRef();

    useEffect(() => {
        const fetchWords = async () => {
            const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${getWord}`)
            const res = await response.json();

            if (response.status === 404) {
                setErr(true);
            } else {
                setResult(res);
                setErr(false);
            }
            console.log(res);
        }
        fetchWords();
    }, [getWord])

    useEffect(() => {
        setAudioURL(new Audio(result[0]?.phonetics[0]?.audio));
    }, [result])
    const playAudio = () => {
        audioURL.play();
    }
    return (
        <main>
            {!err ? <main>
                <article className='flex items-center justify-between mb-8 '>
                    <div>
                        <p className='text-4xl mb-2 font-bold capitalize'>{result[0]?.word}</p>
                        <p className='text-indigo-500'>{result[0]?.phonetic}</p>
                    </div>
                    <div className='flex items-center justify-between'>
                        <div >
                            <div>
                                <BsPlayCircle className='text-4xl rounded-full text-indigo-500 bg-transparent cursor-pointer mx-1' onClick={() => playAudio()} />
                            </div>
                            <audio ref={audioRef}>
                                <source src={audioURL} />
                            </audio>
                        </div>
                    </div>
                </article>
                {result.map((res, index) => {
                    return (
                        <div key={index} className='mt-10'>
                            <article>
                                {res.meanings.map((ele, index) => {
                                    return (
                                        <div key={index}>
                                            <span className='block font-bold mb-8'>- {ele.partOfSpeech}</span>
                                            <span className='block italic mb-4'>Meaning</span>
                                            <div>
                                                {ele.definitions.map((def, index) => {
                                                    return (
                                                        <div key={index} className='mb-4'>
                                                            {def.definition ? <p className='font-bold mb-4'>{def.definition}</p> : ''}
                                                            {def.example ? <div className='text-indigo-500 break-words'><span className='font-bold text-4xl mr-1'>.</span>{def.example}</div> : ''}
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                            {ele.antonyms.length !== 0 ? <>
                                                <span className='block italic mb-4'>Antonyms</span>
                                                <div className='mb-4'>
                                                    {ele.antonyms
                                                        .map((ant, index) => {
                                                            return (
                                                                <p key={index} className='text-red-500'>{ant}</p>
                                                            )
                                                        })}
                                                </div></> : ''}

                                        </div>
                                    )
                                })}
                            </article>
                        </div>
                    )
                })}
                {result[0]?.sourceUrls.length !== 0 ? <p><span className='italic font-sm mb-4'>Source:</span>{result[0]?.sourceUrls.map((src, index) => {
                    return (
                        <div key={index} className='mb-4'>
                            <a target='blank' href={src} className='block mb-1 bg-red'>{src}</a>
                        </div>
                    )
                })}</p> : ''}
            </main> : <p>Your search terms did not match any entries.</p>}
        </main>
    )
}
export default Result;