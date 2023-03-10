import React, { memo } from 'react'
import {
    ButtonLandingStyle,
    FormLandingStyle,
    InputLandingStyle,
    LabelLandingStyle
} from '../components/style/generalStyle'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { UPDATE } from '../redux/features/user_data/userSlice'
import { searchUser } from '../api'
import { toast } from 'react-hot-toast'
interface IregisterData {
    user: string;
}

const Landing = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {
        register,
        handleSubmit,
    } = useForm()

    // Function to search a user, redirect to dashboard, and update the store
    const setUser = async (data: IregisterData) => {
        const res = await searchUser(data.user)
        if (res) {
            dispatch(UPDATE(res))
            navigate(`/${res.login}`)
        } else {
            toast.error("User not found")
        }
    }

    return (
        <FormLandingStyle onSubmit={handleSubmit(data => {
            setUser(data as IregisterData)
        })}>
            <LabelLandingStyle>
                Search a GitHub user:
                <InputLandingStyle
                    type="text"
                    placeholder="Enter a GitHub user..."
                    {...register('user', { required: true })}
                />
                <ButtonLandingStyle type="submit">Submit</ButtonLandingStyle>
            </LabelLandingStyle>
        </FormLandingStyle>
    )
}

export default memo(Landing)