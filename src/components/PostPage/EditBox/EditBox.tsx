import { useState } from 'react';

import PostEditor from '../../CommonComponents/PostEditor/PostEditor';
import ErrorView from '../../ErrorView/ErrorView';
import InformWidget from '../../InformWidget/InformWidget';

import { TPostObj } from '../../../types/TPostObj';

import './EditBox.css';

export default function EditBox(
    {
        post,
        closeEdit,
        postUpdate
    }: {
        post: TPostObj,
        closeEdit: React.Dispatch<boolean>,
        postUpdate: React.Dispatch<(update: boolean) => boolean>
    }) {
    const [content, setContent] = useState(post.content);
    const [isError, setIsError] = useState(false);
    const [isSave, setIsSave] = useState(false);

    const savePost = () => {
        if (!content) return;
        
        const body = JSON.stringify({content});

        fetch(`${import.meta.env.VITE_APP_POSTS_URL}/${post.id}`, {
            method: 'PUT',
            body
        }).then((response) => {
            if (response.ok) {
                setIsSave(true);
                setTimeout(() => {
                    closeEdit(false);
                    postUpdate((update) => !update);
                }, 1000);
                return;
            }

            throw new Error('Не удалось сохранить изменения')
        }).catch(() => setIsError(true));
    }

    return (
        <>
            {isSave && <InformWidget message='Изменения сохранены' />}
            {isError && <ErrorView message='Не удалось сохранить изменения' />}
            {!isError && !isSave &&
            <div className="edit_wrapper">
                <button type="button" onClick={() => closeEdit(false)} className="btn_close-edit">&#10060;</button>
                <PostEditor value={content} setValue={setContent} />
                <div className="btn_send_box">
                    <button onClick={savePost} type="button" className="btn btn_blue">Сохранить</button>
                </div>
            </div>}
        </>
    )
}
