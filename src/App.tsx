import { useState } from 'react';
import OpenModalButton from './components/UserInfoModal/OpenModalButton/OpenModalButton';
import UserInfoModal from './components/UserInfoModal/UserInfoModal';
import './App.css'

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="app">
      <OpenModalButton onClick={() => setIsModalOpen(true)} />
      <UserInfoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

export default App
