import Loader from './Loader';
import Post from './Post';
export default function Posts(props) {
  let { articles, error } = props;
  if (error)
    return <p className="text-3xl text-center mt-4 text-red-500">{error}</p>;
  if (!articles) return <Loader />;
  if (articles.length === 0)
    return (
      <h1 className="text-center text-3xl mt-8">No articles available!</h1>
    );
  return articles.map((article) => (
    <Post user={props.user} {...article} key={article.slug} />
  ));
}
