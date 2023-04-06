import { useState } from 'react';
 
function Login(props){
    
    const [userData, setUserData] = useState({
        email: "",
        password: ""
    });

    function handleChange(e){
        const { name, value } = e.target;

        setUserData({
            ...userData,
            [name]: value,
        });
    }

    function handleSubmit(e){
        e.preventDefault();

        if( !userData.email || !userData.password){
            return;
        }
        props.handleLogin({ email: userData.email, password: userData.password });
    }

    return (
        <section className={`popup_type_login`}> 
            <div className="popup__container_type_login">
                <h2 className="popup__heading popup__heading_type_login popup__heading_confirm">{props.title}</h2>
                <form className="popup__form" name={props.name} onSubmit={handleSubmit} noValidate>
                    <fieldset className="popup__input-container">
                        <input id="email-log-input" type="email" name="email" placeholder='email' value={userData.email ||""} onChange={handleChange} className="popup__item_type_login popup__item_type_name" minLength="8" maxLength="30" required/>
                        <span className="popup__input-error email-log-input-error"></span> 
                        <input id="password-log-input" type="password" name="password" placeholder='Пароль' value={userData.password ||""} onChange={handleChange} className="popup__item_type_login popup__item_type_job" minLength="8" maxLength="30" required/>
                        <span className="popup__input-error popup__input-error_type_scnd-message password-log-input-error"></span>
                    </fieldset>
                    <fieldset className="popup__handlers">
                        <input type="submit" id="confirmLogin" value={props.submitValue} className="popup__button_type_login" />
                    </fieldset>    
                </form>                
                
            </div>
        </section>

    )
}

export default Login;