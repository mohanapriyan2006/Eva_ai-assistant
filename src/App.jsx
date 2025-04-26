import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen flex bg-black justify-center items-center">
      <button
        onClick={() => setCount(count + 1)}
        className="w-40 h-20 border rounded bg-blue-600 text-white text-lg hover:bg-blue-700"
      >
        Count is {count}
      </button>
    </div>
  )
}

export default App
