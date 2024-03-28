import './PostEditor.css'

export default function PostEditor({ value, setValue }: { value: string, setValue: React.Dispatch<string>}) {
    return (
        <div className="edit_box">
            <div className="avatar_wrapper">
                <div className="avatar"></div>
            </div>            
            <textarea name="edit" value={value} onChange={(e) => {setValue(e.target.value)}} className="edit_entry-field"></textarea>
        </div>
    )
}