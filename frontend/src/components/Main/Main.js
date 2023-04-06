import React from 'react';
import {useContext} from 'react';
import Card from '../Card/Card';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Main({ cards, onCardClick, onEditProfile, onEditAvatar, onAddPlace, onCardLike, onCardDelete }) {
    const currentUser = useContext(CurrentUserContext);
    return (
        <main>
            <section className="profile">
                <div className="profile__container">
                    <div className="profile__label">
                        <button className="profile__edit-img" type="button" ></button>
                        <div className="profile__avatar-overlay">
                            <img className="profile__avatar" alt="Аватар" onClick={onEditAvatar} src={currentUser.avatar}/>
                        </div>
                        <div className="profile__info">
                            <div className="profile__info-title">
                            <h1 className="profile__title">{currentUser.name}</h1>
                            <button className="profile__edit-profile" type="button" onClick={onEditProfile}></button>
                            </div>
                            <p className="profile__subtitle">{currentUser.about}</p>
                        </div>
                    </div>
                    <button className="profile__add-element" type="button" onClick={onAddPlace}></button>
                </div>  
            </section>
            <section className="elements">
                {
                    cards.map((card) => {
                        return <Card key={card._id} card={card} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete}/>
                    })
                }
            </section>       
        </main>
    )
}

export default Main;