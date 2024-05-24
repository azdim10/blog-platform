import { useEffect } from "react";
import { Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/header/header';
import HomePage from './pages/HomePage/HomePage'
import PageReview from "./pages/PageReview/PageReview";
import RegisterPage from './pages/RegistratePage/RegistratePage'
import LoginPage from "./pages/LoginPage/LoginPage";
import ProfilePage from './pages/ProfilePage/ProfilePage';
import CreateArticle from './pages/CreateArticle/CreateArticle';
import EditArticle from './pages/EditArticle/EditArticle';
import { fetchGetCurrentUser } from '../src/store/slices/services'
import { useAppDispatch } from '../src/assets/Hooks/hooksByTS'


import './App.css'


const App: React.FC = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchGetCurrentUser())
  }, [])
  return (
    <Routes>
      <Route path='/' element={<Header/>}>
        <Route index element = {<HomePage />} />
        <Route path='articles' element = {<Navigate to = '/' replace/>} />
        <Route path='articles/:slug' element= {<PageReview />} />
        <Route path= 'sign-up' element = {<RegisterPage />} />
        <Route path= 'sign-in' element = {<LoginPage />} />
        <Route path= 'profile' element = {<ProfilePage />} />
        <Route path ='new-article' element = {<CreateArticle />} />
        <Route path ='articles/:slug/edit' element ={<EditArticle />} />
      </Route>
    </Routes>
  )
}
export default App