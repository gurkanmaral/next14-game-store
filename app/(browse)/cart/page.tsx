import dynamic from 'next/dynamic'
import CheckoutPage from './_components/CheckoutPage'

const noSSR = dynamic(()=>import('./_components/CheckoutPage'),{ssr:false})

const Page = () => {
  const DynamicCheckoutPage = noSSR;
  return (
    <div className='pt-10 max-w-screen-xl  mx-auto gap-10 flex flex-col items-center'>
        <DynamicCheckoutPage />

    </div>
  )
}

export default Page