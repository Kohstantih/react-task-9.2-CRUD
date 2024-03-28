import { Link } from "react-router-dom";

import useJsonFetch from "../../hooks/useJsonFetch";
import Post from "../CommonComponents/Post/Post";

import { TPostObj } from "../../types/TPostObj";

import './Posts.css'

export default function Posts () {
    const [posts, loading, error] = useJsonFetch<[], TPostObj[]>(import.meta.env.VITE_APP_POSTS_URL, [], false);

    return (
        <>
            <div className="btn_wrapper">
                <Link
                    className="btn btn_blue"
                    to="/posts/new">{'Создать пост'}
                </Link>
            </div>
            {posts && !error &&
                <ul className="posts_list">
                    {posts.map((p) => <li key={p.id} className="posts-list_item">
                        <Link to={`/posts/${p.id}`}>
                            <Post text={p.content}/>
                        </Link>
                    </li>)}
                </ul>
            }
            {loading && <p>Идёт загрузка...</p>}            
        </>
        
    )
}
