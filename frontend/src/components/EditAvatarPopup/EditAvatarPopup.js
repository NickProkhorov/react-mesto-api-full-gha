import { useRef } from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar, submitValue}){
    const avatar = useRef();
    
    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({ avatar: avatar.current.value, });
    }
    
    return (

        <PopupWithForm  
            title="Обновить аватар" 
            name="avatar" 
            isOpen={isOpen} 
            submitValue={submitValue} 
            onClose={onClose}
            onSubmit={handleSubmit} >
                <fieldset className="popup__input-container">
                    <input id="url-ava-input" type="url" name="avatar" ref={avatar} placeholder="Ссылка на картинку" className="popup__item popup__item_type_place-link" required/>
                    <span className="popup__input-error url-ava-input-error"></span>
                </fieldset>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;

