import '../../index.css';
import * as auth from '../../auth';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import EditProfilePopup from '../EditProfilePopup/EditProfilePopup';
import EditAvatarPopup from '../EditAvatarPopup/EditAvatarPopup';
import AddPlacePopup from '../AddPlacePopup/AddPlacePopup';
import ImagePopup from '../ImagePopup/ImagePopup';
import Login from '../Login/Login';
import Register from '../Register/Register';
import InfoToolTip from '../InfoTooltip/InfoTooltip';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import { useEffect, useState } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { api } from '../../utils/API';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [tooltipMessage, setTooltipMessage] = useState('');
  const [authResult, setAuthResult] = useState();
  
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isUploadFormBtn, setIsUploadFormBtn] = useState('Сохранить');
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

  const [ userCheckData, setUserCheckData ] = useState({userId:"", email:""});
  const navigate = useNavigate();
  
  useEffect(() => {
    if (loggedIn){
      api
        .getAllPageData()
          .then((res) => {
            const [ profileData, allCards ] = res;
            setCurrentUser(profileData);
            setCards(allCards);
        })
        .catch((error) => {
          console.log(`Ошибка при загрузке исходных данных: ${error}`);
        })
    }
        
  }, [loggedIn]);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if(jwt){
      auth.checkToken(jwt) 
      .then((res)=>{ 
        setUserCheckData({ 
          userId: res._id,
          email: res.email
        });
        setLoggedIn(true);  
        navigate("/"); 
      })
      .catch((error)=>{
        console.log(error);
      })
    }
  }, [navigate]);

  function tokenCheck(){
    const jwt = localStorage.getItem('jwt');
    if(jwt){
      auth.checkToken(jwt) 
      .then((res)=>{ 
        setUserCheckData({ 
          userId: res._id,
          email: res.email
        });
        setLoggedIn(true);  
        navigate("/"); 
      })
      .catch((error)=>{
        console.log(error);
      })
    }
  }
  
  function handleLogin(userData) { 
    return auth.authorize(userData)
        .then((res) => {
            if (res.token) {
                localStorage.setItem('jwt', res.token); 
                tokenCheck();
            }
        })
        .catch((error) => {
          setIsInfoTooltipOpen(true);
          setAuthResult(false);
          setTooltipMessage(`Что-то пошло не так: ${error}`);
          console.log(`Ошибка при авторизации: ${error}`);
        })
  }

  function handleRegister(userData){
    return auth.register(userData)
      .then(()=>{
        setIsInfoTooltipOpen(true);
        setAuthResult(true);
        setTooltipMessage('Вы успешно зарегистрировались!');
      })
      .then(()=> {
        navigate('/signin');
      })
      .catch((error)=>{
        setIsInfoTooltipOpen(true);
        setTooltipMessage(error);
        console.log(error);
      })
  }

  function signOut(){
    localStorage.removeItem('jwt');
    navigate('/signin');
    setLoggedIn(false);
  }

  function handleEditProfileClick(){
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick(){
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick(){
    setIsEditAvatarPopupOpen(true);
  }

  function closeAllPopups(){
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard(null);
  }

  function handleCardLike(card){
    const isLiked = card.likes.some(i => i._id === currentUser._id); 
        
    api.changeLikeCardStatus(card._id, !isLiked)
    .then((newCard) => { setCards((state) => state.map((c) => c._id === card._id ? newCard : c)); 
    })
    .catch((error) => {
      console.log(`Ошибка при загрузке исходных данных: ${error}`);
    })
  }

  function handleCardDelete(card){
     api.deleteCard(card._id)
    .then(() => { 
      setCards((cards) => cards.filter((c) => c._id !== card._id ));
    })
    .catch((error) => {
      console.log(`Ошибка при загрузке исходных данных: ${error}`);
    })
  }

  function handleUpdateUser(data){
    setIsUploadFormBtn('Сохранение...');
    api.setUserInfo(data)
    .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
    })
    .catch((error) => {
      console.log(`Ошибка при загрузке исходных данных: ${error}`);
    })
    .finally(()=>{
      setIsUploadFormBtn('Сохранить');
    }) 
  }

  function handleUpdateAvatar(data){
    setIsUploadFormBtn('Сохранение...');
    api.setUserAvatar(data)
    .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
    })
    .catch((error) => {
      console.log(`Ошибка при загрузке исходных данных: ${error}`);
    })
    .finally(()=>{
      setIsUploadFormBtn('Сохранить');
    })  
  }

  function handleAddPlaceSubmit(newCard){
    setIsUploadFormBtn('Сохранение...');
    api.addNewCard(newCard)
    .then((res) => {
      setCards([res,...cards]);
      closeAllPopups();
    })
    .catch((error) => {
      console.log(`Ошибка при загрузке исходных данных: ${error}`);
    })
    .finally(()=>{
      setIsUploadFormBtn('Сохранить');
    })
  }
  
  return (
        <div>
          <CurrentUserContext.Provider value={currentUser}>
            <Header loggedIn={loggedIn} userCheckData={userCheckData} signOut={signOut}/>
            <Routes>
              <Route path="/signin" element ={<Login title="Вход" name="login" submitValue="Войти" handleLogin={handleLogin} />}/>
              <Route path="/signup" element ={<Register title="Регистрация" name="register" submitValue="Зарегистрироваться" handleRegister={handleRegister}/>}/>
              <Route path="/" element={
                <ProtectedRoute
                  element={Main}
                  loggedIn={loggedIn} 
                  cards={cards}
                  setCards={setCards} 
                  onEditProfile={handleEditProfileClick} 
                  onAddPlace={handleAddPlaceClick} 
                  onEditAvatar={handleEditAvatarClick} 
                  onCardClick={setSelectedCard} 
                  onCardLike={handleCardLike} 
                  onCardDelete={handleCardDelete} />
                } 
              />
               <Route path="*" element ={loggedIn ? <Navigate to="/" /> : <Navigate to="/signup" />}/>        
            </Routes>
            <PopupWithForm  title="Вы уверены?" name="confirmation" isOpen={false} submitValue="Да"/>
            <EditAvatarPopup 
              isOpen={isEditAvatarPopupOpen} 
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
              submitValue={isUploadFormBtn}
            />
            <EditProfilePopup 
              isOpen={isEditProfilePopupOpen} 
              onClose={closeAllPopups} 
              onUpdateUser={handleUpdateUser}
              submitValue={isUploadFormBtn}
            />
            <AddPlacePopup 
              isOpen={isAddPlacePopupOpen} 
              onClose={closeAllPopups} 
              onSubmit={handleAddPlaceSubmit}
              submitValue={isUploadFormBtn}
            />
            <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
            <InfoToolTip
              name="tooltip"
              loggedIn={loggedIn}
              isOpen={isInfoTooltipOpen} 
              message={tooltipMessage}
              onClose={closeAllPopups}
              authResult={authResult}
              
            />
            { loggedIn ? <Footer /> : ''}
          </CurrentUserContext.Provider> 
        </div>
  );
}

export default App;