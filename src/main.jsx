import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import './eid_music.mp3'

import EidCard from './Eidcard.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <EidCard />
  </StrictMode>,
)
