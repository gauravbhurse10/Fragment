import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { store } from './store.js'
import { Provider } from 'react-redux'
import { ToastContainer} from 'react-toastify';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
      <ToastContainer 
          position="bottom-right"
          autoClose={3000}
          toastStyle={{
              backgroundColor: "#E3F2FD", 
              color: "#111827",           
              borderRadius: "1rem",       
              border: "1px solid #A6D6F3",
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.05)" 
          }}
      />
    </Provider>
  </StrictMode>,
)
