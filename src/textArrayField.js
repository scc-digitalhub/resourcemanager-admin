import React from 'react';
import { Field } from 'redux-form';
import Chip from '@material-ui/core/Chip';

const TextArrayField = ({ record, source }) => (
    <>
        {record[source].map(item => <Chip label={item} key={item} />)}
    </>
)
TextArrayField.defaultProps = { addLabel: true };

export default TextArrayField;