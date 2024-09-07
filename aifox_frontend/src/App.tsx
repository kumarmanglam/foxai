

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './pages/Login'
import ChatContainer from './components/core/ChatContainer';
import RouterContainer from './routes';
import Navbar from './components/common/Navbar';
function App() {


  return (
    <div className='app'>
      <RouterContainer />
    </div>
  )
}

export default App;
