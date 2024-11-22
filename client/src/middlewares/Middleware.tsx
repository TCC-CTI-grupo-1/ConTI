import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

class Middleware{

    routeToDisplay (
        middlewares: string[] = [],
        routeToVisit: JSX.Element,
    ): ReactNode
    {
        const mware: Record<string, (routeToVisit: JSX.Element) => 
            {status: boolean, component: JSX.Element}> = {
            isLoggedIn: (routeToVisit: JSX.Element) => this.isLoggedIn(routeToVisit),
            adminAccess: (routeToVisit: JSX.Element) => this.adminAccess(routeToVisit),
        }

        let ret: {
            status: boolean,
            component: JSX.Element
        } | null = null
        try{
            for (let i = 0; i < middlewares.length; i++) {
                ret = mware[middlewares[i]](routeToVisit);
                if(ret.status === false){
                    break
                }
            }
            if(ret === null){
                return <Navigate to='/login' />
            }
            return ret.component
        } catch(e){
            console.log(e);
            return <Navigate to='/login' />
        }
    } 

    isLoggedIn(component: JSX.Element){
        //localStorage.getItem('isLoggedIn') === 'false'
        if (localStorage.getItem('isLoggedIn') === 'false') {
            return this._getRouteReturn(false, <Navigate to='/login' />);
        }
        return this._getRouteReturn(true, component);
    }

    adminAccess(component: JSX.Element){
        if (false) {
            return this._getRouteReturn(false, <Navigate to='/login' />);
        }
        return this._getRouteReturn(true, component);
    }

    _getRouteReturn(status: boolean, component: JSX.Element){
        return {status: status, component: component}
    }
}

export default Middleware;