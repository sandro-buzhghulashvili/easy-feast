import { Outlet, useNavigate, useNavigation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import { userContext } from '../store/user-context';
import { useContext, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import FlashMessage from '../components/UI/FlashMessage';
import LoadingScreen from '../components/UI/LoadingScreen';

export default function LayoutPage() {
  const ctx = useContext(userContext);
  const navigation = useNavigation();
  const navigate = useNavigate();

  const closeFlashMessageHandler = () => {
    ctx.removeFlashMessage();
  };

  useEffect(() => {
    if (ctx.user?.admin) {
      navigate('/admin');
    }
  }, [ctx.user?.admin]);

  return (
    <>
      <div className="min-h-screen relative pb-96">
        {navigation.state === 'loading' && <LoadingScreen />}
        <AnimatePresence>
          {ctx.flashMessage && (
            <FlashMessage
              success={ctx.flashMessage.status === 'success' ? true : false}
              message={ctx.flashMessage.message}
              onClose={closeFlashMessageHandler}
            />
          )}
        </AnimatePresence>
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    </>
  );
}
