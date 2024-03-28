export default function ErrorView({ message }: { message: string }) {
    return (
        <p className="error">{message}</p>
    )
}