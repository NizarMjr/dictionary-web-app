import Image from 'next/image'
import { Inter } from 'next/font/google'
import TopBar from '@/components/TopBar'
import Search from '@/components/Search'
import Result from '@/components/Result'
import { Provider } from 'react-redux'
import store from '@/redux/store'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <Provider store={store}>
      <main className='container'>
        <TopBar />
        <Search />
        <Result />
      </main>
    </Provider>

  )
}
