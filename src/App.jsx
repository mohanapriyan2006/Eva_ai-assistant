import './App.css'
import { DataProvider } from './hooks/DataContext'
import Speech from './components/SpeechWithEva'
import Chat from './components/ChatWithEva'

function App() {


  return (
    <div className=''>
      <DataProvider>
        {/* <Speech /> */}
        <Chat />
      </DataProvider>


    </div>
  )
}

export default App;


