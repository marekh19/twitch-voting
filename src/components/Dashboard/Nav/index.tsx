import type { FC } from 'react'
import { useState, useEffect } from 'react'
import {
  Session,
  useSupabaseClient,
  useUser,
} from '@supabase/auth-helpers-react'
import { Database } from '~/utils/database.types'

type Profiles = Database['public']['Tables']['profiles']['Row']

type Props = {
  session: Session | null
}

export const Nav: FC<Props> = ({ session }) => {
  const supabase = useSupabaseClient<Database>()
  const user = useUser()
  console.log(user)

  const [isLoading, setIsLoading] = useState(false)
  const [username, setUsername] = useState<Profiles['username']>(null)
  const [avatar_url, setAvatarUrl] = useState<Profiles['avatar_url']>(null)

  useEffect(() => {
    getUserDetails()
  }, [session])

  const getUserDetails = async () => {
    try {
      setIsLoading(true)
      if (!user) throw new Error('No user logged in')

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`username, avatar_url`)
        .eq('id', user.id)
        .single()

      if (data) {
        setUsername(data.username)
        setAvatarUrl(data.avatar_url)
      }
    } catch (error) {
      alert('Error loading user data!')
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <header className="w-full bg-indigo-500 h-14 px-6 flex justify-between items-center">
      <h1 className="text-xl font-bold">Twitch voting</h1>
      {session && (
        <div className="flex gap-2">
          <p>{username}</p>
        </div>
      )}
    </header>
  )
}
