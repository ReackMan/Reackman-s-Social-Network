import { useDispatch, useSelector } from 'react-redux'

import styles from 'features/users/ui/users-list/users-list.module.scss'
import { Paginator } from 'common/components/paginator'
import { User } from 'features/users/ui/user'
import { UsersSearchForm } from 'features/users/ui/users-search-form'
import {
    getCurrentPage,
    getPageSize,
    getTotalUsersCount,
    getUsers,
    getUsersFilter,
} from 'features/users/model/users.selectors'
import { requestUsers, setCurrentPage } from 'features/users/model/users.reducer'
import { FilterType } from 'features/users/api/users.api.types'

export const UsersList = () => {
    const users = useSelector(getUsers)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getUsersFilter)
    const currentPage = useSelector(getCurrentPage)
    const totalUsersCount = useSelector(getTotalUsersCount)

    const dispatch = useDispatch()

    const onChangePageNumber = (pageNumber: number) => {
        dispatch(setCurrentPage(pageNumber))
        dispatch(requestUsers(pageNumber, pageSize, filter))
    }
    const onChangeUsersFilter = (filter: FilterType) => {
        dispatch(requestUsers(1, pageSize, filter))
    }

    const usersItems: JSX.Element[] = users.map(user => <User key={user.id} user={user} />)

    return (
        <>
            <div className={styles.users}>
                <UsersSearchForm onChangeUsersFilter={onChangeUsersFilter} />
                {usersItems}
                <Paginator
                    pageSize={pageSize}
                    totalItemsCount={totalUsersCount}
                    currentPageNumber={currentPage}
                    onChangePageNumber={onChangePageNumber}
                />
            </div>
        </>
    )
}
