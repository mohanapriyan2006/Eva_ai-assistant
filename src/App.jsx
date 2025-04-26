import './App.css'
import { DataProvider } from './hooks/DataContext'
import Speech from './components/Speech'
import Chat from './components/Chat'

function App() {


  return (
    <>
      <DataProvider>
        <Speech />
        {/* <Chat /> */}
      </DataProvider>
    </>
  )
}

export default App
