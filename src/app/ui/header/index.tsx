import { NavLink } from 'react-router-dom'

import styles from 'app/ui/header/header.module.scss'
import { ReactComponent as Logo } from 'common/img/logo.svg'
import logo from '../../../common/img/logo.png'
import { RiLoginCircleLine, RiLogoutCircleLine } from 'react-icons/ri'
import { HeaderContainerPropsType } from 'app/ui/header/header-container'
import { Navbar } from 'common/components/navbar'
import { useEffect, useState } from 'react'

type Props = HeaderContainerPropsType

export const Header = ({ login, isAuth, logout }: Props) => {

    return (
        <header className={styles.header}>
            <a href='/profile' className={styles.logo}>
                <img className={styles.logo} src={logo} alt="logotype" />
            </a>
            <Navbar />
            <div className={styles.login}>
                {isAuth ? (
                    <>
                        <div className={styles.user}>{login}</div>
                        <NavLink to={'/login'} onClick={logout}>
                            Logout
                            <RiLogoutCircleLine />
                        </NavLink>
                    </>
                ) : (
                    <NavLink to={'/login'} activeClassName={styles.active}>
                        Login
                        <RiLoginCircleLine />
                    </NavLink>
                )}
            </div>
        </header>
    )
}
