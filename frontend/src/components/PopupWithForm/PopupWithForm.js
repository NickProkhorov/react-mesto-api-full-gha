function PopupWithForm(props) {
       
    return (
     
        <section className={`popup popup_type_${props.name} ${ props.isOpen ? 'popup_opened':''}`}> 
            <div className="popup__container">
                <h2 className="popup__heading popup__heading_confirm">{props.title}</h2>
                <form className="popup__form" name={props.name} onSubmit={props.onSubmit} noValidate>
                        {props.children}
                    <fieldset className="popup__handlers">
                        <input type="submit" id={`confirm${props.name}`} value={props.submitValue} className="popup__button popup__button_type_confirm"/>
                    </fieldset>    
                </form>
                <button className="popup__closed" type="button" onClick={props.onClose}></button> 
            </div>
        </section>
    ) 
}

export default PopupWithForm;