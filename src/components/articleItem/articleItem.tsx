import { useState } from 'react'
import { HeartFilled, HeartOutlined } from '@ant-design/icons'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'

import { fetchLikeArticle } from '../../store/slices/services'
import { useAppDispatch, useAppSelector } from '../../assets/Hooks/hooksByTS'
import { IArticle } from '../../interfaces/article'
import avatar from '../../assets/images/Avatar.svg'

import './articleitem.css'

interface ArticleProps {
  article: IArticle
}

const Post: React.FC<ArticleProps> = ({ article }) => {
  const { slug, title, favoritesCount, tagList, description, author, updatedAt, favorited } = article
  const { isAuth } = useAppSelector((state) => state.user)
  const [like, setLike] = useState(favorited)
  const [count, setCount] = useState(favoritesCount)
  const dispatch = useAppDispatch()

  return (
    <section className='article_item'>
      <div className='article_item-wrap'>
        <div className='article_wrap'>
          <Link to={`articles/${slug}`} className='article_title'>
            {title?.length > 35 ? `${title.slice(0, 35)}…` : title}
          </Link>
          <div className='article_like-container'>
            <button
              className='article_like-container_item'
              onClick={() => {
                setLike(!like)
                setCount(like ? count - 1 : count + 1)
                dispatch(fetchLikeArticle([like, slug]))
              }}
              disabled={!isAuth}
            >
              {like && isAuth ? (
                <HeartFilled style={{ cursor: 'pointer', marginRight: '5px', fontSize: '16px', color: 'red' }} />
              ) : (
                <HeartOutlined
                  style={{
                    cursor: 'pointer',
                    marginRight: '5px',
                    fontSize: '16px',
                    color: 'rgba(0, 0, 0, .75)',
                  }}
                />
              )}
            </button>
            <span className=''>{count}</span>
          </div>
        </div>
        <ul className='article_tag-list' style={tagList.length ? { display: 'flex' } : { display: 'none' }}>
          {tagList.map((tag: string, index: number) => (
            <li className='article_tag' key={index}>
              {tag?.length > 35 ? `${tag.slice(0, 35)}…` : tag}
            </li>
          ))}
        </ul>
        <div className='article_descr'>
          {description?.length > 100 ? `${description.slice(0, 100)}…` : description}
        </div>
      </div>
      <div className='author'>
        <div className=''>
          <div className='article_author'>{author.username}</div>
          <div className='article_date'>{format(new Date(updatedAt), 'MMMM d, yyyy')}</div>
        </div>
        <img src={author?.image ?? avatar} alt="avatar" className='auth_avatar' />
      </div>
    </section>
  )
}

export default Post