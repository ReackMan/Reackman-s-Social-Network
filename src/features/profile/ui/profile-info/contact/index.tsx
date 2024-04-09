type Props = {
    title: string
    value: string
}

export const Contact = ({ title, value }: Props) => {
    return (
        <div style={{ marginBottom: '0.4rem' }}>
            <p>
                {title}: <b>{value}</b>
            </p>
        </div>
    )
}
