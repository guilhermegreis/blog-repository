import { formatDistanceToNow } from "date-fns";
import { IPost } from "..";
import { formatText } from "../../../utils/formatText";
import { PostCardContainer } from "./styles";
import { enUS } from "date-fns/locale";

interface IPostCard {
  post: IPost;
}

export function PostCard({ post }: IPostCard) {
  const { created_at, body, title, number } = post;
  const formattedDate = formatDistanceToNow(new Date(created_at), {
    locale: enUS,
    addSuffix: true,
  });
  return (
    <PostCardContainer to={`/${number}`}>
      <header>
        <h1>{title}</h1>
        <span>{formattedDate}</span>
      </header>
      <main>
        <p>{formatText(body, 80)}</p>
      </main>
    </PostCardContainer>
  );
}
