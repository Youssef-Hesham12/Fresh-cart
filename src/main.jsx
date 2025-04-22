import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "@fortawesome/fontawesome-free/css/all.min.css"
import './index.css'
import App from './App.jsx'
import { HeroUIProvider } from '@heroui/react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ThemeProvider } from "@material-tailwind/react";



createRoot(document.getElementById('root')).render(
  <StrictMode>
   <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
)
