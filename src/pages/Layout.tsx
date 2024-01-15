import { Outlet, useNavigation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import { userContext } from '../store/user-context';
import { useContext } from 'react';
import { AnimatePresence } from 'framer-motion';
import FlashMessage from '../components/UI/FlashMessage';
import LoadingScreen from '../components/UI/LoadingScreen';

export default function LayoutPage() {
  const ctx = useContext(userContext);
  const navigation = useNavigation();

  const closeFlashMessageHandler = () => {
    ctx.removeFlashMessage();
  };

  return (
    <>
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
    </>
  );
}
