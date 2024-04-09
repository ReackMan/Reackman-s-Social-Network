import { Component, ComponentType, lazy } from 'react'
import { compose } from 'redux'
import { connect, Provider } from 'react-redux'
import { HashRouter, Redirect, Route, Switch, withRouter } from 'react-router-dom'

import styles from 'app/ui/app.module.scss'
import HeaderContainer from 'app/ui/header/header-container'
import { initializeApp } from 'app/model/app.reducer'
import { AppStateType, store } from 'app/model/store'
import { Preloader } from 'common/components/preloader'
import { getInitialized } from 'app/model/app.selectors'
import { withSuspense } from 'common/hoc'

const Login = lazy(() => import('features/login/ui'))
const Profile = lazy(() => import('features/profile/ui/profile-container'))
const Chat = lazy(() => import('features/chat/ui/index'))
const Users = lazy(() => import('features/users/ui'))

class App extends Component<AppPropsType> {
    componentDidMount() {
        this.props.initializeApp()
    }

    render() {
        if (!this.props.initialized) return <Preloader />

        return (
            <div className={styles.app}>
                <HeaderContainer />
                <div className={styles.content}>
                    <Switch>
                        <Redirect exact from="/" to="/profile" />
                        <Route path="/profile/:userId?" render={withSuspense(Profile)} />
                        <Route path="/chat" render={withSuspense(Chat)} />
                        <Route path="/users" render={withSuspense(Users)} />
                        <Route path="/login" render={withSuspense(Login)} />
                        <Route path="*" render={() => <div>404 NOT FOUND</div>} />
                    </Switch>
                </div>
            </div>
        )
    }
}

const mstp = (state: AppStateType) => ({ initialized: getInitialized(state) })
const AppContainer = compose<ComponentType>(withRouter, connect(mstp, { initializeApp }))(App)

export const RootComponent = () => {
    return (
        <HashRouter>
            <Provider store={store}>
                <AppContainer />
            </Provider>
        </HashRouter>
    )
}

// types
type AppPropsType = MapStateToPropsType & MapDispatchToPropsType
type MapStateToPropsType = {
    initialized: boolean
}
type MapDispatchToPropsType = {
    initializeApp: () => void
}
