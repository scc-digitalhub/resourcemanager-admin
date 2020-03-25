import React from 'react';
import { Admin, Resource} from 'react-admin';

import dataProvider from './dataProvider';
import authProvider from './authProvider';
import customRoutes from './customRoutes';

import { ResourceList, ResourceEdit, ResourceCreate, ResourceShow, ResourceIcon} from './resources';
import { ConsumerList, ConsumerEdit, ConsumerCreate, ConsumerShow, ConsumerIcon} from './consumers';

import MyLoginPage from './LoginPage.js'

import englishMessages from 'ra-language-english';
import italianMessages from 'ra-language-italian';

const messages = {
    'en': englishMessages,
    'it': italianMessages
};
const i18nProvider = locale => {
return	messages[locale];
}

const hasPermission = (permissions, perm) => {
	return permissions.includes(perm);
}

//const apiUri = process.env.REACT_APP_API_URL;
const apiUri = '/api';

const App = () => (
    <Admin locale="en" 
    authProvider={authProvider} 
    loginPage={MyLoginPage} 
    i18nProvider={i18nProvider} 
    dataProvider={dataProvider(apiUri)}
    customRoutes={customRoutes}
    >
        {permissions => [
   	        <Resource name="resources" icon={ResourceIcon}
   	        	list={ResourceList} //always show resourcelist to all users if authenticated
   	        	edit={hasPermission(permissions, 'UPDATE_RESOURCE') ? ResourceEdit : null} 
   	        	create={hasPermission(permissions, 'CREATE_RESOURCE') ? ResourceCreate : null} 
   	        	show={ResourceShow}  />,
   	        <Resource name="consumers" icon={ConsumerIcon}
   	        	list={hasPermission(permissions, 'VIEW_CONSUMER') ? ConsumerList : null} 
   	        	edit={hasPermission(permissions, 'UPDATE_CONSUMER') ? ConsumerEdit : null} 
   	        	create={hasPermission(permissions, 'CREATE_CONSUMER') ? ConsumerCreate : null} 
   	        	show={ConsumerShow}  />,
	        <Resource name="providers" />,
	        <Resource name="providerTypes" />,
	        <Resource name="builders" />,
	        <Resource name="builderTypes" />,

	    ]}
        
     

    </Admin>
);

 
export default App;