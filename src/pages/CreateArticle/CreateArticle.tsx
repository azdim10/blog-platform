import FormNewArticle from '../../components/newArticle/newArticle'

import './createarticle.css'
const CreateArticlePage: React.FC = () => {
  return (
    <section className='container'>
      <FormNewArticle
        title={'Create new article'}
        titleArticle={undefined}
        description={undefined}
        body={undefined}
        tagList={undefined}
        slug={undefined}
      ></FormNewArticle>
    </section>
  )
}

export default CreateArticlePage