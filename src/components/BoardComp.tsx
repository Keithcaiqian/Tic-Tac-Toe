import React from 'react'
import './BoardComp.css'
import { ChessType } from '../types/enums';
import ChessComp from './ChessComp';

interface IProps{
    chessArr:ChessType[],
    onClick: (index:number) => void,
    isGameOver?: boolean
}


const BoardComp:React.FC<IProps> = function ({chessArr,onClick,isGameOver}) {
    const list = chessArr.map((it,i) => <ChessComp 
        key={i}
        type={it}
        onClick={() => {
            if(!isGameOver){
                onClick(i);
            }
        }}
    />)
    return (
        <div className='board'>
            {list}
        </div>
    )
}

export default BoardComp;
