import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import styles from 'features/users/ui/users-list/users-list.module.scss'
import { UsersList } from 'features/users/ui/users-list'
import { Preloader } from 'common/components/preloader'
import {
    getCurrentPage,
    getIsFetching,
    getPageSize,
    getUsersFilter,
} from 'features/users/model/users.selectors'
import { requestUsers } from 'features/users/model/users.reducer'

const Users = () => {
    const isFetching = useSelector(getIsFetching)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getUsersFilter)

    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        if (!Object.keys(filter).length) return

        const query = {
            ...(filter.name && { term: filter.name }),
            ...(filter.friend !== null && { friend: String(filter.friend) }),
            ...(currentPage !== 1 && { page: String(currentPage) }),
        }

        const searchQuery = new URLSearchParams(query).toString()
        const currentSearch = history.location.search

        if (currentSearch !== searchQuery) {
            history.push({
                pathname: '/users',
                search: searchQuery,
            })
        }
    }, [filter, history, currentPage])

    useEffect(() => {
        const currentSearch = new URLSearchParams(history.location.search)
        const parsed = Object.fromEntries(currentSearch.entries()) as QueryParamsType

        const { page: parsedPage, term: parsedTerm, friend: parsedFriend } = parsed

        const actualPage = parsedPage ? Number(parsedPage) : currentPage
        const actualFilter = {
            ...filter,
            term: parsedTerm && parsedTerm !== 'undefined' ? parsedTerm : '',
            friend: parsedFriend ? parsedFriend === 'true' : null,
        }

        dispatch(requestUsers(actualPage, pageSize, actualFilter))
        // eslint-disable-next-line
    }, [])

    return <div className={styles.usersContainer}>{isFetching ? <Preloader /> : <UsersList />}</div>
}

export default Users

// types
type QueryParamsType = {
    page: string
    term: string
    friend: string
}
