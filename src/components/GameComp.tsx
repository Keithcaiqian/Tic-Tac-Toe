import React, { Component } from 'react'
import './GameComp.css'
import { ChessType, GameStatus } from '../types/enums';
import BoardComp from './BoardComp'
import GameStatusComp from './GameStatusComp'

interface IState {
    chessess:ChessType[],
    gameStatus:GameStatus,
    nextChess:ChessType.red | ChessType.black
}

export default class GameComp extends Component<{},IState> {

    state: IState = {
        chessess:[],
        nextChess: ChessType.black,
        gameStatus: GameStatus.gaming,
    }

    componentDidMount(){
        this.init();
    }

    chessHandleClick = (i: number) => {
        const chessArr:ChessType[] = this.state.chessess;
        chessArr[i] = this.state.nextChess;

        this.setState(prevState => ({
            nextChess: prevState.nextChess === ChessType.black ?  ChessType.red : ChessType.black,
            chessess:chessArr,
            gameStatus:this.getStatus(chessArr, i)
        }))
    };

    // 初始化
    init(){
        const arr:ChessType[] = [];
        for(let i = 0; i < 9; i++){
            arr.push(ChessType.none)
        }
        this.setState({
            chessess: arr,
            nextChess: ChessType.black,
            gameStatus: GameStatus.gaming,
        })
    }

    getStatus(chesses: ChessType[], index: number): GameStatus {
        //1. 判断是否有一方获得胜利
        const horMin = Math.floor(index / 3) * 3;
        const verMin = index % 3;
        if ((chesses[horMin] === chesses[horMin + 1] && chesses[horMin] === chesses[horMin + 2])
            ||
            (chesses[verMin] === chesses[verMin + 3] && chesses[verMin] === chesses[verMin + 6])
            ||
            (chesses[0] === chesses[4] && chesses[0] === chesses[8] && chesses[0] !== ChessType.none)
            ||
            (chesses[2] === chesses[4] && chesses[2] === chesses[6] && chesses[2] !== ChessType.none)) {
            if (chesses[index] === ChessType.red) {
                return GameStatus.redWin;
            }
            else {
                return GameStatus.blackWin;
            }
        }
        //2. 判断是否平局
        if (!chesses.includes(ChessType.none)) {
            return GameStatus.equal;
        }
        //3. 游戏正在进行
        return GameStatus.gaming;
    }

    render() {
        return (
            <div className='gameBox'>
                <h1>井字棋游戏</h1>
                <GameStatusComp status={this.state.gameStatus} next={this.state.nextChess}/>
                <BoardComp 
                    chessArr={this.state.chessess} 
                    onClick={this.chessHandleClick}
                    isGameOver={this.state.gameStatus !== GameStatus.gaming}
                />
                <button className='startBtn' onClick={() => {
                    this.init();
                }}>重新开始</button>
            </div>
        )
    }
}
