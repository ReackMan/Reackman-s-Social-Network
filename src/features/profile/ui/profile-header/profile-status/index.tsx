import { ChangeEvent, Component } from 'react'

import styles from 'features/profile/ui/profile-header/profile-status/profile-status.module.scss'

type Props = {
    editable: boolean
    status: string
    updateUserStatus: (status: string) => void
}

type State = {
    editMode: boolean
    status: string
}

export class ProfileStatus extends Component<Props, State> {
    state = {
        editMode: false,
        status: this.props.status,
    }

    componentDidUpdate(prevProps: Props) {
        const { status } = this.props
        if (prevProps.status !== status) this.setState({ status })
    }

    activateEditMode = () => {
        if (!this.props.editable) return
        this.setState({
            editMode: true,
        })
    }

    deactivateEditMode = () => {
        const { updateUserStatus } = this.props
        this.setState({
            editMode: false,
        })
        updateUserStatus(this.state.status)
    }

    onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value,
        })
    }

    render() {
        const { status } = this.props

        return (
            <div className={styles.profileStatus}>
                {this.state.editMode ? (
                    <input
                        onChange={this.onChangeStatus}
                        onBlur={this.deactivateEditMode}
                        value={this.state.status}
                        autoFocus
                    />
                ) : (
                    <span onDoubleClick={this.activateEditMode}>{status || 'Add status'}</span>
                )}
            </div>
        )
    }
}
