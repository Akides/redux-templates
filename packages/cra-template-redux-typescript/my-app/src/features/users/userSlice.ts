import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "../../app/store";
import axios, { AxiosError } from "axios";

interface User {
    id: number
    name: string
    username: string
    email: string
    website: string
}

interface UserState {
    users: User[]
    isLoading: boolean
    error: string | null
}

const initialState: UserState = {
    users: [],
    isLoading: false,
    error: null
}

const userSlice = createSlice({
    name: 'users',
    initialState: initialState,
    reducers: {
        getUsersStart(state) {
            state.isLoading = true
            state.error = null
        },
        getUsersSuccess(state, action: PayloadAction<User[]>) {
            state.users = action.payload
            state.isLoading = false
        },
        getUsersFailure(state, action: PayloadAction<string>) {
            state.error = action.payload
            state.isLoading = false
        }
    }
})

export const { getUsersStart, getUsersFailure, getUsersSuccess} = userSlice.actions

export default userSlice.reducer

export const fetchUsers = (): AppThunk => async (dispatch) => {
    try {
        dispatch(getUsersStart())
        const res = await axios.get<User[]>(`https://jsonplaceholder.typicode.com/users`)
        dispatch(getUsersSuccess(res.data))
    } catch (error: any) {
        const error2 = error as AxiosError
        dispatch(getUsersFailure(error2.message))
    }
}