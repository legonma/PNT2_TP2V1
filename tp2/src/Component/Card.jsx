import { useEffect, useState } from "react";
import axios from "axios";
import './Card.css';

export default function Card() {
    const [card, setCard] = useState('CardFlipped')
    const flipCard = () => {
        card === 'Card' ? setCard('CardFlipped') : setCard('Card');
    }   
    const [character, setCharacter] = useState(null);


    useEffect(() => {
        const fetchCharacter = async () => {
            try {
                const response = await axios.get('https://rickandmortyapi.com/api/character');
                const randomCharacter = returnCharacter(response);
                setCharacter(randomCharacter);
            } catch (error) {
                console.error(error);
            }
        };

        const returnCharacter = (response) => {
            const length = response.data.results.length;
            let char = response.data.results[Math.floor(Math.random() * length) - 1]
            return char;
        }
        fetchCharacter();
    }, []);

    return (
        <div className = {card} onClick = {flipCard}>
            <div className ="CardFront">
                <div>
                    <h2 className = "Name">{character && character.name}</h2>
                    <img className = "img" src={character && character.image}/>
                    <div className = "Attr_Container">
                        <p className = "Attr">Spacies: {character && character.species}</p>
                        <p className = "Attr">Location: {character && character.location.name}</p>
                        <p className = "Attr">Status: {character && character.status}</p>
                        <p className = "Attr">Total Episodie {character && character.episode.length}</p>
                    </div>

                </div>
            </div>
            <div className ="CardBack">
                <div>
                    <img src= "https://rickandmortyapi.com/api/character/avatar/19.jpeg"/>
                </div>
            </div>
        </div>
    )
}
