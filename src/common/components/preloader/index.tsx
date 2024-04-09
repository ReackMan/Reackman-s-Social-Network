import preloader from 'common/img/preloader.svg'

export const Preloader = () => {
    return (
        <img
            src={preloader}
            alt="preloader"
            width="100"
            height="100"
            style={{ display: 'block', margin: '0 auto' }}
        />
    )
}
