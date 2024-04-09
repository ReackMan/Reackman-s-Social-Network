import { InjectedFormProps, reduxForm } from 'redux-form'

import styles from 'features/profile/ui/profile-info/profile-data-form/profile-data-form.module.scss'
import { ContactsType, ProfileType } from 'features/profile/api/profile.api.types'
import { Contact } from 'features/profile/ui/profile-info/contact'
import {
    createField,
    CustomInput,
    CustomTextarea,
    GetStringKeys,
} from 'common/components/form-control'
import { Button } from 'common/components/button'

const ProfileDataForm = ({ initialValues, handleSubmit, error }: ProfileDataFormDomainType) => {
    const contacts = Object.entries(initialValues.contacts).map(([title, value]) => {
        return (
            <div key={title}>
                <Contact title={title} value="" />
                {createField(`contacts.${title}`, [], CustomInput, {
                    placeholder: title,
                    className: styles.input,
                })}
            </div>
        )
    })

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.item}>
                <h4 className={styles.heading}>Full Name:</h4>
                {createField<ProfileDataFormValuesTypeKeys>('fullName', [], CustomInput, {
                    className: styles.input,
                })}
            </div>
            <div className={`${styles.item} ${styles.job}`}>
                <h4 className={styles.heading}>Looking for a job:</h4>
                {createField<ProfileDataFormValuesTypeKeys>('lookingForAJob', [], CustomInput, {
                    type: 'checkbox',
                })}
            </div>
            <div className={styles.item}>
                <h4 className={styles.heading}>My skills:</h4>
                {createField<ProfileDataFormValuesTypeKeys>(
                    'lookingForAJobDescription',
                    [],
                    CustomTextarea,
                    {
                        placeholder: 'My professional skills',
                        rows: 1,
                        className: styles.textarea,
                    },
                )}
            </div>
            <div className={styles.item}>
                <h4 className={styles.heading}>About me:</h4>
                {createField<ProfileDataFormValuesTypeKeys>('aboutMe', [], CustomTextarea, {
                    placeholder: 'About me',
                    rows: 1,
                    className: styles.textarea,
                })}
            </div>
            {contacts.length > 0 && (
                <div className={styles.item}>
                    <h4 className={styles.heading}>Contacts:</h4> {contacts}{' '}
                </div>
            )}
            <Button title="Save" />
            {error && <div className={styles.error}>{error}</div>}
        </form>
    )
}

export default reduxForm<ProfileDataFormType, ProfileDataFormPropsType>({
    form: 'edit-profile',
})(ProfileDataForm)

// types
type ProfileDataFormPropsType = {
    initialValues: ProfileType
    onSubmit: (formData: ProfileDataFormType) => void
}
type ProfileDataFormValuesTypeKeys = GetStringKeys<ProfileDataFormType>
export type ProfileDataFormType = {
    fullName: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    aboutMe: string
    contacts: ContactsType
}
type ProfileDataFormDomainType = ProfileDataFormPropsType &
    InjectedFormProps<ProfileDataFormType, ProfileDataFormPropsType>
