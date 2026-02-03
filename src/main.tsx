import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import 'amfe-flexible'

import routes from './router/index.tsx'
import { RouterProvider } from 'react-router-dom'
import { theme } from './config/theme'
import 'reset-css/reset.css'
import './global.less'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={routes} />
    </ThemeProvider>
  </StrictMode>,
)
