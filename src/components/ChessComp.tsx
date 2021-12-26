import React from 'react';
import './ChessComp.css';
import { ChessType } from '../types/enums';

interface IProps {
    type: ChessType,
    onClick?: () => void
}

export default function ChessComp({ type, onClick } : IProps) {
    let chessDom = null;
    if(type === ChessType.red){
        chessDom = <div className="chess-center red"></div>;
    }else if(type === ChessType.black){
        chessDom = <div className="chess-center black"></div>;
    }

    return (
        <div className='chess' onClick={() => {
            if(type === ChessType.none && onClick){
                onClick();
            }
        }}>
            {chessDom}
        </div>
    )
}
