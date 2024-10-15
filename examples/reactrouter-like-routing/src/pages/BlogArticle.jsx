import Dust, { useParams } from "dust";

function BlogArticle() {
  const { id } = useParams();

  console.log(`Rendering <BlogArticle/> with ID: ${id} `);

  return (
    <>
      <h1>Welcome to our Dust Blog!</h1>
      <p>[ blog article with ID {id} ]</p>
    </>
  );
}

export default BlogArticle;
