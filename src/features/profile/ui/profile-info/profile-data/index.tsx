import { RiEditFill } from 'react-icons/ri'
import { MdOutlineScreenSearchDesktop } from 'react-icons/md'
import { GiSkills } from 'react-icons/gi'
import { IoIosContacts } from 'react-icons/io'
import { AiOutlineInfoCircle } from 'react-icons/ai'

import { Contact } from 'features/profile/ui/profile-info/contact'
import styles from 'features/profile/ui/profile-info/profile-data/profile-data.module.scss'
import { ProfileType } from 'features/profile/api/profile.api.types'

type Props = {
    profile: ProfileType
    isOwner: boolean
    callback: () => void
}

export const ProfileData = ({ profile, isOwner, callback }: Props) => {
    const contacts = Object.entries(profile.contacts)
        .filter(([_, value]) => value)
        .map(([title, value]) => {
            return <Contact key={title} title={title} value={value} />
        })

    return (
        <div className={styles.profileData}>
            <div className={styles.inner}>
                <h3>Profile</h3>
                {isOwner && (
                    <button className={styles.editButton} onClick={callback}>
                        <RiEditFill />
                    </button>
                )}
            </div>
            <span className={styles.item}>
                <MdOutlineScreenSearchDesktop /> Looking for a job:{' '}
                <b>{profile.lookingForAJob ? ' Yes 🐱‍💻' : ' No 😎'}</b>
            </span>
            {profile.lookingForAJob && (
                <span className={styles.item}>
                    <GiSkills /> Skills: <b>{profile.lookingForAJobDescription}</b>
                </span>
            )}
            <div>
                {profile.aboutMe && (
                    <span className={styles.item}>
                        <AiOutlineInfoCircle />
                        About me: <b>{profile.aboutMe}</b>
                    </span>
                )}
            </div>
            {contacts.length > 0 && (
                <div className={styles.contacts}>
                    <span className={styles.item}>
                        <IoIosContacts /> Contacts:
                    </span>{' '}
                    {contacts}
                </div>
            )}
        </div>
    )
}
