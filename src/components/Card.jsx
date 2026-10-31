/**
 * StAuth10244: I Taeyoung Hwang, 000855719 certify that this 
 * material is my original work. 
 * No other person's work has been used without due acknowledgement. 
 * I have not made my work available to anyone else.
 */

import './card.css';

export default function Card({card,onPick,isPicked}){
    const cardSuit = { //Suit Symbol to display
        spade: '♠',
        heart: '♥',
        diamond: '♦',
        club: '♣',
    };

    const redColor = card.suit === 'heart' || card.suit === 'diamond'; //If the suits are heart and diamond, turn red to true

    

    return(
        <>
            <div className={`card ${redColor ? 'red' : 'black'} ${isPicked ? 'picked' : ''}`} onClick={onPick}>
                <span>{card.rank} {cardSuit[card.suit]}</span>  
                <div className="card-center">{cardSuit[card.suit]}</div>
            </div>
        </>
    );
}