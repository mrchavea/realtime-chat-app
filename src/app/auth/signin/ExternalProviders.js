import SigInProviderButton from './SignInProviderButton'

export default function ExternalProviders ({providers}) {
    
    return (
        Object.keys(providers)
        .filter(key => key != 'credentials')
        .map(providerKey => 
            <div key={providerKey} className='mt-4'> 
                <SigInProviderButton provider={providers[providerKey]}/>
            </div>
        )
    )
  }