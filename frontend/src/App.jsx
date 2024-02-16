import RepoInput from "./components/RepoInput"
import Error from "./components/Error"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RepoMap from "./components/RepoMap"
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RepoInput />} ></Route>
          <Route path="/repo-map" element={<RepoMap />} ></Route>
          <Route path="/error" element={<Error />} ></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
