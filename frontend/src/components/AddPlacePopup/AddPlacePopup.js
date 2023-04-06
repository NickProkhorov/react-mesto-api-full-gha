import { useState} from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

function AddPlacePopup({isOpen, onClose, onSubmit, submitValue}){
    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    function handleChangeName(e){
        setName(e.target.value);
    }
    function handleChangeLink(e){
        setLink(e.target.value);
    }
    function handleSubmit(e) {
        e.preventDefault();
        const newCard = {name: name, link: link};
        onSubmit(newCard);
    }

    return(
        <PopupWithForm 
            title="Новое место" 
            name="addcard" 
            isOpen={isOpen} 
            submitValue={submitValue}
            onClose={onClose}
            onSubmit={handleSubmit}> 
                    <fieldset className="popup__input-container">
                        <input id="place-input" type="text" name ="name" placeholder="Название" value={name||''} onChange={handleChangeName} className="popup__item popup__item_type_place-name" minLength="2" maxLength="30" required/>
                        <span className="popup__input-error place-input-error"></span>
                        <input id="url-input" type="url" name="link" placeholder="Ссылка на картинку" value={link||''} onChange={handleChangeLink} className="popup__item popup__item_type_place-link" required/>
                        <span className="popup__input-error popup__input-error_type_scnd-message url-input-error"></span>
                    </fieldset>
        </PopupWithForm>
    )
}

export default AddPlacePopup