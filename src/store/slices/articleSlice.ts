import { createSlice } from '@reduxjs/toolkit'

import { ArticlesState } from '../../interfaces/article'

import {
  fetchArticles,
  fetchArticle,
  fetchPageNumber,
  fetchCreateArticle,
  fetchUpdateArticle,
  fetchDeleteArticle,
  fetchLikeArticle,
} from './services'

const initialState: ArticlesState = {
  articles: [],
  article: {
    slug: '',
    title: '',
    description: '',
    body: '',
    createdAt: '',
    updatedAt: '',
    tagList: [],
    favorited: false,
    favoritesCount: 0,
    author: {
      username: '',
      bio: '',
      image: '',
      following: false,
    },
  },
  articlesCount: 0,
  status: null,
  error: null,
  currentPage: 1,
  create: false,
  deleted: false,
  update: false,
}

const articleSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    togglePage(state, action) {
      state.currentPage = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.status = true
        state.error = null
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.status = false
        state.articles = action.payload.articles
        state.error = null
        state.articlesCount = action.payload.articlesCount
        state.create = false
        state.update = false
        state.deleted = false
      })

      .addCase(fetchArticle.pending, (state) => {
        state.status = true
        state.error = null
      })
      .addCase(fetchArticle.fulfilled, (state, action) => {
        state.status = false
        state.article = action.payload.article
        state.error = null
      })

      .addCase(fetchCreateArticle.pending, (state) => {
        state.status = true
        state.error = null
        state.create = false
      })
      .addCase(fetchCreateArticle.fulfilled, (state) => {
        state.status = false
        state.create = true
      })

      .addCase(fetchUpdateArticle.pending, (state) => {
        state.status = true
        state.error = null
        state.update = false
      })
      .addCase(fetchUpdateArticle.fulfilled, (state) => {
        state.status = false
        state.update = true
      })

      .addCase(fetchDeleteArticle.pending, (state) => {
        state.status = true
        state.error = null
        state.deleted = false
      })
      .addCase(fetchDeleteArticle.fulfilled, (state) => {
        state.status = false
        state.deleted = true
      })

      .addCase(fetchPageNumber.pending, (state) => {
        state.status = true
        state.error = null
      })
      .addCase(fetchPageNumber.fulfilled, (state, action) => {
        state.status = false
        state.articles = action.payload.articles
        state.articlesCount = action.payload.articlesCount
      })

      .addCase(fetchLikeArticle.pending, (state) => {
        state.error = null
      })
      .addCase(fetchLikeArticle.fulfilled, (state, action) => {
        state.articles.map((article) => {
          if (article.slug === action.payload.article.slug) article = action.payload.article
          return article
        })
      })
  },
})

export const { togglePage } = articleSlice.actions

export default articleSlice.reducer