
import CreateForm from './CreateForm'
import { Separator } from '@/components/ui/separator'

const CreateGame = () => {
  return (
    <div className='w-full h-full min-h-screen max-w-[1440px] flex flex-col p-4 gap-2'>
        <CreateForm />
    </div>
  )
}

export default CreateGame