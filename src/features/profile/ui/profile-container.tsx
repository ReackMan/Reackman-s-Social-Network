import { Component, ComponentType } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router-dom'

import { AppStateType } from 'app/model/store'
import {
    getUserProfile,
    getUserStatus,
    sendPhoto,
    updateProfile,
    updateUserStatus,
} from 'features/profile/model/profile.reducer'
import { getProfile, getStatus } from 'features/profile/model/profile.selectors'
import { getAuthUserId, getIsAuth } from 'features/login/model/auth.selectors'
import { Profile } from 'features/profile/ui/index'
import { ProfileDataFormType } from 'features/profile/ui/profile-info/profile-data-form'
import { ProfileType } from 'features/profile/api/profile.api.types'
import { FilterType, UserType } from 'features/users/api/users.api.types'
import { getUsers } from 'features/users/model/users.selectors'
import { requestUsers } from 'features/users/model/users.reducer'

class ProfileContainer extends Component<ProfilePropsType> {
    refreshProfile() {
        let { userId } = this.props.match.params

        if (!userId) {
            if (!this.props.authorizedUserId) {
                this.props.history.push('/login')
                return
            }

            userId = String(this.props.authorizedUserId)
        }

        this.props.getUserProfile(userId)
        this.props.getUserStatus(userId)
    }

    componentDidMount() {
        this.refreshProfile()
        this.props.requestUsers(1, 10, { friend: true })
    }

    componentDidUpdate(prevProps: ProfilePropsType) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile()
        }
    }

    render() {
        return <Profile {...this.props} />
    }
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    profile: getProfile(state),
    status: getStatus(state),
    authorizedUserId: getAuthUserId(state),
    isAuth: getIsAuth(state),
    users: getUsers(state),
})

export default compose<ComponentType>(
    connect(mapStateToProps, {
        getUserProfile,
        getUserStatus,
        updateUserStatus,
        sendPhoto,
        updateProfile,
        requestUsers,
    }),
    withRouter,
)(ProfileContainer)

// types
type MapStateToPropsType = {
    profile: ProfileType
    status: string
    authorizedUserId: number | null
    isAuth: boolean | null
    users: UserType[]
}
type MapDispatchToPropsType = {
    getUserProfile: (userId: string) => void
    getUserStatus: (userId: string) => void
    updateUserStatus: (userId: string) => void
    sendPhoto: (file: File) => void
    updateProfile: (profile: ProfileDataFormType) => Promise<any>
    requestUsers: (page: number, pageSize: number, filter: FilterType) => void
}
type PathParamsType = {
    userId: string
}
type ownProfileContainerPropsType = MapStateToPropsType & MapDispatchToPropsType
export type ProfilePropsType = RouteComponentProps<PathParamsType> & ownProfileContainerPropsType
