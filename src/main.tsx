import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Button } from './components/button/button'
import "./styles/index.css";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Button>Click Me!</Button>
  </StrictMode>,
)
