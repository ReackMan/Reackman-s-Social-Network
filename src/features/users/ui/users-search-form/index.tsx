import { useSelector } from 'react-redux'
import { Formik, Form, Field, FormikHelpers, useFormik } from 'formik'

import { FilterType } from 'features/users/api/users.api.types'
import { getUsersFilter } from 'features/users/model/users.selectors'
import styles from './users-search-form.module.scss'
import { Button } from 'common/components/button'
import { FormControl, FormControlLabel, InputLabel, MenuItem, Select, TextField } from '@mui/material'

type Props = {
    onChangeUsersFilter: (filter: FilterType) => void
}


export const UsersSearchForm = ({ onChangeUsersFilter }: Props) => {
    const filter = useSelector(getUsersFilter)

    const submit = (values: FormType, { setSubmitting }: FormikHelpers<FormType>) => {
        const filter: FilterType = {
            name: values.name,
            friend: values.friend === 'null' ? null : values.friend !== 'false'
        }
        onChangeUsersFilter(filter)
        setSubmitting(false)
    }

    const formik = useFormik({
        initialValues: {
            name: '',
            friend: 'null'
        },
        onSubmit: (values: FormType, { setSubmitting }: FormikHelpers<FormType>) => {
            const filter: FilterType = {
                name: values.name,
                friend: values.friend === 'null' ? null : values.friend !== 'false'
            }
            onChangeUsersFilter(filter)
            setSubmitting(false)
        }
    })

    const customTextField = ({
                                 field,
                                 ...props
                             }: any) => {
        return (
            <>
                <TextField
                    label={field.name.charAt(0).toUpperCase() + field.name.slice(1)}
                    {...field}
                    sx={{
                        '& label': {
                            color: 'white'
                        },
                        '& label.Mui-focused': {
                            color: 'var(--color-primary)'
                        },
                        '& .MuiInput-underline:after': {
                            borderBottomColor: 'var(--color-primary)'
                        },
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: 'white'
                            },
                            '&:hover fieldset': {
                                borderColor: 'var(--color-primary)'
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: 'var(--color-primary)'
                            }
                        }
                    }}
                />
            </>
        )
    }
    const customSelect = ({
                              field,
                              ...props
                          }: any) => {
        return (
            <>
                <FormControl>
                    <InputLabel sx={{
                        color: 'white',
                        '&.Mui-focused': {
                            color: 'white'
                        }
                    }}
                    >
                        Users
                    </InputLabel>
                    <Select
                        label="Users"
                        defaultValue="true"
                        {...field}
                        sx={{
                            color: 'white',
                            '.MuiOutlinedInput-notchedOutline': {
                                borderColor: 'white'
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'var(--color-primary)'
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'var(--color-primary)'
                            },
                            '.MuiSvgIcon-root ': {
                                fill: 'white !important'
                            }
                        }}

                    >
                        <MenuItem value="null">All</MenuItem>
                        <MenuItem value="true">Only followed</MenuItem>
                        <MenuItem value="false">Only unfollowed</MenuItem>
                    </Select>
                </FormControl>
            </>
        )
    }

    return (
        <Formik
            initialValues={{
                name: filter.name as string,
                friend: String(filter.friend) as FriendFormType
            }}
            onSubmit={submit}
        >
            {({ isSubmitting }) => (
                <Form className={styles.form}>
                    <Field type="text"
                           name="name"
                           component={customTextField}
                           className={styles.input}
                    />
                    <Field name="friend"
                           component={customSelect}
                           className={styles.input}
                    />
                    <Button type="submit" title="Submit" disabled={isSubmitting} />
                </Form>
            )}
        </Formik>
    )
}

type FriendFormType = 'true' | 'false' | 'null'
type FormType = {
    name: string
    friend: FriendFormType
}
