import { useState } from 'react';
import { Link } from 'react-router-dom';


function Register(props){

        const [userData, setUserData] = useState({
        username: "",
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
        props.handleRegister({email: userData.email, password: userData.password});
    }

    return (
        <section className={`popup_type_login`}> 
            <div className="popup__container_type_login">
                <h2 className="popup__heading popup__heading_type_login popup__heading_confirm">{props.title}</h2>
                <form className="popup__form" name={props.name} onSubmit={handleSubmit} noValidate>
                    <fieldset className="popup__input-container">
                        <input id="email-reg-input" type="email" name="email" placeholder='email' value={userData.email ||""} onChange={handleChange} className="popup__item_type_login popup__item_type_name" minLength="8" maxLength="30" required/>
                        <span className="popup__input-error email-reg-input-error"></span> 
                        <input id="password-reg-input" type="password" name="password" placeholder='Пароль' value={userData.password ||""} onChange={handleChange} className="popup__item_type_login popup__item_type_job" minLength="8" maxLength="30" required/>
                        <span className="popup__input-error popup__input-error_type_scnd-message password-reg-input-error"></span>
                    </fieldset>
                    <fieldset className="popup__handlers">
                        <input type="submit" id="confirmRigster" value={props.submitValue} className="popup__button_type_login"/>
                    </fieldset>
                    <div className='popup__question'>
                        <p className='popup__question-register'>Уже зарегистрированы?</p>
                        <Link to="/signin" className='popup__to-login'>Войти</Link>
                    </div>    
                </form>
            </div>
        </section>

    )
}

export default Register;