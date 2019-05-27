import React from 'react';
import { Field } from 'redux-form';
import ChipInput from 'material-ui-chip-input';

const renderChipInput = ({ input, meta: { touched, error } }) => (
        <ChipInput {...input}
                   value = { input.value || []}
                   onAdd={(addedChip) => {
                       let values = input.value || [];
                       values = values.slice();
                       values.push(addedChip);
                       input.onChange(values);
                   }}
                   onDelete={(deletedChip) => {
                       let values = input.value || [];
                       values = values.filter(v => v !== deletedChip);
                       input.onChange(values);
                   }}
                   onBlur={() => input.onBlur()}
        />
);
const Chip = () => <Field name="tags" component={renderChipInput} />
export default Chip;