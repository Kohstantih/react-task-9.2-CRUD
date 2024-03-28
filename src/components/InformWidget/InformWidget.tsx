import './InformWidget.css'

export default function InformWidget({ message }: { message: string }) {
    return (
        <p className="inform">{message}</p>
    )
}
