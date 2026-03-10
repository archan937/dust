import Dust, { cx, useParams, useState } from 'dust';

import { posts } from './data';
import s from './styles';

const Post = (): JSX.Element => {
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
    <article className={s.article.outer}>
      <div className={s.article.meta}>
        <span className={s.article.tag}>Blog</span>
        <span className={s.article.id}>post #{id}</span>
      </div>
      <h1 className={s.article.title}>{post.title}</h1>
      <p className={s.article.lead}>{post.lead}</p>
      <div className={s.article.body}>
        {sections.map((sec) => (
          <div className={s.article.section}>
            <h2>{sec.heading}</h2>
            <p>{sec.body}</p>
          </div>
        ))}
      </div>
      <div className={s.nav.row}>
        <a href={`/blog/${prevId}`} className={s.nav.link}>
          ← Previous
        </a>
        <a href={`/blog/${nextId}`} className={cx(s.nav.link, s.nav.next)}>
          Next →
        </a>
      </div>
    </article>
  );
};

export default Post;
