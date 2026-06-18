import { useState } from 'react'
import './Calculator.css'

const BUTTONS = [
  ['C', '±', '%', '÷'],
  ['7', '8', '9', '×'],
  ['4', '5', '6', '−'],
  ['1', '2', '3', '+'],
  ['0', '.', '='],
]

export default function Calculator() {
  const [display, setDisplay] = useState('0')
  const [prev, setPrev] = useState(null)
  const [op, setOp] = useState(null)
  const [fresh, setFresh] = useState(false)

  function handleDigit(d) {
    if (fresh) {
      setDisplay(d === '.' ? '0.' : d)
      setFresh(false)
    } else {
      if (d === '.' && display.includes('.')) return
      setDisplay(display === '0' && d !== '.' ? d : display + d)
    }
  }

  function handleOp(o) {
    const cur = parseFloat(display)
    if (prev !== null && !fresh) {
      const result = compute(prev, cur, op)
      setDisplay(String(result))
      setPrev(result)
    } else {
      setPrev(cur)
    }
    setOp(o)
    setFresh(true)
  }

  function compute(a, b, operator) {
    switch (operator) {
      case '+': return a + b
      case '−': return a - b
      case '×': return a * b
      case '÷': return b !== 0 ? a / b : 'Error'
      default: return b
    }
  }

  function handleEquals() {
    if (op === null || prev === null) return
    const result = compute(prev, parseFloat(display), op)
    setDisplay(String(result))
    setPrev(null)
    setOp(null)
    setFresh(true)
  }

  function handleSpecial(btn) {
    const cur = parseFloat(display)
    if (btn === 'C') {
      setDisplay('0'); setPrev(null); setOp(null); setFresh(false)
    } else if (btn === '±') {
      setDisplay(String(-cur))
    } else if (btn === '%') {
      setDisplay(String(cur / 100))
    }
  }

  function handleClick(btn) {
    if ('0123456789.'.includes(btn)) handleDigit(btn)
    else if (['+', '−', '×', '÷'].includes(btn)) handleOp(btn)
    else if (btn === '=') handleEquals()
    else handleSpecial(btn)
  }

  const isOp = (btn) => ['+', '−', '×', '÷'].includes(btn)

  return (
    <div className="calc">
      <div className="display">{display}</div>
      <div className="buttons">
        {BUTTONS.map((row, i) => (
          <div key={i} className="row">
            {row.map((btn) => (
              <button
                key={btn}
                className={`btn ${isOp(btn) || btn === '=' ? 'op' : ''} ${btn === 'C' || btn === '±' || btn === '%' ? 'fn' : ''} ${'0123456789.'.includes(btn) ? 'num' : ''} ${btn === '0' ? 'zero' : ''}`}
                onClick={() => handleClick(btn)}
              >
                {btn}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
