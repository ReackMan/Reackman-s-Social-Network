import { Component } from 'react'

import styles from 'features/profile/ui/profile-info/profile-info.module.scss'
import { ProfileType } from 'features/profile/api/profile.api.types'
import { ProfileData } from 'features/profile/ui/profile-info/profile-data'
import ProfileDataForm, {
    ProfileDataFormType,
} from 'features/profile/ui/profile-info/profile-data-form'

type Props = {
    isOwner: boolean
    profile: ProfileType
    updateProfile: (profile: ProfileDataFormType) => Promise<any>
}

type State = {
    editMode: boolean
}

export class ProfileInfo extends Component<Props, State> {
    state = {
        editMode: false,
    }

    onEditProfile = () => {
        this.setState({
            editMode: true,
        })
    }

    onSubmit = (formData: ProfileDataFormType) => {
        this.props.updateProfile(formData).then(() => {
            this.setState({
                editMode: false,
            })
        })
    }

    render() {
        const { isOwner, profile } = this.props

        return (
            <div className={styles.profileInfo}>
                <div className={styles.content}>
                    {this.state.editMode ? (
                        <ProfileDataForm onSubmit={this.onSubmit} initialValues={profile} />
                    ) : (
                        <ProfileData
                            profile={profile}
                            isOwner={isOwner}
                            callback={this.onEditProfile}
                        />
                    )}
                </div>
            </div>
        )
    }
}
