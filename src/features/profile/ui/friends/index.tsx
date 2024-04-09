import { useState } from 'react'

import { UserType } from 'features/users/api/users.api.types'
import styles from './friends.module.scss'
import { Friend } from 'features/profile/ui/friends/friend'
import { Button } from 'common/components/button'

type Props = {
    users: UserType[]
    isOwner: boolean
}

export const Friends = ({ users, isOwner }: Props) => {
    const [showAllFriends, setShowAllFriends] = useState(false)

    const onShowClickHandler = () => {
        setShowAllFriends(!showAllFriends)
    }

    const displayedFriends = showAllFriends ? users : users.slice(0, 6)

    return (
        <div className={styles.friends}>
            {
                !isOwner
                    ? <>
                        <h3 className={styles.heading}>Friends</h3>
                        <span className={styles.count}>Friends are hidden</span>
                    </>
                    : <>
                        <h3 className={styles.heading}>My Friends</h3>
                        <span className={styles.count}>{users.length} Friends</span>
                        <ul className={styles.items}>
                            {displayedFriends.map(friend => (
                                <Friend key={friend.id} friend={friend} />
                            ))}
                        </ul>
                        {!showAllFriends ? (
                            <Button title="See all" onClick={onShowClickHandler} />
                        ) : (
                            <Button title="Hide friends" onClick={onShowClickHandler} />
                        )}
                    </>
            }
        </div>
    )
}
