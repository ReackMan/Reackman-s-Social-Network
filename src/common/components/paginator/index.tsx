import { Component } from 'react'

import styles from 'common/components/paginator/paginator.module.scss'
import { Button } from 'common/components/button'

type Props = {
    pageSize: number
    totalItemsCount: number
    currentPageNumber: number
    portionSize?: number
    onChangePageNumber: (page: number) => void
}

type State = {
    portionNumber: number
}

export class Paginator extends Component<Props, State> {
    state = {
        portionNumber: Math.ceil(this.props.currentPageNumber / (this.props?.portionSize || 10)),
    }

    onPageClick = (page: number) => {
        const { onChangePageNumber } = this.props
        onChangePageNumber(page)
    }

    onPrevClick = () => {
        this.setState({
            portionNumber: this.state.portionNumber - 1,
        })
    }

    onNextClick = () => {
        this.setState({
            portionNumber: this.state.portionNumber + 1,
        })
    }

    render() {
        const { pageSize, totalItemsCount, currentPageNumber, portionSize = 10 } = this.props

        const pagesCount = Math.ceil(totalItemsCount / pageSize)
        const pagesArray = Array.from({ length: pagesCount }, (_, i) => i + 1)
        const portionCount = Math.ceil(pagesCount / portionSize)
        const leftPortionPageNumber = (this.state.portionNumber - 1) * portionSize + 1
        const rightPortionPageNumber = this.state.portionNumber * portionSize

        const pages = pagesArray
            .filter(page => page >= leftPortionPageNumber && page <= rightPortionPageNumber)
            .map(page => (
                <span
                    key={page}
                    className={`${styles.page} ${
                        currentPageNumber === page ? styles.selectedPage : ''
                    }`}
                    onClick={() => this.onPageClick(page)}
                >
                    {page}
                </span>
            ))

        const showPrevButton = this.state.portionNumber > 1
        const showNextButton = this.state.portionNumber < portionCount

        return (
            <div className={styles.paginator}>
                {showPrevButton && <Button title="prev" onClick={this.onPrevClick} />}
                {pages}
                {showNextButton && <Button title="next" onClick={this.onNextClick} />}
            </div>
        )
    }
}
