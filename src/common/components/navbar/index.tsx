import { NavLink } from 'react-router-dom'
import { HiOutlineUser, HiOutlineUsers, HiOutlineChatBubbleOvalLeftEllipsis } from 'react-icons/hi2'

import styles from 'common/components/navbar/navbar.module.scss'

export const Navbar = () => {
    return (
        <nav className={styles.sidebar}>
            <ul className={styles.nav}>
                <li className={styles.item}>
                    <NavLink to="/profile" activeClassName={styles.active}>
                        <HiOutlineUser />
                        Profile
                    </NavLink>
                </li>
                <li className={styles.item}>
                    <NavLink to="/chat" activeClassName={styles.active}>
                        <HiOutlineChatBubbleOvalLeftEllipsis />
                        Chat
                    </NavLink>
                </li>
                <li className={styles.item}>
                    <NavLink to="/users" activeClassName={styles.active}>
                        <HiOutlineUsers />
                        Users
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}
