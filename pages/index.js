import { ThemeProvider } from '../components/ThemeContext/ThemeContext';
import Navigation from '../components/Navigation/Navigation';
import Mainpage from '../components/Mainpage/Mainpage';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from '../components/context/Context';
export default function Home() {
  return (
    <AuthProvider>
      <div>
        <Mainpage />


        <ToastContainer 
  
          autoClose={3000}
          
          />
     </div>
    </AuthProvider>
   
  )
}
