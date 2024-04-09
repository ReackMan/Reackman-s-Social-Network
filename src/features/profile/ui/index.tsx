import { ProfilePropsType } from 'features/profile/ui/profile-container'
import { ProfileHeader } from 'features/profile/ui/profile-header'
import { ProfileInfo } from 'features/profile/ui/profile-info'
import styles from './profile.module.scss'
import { Friends } from 'features/profile/ui/friends'
import { Preloader } from 'common/components/preloader'

export const Profile = (props: ProfilePropsType) => {
    const {
        profile,
        status,
        authorizedUserId,
        users,
        match,
        updateUserStatus,
        sendPhoto,
        updateProfile,
    } = props
    const isOwner = !match.params.userId || Number(match.params.userId) === authorizedUserId

    if (!Object.keys(profile).length) return <Preloader />

    return (
        <div className={styles.profile}>
            <ProfileHeader
                isOwner={isOwner}
                profile={profile}
                status={status}
                updateUserStatus={updateUserStatus}
                sendPhoto={sendPhoto}
            />
            <div className={styles.content}>
                <ProfileInfo isOwner={isOwner} profile={profile} updateProfile={updateProfile} />
                <Friends users={users} isOwner={isOwner}/>
            </div>
        </div>
    )
}
