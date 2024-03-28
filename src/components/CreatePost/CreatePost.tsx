import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import PostEditor from '../CommonComponents/PostEditor/PostEditor';
import ErrorView from '../ErrorView/ErrorView';
import InformWidget from '../InformWidget/InformWidget';

import './CreatePost.css';

export default function CreatePost() {
    const [value, setValue] = useState('');
    const [isPublish, setIsPublish] = useState(false);
    const [isError, setIsError] = useState(false);

    const navigator = useNavigate();
    

    const sendPost = () => {
        if (!value) return;

        const body = JSON.stringify({ content: value })

        fetch(import.meta.env.VITE_APP_POSTS_URL, {
            method: 'POST',
            body
        }).then((response) => {
            if (response.ok) {
                setIsPublish(true);
                setTimeout(navigator, 1000, '/');
                return;
            }

            throw new Error('Не удалось опубликовать пост')
        }).catch(() => setIsError(true))
    };

    return (
        <>
            {isError && <ErrorView message={'Не удалось опубликовать пост'} />}
            {isPublish && <InformWidget message={'Пост добавлен'} />}
            {!isError && !isPublish &&
            <div className="create-post_box">
                <PostEditor value={value} setValue={setValue} />
                <div className="btn-publish_wrapper">
                    <button onClick={sendPost} type="button" className="btn btn_blue">Опубликовать</button>
                </div>
            </div>}
        </>
    )
}