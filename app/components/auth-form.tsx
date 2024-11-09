'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button } from '~/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

type FormType = 'sign-in' | 'sign-up'

type AuthFormProps = {
  type: FormType
}

const authFormSchema = (formType: FormType) =>
  z.object({
    email: z.string().email(),
    fullName:
      formType === 'sign-in'
        ? z.string().email()
        : z.string().email().optional(),
  })

export default function AuthForm({ type }: AuthFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const formSchema = authFormSchema(type)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  const title = type === 'sign-in' ? 'Sign In' : 'Sign Up'

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <h1 className="form-title">{title}</h1>
          {type === 'sign-up' && (
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <div className="shad-form-item">
                    <FormLabel className="shad-form-label">Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your full name" {...field} />
                    </FormControl>
                  </div>
                  <FormMessage className="text-red"></FormMessage>
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <div className="shad-form-item">
                  <FormLabel className="shad-form-label">
                    Email Address
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email address" {...field} />
                  </FormControl>
                </div>
                <FormMessage className="text-red"></FormMessage>
              </FormItem>
            )}
          />
          <Button
            className="w-full form-submit-button uppercase"
            type="submit"
            disabled={isLoading}
          >
            {title}
            {isLoading && (
              <Image
                src="/assets/icons/loader.svg"
                alt="loading"
                width={24}
                height={24}
                className="ml-2 animate-spin"
              />
            )}
          </Button>
          {errorMessage && <p className="error-message">*{errorMessage}</p>}
          <div className="body-2 flex justify-center">
            <p className="text-light-100 text-center">
              {type === 'sign-in'
                ? "Don't have an account?"
                : 'Already have an account?'}
            </p>
            <Link
              className="ml-1 font-medium text-brand"
              href={type === 'sign-in' ? '/sign-up' : '/sign-in'}
            >
              {title}
            </Link>
          </div>
        </form>
      </Form>

      {/* OTP Authentication */}
    </>
  )
}

// Path: app/components/auth-form.tsx
// Created at: 23:14:12 - 08/11/2024
// Language: Typescript
