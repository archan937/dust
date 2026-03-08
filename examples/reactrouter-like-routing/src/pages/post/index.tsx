import Dust, { cx, useState, useParams } from 'dust';

import { posts } from './data';
import {
  articleOuter,
  articleMeta,
  articleTag,
  articleId,
  articleTitle,
  articleLead,
  articleBody,
  articleSection,
  navRow,
  navLink,
  navLinkNext,
} from './styles';

function Post() {
  const { id } = useParams();

  const post = posts[id] ?? {
    title: `Post #${id}`,
    lead: 'This post is coming soon.',
    sections: [],
  };

  const prevId = Math.max(1, parseInt(id, 10) - 1);
  const nextId = parseInt(id, 10) + 1;

  const [sections] = useState(post.sections);

  return (
    <article className={articleOuter}>
      <div className={articleMeta}>
        <span className={articleTag}>Blog</span>
        <span className={articleId}>post #{id}</span>
      </div>
      <h1 className={articleTitle}>{post.title}</h1>
      <p className={articleLead}>{post.lead}</p>
      <div className={articleBody}>
        {sections.map((s) => (
          <div className={articleSection}>
            <h2>{s.heading}</h2>
            <p>{s.body}</p>
          </div>
        ))}
      </div>
      <div className={navRow}>
        <a href={`/blog/${prevId}`} className={navLink}>
          ← Previous
        </a>
        <a href={`/blog/${nextId}`} className={cx(navLink, navLinkNext)}>
          Next →
        </a>
      </div>
    </article>
  );
}

export default Post;
