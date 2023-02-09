import {render, screen} from '@testing-library/react'
import SignupForm from './index'
import React from 'react'

describe('sign up form renders all label elements', () => {
  const signup = React.Dispatch<React.SetStateAction<string>>

  test('checking email', ()=> {
      render(<SignupForm setPerson={signup}/>)
      const email = screen.getByText('Email')
      expect(email).toBeInTheDocument()
  })
  test('checking firstname', ()=> {
      render(<SignupForm setPerson={signup}/>)
      const firstname = screen.getByText('Firstname')
      expect(firstname).toBeInTheDocument()
  })
  test('checking surname', ()=> {
      render(<SignupForm setPerson={signup}/>)
      const surname = screen.getByText('Surname')
      expect(surname).toBeInTheDocument()
  })
  test('checking select Account type', ()=> {
      render(<SignupForm setPerson={signup}/>)
      const type = screen.getByText('Select account type')
      expect(type).toBeInTheDocument()
  })
  test('checking parent code', ()=> {
      render(<SignupForm setPerson={signup}/>)
      const code = screen.getByText('Student Code (Parent account only)')
      expect(code).toBeInTheDocument()
  })

})
describe('sign up form renders all input elements', () => {
  const signup = React.Dispatch<React.SetStateAction<string>>

  test('checking email', ()=> {
      render(<SignupForm setPerson={signup}/>)
      const email = screen.getByTestId('emailInput')
      expect(email).toBeInTheDocument()
  })
  test('checking firstname', ()=> {
      render(<SignupForm setPerson={signup}/>)
      const firstname = screen.getByTestId('firstnameInput')
      expect(firstname).toBeInTheDocument()
  })
  test('checking surname', ()=> {
      render(<SignupForm setPerson={signup}/>)
      const surname = screen.getByTestId('surnameInput')
      expect(surname).toBeInTheDocument()
  })
  test('checking select Account type', ()=> {
      render(<SignupForm setPerson={signup}/>)
      const type = screen.getByTestId('typeInput')
      expect(type).toBeInTheDocument()
  })
  test('checking parent code', ()=> {
      render(<SignupForm setPerson={signup}/>)
      const code = screen.getByTestId('studentCode')
      expect(code).toBeInTheDocument()
  })

})

test('submit button renders', () => {
  const signup = React.Dispatch<React.SetStateAction<string>>

  render(<SignupForm setPerson={signup}/>)
  const button = screen.getByRole('button', {name: 'Submit'})
  expect(button).toBeInTheDocument()
})