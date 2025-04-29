import './App.css'
import Layout from './components/Layout';
import { DataProvider } from './hooks/DataContext'


function App() {

  return (
    <div className='app-div relative'>
      <DataProvider>
        <Layout />
      </DataProvider>
    </div>
  )
}

export default App;



