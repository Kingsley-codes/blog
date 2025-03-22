import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import {Homepage} from './pages/Homepage.jsx'
import {PostListPage} from './pages/PostListPage.jsx'
import Write from './pages/Write.jsx'
import {Login} from './pages/Login.jsx'
import {Register} from './pages/Register.jsx'
import {SinglePost} from './pages/SinglePost.jsx'
import { StrictMode } from 'react';
import Mainlayout from './layouts/Mainlayout.jsx';
import { ClerkProvider } from '@clerk/clerk-react';
import {
  QueryClient,
  QueryClientProvider, 
} from '@tanstack/react-query';
 import { ToastContainer } from 'react-toastify';

const queryClient = new QueryClient()


// Import your Publishable Key 
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}


const router = createBrowserRouter([
  {
    element: <Mainlayout />,
    children: [
      {
    path: "/",
    element: <Homepage />
  },
  {
    path: "/posts",
    element: <PostListPage />
  },
  {
    path: "/:slug",
    element: <SinglePost />
  },
  {
    path: "/write",
    element: <Write />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
    ]
  }
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ToastContainer position='bottom-right' />
      </QueryClientProvider>
      </ClerkProvider>
  </StrictMode>
);
