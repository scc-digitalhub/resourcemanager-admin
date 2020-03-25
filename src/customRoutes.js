import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import queryString from 'query-string';

// const checkAuth = (props) => {
// 			console.log("checkAuth props");
// 			console.log(props);
// 	        let params = queryString.parse(props.location.search);
// 	        if (typeof params.token !== 'undefined') {
// 	        	//store in localstorage
// 	        	localStorage.setItem("token", params.token);

// 	        	console.log('checkAuth return true');
// 	        	return true;

// 	        	// let token = localStorage.getItem('token');
//           //       //fetch roles with token
//           //       const request = new Request('/api/auth/user', {
//           //           method: 'GET',
//           //           headers: new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+token }),
//           //       })
                
//           //       console.log('call user');
                
//           //       return await fetch(request)
//           //       .then(response => {
//           //           if (response.status < 200 || response.status >= 300) {
//           //               throw new Error(response.statusText);
//           //           }
//           //           return response.json();
//           //       })
//           //       .then(data => {
//           //           if(data.hasOwnProperty('roles')) {
//           //               localStorage.setItem('roles', data.roles);
//           //           }
//           //           if(data.hasOwnProperty('permissions')) {
//           //               localStorage.setItem('permissions', data.permissions);
//           //           }      
//           //           console.log('parsed user');
//           //           return true;
//           //       });  


// 	        } else {
// 	        	console.log('checkAuth return false');
// 	        	return false;
// 	        }
// }

export class AuthCallbackRoute extends Route {
    render() {
    	console.log("authcallback");
    	console.log(this.props);

        let params = queryString.parse(this.props.location.search);
        if (typeof params.token !== 'undefined') {
        	//store in localstorage
            localStorage.setItem("token", params.token);
            
            //parse space
            var space = 'default';
            if (typeof params.space !== 'undefined') {
                space = params.space;
            }
            localStorage.setItem("space", space);

        	console.log('checkAuth success');
        	

            //fetch
            let token = params.token;
            //fetch roles with token
            const request = new Request('/api/auth/user', {
                method: 'GET',
                headers: new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+token , 'X-Space': space}),
            })
            var permissions =  fetch(request)
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(data => {
                if(data.hasOwnProperty('roles')) {
                    localStorage.setItem('roles', JSON.stringify(data.roles));
                }
                if(data.hasOwnProperty('permissions')) {
                    localStorage.setItem('permissions',  JSON.stringify(data.permissions));
                }

                console.log('permissions from fetch');
                console.log(data.permissions);
				//force reload to solve admin permission cache
        		console.log("reload");
                window.location.replace('/');

            });  

        	// return <Redirect to="/"/>
        	//force reload to solve admin permission cache
        	// window.location.replace('/');
        	console.log("reload");
        	return null;
        } else {
        	return <Redirect to="/login"/>
        }

        // window.location.replace("/");
    }
}

export class ReloadRoute extends Route {
    render() {    	
        	//force reload to solve admin permission cache
        	window.location.replace('/');
        	return null;    
    }
}


export default [
	<Route exact path="/reload" noLayout component={ReloadRoute} />,
	<Route exact path="/callback" noLayout component={AuthCallbackRoute} />
];
