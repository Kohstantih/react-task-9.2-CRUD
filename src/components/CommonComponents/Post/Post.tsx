export default function Post({ text }: { text: string}) {
    return (
        <div className="post">
            <div className="user_wrapper">
                <div className="avatar"></div>
                <p className="user_name">Пользователь</p>
            </div>
            <p className="post_content">{text}</p>
        </div>
    )
}
