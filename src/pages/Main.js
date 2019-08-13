import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import './Main.css';
import api from '../services/api';
import logo from '../assets/logo.svg';
import like from '../assets/like.svg';
import dislike from '../assets/dislike.svg';

export default function Main({match}) {  //propriedade q tem os parametros da rota
    const [users, setUsers] = useState([]); //nunca mexer no users, sempre sobrescrecer no setUsers

    useEffect(() => {      //função q vai trazer todos os usuarios da api
        async function loadUsers() {
            const response = await api.get('/devs', {
                headers: {
                    user: match.params.id,
                }
            });
            setUsers(response.data);
        }

        loadUsers(); //função criada pra usar o async pra n usar dentro do () antes da =>
    }, [match.params.id]); //a partir do id de quem ta logado

    async function handleLike(id) {
        await api.post(`devs/${id}/likes`, null, {   //1 parametro é a url, o 2 é o body da requisao e o 3 é o header
            headers: {user: match.params.id},
        });

        setUsers(users.filter(user => user._id !== id)); //filtar o array pra retirar o cara sem recarregar a pagina

    }

    async function handleDislike(id) {
        await api.post(`devs/${id}/dislikes`, null, {   //1 parametro é a url, o 2 é o body da requisao e o 3 é o header
            headers: {user: match.params.id},
        });

        setUsers(users.filter(user => user._id !== id)); //filtar o array pra retirar o cara sem recarregar a pagina
    }

    return (
        <div className="main-container">
            <Link to="/">
                <img src={logo} alt="Tindev"/>
            </Link>
            {users.length > 0 ? (   //if ternario
                <ul>
                    {users.map(user => (   //map é uma função q percorre o array
                        <li key={user._id}>
                            <img src={user.avatar} alt={user.avatar}/>
                            <footer>
                                <strong>{user.name}</strong>
                                <p>{user.bio}</p>
                            </footer>

                            <div className="buttons">
                                <button type="button" onClick={() => handleDislike(user._id)}>
                                    <img src={dislike} alt="Dislike"/>
                                </button>
                                <button type="button" onClick={() => handleLike(user._id)}>
                                    <img src={like} alt="Like"/>
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="empty">Acabou :(</div>
            )}
        </div>
    );
}