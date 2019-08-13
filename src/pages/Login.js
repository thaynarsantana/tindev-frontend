import React, {useState} from 'react';
import logo from '../assets/logo.svg';
import './Login.css';
import api from '../services/api';

export default function Login({history}) {
    const [username, setUsername] = useState(''); //pra pegar o nome do usuario e setar tbm

    //evento que vai acontecer quando clicar em enviar
    async function handleSubmit(e) {
        e.preventDefault();

        //cadastar o usuario novo/entrar
        const response = await api.post('/devs', {
            username,
        });

        //pegar o id dele  
        const {_id} = response.data;

        history.push(`/dev/${_id}`); //history serve pra criar as rotas
    }

    //o que aparece na tela
    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <img src={logo} alt="Tindev"/>
                <input
                    placeholder="Digite seu usuário do Github"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <button type="submit">Enviar</button>
            </form>
        </div>
    )
}