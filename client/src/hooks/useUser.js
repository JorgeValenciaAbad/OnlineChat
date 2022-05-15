
import { useContext, useCallback } from 'react'
import Context from '../context/UserContext'
import loginService from '../service/login'

export default function useUser() {
    const { jwt, setJWT } = useContext(Context);

    const login = useCallback(({ names, passwd }) => {

        loginService({ names, passwd }).then(token => {

            console.log(token)
            setJWT(token)

        }).catch(err =>

            console.error(err)

        )
    }, [setJWT]);

    const logout = useCallback(() => {

        setJWT(null)

    }, [setJWT]);

    return {

        isLogged: Boolean(jwt),
        login,
        logout

    }
}