import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import style from '../styles/modules/progress.module.scss'


function TodoProgress() {
    const { todoList } = useSelector((state) => state.todo);
    const [completed, setCompleted] = useState(0)
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const completedCal = todoList?.filter((todo) => todo.completed === true)
        setCompleted(completedCal?.length)
        setProgress(completedCal?.length * 100 / todoList?.length);
    }, [todoList])

    return (
        <div className={style.progressTodo}>
            <p className={style.title}>Progress</p>
            <div className={style.progress}>
                <span className={style.progressBar} style={{width: `${progress}%`}}></span>
            </div>
            <p className={style.completedText}>{completed} completed</p>
        </div>
    )
}

export default TodoProgress