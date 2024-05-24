import React from 'react';
import './header.css'
import {Link, Outlet } from 'react-router-dom'
import { togglePage } from '../../store/slices/articleSlice'
import { fetchPageNumber } from '../../store/slices/services'
import { logOut } from '../../store/slices/userSlice'
import { useAppDispatch, useAppSelector } from '../../assets/Hooks/hooksByTS'
import defaultAvatar from '../../assets/images/Avatar.svg'



const Header: React.FC = () => {
    const dispatch = useAppDispatch()
    const { isAuth } = useAppSelector((state) => state.user)
    const { username, image } = useAppSelector((state) => state.user.user)
    return (
        <>
        <header className = 'header'>
        <Link
          to="/"
          className='home__btn'
          onClick={() => {
            dispatch(togglePage(1))
            dispatch(fetchPageNumber(1))
          }}
        >
          Realworld Blog
        </Link>
        {!isAuth ? (<div>
            <Link to="/sign-in" className='sign-in__btn'>
              Sign In
            </Link>
            <Link to="/sign-up" className='sign-up__btn'>
              Sign Up
            </Link>
          </div>
        ):(
          <div className='is-login'>
            <Link to="/new-article" className='create'>
              Create article
            </Link>
            <Link to="/profile" className='profile'>
              <span>{username}</span>
              <img
                className='avatar'
                src={image === '' ? defaultAvatar : image ?? defaultAvatar}
                alt="avatar"
              />
            </Link>
            <Link to="/" className='log-out' onClick={() => dispatch(logOut())}>
              Log Out
            </Link>
          </div>
)}
        </header>
        <main>
            <Outlet/>
        </main>
        </>
    )
}
export default Header