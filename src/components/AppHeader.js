import React from 'react'
import styles from '../styles/modules/app.module.scss'
import SelectButton from './SelectButton'

function AppHeader() {
    return (
        <div className={styles.appHeader}>
            <p className={styles.appTitle}>Task</p>
            <SelectButton
                id="status"
                // onChange={(e) => updateFilter(e)}
                // value={filterStatus}
            >
                <option value="all">All</option>
                <option value="Done">Done</option>
                <option value="Undone">Undone</option>
            </SelectButton>
        </div>
    )
}

export default AppHeader