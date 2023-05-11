import { configureStore } from '@reduxjs/toolkit'
import companiesSlice from './companiesSlice'
import  productsSlice  from './productsSlice'

const store = configureStore({
  reducer: {
    companies: companiesSlice,
    products: productsSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>

export default store