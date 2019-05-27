import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR,  AUTH_CHECK, AUTH_GET_PERMISSIONS} from 'react-admin';

export default (type, params) => {
    // console.log("call authProvider for "+type);
    // console.log(params);

    if (type === AUTH_LOGIN) {
        //no direct login
    }
    if (type === AUTH_LOGOUT) {
        localStorage.removeItem('token');
        localStorage.removeItem('roles');
        localStorage.removeItem('permissions');
        return Promise.resolve();
    }
    if (type === AUTH_ERROR) {
        const status  = params.status;

        // if (status === 401 || status === 403) {
        if(localStorage.getItem('token')) {
            localStorage.removeItem('token');
            return Promise.reject();
        }
        return Promise.resolve();
    }    
    if (type === AUTH_CHECK) {
        // if(localStorage.getItem('token')) {
        //     if(localStorage.getItem('roles')) {
        //         return Promise.resolve();
        //     } else {
        //         // let token = localStorage.getItem('token');
        //         // //fetch roles with token
        //         // const request = new Request('/api/auth/user', {
        //         //     method: 'GET',
        //         //     headers: new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+token }),
        //         // })
        //         // return fetch(request)
        //         // .then(response => {
        //         //     if (response.status < 200 || response.status >= 300) {
        //         //         throw new Error(response.statusText);
        //         //     }
        //         //     return response.json();
        //         // })
        //         // .then(data => {
        //         //     if(data.hasOwnProperty('roles')) {
        //         //         localStorage.setItem('roles', data.roles);
        //         //     }
        //         //     if(data.hasOwnProperty('permissions')) {
        //         //         localStorage.setItem('permissions', data.permissions);
        //         //     }                    
        //         // });     
        //         return Promise.reject(); 
        //     }
        // } else {
        //     return Promise.reject();
        // }

        return localStorage.getItem('token') ? Promise.resolve() : Promise.reject();
    
    }

    if (type === AUTH_GET_PERMISSIONS) {
        var permissions = [];
        if(localStorage.getItem('permissions')) {
            permissions = JSON.parse(localStorage.getItem('permissions'));
        }

        return Promise.resolve(permissions);


        // if (localStorage.getItem('token')) {
        //     //check roles
        //     if(localStorage.getItem('permissions')) {
        //         console.log('permissions from localstorage');
        //         var permissions = JSON.parse(localStorage.getItem('permissions'));
        //         console.log(permissions);
        //         return Promise.resolve(permissions);
        //     } else {    
        //         //fetch
        //         let token = localStorage.getItem('token');
        //         //fetch roles with token
        //         const request = new Request('/api/auth/user', {
        //             method: 'GET',
        //             headers: new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+token }),
        //         })
        //         return fetch(request)
        //         .then(response => {
        //             if (response.status < 200 || response.status >= 300) {
        //                 throw new Error(response.statusText);
        //             }
        //             return response.json();
        //         })
        //         .then(data => {
        //             if(data.hasOwnProperty('roles')) {
        //                 localStorage.setItem('roles', JSON.stringify(data.roles));
        //             }
        //             if(data.hasOwnProperty('permissions')) {
        //                 localStorage.setItem('permissions',  JSON.stringify(data.permissions));
        //             }

        //             console.log('permissions from fetch');
        //             console.log(data.permissions);
        //             return Promise.resolve(permissions);              
        //         });  
        //     }
                
        // } else {
        //     console.log("permissions without token");
        //     return Promise.resolve([]);
        // }

        // const roles = localStorage.getItem('roles');
        // console.log(roles);
        // console.log(JSON.parse(roles));
        // return roles ? Promise.resolve(JSON.parse(roles)) : Promise.resolve([]);
    }

    return Promise.resolve();
};