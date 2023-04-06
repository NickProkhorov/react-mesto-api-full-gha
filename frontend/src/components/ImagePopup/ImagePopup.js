function ImagePopup({card, onClose}){
    return(
        <section className={`popup popup_type_image ${ card ? 'popup_opened' : ''}`}>
            <div className="popup__container popup__container_type_image">
            <img className="popup__image" src={card && card.link} alt={card && card.name}/>
            <p className="popup__image-title">{card && card.name}</p>
            <button className="popup__closed popup__closed_type_image" type="button" onClick={onClose}></button>  
            </div>
        </section>
    )        
}

export default ImagePopup;