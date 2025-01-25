import React, { FC, ReactNode } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker as MuiDateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';

interface IDateTimePickerProps {
    name: string;
    value: Date,
    onChange: (value: dayjs.Dayjs | null) => void
    disabled?: boolean
    error?: boolean
    helperText?: ReactNode
    label: string
}

export const DateTimePicker: FC<IDateTimePickerProps> = ({ name, onChange, value, disabled, error, helperText, label }) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MuiDateTimePicker
                name={name}
                label={label}
                value={dayjs(value)}
                onChange={onChange}
                disabled={disabled}
                slotProps={{
                    textField: {
                        error: error,
                        helperText: helperText
                    }
                }} />
        </LocalizationProvider>
    );
}