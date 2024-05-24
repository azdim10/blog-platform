import { createAsyncThunk } from '@reduxjs/toolkit'

import { ArticlesState, CreateArticle, UpdateArticle } from '../../interfaces/article'
import { UserState, PostDataCreateUser, PostDataLoginUser, PostDataUpdateUser } from '../../interfaces/user'

const _defaultPath = 'https://blog.kata.academy/api'

export const fetchArticles = createAsyncThunk<ArticlesState, undefined, { rejectValue: string }>(
  'articles/fetchArticles',
  async function (_, { rejectWithValue }) {
    const response = await fetch(`${_defaultPath}/articles?limit=5`)
    !response.ok && rejectWithValue('search articles')
    return await response.json()
  }
)

export const fetchArticle = createAsyncThunk<ArticlesState, string | undefined, { rejectValue: string }>(
  'articles/fetchArticle',
  async function (slug, { rejectWithValue }) {
    const response = await fetch(`${_defaultPath}/articles/${slug}`)
    !response.ok && rejectWithValue('search article')
    return await response.json()
  }
)

export const fetchCreateArticle = createAsyncThunk<ArticlesState, CreateArticle, { rejectValue: string }>(
  'articles/fetchCreateArticle',
  async function (validData, { rejectWithValue }) {
    const token = localStorage.getItem('token')
    const response = await fetch(`${_defaultPath}/articles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(validData),
    })
    if (!response.ok) {
      return rejectWithValue('article not created')
    }
    return response.json()
  }
)

export const fetchUpdateArticle = createAsyncThunk<void, UpdateArticle, { rejectValue: string }>(
  'articles/fetchUpdateArticle',
  async (slugData, { rejectWithValue }) => {
    const token = localStorage.getItem('token')
    const { slug } = slugData
    const response = await fetch(`${_defaultPath}/articles/${slug}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(slugData.validData),
    })
    if (!response.ok) {
      return rejectWithValue('Article not updated')
    }
    return await response.json()
  }
)

export const fetchDeleteArticle = createAsyncThunk<void, string | undefined, { rejectValue: string }>(
  'articles/fetchDeleteArticle',
  async (slug, { rejectWithValue }) => {
    const token = localStorage.getItem('token')
    const response = await fetch(`${_defaultPath}/articles/${slug}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    if (!response.ok) {
      return rejectWithValue('Article not deleted')
    }
  }
)

export const fetchLikeArticle = createAsyncThunk<
  ArticlesState,
  [favorited: boolean, slug: string | undefined],
  { rejectValue: string }
>('articles/fetchLikeArticle', async (slug, { rejectWithValue }) => {
  const token = localStorage.getItem('token')
  const response = await fetch(`${_defaultPath}/articles/${slug[1]}/favorite`, {
    method: !slug[0] ? 'POST' : 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
  if (!response.ok) {
    return rejectWithValue('Лайк не поставлен')
  }
  return await response.json()
})

export const fetchPageNumber = createAsyncThunk<ArticlesState, number, { rejectValue: string }>(
  'articles/fetchPageNumber',
  async function (pageNumber, { rejectWithValue }) {
    const response = await fetch(`${_defaultPath}/articles?limit=5&offset=${pageNumber * 5 - 5}`)
    !response.ok && rejectWithValue('search page number')
    return await response.json()
  }
)

export const fetchRegistrationUser = createAsyncThunk<UserState, PostDataCreateUser, { rejectValue: string }>(
  'user/fetchRegistrationUser',
  async (validData, { rejectWithValue }) => {
    const response = await fetch(`${_defaultPath}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(validData),
    })
    if (response.status === 422) {
      return rejectWithValue('A user with the same username or email address exists')
    }
    const result = await response.json()
    !localStorage.getItem('token') && localStorage.setItem('token', result.user.token)
    return result
  }
)

export const fetchAuthorizationUser = createAsyncThunk<UserState, PostDataLoginUser, { rejectValue: string }>(
  'user/fetchAuthorizationUser',
  async (validData, { rejectWithValue }) => {
    const response = await fetch(`${_defaultPath}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(validData),
    })
    if (response.status === 422) {
      return rejectWithValue('Login or password is incorrect')
    }
    const result = await response.json()
    !localStorage.getItem('token') && localStorage.setItem('token', result.user.token)
    return result
  }
)

export const fetchUpdateUser = createAsyncThunk<UserState, PostDataUpdateUser, { rejectValue: string }>(
  'user/fetchUpdateUser',
  async (validData, { rejectWithValue }) => {
    const token = localStorage.getItem('token')
    const response = await fetch(`${_defaultPath}/user`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(validData),
    })
    if (!response.ok) {
      return rejectWithValue('You must be logged in to access this page')
    }
    const result = await response.json()
    localStorage.setItem('token', result.user.token)
    return result
  }
)

export const fetchGetCurrentUser = createAsyncThunk<UserState, undefined, { rejectValue: string }>(
  'user/fetchGetCurrentUser',
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem('token')
    const response = await fetch(`${_defaultPath}/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    if (!response.ok) {
      return rejectWithValue('')
    }
    return await response.json()
  }
)