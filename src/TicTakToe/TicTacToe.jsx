import React, { useEffect, useState } from 'react'
import './styleM.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function TicTacToe() {
    const [dataM, setData] = useState(["", "", "", "", "", "", "", "", ""])
    const [final, setFinal] = useState()
    const [player1, setplayer1] = useState("X")
    const [player2, setplayer2] = useState("O")
    const [nameD, setNameD] = useState({ player1, player2 })
    const [settingsState, setSettingsState] = useState(false)
    const [xCount, setXCount] = useState(0)
    const [yCount, setYCount] = useState(0)
    const [active, setActive] = useState(true)

    // console.log(dataM);
    const [currentM, setcurrent] = useState(player2)
    const notify = () => toast("Tie!", {
        position: "bottom-center",
        autoClose: 100,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "colored",

    });
    const Xscore = () => toast(`${nameD.player1} Scores !!!`, {
        position: "bottom-center",
        autoClose: 100,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "colored",

    });
    const Yscore = () => toast(`${nameD.player2} Scores !!!`, {
        position: "bottom-center",
        autoClose: 100,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "colored",

    });

    const cellClicked = (event, index) => {

        // console.log("success", event);
        // console.log(index);
        // console.log(event.target.id);

        if (event.target.innerText === "") {
            // console.log(event.target)
            // event.target.innerText = currentM
            if (currentM === player1) {
                setcurrent(player2)
                dataM[index] = player2
                setActive(!active)

            }
            else {
                setcurrent(player1)
                dataM[index] = player1
                setActive(!active)
            }
        }


    }
    useEffect(() => {

        const rowCheck = () => {
            let ansRow;
            for (let i = 0; i < 9; i += 3) {
                ansRow |= (dataM[i] === dataM[i + 1] &&
                    dataM[i] === dataM[i + 2] &&
                    dataM[i] !== '')
            }
            return ansRow
        }
        const colCheck = () => {
            let ansCol
            for (let i = 0; i < 3; i++) {
                ansCol |= (dataM[i] === dataM[i + 3] &&
                    dataM[i] === dataM[i + 6] &&
                    dataM[i] !== '')
            }
            return ansCol


        }
        const DiaCheck = () => {
            let ansDia
            let i = 0;
            ansDia |= (dataM[i] === dataM[i + 4] &&
                dataM[i] === dataM[i + 8] &&
                dataM[i] !== '' || dataM[i + 2] === dataM[i + 4] &&
                dataM[i + 2] === dataM[i + 6] &&
                dataM[i + 2] !== '')

            return ansDia


        }
        if (rowCheck() === 1 || colCheck() === 1 || DiaCheck() === 1) {

            if (currentM === player1) {
                Reset()
                countInc()
            }
            else if (currentM === player2) {
                Reset()
                countInc()
            }

        }

        var count = 0
        for (let i = 0; i < 9; i++) {

            if (dataM[i] !== "") {
                count++
                // console.log(count)
                if (count === 9) {

                    Reset()
                    setActive(true)
                    if (yCount < 3 && xCount < 3) {
                        notify()

                    }
                }
            }

        }


    })
    const Reset = () => {
        setActive(true)
        setcurrent(player2)
        setData(["", "", "", "", "", "", "", "", ""])
        //  xref.current.innerHTML.value=""
        // console.log(xref);
        // document.getElementsByClassName("fixed").value="";
    }
    const Reset2 = () => {
        setActive(true)
        setcurrent(player2)
        setData(["", "", "", "", "", "", "", "", ""])
        setXCount(0)
        setYCount(0)
        //  xref.current.innerHTML.value=""
        // console.log(xref);
        // document.getElementsByClassName("fixed").value="";
    }

    const PlayAgain = () => {
        setData(["", "", "", "", "", "", "", "", ""])
        setFinal()
        // setXCount(0)
        // setYCount(0)
    }
    const nameChange = (e) => {
        console.log(e.target.value)
        const name = e.target.name
        const value = e.target.value
        console.log("name===>", name);
        console.log("value===>", value);
        setNameD({
            ...nameD,
            [name]: value
        })
    }
    const SaveChange = () => {
        setSettingsState(false)

    }
    const countInc = () => {
        if (currentM === player1) {
            Xscore()
            setXCount(xCount + 1)
            console.log('X===>', xCount)
            if (xCount === 2) {

                setFinal(`${nameD.player1} Wins!!!`)
                setXCount(0)
                setYCount(0)
            }
        }
        else {
            Yscore()
            setYCount(yCount + 1)
            console.log('O===>', yCount)
            if (yCount === 2) {
                setFinal(`${nameD.player2} Wins!!!`)
                setXCount(0)
                setYCount(0)
            }
        }
    }

    return (
        <div>
            <h1 id='Head-Text'>Tic Tac Toe</h1>

            {(final == null) ?
                <>
                    <button onClick={Reset2} className="re-btn">Reset</button>
                    <button className="re-btn" onClick={() => setSettingsState(true)}>Settings</button>
                    <div className="scorecard">
                        <li className={(active == true) ? 'LiActive' : 'LiMain'}>{nameD.player1}:{xCount}</li>
                        <li className={(active == false) ? 'LiActive' : 'LiMain'}>{nameD.player2}:{yCount}</li>
                    </div>

                    {(settingsState === true) ?
                        <>

                            <div className="nameChange">
                                <input className='InpStyle' name='player1' placeholder='Rename Player 1' maxLength="5" onChange={nameChange}></input>
                                <input className='InpStyle' name='player2' placeholder='Rename Player 2' maxLength="5" onChange={nameChange}></input>
                                <button className="re-btn" onClick={SaveChange}>Save</button>
                            </div>
                        </> : <>
                            <table id="table_game">
                                <tbody>
                                    <tr>
                                        <td className="td_game" id="cell0" onClick={(e) => cellClicked(e, 0)}>
                                            <div className="fixed">{dataM[0]}</div>
                                        </td>
                                        <td className="td_game" id="cell1" onClick={(e) => cellClicked(e, 1)}>
                                            <div className="fixed">{dataM[1]}</div>
                                        </td>
                                        <td className="td_game" id="cell2" onClick={(e) => cellClicked(e, 2)}>
                                            <div className="fixed">{dataM[2]}</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="td_game" id="cell3" onClick={(e) => cellClicked(e, 3)}>
                                            <div className="fixed">{dataM[3]}</div>
                                        </td>
                                        <td className="td_game" id="cell4" onClick={(e) => cellClicked(e, 4)}>
                                            <div className="fixed">{dataM[4]}</div>
                                        </td>
                                        <td className="td_game" id="cell5" onClick={(e) => cellClicked(e, 5)}>
                                            <div className="fixed">{dataM[5]}</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="td_game" id="cell6" onClick={(e) => cellClicked(e, 6)}>
                                            <div className="fixed">{dataM[6]}</div>
                                        </td>
                                        <td className="td_game" id="cell7" onClick={(e) => cellClicked(e, 7)}>
                                            <div className="fixed">{dataM[7]}</div>
                                        </td>
                                        <td className="td_game" id="cell8" onClick={(e) => cellClicked(e, 8)}>
                                            <div className="fixed">{dataM[8]}</div>
                                        </td>
                                    </tr>
                                </tbody>

                            </table>
                        </>
                    }
                </> : <>
                    <div className="resultDiv">
                        <h1 className='Res-Final'>{final}</h1>
                        <button className="re-btn" onClick={PlayAgain}>Play Again</button>
                    </div>

                </>}
            <ToastContainer
                position="bottom-center"
                autoClose={100}
                hideProgressBar
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss={false}
                draggable={false}
                pauseOnHover={false}
                theme="colored" />
        </div>

    )
}
