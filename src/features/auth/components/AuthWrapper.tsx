import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui'
import { type PropsWithChildren } from 'react'
import { Link } from 'react-router'
import { AuthSocial } from './AuthSocial'

interface AuthWrapperProps {
  heading: string
  description?: string
  backButtonLabel?: string
  backButtonHref?: string
  isShowSocial?: boolean
}

export const AuthWrapper = ({
  children,
  heading,
  description,
  backButtonHref,
  backButtonLabel,
  isShowSocial,
}: PropsWithChildren<AuthWrapperProps>) => {
  return (
    <Card className='w-100 '>
      <CardHeader className='spase-y-2'>
        <CardTitle>{heading}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        {isShowSocial && <AuthSocial />}
        {children}
      </CardContent>
      <CardFooter>
        {backButtonLabel && backButtonHref && (
          <Button variant='link' className='w-full font-normal'>
            <Link to={backButtonHref}>{backButtonLabel}</Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
