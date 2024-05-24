import { useParams } from 'react-router-dom'

import FormNewArticle from '../../components/newArticle/newArticle'
import { useAppSelector } from '../../assets/Hooks/hooksByTS'

const EditArticlePage: React.FC = () => {
  const { article } = useAppSelector((state) => state.articles)
  const { slug } = useParams()
  return (
    <section className='container'>
      <FormNewArticle
        title={'Edit article'}
        titleArticle={article.title}
        description={article.description}
        body={article.body}
        tagList={article.tagList.map((tag: string) => ({ name: tag }))}
        slug={slug}
      ></FormNewArticle>
    </section>
  )
}

export default EditArticlePage