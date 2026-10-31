/**
 * StAuth10244: I Taeyoung Hwang, 000855719 certify that this 
 * material is my original work. 
 * No other person's work has been used without due acknowledgement. 
 * I have not made my work available to anyone else.
 */

import { useState } from 'react'
import './App.css'
import Card from './components/Card.jsx';
import Button from './components/Button.jsx';


const suits = ['spade','heart','diamond','club'];
const ranks = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
let wildCardId = 53; // Since 52 card is max, to add more, wildcard id will start from 53

function App() {
  
  const [deck,setDeck] = useState(()=>{ //State initialization

    let id = 1; // Id for the card starting at 1 and ending at 52

    const originalDeck = []; //Deck to hold the card made from id,suits,ranks

    for(const suit of suits){
      for(const rank of ranks){
        originalDeck.push({id: id++, suit, rank}); //To create a 52 card deck state
      }
    }
    return originalDeck;
  });

  const [dealtDeck,setDealtDeck] = useState([]); // State array to hold the card to show on content div
  const[picked, setPicked] = useState(null); // State to track whether the card is picked

  function pick(id){ // First check if something has been selected and if not, use the id
    if(picked === null){
      setPicked(id);
    }
    else{ //On second click on second element, either we click on the same id or the other one, so swap it itself or with other one and undo selected state
      const temp = [...dealtDeck];
      const pickedIndex = temp.findIndex(current => current.id === picked);
      const secondPick = temp.findIndex(current => current.id === id );
      
      const tempValue = temp[secondPick];
      temp[secondPick] = temp[pickedIndex];
      temp[pickedIndex] = tempValue;
      setDealtDeck(temp); //Update after the swap;
      setPicked(null);
    }
  }

  function toss(){
    if(picked === null) return; // Does nothing if nothing is picked
    setDealtDeck((prev) => prev.filter(card => card.id !== picked)); //Checks if current card.id is same as picked, if not, add it to new dealt state
    setPicked(null);
  }

  function dealCard(){ //For the button to deal card
    if(deck.length === 0){
      return;
    }
    
    const randomIdx = Math.floor(Math.random() * deck.length); // Random is not inclusive so goes to 51 index
    const card = deck[randomIdx];

    setDeck(prev => prev.filter((currentData,index)=>{ //If the index of the current data is not what was picked, get added to new state array
      return index !== randomIdx;
    }));
    
    setDealtDeck(prev => [...prev,card]); // Puts the card into dealtcard list which is shown on the content div
  }

  function resetCard(){ //Function for resetting card
    if(dealtDeck.length === 0)
      return;
    setDeck(prev => [...prev,...dealtDeck]);
    setDealtDeck([]);
  }

  function dealFive(){ // Can't use reset since render won't make it  
    const tempContainer = [...deck,...dealtDeck]; //Temporary containre to hold all cards
    if(tempContainer.length === 0) return;
    const showContainer = []; // Temporary container to give it to dealtDeck to display for render

    for(let i=0; i < 5; i++){ // Resets the card and deals five cards
      const randomIdx = Math.floor(Math.random() * tempContainer.length);
      const card = tempContainer[randomIdx];
      showContainer.push(card);
      tempContainer.splice(randomIdx,1); // Goes to the target index, and deletes specifie amount of element
    }

    setDeck(tempContainer);
    setDealtDeck(showContainer);
  }

  function dealSeven(){
      const tempContainer = [...deck,...dealtDeck]; //Temporary containre to hold all cards
      if(tempContainer.length === 0) return;
      const showContainer = []; // Temporary container to give it to dealtDeck to display for render

      for(let i=0; i < 7; i++){ // Resets the card and deals five cards
        const randomIdx = Math.floor(Math.random() * tempContainer.length);
        const card = tempContainer[randomIdx];
        showContainer.push(card);
        tempContainer.splice(randomIdx,1); // Goes to the target index, and deletes specifie amount of element
      }

      setDeck(tempContainer);
      setDealtDeck(showContainer);
  }

  function wildCard(){
    const randomRank = ranks[Math.floor(Math.random() * ranks.length)]; //Get random rank
    const randomSuit = suits[Math.floor(Math.random() * suits.length)]; //Get random suit
    const card = {id: wildCardId++, suit: randomSuit, rank: randomRank}; //Uses global constant wildCardId
    setDealtDeck(prev => [...prev,card]);
  }

  function regroup(){
    const container = [...dealtDeck]; // Makes the copy of the dealtDeck state array
    if(container.length === 0)
      return;
    for(let i=0; i < container.length; i++){
      const randomIdx = Math.floor(Math.random() * container.length);
      let temp = container[randomIdx];
      container[randomIdx] = container[i];
      container[i] = temp;
    }
    setDealtDeck(container);
  }

  return (
    <>
      <div className='layout'>
        <div className='top'>
          <div className='deal' onClick={dealCard}>{deck.length === 0 ? 'No more cards' : 'Draw'}</div>
          <Button className='reset' onClick={resetCard} feature='Reset'/>
          <Button className='wild' onClick={wildCard} feature='WildCard'/>
        </div>
        <div className='content'>
          {dealtDeck.map((card) =>{
            return <Card card={card} key={card.id} onPick={()=> pick(card.id)} isPicked={card.id === picked}/>
          })}
        </div>
        <div className='feature'>
          <Button className='dealFive' onClick={dealFive} feature='Deal Five'/>
          <Button className='dealSeven' onClick={dealSeven} feature='Deal Seven'/>
          <Button className='toss' onClick={toss} feature='Toss'/>
          <Button className='regroup' onClick={regroup} feature='Regroup'/>
        </div>
      </div>
    </>
  )
}

export default App
