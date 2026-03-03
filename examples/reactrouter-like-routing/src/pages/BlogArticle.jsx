import Dust, { useParams } from 'dust';

function BlogArticle() {
  const { id } = useParams();

  console.log('Rendering <BlogArticle />');

  return (
    <>
      <h1>Blog Article #{id}</h1>
      <p>
        You are reading article with ID: <strong>{id}</strong>
      </p>
    </>
  );
}

export default BlogArticle;
