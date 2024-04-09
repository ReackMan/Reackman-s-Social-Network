import { memo } from 'react'
import { NavLink } from 'react-router-dom'

import styles from 'features/users/ui/user/user.module.scss'
import userDefault from 'common/img/user.jpg'
import { UserType } from 'features/users/api/users.api.types'
import { followUser, unfollowUser } from 'features/users/model/users.reducer'
import { useDispatch, useSelector } from 'react-redux'
import { getIsFollowingInProgress } from 'features/users/model/users.selectors'
import { Button } from '../../../../common/components/button'

type Props = {
    user: UserType
}

export const User = memo(({ user }: Props) => {
    const isFollowingInProgress = useSelector(getIsFollowingInProgress)

    const dispatch = useDispatch()

    const onFollowUser = (userId: number) => {
        dispatch(followUser(userId))
    }
    const onUnfollowUser = (userId: number) => {
        dispatch(unfollowUser(userId))
    }

    return (
        <div className={styles.user}>
            <div className={styles.subsBlock}>
                <NavLink to={`/profile/${user.id}`}>
                    <img
                        className={styles.userImg}
                        src={user.photos.large ? user.photos.large : userDefault}
                        alt={user.name}
                        width={50}
                        height={50}
                    />
                </NavLink>
                {user.followed ? (
                    <Button title='Unfollow'
                        disabled={isFollowingInProgress.some(id => user.id === id)}
                        onClick={() => onUnfollowUser(user.id)}
                    />
                ) : (
                    <Button title='Follow'
                        disabled={isFollowingInProgress.some(id => user.id === id)}
                        onClick={() => onFollowUser(user.id)}
                    />
                )}
            </div>
            <div className={styles.info}>
                <h3 className={styles.username}>{user.name}</h3>
                <p className={styles.status}>{user.status}</p>
            </div>
        </div>
    )
})
