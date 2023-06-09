import Head from 'next/head'
import { Inter } from 'next/font/google'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { Nav } from '~/components/Dashboard/Nav'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const session = useSession()
  const supabase = useSupabaseClient()

  return (
    <>
      <Head>
        <title>Twitch Voting</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav session={session} />
      <main className="h-screen mx-6">
        {!session ? (
          <div className="flex items-center justify-center h-full">
            <Auth
              supabaseClient={supabase}
              appearance={{ theme: ThemeSupa }}
              theme="dark"
              providers={['twitch']}
              onlyThirdPartyProviders={true}
            />
          </div>
        ) : (
          <p>Test</p>
        )}
      </main>
    </>
  )
}
