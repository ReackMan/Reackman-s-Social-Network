import { ChangeEvent } from 'react'
import { MdOutlinePhotoCamera } from 'react-icons/md'

import styles from 'features/profile/ui/profile-header/avatar/avatar.module.scss'
import userDefault from 'common/img/user.jpg'
import { PhotosType } from 'features/users/api/users.api.types'

type Props = {
    photos: PhotosType
    isOwner: boolean
    callback: (file: File) => void
}

export const Avatar = ({ photos, isOwner, callback }: Props) => {
    const onUploadImage = (e: ChangeEvent<HTMLInputElement>) => {
        e.target?.files?.length && callback(e.target.files[0])
    }

    return (
        <div className={styles.avatar}>
            <img className={styles.userImg} src={photos?.large || userDefault} alt="user" />
            {isOwner && (
                <label className={styles.uploadImgLabel}>
                    <input
                        className={styles.uploadImgInput}
                        type="file"
                        accept=".jpg, .jpeg, .png"
                        onChange={onUploadImage}
                    />
                    <MdOutlinePhotoCamera className={styles.uploadImgIcon} />
                </label>
            )}
        </div>
    )
}
