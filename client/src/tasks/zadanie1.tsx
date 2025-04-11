import React, { useState } from 'react'
import { useTheme } from './zadanie6'
import './zadanie1.css'

const Counter: React.FC = () => {
    const [count, setCount] = useState<number>(0)
    const { theme } = useTheme()

    return (
        <div className={`counter ${theme}`}>
            <div className='counter-display'>
                <p>Counter</p>
                <p>{count}</p>
            </div>
            <div className='counter-buttons'>
                <button onClick={() => setCount(count + 1)}>Increment</button>
                <button onClick={() => setCount(count - 1)}>Decrement</button>
                <button onClick={() => setCount(0)}>Reset</button>
            </div>
        </div>
    );
}

export default Counter;