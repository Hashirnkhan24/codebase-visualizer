import RepoInput from "./components/RepoInput"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RepoMap from "./components/RepoMap"
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RepoInput />} ></Route>
          <Route path="/repo-map" element={<RepoMap />} ></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
