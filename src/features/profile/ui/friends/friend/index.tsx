import { NavLink } from 'react-router-dom'

import { UserType } from 'features/users/api/users.api.types'
import styles from './friend.module.scss'
import userDefault from 'common/img/user.jpg'

type Props = {
    friend: UserType
}

export const Friend = (props: Props) => {
    const { friend } = props

    return (
        <NavLink to={`/profile/${friend.id}`} className={styles.link}>
            <li>
                <div className={styles.item}>
                    <img
                        className={styles.img}
                        src={friend.photos.large || userDefault}
                        alt="avatar-friend"
                    />
                    <span className={styles.userName}>{friend.name}</span>
                </div>
            </li>
        </NavLink>
    )
}
