import {useEffect, useState, useContext} from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

function EditProfilePopup(props) {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const currentUser = useContext(CurrentUserContext);
    
    useEffect(() => {
        setName(currentUser.name); 
        setDescription(currentUser.about); 
      }, [currentUser, props.isOpen]);

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({name, about: description});
    } 

    return (
        <PopupWithForm 
            title="Редактировать профиль" 
            name="edit-account" 
            isOpen={props.isOpen} 
            submitValue={props.submitValue}
            onClose={props.onClose} 
            onSubmit={handleSubmit}
            >
                <fieldset className="popup__input-container">
                    <input id="name-input" type="text" name="name" placeholder='имя' value={name||''} onChange={handleChangeName} className="popup__item popup__item_type_name" minLength="2" maxLength="40" required/>
                    <span className="popup__input-error name-input-error"></span>
                    <input id="job-input" type="text" name="about" placeholder='описание' value={description||''} onChange={handleChangeDescription} className="popup__item popup__item_type_job" minLength="2" maxLength="200" required/>
                    <span className="popup__input-error popup__input-error_type_scnd-message job-input-error"></span>
                </fieldset>
        </PopupWithForm>
    ) 
}

export default EditProfilePopup;