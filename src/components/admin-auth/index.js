import React from 'react';


function Auth(props) {

    const { onSubmit } = props;

    return(
        <div className="main">
                    <div className="auth main__info admin-card__hidden">
                        <h1>Пользователь не авторизован</h1>
                        <h2>ВВедите логин и пароль</h2>
                        <form onSubmit={(e)=> onSubmit(e)}>
                            <label htmlFor={"admin-log"}>
                                Логин
                        <input defaultValue="admin" name={"mail"} id={"admin-log"} />
                            </label>
                            <label htmlFor={"admin-pas"}>
                                Пароль
                        <input defaultValue="admin" name={"pas"} id={"admin-pas"} />
                            </label>
                            <button type={"submit"}>
                                Вход
                        </button>
                        </form>
                    </div>
                </div>
    );
}

export default Auth;