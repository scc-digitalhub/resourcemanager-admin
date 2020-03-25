import React, { Fragment } from 'react';
import { Show, List, Edit, Create, 
    SimpleShowLayout, TabbedShowLayout,
    SimpleFormIterator, 
    TabbedForm, SimpleForm, FormDataConsumer,
    Tab, Datagrid,  FormTab, SingleFieldList,
    ShowButton, CreateButton, EditButton,
    TextField, ArrayField, ChipField, BooleanField,
    DisabledInput, TextInput, ArrayInput,AutocompleteArrayInput, ReferenceInput, SelectInput, BooleanInput
} from 'react-admin';
import Chip from './chip';
import TextArrayField from './textArrayField';
import BallotIcon from '@material-ui/icons/Ballot';

export const ResourceIcon = BallotIcon;

export const ResourceList = (props) => (
    <List {...props} bulkActionButtons={false}>
        <Datagrid expand={<ResourceCard />}>
            <TextField source="id" sortable={false} />
            <TextField source="type" sortable={false} />
            <TextField source="provider" sortable={false}/>
            <TextField source="name" sortable={false}/>
            <BooleanField source="managed" sortable={false} />
            <TextArrayField source="tags" label="tags" />            
            <ShowButton />
        </Datagrid>
    </List>
);

const ResourceTitle = ({ record }) => {
    return <span>Resource {record ? `"${record.id}"` : ''}</span>;
};

export const ResourceEdit = (props) => (
    <Edit undoable={false} title={<ResourceTitle />} {...props}>
        <TabbedForm submitOnEnter={false} redirect="show">
            <FormTab label="summary">
                <DisabledInput source="id" />
                <DisabledInput source="type" />
                <DisabledInput source="provider" />
                <DisabledInput source="name" />
            </FormTab>
            <FormTab label="properties">
                <BooleanInput source="managed" />
                <BooleanInput source="subscribed" />
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

export const ResourceCreate = (props) => (
    <Create title="Create a Resource" {...props}>
        <SimpleForm>
            <ReferenceInput label="type" source="type" reference="providerTypes" >
                <SelectInput optionText="type"  translateChoice={false} />
            </ReferenceInput>
            <FormDataConsumer>
                {({ formData, dispatch, ...rest }) => 
                    formData.type && ( 
                        <ReferenceInput 
                            key={formData.type}
                            label="provider" source="provider" reference="providers" filter={{type: formData.type}}
                            {...rest}
                            >
                            <SelectInput optionText="provider" translateChoice={false} /> 
                        </ReferenceInput>       
                    )
                }
            </FormDataConsumer>
             
            <FormDataConsumer>
                {({ formData, dispatch, ...rest }) => 
                    formData.type && formData.provider && (   
                    <Fragment>                     
                        <ArrayInput source="properties" label="properties" {...rest}>
                            <SimpleFormIterator>
                                <TextInput source="name" />
                                <TextInput source="value" />
                            </SimpleFormIterator>
                        </ArrayInput>    
                        <BooleanInput source="managed" defaultValue={true} {...rest} />
                    </Fragment>
                    )
                }
            </FormDataConsumer>    
            <FormDataConsumer>
                {({ formData, dispatch, ...rest }) => 
                    formData.type && formData.provider && !formData.managed && (   
                        <TextInput source="uri" {...rest} />
                    )
                }
            </FormDataConsumer>                                
        </SimpleForm>
    </Create>
);

export const ResourceCard = (props) => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="type" />
            <TextField source="provider" />
            <TextField source="uri" />           
        </SimpleShowLayout>
    </Show>
);

export const ResourceShow = (props) => (
    <Show {...props}>
        <TabbedShowLayout>
            <Tab label="summary">
                <TextField source="id" />
                <TextField source="type" />
                <TextField source="provider" />
                <TextField source="uri" />

            </Tab>  
            <Tab label="status">
                <BooleanField source="managed" /> 
                <BooleanField source="subscribed" />
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

