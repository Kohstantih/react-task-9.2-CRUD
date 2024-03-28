import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import useJsonFetch from "../../hooks/useJsonFetch";
import Post from "../CommonComponents/Post/Post";
import EditBox from "./EditBox/EditBox";
import ErrorView from "../ErrorView/ErrorView";
import InformWidget from "../InformWidget/InformWidget";

import { TPostObj } from "../../types/TPostObj";

import './PostPage.css';

export default function PostPage() {
    const { id } = useParams();
    const navigator = useNavigate();

    const [isEdit, setIsEdit] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isDel, setIsDel] = useState(false);
    const [update, setUpdate] = useState(false);

    const url = `${import.meta.env.VITE_APP_POSTS_URL}/${id}`;
    const [data, loading, error] = useJsonFetch<null, { post: TPostObj }>(url, null, update);

    const deletePost = () => {
        fetch(`${import.meta.env.VITE_APP_POSTS_URL}/${id}`, {
            method: 'DELETE'
        }).then((response) => {
            if(response.ok) {
                setIsDel(true);
                setTimeout(navigator, 1000, '/', {replace: true})
                return;
            }

            throw new Error('Не удалось удалить пост');
        }).catch(() => setIsError(true));
    }

    return (
        <>  
            <div className="home_wrapper">
                <Link to={'/'} className="btn btn_blue" >На главную</Link>
            </div>
            {isDel && <InformWidget message="Пост удалён" />}
            {isError && <ErrorView message="Не удалось удалить пост" />}
            {loading && <p>Идёт загрузка...</p>}
            {data && !error && !isError && !isDel &&
            <div className="post_wrapper">
                {!isEdit && 
                <>  
                    <Post text={data.post.content} />
                    <div className="btns-edit_box">
                        <button
                            onClick={() => setIsEdit(true)}
                            className="btn btn-edit btn_blue"
                        >
                            Изменить
                        </button>
                        <button
                            onClick={deletePost}
                            className="btn btn_red"
                        >
                            Удалить
                        </button>
                    </div>
                </>}
                {isEdit && <EditBox post={data.post} closeEdit={setIsEdit} postUpdate={setUpdate} />}
            </div>          
            }
        </>
    )
}
