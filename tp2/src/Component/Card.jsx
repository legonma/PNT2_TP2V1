import { useEffect, useState } from "react";
import axios from "axios";
import './Card.css';

export default function Card() {
    //initialize
    const [card, setCard] = useState('CardFlipped')
    const [character, setCharacter] = useState(null);

    //handler
    const flipCard = () => {
        card === 'Card' ? setCard('CardFlipped') : setCard('Card');
    }   


    useEffect(() => {
        const fetchCharacter = async () => {
            try {
                const response = await axios.get('https://rickandmortyapi.com/api/character');
                pickupCharacter(response);
            } catch (error) {
                console.error(error);
            }
        };

        function pickupCharacter(response) {
            const length = response.data.results.length;
            let char;
            do {
                char = response.data.results[Math.floor(Math.random() * length)]
            } while (char.id === 19);
            setCharacter(char);
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
                        <p className = "Attr"><b>Spacies:</b> {character && character.species}</p>
                        <p className = "Attr"><b>Location:</b> {character && character.location.name}</p>
                        <p className = "Attr"><b>Status:</b> {character && character.status}</p>
                        <p className = "Attr"><b>Total Episodie:</b> {character && character.episode.length}</p>
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
