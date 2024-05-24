interface IUser {
    email: string
    token: string
    username: string
    bio: string
    image: string
  }
  
  export interface UserState {
    user: IUser
    error: string
    status: boolean | null
    isReg: boolean
    isAuth: boolean
    isUpdate: boolean
  }
  
  export interface PostDataCreateUser {
    user: {
      username: string
      email: string
      password: string
    }
  }
  
  export interface PostDataLoginUser {
    user: {
      email: string
      password: string
    }
  }
  
  export interface ProfileRegistration {
    username: string
    email: string
    password: string
    repeatPassword: string
    userAgreement: boolean
  }
  
  export interface ProfileAuthorization {
    email: string
    password: string
  }
  
  export interface Profile {
    email: string
    password: string
    username: string
    bio: string
    image: string
    avatar: string
  }
  
  export interface PostDataUpdateUser {
    user: {
      email?: string
      password?: string
      username?: string
      bio?: string
      image?: string
    }
  }