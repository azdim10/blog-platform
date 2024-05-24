export type IArticle = {
    slug: string
    title: string
    description: string
    body: string
    createdAt: string
    updatedAt: string
    tagList: string[]
    favorited: boolean
    favoritesCount: number
    author: {
      username: string
      image: string
      following: boolean
    }
  }
  
  interface Articles {
    slug: string
    title: string
    description: string
    body: string
    tagList: string[]
    createdAt: string
    updatedAt: string
    favorited: boolean
    favoritesCount: number
    author: {
      username: string
      bio: string
      image: string
      following: boolean
    }
  }
  
  export interface ArticlesState {
    articles: Articles[]
    article: Articles
    status: boolean | null
    error: string | null
    currentPage: number
    articlesCount: number
    create: boolean
    deleted: boolean
    update: boolean
  }
  
  export interface IFormNewArticle {
    title: string
    titleArticle: string | undefined
    description: string | undefined
    body: string | undefined
    tagList: { name: string }[] | undefined
    slug: string | undefined
  }
  
  export interface ProfileNewArticle {
    title: string
    description: string
    body: string
    tagList: { name: string }[]
  }
  
  export interface CreateArticle {
    article: {
      title: string
      description: string
      body: string
      tagList: string[]
    }
  }
  
  export interface UpdateArticle {
    slug: string | undefined
    validData: {
      article: {
        title: string
        description: string
        body: string
        tagList: string[]
      }
    }
  }