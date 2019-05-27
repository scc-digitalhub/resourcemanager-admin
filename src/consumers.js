import React, { Fragment } from 'react';
import { change } from 'redux-form'
import { Show, List, Edit, Create, 
    SimpleShowLayout, TabbedShowLayout,
    SimpleFormIterator, REDUX_FORM_NAME,
    TabbedForm, SimpleForm, FormDataConsumer,
    Tab, Datagrid,  FormTab, SingleFieldList,
    ShowButton, CreateButton, EditButton,
    TextField, ArrayField, ChipField, ReferenceField,
    DisabledInput, TextInput, ArrayInput,AutocompleteArrayInput, ReferenceInput, SelectInput,
} from 'react-admin';
import Chip from './chip';
import TextArrayField from './textArrayField';
import DvrIcon from '@material-ui/icons/Dvr';

export const ConsumerIcon = DvrIcon;

export const ConsumerList = (props) => (
    <List {...props} bulkActionButtons={false}>
        <Datagrid expand={<ConsumerCard />}>
            <TextField source="id" sortable={false} />
            <TextField source="type" sortable={false} />
            <TextField source="consumer" sortable={false} />
            <TextArrayField source="tags" label="tags" />                        
            <ShowButton basePath="/consumers" />
        </Datagrid>
    </List>
);

const ConsumerTitle = ({ record }) => {
    return <span>Consumer {record ? `"${record.id}"` : ''}</span>;
};


 

export const ConsumerEdit = (props) => (
    <Edit undoable={false} title={<ConsumerTitle />} {...props}>
        <TabbedForm submitOnEnter={false} redirect="show">
            <FormTab label="summary">
                <DisabledInput source="id" />
                <DisabledInput source="type" />
                <DisabledInput source="consumer" />
            </FormTab>
            <FormTab label="properties">
                <ArrayInput source="properties" label="">
                    <SimpleFormIterator>
                        <TextInput source="name" />
                        <TextInput source="value" />
                    </SimpleFormIterator>
                </ArrayInput>     
            </FormTab>
            <FormTab label="tags">
                <Chip source="tags" label=""/>
            </FormTab>          
        </TabbedForm>
    </Edit>
);

export const ConsumerCreate = (props) => (
    <Create title="Create a Consumer" {...props}>
        <SimpleForm submitOnEnter={false} redirect="show">
            <ReferenceInput label="type" source="type" reference="builderTypes" >
                <SelectInput optionText="type" translateChoice={false} />
            </ReferenceInput>
            <FormDataConsumer>
                {({ formData, dispatch, ...rest }) => 
                    formData.type && ( 
                        <ReferenceInput 
                            key={formData.type}
                            label="consumer" source="consumer" reference="builders" filter={{type: formData.type}}
                            {...rest}
                            >
                            <SelectInput optionText="consumer" translateChoice={false} /> 
                        </ReferenceInput>       
                    )
                }
            </FormDataConsumer>
            <FormDataConsumer>
                {({ formData, dispatch, ...rest }) => 
                    formData.type && formData.consumer && ( 
                        <ArrayInput source="properties" label="properties">
                            <SimpleFormIterator>
                                <TextInput source="name" />
                                <TextInput source="value" />
                            </SimpleFormIterator>
                        </ArrayInput>    
                    )
                }
            </FormDataConsumer>


        </SimpleForm>
    </Create>
);

export const ConsumerCard = (props) => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="type" />
            <TextField source="consumer" />
        </SimpleShowLayout>
    </Show>
);

export const ConsumerShow = (props) => (
    <Show {...props}>
        <TabbedShowLayout>
            <Tab label="summary">
                <TextField source="id" />
                <TextField source="type" />
                <TextField source="consumer" />
                <TextField source="status" />
                <TextField source="url" />
            </Tab>  
            <Tab label="properties">
                <ArrayField source="properties" label="">
                    <Datagrid>
                        <TextField source="name" />
                        <TextField source="value" />
                    </Datagrid>
                </ArrayField>
            </Tab>                
            <Tab label="tags">
                <TextArrayField source="tags" label="" />
            </Tab>             
        </TabbedShowLayout>
    </Show>
);

