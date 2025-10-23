import { useState } from 'react';
import Header from '../../components/Header';
import ChatSection from '../../components/chat/ChatSection';
import DashboardSection from '../../components/dashboard/DashboardSection';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logout } from '../../store/slices/authSlice';

const MainPage = () => {
  const [isChatOpen, setIsChatOpen] = useState(true);
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <Header user={user} onLogout={handleLogout} />
      
      <div className="flex-1 flex overflow-hidden">
        {/* Dashboard Section */}
        <div className={`flex-1 transition-all duration-300 ${isChatOpen ? 'mr-96' : ''}`}>
          <DashboardSection />
        </div>

        {/* Chat Section */}
        <ChatSection isOpen={isChatOpen} onToggle={() => setIsChatOpen(!isChatOpen)} />
      </div>
    </div>
  );
};

export default MainPage;

