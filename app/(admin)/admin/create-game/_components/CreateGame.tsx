
import CreateForm from './CreateForm'
import { Separator } from '@/components/ui/separator'

const CreateGame = () => {
  return (
    <div className='w-full h-full max-w-[1440px] border border-white flex flex-col p-4 gap-2'>
        <h1>
            Create Game
        </h1>
        <Separator />
        <CreateForm />

    </div>
  )
}

export default CreateGame