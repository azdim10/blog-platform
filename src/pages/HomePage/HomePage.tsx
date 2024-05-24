import { useEffect } from 'react'
import { Pagination, Space, Spin } from 'antd'

import { togglePage } from '../../store/slices/articleSlice'
import { fetchArticles, fetchPageNumber } from '../../store/slices/services'
import ArticleItem from '../../components/articleItem/articleItem'
import { useAppDispatch, useAppSelector } from '../../assets/Hooks/hooksByTS'
import './homepage.css'


const HomePage: React.FC = () => {
  const { articles, currentPage, articlesCount, status } = useAppSelector((state) => state.articles)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchArticles())
  }, [])

  const onChangePage = (pageNumber: number) => {
    dispatch(fetchPageNumber(pageNumber))
    dispatch(togglePage(pageNumber))
  }
  return (
    <>
      {status ? (
        <Space size="large">
          <Spin size="large" style={{ position: 'absolute', top: '50%', left: '50%' }} />
        </Space>
      ) : (
        <>
          <div className='article_main'>
            {articles.map((article) => {
              return <ArticleItem article={article} key={article.slug} />
            })}
          </div>
          <Pagination
            defaultCurrent={1}
            current={currentPage}
            onChange={(event) => onChangePage(event)}
            total={articlesCount}
            hideOnSinglePage={true}
            pageSize={5}
            showSizeChanger={false}
            style={{ display: 'flex', justifyContent: 'center' }}
          ></Pagination>
        </>
      )}
    </>
  )
}

export default HomePage