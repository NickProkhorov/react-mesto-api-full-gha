import { useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }){
    const currentUser = useContext(CurrentUserContext);
    const isOwn = card.owner._id === currentUser._id;
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = (`element__like ${isLiked && 'element__like_type_active'}`); 
    const handleCardClick = () => {
        onCardClick(card);
    }
    const handleLikeClick = () => {
        onCardLike(card);
    }

    const handleDeleteClick = () => {
        onCardDelete(card);
    }

    return (
        <div className="element">
            <img className="element__image" alt={card.name} src={card.link} onClick={handleCardClick}/>
            <div className="element__label">  
                <h2 className="element__title">{card.name}</h2>
                <div className="element__like-area">
                    <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
                    <span className="element__like-counter">{card.likes.length}</span>
                </div>
            </div>
            <button className={`element__delete-element ${isOwn ? '':'element__delete-element_type_hide'}`} onClick={handleDeleteClick}></button>
        </div>
    )
}

export default Card;