import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Signup() {
    const [step, setStep] = useState(0)
    const [data, setData] = useState({})
    const navigate = useNavigate()
    const stepName = ['', 'Personal Info.', 'Residency Info.', 'Bank Verification']

    const apiHost = import.meta.env.API_HOST || 'http://localhost:5000' //will change when it get deployed
    const signupApiEndpoint = `${apiHost}/signup`

    function onClickIndividual(e) {
        e.preventDefault()
        setStep(1)
    }

    function onSubmitPage(e) {
        e.preventDefault()
        console.log(data)
        const stepData = new FormData(e.target)
        if (step === 1) {
            const username = stepData.get('username')
            const email = stepData.get('email')
            const password = stepData.get('password')
            //check everything is filled
            if (!username || !email || !password) {
                return
            }
            //check for terms
            if (stepData.get('terms') !== 'on') {
                //add warning here for accept terms
                return
            }
            setData({
                username: username,
                email: email,
                password: password,
            })
        } else if (step === 2) {
            const phone_number = stepData.get('phone_number')
            const address = stepData.get('address')
            const country = stepData.get('country')
            if (!phone_number || !address || !country) {
                return
            }
            setData(oldData => {
                return {
                    ...oldData,
                    phone_number: phone_number,
                    address: address,
                    country: country,
                }
            })
        } else if (step === 3) {
            const bvn = stepData.get('bvn')
            if (!bvn) {
                return
            }
            setData(oldData => {
                return { ...oldData, bvn: bvn }
            })
        }
        if (step < 3) setStep(step => step + 1)
        else if (step === 3) {
            //send data to server and redirect to success page
            console.log(JSON.stringify(data))
            fetch(signupApiEndpoint, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' },
            })
                .then(res => {
                    if (res.status === 200) {
                        navigate('/signupsuccess', { replace: true })
                    } else console.log('error not 200 status')
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    function onClickBack() {
        setStep(step => step - 1)
    }

    return (
        <div className='flex h-screen'>
            <div
                id='textShow'
                className='relative basis-5/12 h-full flex flex-col items-center justify-center text-white'>
                <div className='w-3/4 relative text-lg leading-8 mt-6'>
                    <div className='gayathri-font text-8xl absolute top-[-3rem] left-[-0.5rem]'>"</div>
                    <div>
                        The passage experienced a surge in popularity during the 1960s when Letraset used it on their
                        dry-transfer sheets, and again during the 90s as desktop publishers bundled the text with their
                        software.
                    </div>
                    <div className='flex items-center gap-2 justify-start mt-4'>
                        Vincent Obi
                        <span>
                            <svg
                                width='16'
                                height='16'
                                viewBox='0 0 16 16'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'>
                                <path
                                    fillRule='evenodd'
                                    clipRule='evenodd'
                                    d='M0.666748 8C0.666748 3.94991 3.94999 0.666664 8.00008 0.666664C12.0502 0.666664 15.3334 3.94991 15.3334 8C15.3334 12.0501 12.0502 15.3333 8.00008 15.3333C3.94999 15.3333 0.666748 12.0501 0.666748 8Z'
                                    fill='#08AD36'
                                />
                                <path
                                    fillRule='evenodd'
                                    clipRule='evenodd'
                                    d='M11.5405 5.36195C11.8009 5.6223 11.8009 6.04441 11.5405 6.30476L7.40248 10.6381C7.14213 10.8984 6.72002 10.8984 6.45967 10.6381L4.45967 8.6381C4.19932 8.37775 4.19932 7.95564 4.45967 7.69529C4.72002 7.43494 5.14213 7.43494 5.40248 7.69529L6.93107 9.22388L10.5977 5.36195C10.8581 5.1016 11.2802 5.1016 11.5405 5.36195Z'
                                    fill='white'
                                />
                            </svg>
                        </span>
                    </div>
                    <div className='absolute right-4 mt-4'>
                        <svg width='34' height='33' viewBox='0 0 34 33' fill='none' xmlns='http://www.w3.org/2000/svg'>
                            <path d='M21 0H33.5V33H0V20.5H21V0Z' fill='white' />
                        </svg>
                    </div>
                </div>
                <div className='absolute right-40 top-36'>
                    <svg width='61' height='56' viewBox='0 0 61 56' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <path
                            d='M2.09915 56C2.78535 56 3.34162 55.4437 3.34162 54.7575C3.34162 54.0713 2.78535 53.5151 2.09915 53.5151C1.41296 53.5151 0.856689 54.0713 0.856689 54.7575C0.856689 55.4437 1.41296 56 2.09915 56Z'
                            fill='#DE6944'
                        />
                        <path
                            d='M2.09915 45.2621C2.78535 45.2621 3.34162 44.7058 3.34162 44.0196C3.34162 43.3334 2.78535 42.7772 2.09915 42.7772C1.41296 42.7772 0.856689 43.3334 0.856689 44.0196C0.856689 44.7058 1.41296 45.2621 2.09915 45.2621Z'
                            fill='#DE6944'
                        />
                        <path
                            d='M2.09915 34.5229C2.78535 34.5229 3.34162 33.9666 3.34162 33.2804C3.34162 32.5942 2.78535 32.0379 2.09915 32.0379C1.41296 32.0379 0.856689 32.5942 0.856689 33.2804C0.856689 33.9666 1.41296 34.5229 2.09915 34.5229Z'
                            fill='#DE6944'
                        />
                        <path
                            d='M2.09915 23.8731C2.78535 23.8731 3.34162 23.3169 3.34162 22.6307C3.34162 21.9445 2.78535 21.3882 2.09915 21.3882C1.41296 21.3882 0.856689 21.9445 0.856689 22.6307C0.856689 23.3169 1.41296 23.8731 2.09915 23.8731Z'
                            fill='#DE6944'
                        />
                        <path
                            d='M2.09915 13.1352C2.78535 13.1352 3.34162 12.579 3.34162 11.8928C3.34162 11.2066 2.78535 10.6503 2.09915 10.6503C1.41296 10.6503 0.856689 11.2066 0.856689 11.8928C0.856689 12.579 1.41296 13.1352 2.09915 13.1352Z'
                            fill='#DE6944'
                        />
                        <path
                            d='M2.10062 2.48575C2.78681 2.48575 3.34308 1.92948 3.34308 1.24329C3.34308 0.557094 2.78681 0.000823975 2.10062 0.000823975C1.41442 0.000823975 0.858154 0.557094 0.858154 1.24329C0.858154 1.92948 1.41442 2.48575 2.10062 2.48575Z'
                            fill='#DE6944'
                        />
                        <path
                            d='M59.6094 55.9992C60.2956 55.9992 60.8519 55.4429 60.8519 54.7567C60.8519 54.0706 60.2956 53.5143 59.6094 53.5143C58.9232 53.5143 58.3669 54.0706 58.3669 54.7567C58.3669 55.4429 58.9232 55.9992 59.6094 55.9992Z'
                            fill='#DE6944'
                        />
                        <path
                            d='M59.6094 45.2613C60.2956 45.2613 60.8519 44.705 60.8519 44.0188C60.8519 43.3326 60.2956 42.7763 59.6094 42.7763C58.9232 42.7763 58.3669 43.3326 58.3669 44.0188C58.3669 44.705 58.9232 45.2613 59.6094 45.2613Z'
                            fill='#DE6944'
                        />
                        <path
                            d='M59.6094 34.522C60.2956 34.522 60.8519 33.9658 60.8519 33.2796C60.8519 32.5934 60.2956 32.0371 59.6094 32.0371C58.9232 32.0371 58.3669 32.5934 58.3669 33.2796C58.3669 33.9658 58.9232 34.522 59.6094 34.522Z'
                            fill='#DE6944'
                        />
                        <path
                            d='M59.6094 23.8724C60.2956 23.8724 60.8519 23.3161 60.8519 22.6299C60.8519 21.9437 60.2956 21.3875 59.6094 21.3875C58.9232 21.3875 58.3669 21.9437 58.3669 22.6299C58.3669 23.3161 58.9232 23.8724 59.6094 23.8724Z'
                            fill='#DE6944'
                        />
                        <path
                            d='M59.6094 13.1344C60.2956 13.1344 60.8519 12.5781 60.8519 11.8919C60.8519 11.2057 60.2956 10.6495 59.6094 10.6495C58.9232 10.6495 58.3669 11.2057 58.3669 11.8919C58.3669 12.5781 58.9232 13.1344 59.6094 13.1344Z'
                            fill='#DE6944'
                        />
                        <path
                            d='M59.6096 2.48493C60.2958 2.48493 60.8521 1.92866 60.8521 1.24246C60.8521 0.55627 60.2958 0 59.6096 0C58.9235 0 58.3672 0.55627 58.3672 1.24246C58.3672 1.92866 58.9235 2.48493 59.6096 2.48493Z'
                            fill='#DE6944'
                        />
                        <path
                            d='M48.1609 55.9992C48.8471 55.9992 49.4034 55.4429 49.4034 54.7567C49.4034 54.0706 48.8471 53.5143 48.1609 53.5143C47.4747 53.5143 46.9185 54.0706 46.9185 54.7567C46.9185 55.4429 47.4747 55.9992 48.1609 55.9992Z'
                            fill='#DE6944'
                        />
                        <path
                            d='M48.1609 45.2613C48.8471 45.2613 49.4034 44.705 49.4034 44.0188C49.4034 43.3326 48.8471 42.7763 48.1609 42.7763C47.4747 42.7763 46.9185 43.3326 46.9185 44.0188C46.9185 44.705 47.4747 45.2613 48.1609 45.2613Z'
                            fill='#DE6944'
                        />
                        <path
                            d='M48.1609 34.522C48.8471 34.522 49.4034 33.9658 49.4034 33.2796C49.4034 32.5934 48.8471 32.0371 48.1609 32.0371C47.4747 32.0371 46.9185 32.5934 46.9185 33.2796C46.9185 33.9658 47.4747 34.522 48.1609 34.522Z'
                            fill='#DE6944'
                        />
                        <path
                            d='M48.1609 23.8724C48.8471 23.8724 49.4034 23.3161 49.4034 22.6299C49.4034 21.9437 48.8471 21.3875 48.1609 21.3875C47.4747 21.3875 46.9185 21.9437 46.9185 22.6299C46.9185 23.3161 47.4747 23.8724 48.1609 23.8724Z'
                            fill='#DE6944'
                        />
                        <path
                            d='M48.1609 13.1344C48.8471 13.1344 49.4034 12.5781 49.4034 11.8919C49.4034 11.2057 48.8471 10.6495 48.1609 10.6495C47.4747 10.6495 46.9185 11.2057 46.9185 11.8919C46.9185 12.5781 47.4747 13.1344 48.1609 13.1344Z'
                            fill='#DE6944'
                        />
                        <path
                            d='M48.1604 2.48493C48.8466 2.48493 49.4029 1.92866 49.4029 1.24246C49.4029 0.55627 48.8466 0 48.1604 0C47.4742 0 46.918 0.55627 46.918 1.24246C46.918 1.92866 47.4742 2.48493 48.1604 2.48493Z'
                            fill='#DE6944'
                        />
                        <path
                            d='M36.6238 55.9992C37.31 55.9992 37.8663 55.4429 37.8663 54.7567C37.8663 54.0706 37.31 53.5143 36.6238 53.5143C35.9376 53.5143 35.3813 54.0706 35.3813 54.7567C35.3813 55.4429 35.9376 55.9992 36.6238 55.9992Z'
                            fill='#DE6944'
                        />
                        <path
                            d='M36.6238 45.2613C37.31 45.2613 37.8663 44.705 37.8663 44.0188C37.8663 43.3326 37.31 42.7763 36.6238 42.7763C35.9376 42.7763 35.3813 43.3326 35.3813 44.0188C35.3813 44.705 35.9376 45.2613 36.6238 45.2613Z'
                            fill='#DE6944'
                        />
                        <path
                            d='M36.6238 34.522C37.31 34.522 37.8663 33.9658 37.8663 33.2796C37.8663 32.5934 37.31 32.0371 36.6238 32.0371C35.9376 32.0371 35.3813 32.5934 35.3813 33.2796C35.3813 33.9658 35.9376 34.522 36.6238 34.522Z'
                            fill='#DE6944'
                        />
                        <path
                            d='M36.6238 23.8724C37.31 23.8724 37.8663 23.3161 37.8663 22.6299C37.8663 21.9437 37.31 21.3875 36.6238 21.3875C35.9376 21.3875 35.3813 21.9437 35.3813 22.6299C35.3813 23.3161 35.9376 23.8724 36.6238 23.8724Z'
                            fill='#DE6944'
                        />
                        <path
                            d='M36.6238 13.1344C37.31 13.1344 37.8663 12.5781 37.8663 11.8919C37.8663 11.2057 37.31 10.6495 36.6238 10.6495C35.9376 10.6495 35.3813 11.2057 35.3813 11.8919C35.3813 12.5781 35.9376 13.1344 36.6238 13.1344Z'
                            fill='#DE6944'
                        />
                        <path
                            d='M36.6233 2.48493C37.3095 2.48493 37.8658 1.92866 37.8658 1.24246C37.8658 0.55627 37.3095 0 36.6233 0C35.9371 0 35.3809 0.55627 35.3809 1.24246C35.3809 1.92866 35.9371 2.48493 36.6233 2.48493Z'
                            fill='#DE6944'
                        />
                        <path
                            d='M25.0865 55.9992C25.7727 55.9992 26.3289 55.4429 26.3289 54.7567C26.3289 54.0706 25.7727 53.5143 25.0865 53.5143C24.4003 53.5143 23.844 54.0706 23.844 54.7567C23.844 55.4429 24.4003 55.9992 25.0865 55.9992Z'
                            fill='#DE6944'
                        />
                        <path
                            d='M25.0865 45.2613C25.7727 45.2613 26.3289 44.705 26.3289 44.0188C26.3289 43.3326 25.7727 42.7763 25.0865 42.7763C24.4003 42.7763 23.844 43.3326 23.844 44.0188C23.844 44.705 24.4003 45.2613 25.0865 45.2613Z'
                            fill='#DE6944'
                        />
                        <path
                            d='M25.0865 34.522C25.7727 34.522 26.3289 33.9658 26.3289 33.2796C26.3289 32.5934 25.7727 32.0371 25.0865 32.0371C24.4003 32.0371 23.844 32.5934 23.844 33.2796C23.844 33.9658 24.4003 34.522 25.0865 34.522Z'
                            fill='#DE6944'
                        />
                        <path
                            d='M25.0865 23.8724C25.7727 23.8724 26.3289 23.3161 26.3289 22.6299C26.3289 21.9437 25.7727 21.3875 25.0865 21.3875C24.4003 21.3875 23.844 21.9437 23.844 22.6299C23.844 23.3161 24.4003 23.8724 25.0865 23.8724Z'
                            fill='#DE6944'
                        />
                        <path
                            d='M25.0865 13.1344C25.7727 13.1344 26.3289 12.5781 26.3289 11.8919C26.3289 11.2057 25.7727 10.6495 25.0865 10.6495C24.4003 10.6495 23.844 11.2057 23.844 11.8919C23.844 12.5781 24.4003 13.1344 25.0865 13.1344Z'
                            fill='#DE6944'
                        />
                        <path
                            d='M25.086 2.48493C25.7722 2.48493 26.3284 1.92866 26.3284 1.24246C26.3284 0.55627 25.7722 0 25.086 0C24.3998 0 23.8435 0.55627 23.8435 1.24246C23.8435 1.92866 24.3998 2.48493 25.086 2.48493Z'
                            fill='#DE6944'
                        />
                        <path
                            d='M13.5496 55.9992C14.2358 55.9992 14.7921 55.4429 14.7921 54.7567C14.7921 54.0706 14.2358 53.5143 13.5496 53.5143C12.8634 53.5143 12.3071 54.0706 12.3071 54.7567C12.3071 55.4429 12.8634 55.9992 13.5496 55.9992Z'
                            fill='#DE6944'
                        />
                        <path
                            d='M13.5496 45.2613C14.2358 45.2613 14.7921 44.705 14.7921 44.0188C14.7921 43.3326 14.2358 42.7763 13.5496 42.7763C12.8634 42.7763 12.3071 43.3326 12.3071 44.0188C12.3071 44.705 12.8634 45.2613 13.5496 45.2613Z'
                            fill='#DE6944'
                        />
                        <path
                            d='M13.5496 34.522C14.2358 34.522 14.7921 33.9658 14.7921 33.2796C14.7921 32.5934 14.2358 32.0371 13.5496 32.0371C12.8634 32.0371 12.3071 32.5934 12.3071 33.2796C12.3071 33.9658 12.8634 34.522 13.5496 34.522Z'
                            fill='#DE6944'
                        />
                        <path
                            d='M13.5496 23.8724C14.2358 23.8724 14.7921 23.3161 14.7921 22.6299C14.7921 21.9437 14.2358 21.3875 13.5496 21.3875C12.8634 21.3875 12.3071 21.9437 12.3071 22.6299C12.3071 23.3161 12.8634 23.8724 13.5496 23.8724Z'
                            fill='#DE6944'
                        />
                        <path
                            d='M13.5496 13.1344C14.2358 13.1344 14.7921 12.5781 14.7921 11.8919C14.7921 11.2057 14.2358 10.6495 13.5496 10.6495C12.8634 10.6495 12.3071 11.2057 12.3071 11.8919C12.3071 12.5781 12.8634 13.1344 13.5496 13.1344Z'
                            fill='#DE6944'
                        />
                        <path
                            d='M13.5489 2.48493C14.2351 2.48493 14.7913 1.92866 14.7913 1.24246C14.7913 0.55627 14.2351 0 13.5489 0C12.8627 0 12.3064 0.55627 12.3064 1.24246C12.3064 1.92866 12.8627 2.48493 13.5489 2.48493Z'
                            fill='#DE6944'
                        />
                    </svg>
                </div>
                <svg
                    className='absolute bottom-5 left-0'
                    width='111'
                    height='122'
                    viewBox='0 0 111 122'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'>
                    <path
                        d='M50.0879 121.176C16.9599 121.176 -10 94.216 -10 61.0879C-10 27.9599 16.9599 1 50.0879 1C83.216 1 110.176 27.9599 110.176 61.0879C110.176 94.216 83.216 121.176 50.0879 121.176ZM50.0879 23.9401C29.6428 23.9401 12.9401 40.5735 12.9401 61.0879C12.9401 81.6024 29.5735 98.2357 50.0879 98.2357C70.6024 98.2357 87.2357 81.6024 87.2357 61.0879C87.2357 40.5735 70.6024 23.9401 50.0879 23.9401Z'
                        stroke='#E82965'
                        strokeWidth='0.693056'
                        strokeMiterlimit='10'
                    />
                </svg>

                <div className='absolute top-10 left-20 flex justify-start gap-4 items-end'>
                    <svg width='44' height='30' viewBox='0 0 44 30' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <path
                            fillRule='evenodd'
                            clipRule='evenodd'
                            d='M10.506 28.7517C7.86923 29.9003 4.98068 30.2576 2.18354 29.8175C0.395723 29.5362 -0.435764 27.5944 0.226389 25.9101C0.888543 24.2257 2.81925 23.4695 4.6289 23.4451C5.74072 23.4302 6.84936 23.1958 7.88853 22.7431C9.94214 21.8485 11.5563 20.1747 12.3758 18.09C13.1954 16.0053 13.1532 13.6805 12.2586 11.6268C11.8059 10.5877 11.1537 9.66103 10.3497 8.89293C9.04112 7.64275 8.14234 5.77412 8.80449 4.08979C9.46665 2.40545 11.3979 1.54975 12.8986 2.56125C14.1094 3.37728 15.1935 4.36514 16.1172 5.49215C16.3489 5.77496 16.7889 5.77497 17.0207 5.49216C19.1554 2.88728 22.1047 1.0766 25.3936 0.351648C28.6825 -0.373304 32.1197 0.0296555 35.1517 1.49565C38.1838 2.96165 40.6342 5.40537 42.1086 8.43336C42.9639 10.1899 43.4618 12.0838 43.5894 14.007C43.7432 16.3251 41.4393 17.788 39.1692 17.2942C36.8991 16.8004 35.5817 14.4045 34.625 12.2875C34.5991 12.2301 34.5723 12.173 34.5447 12.1163C33.8972 10.7866 32.8211 9.71347 31.4897 9.0697C30.1582 8.42593 28.6488 8.24897 27.2045 8.56733C25.7602 8.88568 24.4651 9.68081 23.5277 10.8247C22.5902 11.9686 22.065 13.3947 22.0366 14.8734C22.0082 16.352 22.4783 17.7973 23.3711 18.9763C24.2639 20.1554 25.5275 20.9997 26.9585 21.3733C27.0195 21.3892 27.0807 21.4043 27.1421 21.4184C29.4058 21.9405 32.0138 22.7616 32.9439 24.8904C33.8741 27.0193 32.8923 29.5657 30.5892 29.8703C28.6784 30.123 26.7236 30.0068 24.8333 29.5133C21.5746 28.6626 18.6971 26.7399 16.664 24.055C16.6164 23.9921 16.5215 23.9921 16.4738 24.055C14.9338 26.0887 12.8861 27.7148 10.506 28.7517Z'
                            fill='white'
                        />
                    </svg>
                    <div className='font-semibold'>Oasis</div>
                </div>
            </div>
            {step === 0 && (
                <div id='step1' className='h-full flex-1'>
                    <div className='w-fit ml-auto mr-12 mt-10 text-[#8692A6]'>
                        Already have an account?
                        <Link className='ml-2 text-[#1565D8] hover:text-blue-400 cursor-pointer ' to='/signin'>
                            Sign In
                        </Link>
                    </div>
                    <div className='w-1/2 ml-24 mt-20'>
                        <div className='font-extrabold text-xl leading-10'>Join Us!</div>
                        <div className='text-[#8692A6] w-3/4 text-sm'>
                            To begin this journey, tell us what type of account you’d be opening.
                        </div>
                        <div
                            className='blockSelect flex items-center gap-6 mt-8 px-6 py-4  border-2 border-transparent hover:border-[#1565D8] rounded-md shadow-lg drop-shadow cursor-pointer'
                            onClick={onClickIndividual}>
                            <div className='relative'>
                                <svg
                                    width='50'
                                    height='48'
                                    viewBox='0 0 50 48'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'>
                                    <path
                                        className='svgToFill'
                                        d='M25 0L49.7275 17.9656L40.2824 47.0344H9.71758L0.272532 17.9656L25 0Z'
                                        stroke='#1565D8'
                                        strokeWidth='1.4'
                                    />
                                </svg>
                                <svg
                                    className='absolute top-[calc(25px-10px)] left-[calc(24px-9px)] z-10'
                                    width='20'
                                    height='20'
                                    viewBox='0 0 20 20'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'>
                                    <path
                                        fillRule='evenodd'
                                        clipRule='evenodd'
                                        d='M3.72039 12.8871C4.50179 12.1057 5.5616 11.6667 6.66667 11.6667H13.3333C14.4384 11.6667 15.4982 12.1057 16.2796 12.8871C17.061 13.6685 17.5 14.7283 17.5 15.8333V17.5C17.5 17.9602 17.1269 18.3333 16.6667 18.3333C16.2064 18.3333 15.8333 17.9602 15.8333 17.5V15.8333C15.8333 15.1703 15.5699 14.5344 15.1011 14.0656C14.6323 13.5967 13.9964 13.3333 13.3333 13.3333H6.66667C6.00363 13.3333 5.36774 13.5967 4.8989 14.0656C4.43006 14.5344 4.16667 15.1703 4.16667 15.8333V17.5C4.16667 17.9602 3.79357 18.3333 3.33333 18.3333C2.8731 18.3333 2.5 17.9602 2.5 17.5V15.8333C2.5 14.7283 2.93899 13.6685 3.72039 12.8871Z'
                                        fill='white'
                                    />
                                    <path
                                        fillRule='evenodd'
                                        clipRule='evenodd'
                                        d='M9.99992 3.33333C8.61921 3.33333 7.49992 4.45262 7.49992 5.83333C7.49992 7.21404 8.61921 8.33333 9.99992 8.33333C11.3806 8.33333 12.4999 7.21404 12.4999 5.83333C12.4999 4.45262 11.3806 3.33333 9.99992 3.33333ZM5.83325 5.83333C5.83325 3.53214 7.69873 1.66666 9.99992 1.66666C12.3011 1.66666 14.1666 3.53214 14.1666 5.83333C14.1666 8.13452 12.3011 10 9.99992 10C7.69873 10 5.83325 8.13452 5.83325 5.83333Z'
                                        fill='white'
                                    />
                                </svg>
                            </div>
                            <div>
                                <div className='font-bold'>Individual</div>
                                <div className='text-sm text-[#8692A6]'>
                                    Personal account to manage all you activities.
                                </div>
                            </div>
                            <svg
                                width='14'
                                height='14'
                                viewBox='0 0 14 14'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'>
                                <path
                                    fillRule='evenodd'
                                    clipRule='evenodd'
                                    d='M7.5893 0.577414C7.26386 0.251977 6.73622 0.251977 6.41079 0.577414C6.08535 0.90285 6.08535 1.43049 6.41079 1.75592L10.8215 6.16667H1.16671C0.70647 6.16667 0.333374 6.53977 0.333374 7C0.333374 7.46024 0.70647 7.83334 1.16671 7.83334H10.8215L6.41079 12.2441C6.08535 12.5695 6.08535 13.0972 6.41079 13.4226C6.73622 13.748 7.26386 13.748 7.5893 13.4226L13.4226 7.58926C13.7481 7.26382 13.7481 6.73618 13.4226 6.41075L7.5893 0.577414Z'
                                    fill='#1565D8'
                                />
                            </svg>
                        </div>
                        <div className='blockSelect flex items-center gap-6 mt-8 px-6 py-4 border-2 border-transparent hover:border-[#1565D8] rounded-md shadow-lg drop-shadow cursor-pointer'>
                            <div className='relative'>
                                <svg
                                    width='50'
                                    height='48'
                                    viewBox='0 0 50 48'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'>
                                    <path
                                        d='M1.09543 18.2329L25 0.865247L48.9046 18.2329L39.7738 46.3344H10.2262L1.09543 18.2329Z'
                                        stroke='#1565D8'
                                        strokeWidth='1.4'
                                    />
                                </svg>
                                <svg
                                    className='absolute top-[calc(25px-10px)] left-[calc(24px-9px)]'
                                    width='20'
                                    height='20'
                                    viewBox='0 0 20 20'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'>
                                    <path
                                        fillRule='evenodd'
                                        clipRule='evenodd'
                                        d='M3.33325 6.66667C2.87301 6.66667 2.49992 7.03976 2.49992 7.5V15.8333C2.49992 16.2936 2.87301 16.6667 3.33325 16.6667H16.6666C17.1268 16.6667 17.4999 16.2936 17.4999 15.8333V7.5C17.4999 7.03976 17.1268 6.66667 16.6666 6.66667H3.33325ZM0.833252 7.5C0.833252 6.11929 1.95254 5 3.33325 5H16.6666C18.0473 5 19.1666 6.11929 19.1666 7.5V15.8333C19.1666 17.214 18.0473 18.3333 16.6666 18.3333H3.33325C1.95254 18.3333 0.833252 17.214 0.833252 15.8333V7.5Z'
                                        fill='#1565D8'
                                    />
                                    <path
                                        fillRule='evenodd'
                                        clipRule='evenodd'
                                        d='M6.56549 2.3989C7.03433 1.93006 7.67021 1.66667 8.33325 1.66667H11.6666C12.3296 1.66667 12.9655 1.93006 13.4344 2.3989C13.9032 2.86774 14.1666 3.50363 14.1666 4.16667V17.5C14.1666 17.9602 13.7935 18.3333 13.3333 18.3333C12.873 18.3333 12.4999 17.9602 12.4999 17.5V4.16667C12.4999 3.94565 12.4121 3.73369 12.2558 3.57741C12.0996 3.42113 11.8876 3.33333 11.6666 3.33333H8.33325C8.11224 3.33333 7.90028 3.42113 7.744 3.57741C7.58772 3.73369 7.49992 3.94565 7.49992 4.16667V17.5C7.49992 17.9602 7.12682 18.3333 6.66658 18.3333C6.20635 18.3333 5.83325 17.9602 5.83325 17.5V4.16667C5.83325 3.50363 6.09664 2.86774 6.56549 2.3989Z'
                                        fill='#1565D8'
                                    />
                                </svg>
                            </div>
                            <div>
                                <div className='font-bold'>Business</div>
                                <div className='text-sm text-[#8692A6]'>
                                    Own or belong to a company, this is for you.
                                </div>
                            </div>
                            <svg
                                width='14'
                                height='14'
                                viewBox='0 0 14 14'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'>
                                <path
                                    fillRule='evenodd'
                                    clipRule='evenodd'
                                    d='M7.5893 0.577414C7.26386 0.251977 6.73622 0.251977 6.41079 0.577414C6.08535 0.90285 6.08535 1.43049 6.41079 1.75592L10.8215 6.16667H1.16671C0.70647 6.16667 0.333374 6.53977 0.333374 7C0.333374 7.46024 0.70647 7.83334 1.16671 7.83334H10.8215L6.41079 12.2441C6.08535 12.5695 6.08535 13.0972 6.41079 13.4226C6.73622 13.748 7.26386 13.748 7.5893 13.4226L13.4226 7.58926C13.7481 7.26382 13.7481 6.73618 13.4226 6.41075L7.5893 0.577414Z'
                                    fill='#1565D8'
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            )}
            {step && (
                <div className='h-full flex-1'>
                    <div className='flex justify-between items-start mr-12 mt-10 text-[#8692A6] px-14'>
                        <div
                            className='back flex items-center gap-3 hover:text-stone-600 cursor-pointer'
                            onClick={onClickBack}>
                            <svg
                                width='8'
                                height='16'
                                viewBox='0 0 8 16'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'>
                                <path
                                    d='M9.86251 2.225L8.37918 0.75L0.137512 9L8.38751 17.25L9.86251 15.775L3.08751 9L9.86251 2.225Z'
                                    className='fill-[#8692A6]'
                                />
                            </svg>
                            Back
                        </div>
                        <div className='text-end text-sm'>
                            <div className='text-[#BDBDBD] text-xs'>STEP 0{step}/03</div>
                            <div>{stepName[step]}</div>
                        </div>
                    </div>
                    {step === 1 && (
                        <div className='w-1/2 ml-24 mt-8'>
                            <div>
                                <div className='font-extrabold text-2xl leading-10'>Register Individual Account!</div>
                                <div className='text-[#8692A6] text-sm'>
                                    For the purpose of industry regulation, your details are required.
                                </div>
                                <form className='mt-6' onSubmit={onSubmitPage}>
                                    <Input
                                        name={'username'}
                                        placeholder='Enter Username'
                                        type='text'
                                        heading='Your fullname*'
                                    />
                                    <Input
                                        name='email'
                                        placeholder='Enter email address'
                                        type='text'
                                        heading='Email address*'
                                    />
                                    <Input
                                        name='password'
                                        placeholder='Enter password'
                                        type='password'
                                        heading='Create password*'
                                    />
                                    <div className='mt-4 text-[#696F79]'>
                                        <label>
                                            <input type='checkbox' className='mr-2 ' name='terms' />I agree to terms &
                                            conditions
                                        </label>
                                    </div>
                                    <button className='bg-[#1565D8] text-white rounded-md w-full py-3 mt-4'>
                                        Register Account
                                    </button>
                                </form>
                                <div className='flex items-center'>
                                    <div className='w-1/2 h-[1px] bg-[#F5F5F5]'></div>
                                    <div>Or</div>
                                    <div className='w-1/2 h-[1px] bg-[#F5F5F5]'></div>
                                </div>
                                <button className='flex border border-gray-100 rounded-md w-full pl-4 gap-24 py-3 drop-shadow-sm'>
                                    <svg
                                        width='24'
                                        height='24'
                                        viewBox='0 0 24 24'
                                        fill='none'
                                        xmlns='http://www.w3.org/2000/svg'>
                                        <path
                                            d='M21.8055 10.0415H21V10H12V14H17.6515C16.827 16.3285 14.6115 18 12 18C8.6865 18 6 15.3135 6 12C6 8.6865 8.6865 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C6.4775 2 2 6.4775 2 12C2 17.5225 6.4775 22 12 22C17.5225 22 22 17.5225 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z'
                                            fill='#FFC107'
                                        />
                                        <path
                                            d='M3.15302 7.3455L6.43851 9.755C7.32752 7.554 9.48052 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C8.15902 2 4.82802 4.1685 3.15302 7.3455Z'
                                            fill='#FF3D00'
                                        />
                                        <path
                                            d='M12 22C14.583 22 16.93 21.0115 18.7045 19.404L15.6095 16.785C14.5717 17.5742 13.3037 18.0011 12 18C9.39897 18 7.19047 16.3415 6.35847 14.027L3.09747 16.5395C4.75247 19.778 8.11347 22 12 22Z'
                                            fill='#4CAF50'
                                        />
                                        <path
                                            d='M21.8055 10.0415H21V10H12V14H17.6515C17.2571 15.1082 16.5467 16.0766 15.608 16.7855L15.6095 16.7845L18.7045 19.4035C18.4855 19.6025 22 17 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z'
                                            fill='#1976D2'
                                        />
                                    </svg>
                                    <div>Register with Google</div>
                                </button>
                            </div>
                        </div>
                    )}
                    {[2, 3].includes(step) && (
                        <div className='w-1/2 ml-24 mt-8'>
                            <div className='font-extrabold text-2xl leading-10'>Complete Your Profile!</div>
                            <div className='text-[#8692A6] text-sm'>
                                For the purpose of industry regulation, your details are required.
                            </div>
                            <form className='mt-6' onSubmit={onSubmitPage}>
                                {step === 2 && (
                                    <div>
                                        <Input
                                            name='phone_number'
                                            placeholder='Please enter phone number'
                                            type='text'
                                            heading='Phone number'
                                        />
                                        <Input
                                            name='address'
                                            placeholder='Please enter address'
                                            type='text'
                                            heading='Your address'
                                        />
                                        <Input
                                            name='country'
                                            placeholder='Please select'
                                            type='text'
                                            heading='Country of residence'
                                        />
                                    </div>
                                )}
                                {step === 3 && (
                                    <div>
                                        <Input
                                            name='bvn'
                                            placeholder='Please enter Bank verification number'
                                            type='text'
                                            heading='Bank verification number (BVN)'
                                        />
                                    </div>
                                )}
                                <button className='bg-[#1565D8] text-white rounded-md w-full py-3 mt-12'>
                                    Save & Continue
                                </button>
                            </form>
                            <div className='flex justify-center items-center gap-2 mt-6'>
                                <svg
                                    width='10'
                                    height='14'
                                    viewBox='0 0 10 14'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'>
                                    <path
                                        fillRule='evenodd'
                                        clipRule='evenodd'
                                        d='M7.91665 4.95833H8.49998C9.14165 4.95833 9.66665 5.48333 9.66665 6.125V11.9583C9.66665 12.6 9.14165 13.125 8.49998 13.125H1.49998C0.858313 13.125 0.333313 12.6 0.333313 11.9583V6.125C0.333313 5.48333 0.858313 4.95833 1.49998 4.95833H2.08331V3.79167C2.08331 2.18167 3.38998 0.875 4.99998 0.875C6.60998 0.875 7.91665 2.18167 7.91665 3.79167V4.95833ZM4.99998 2.04167C4.03165 2.04167 3.24998 2.82333 3.24998 3.79167V4.95833H6.74998V3.79167C6.74998 2.82333 5.96831 2.04167 4.99998 2.04167ZM1.49998 11.9583V6.125H8.49998V11.9583H1.49998ZM6.16665 9.04167C6.16665 9.68333 5.64165 10.2083 4.99998 10.2083C4.35831 10.2083 3.83331 9.68333 3.83331 9.04167C3.83331 8.4 4.35831 7.875 4.99998 7.875C5.64165 7.875 6.16665 8.4 6.16665 9.04167Z'
                                        fill='#8692A6'
                                    />
                                </svg>
                                <p className='text-xs text-[#8692A6]'>Your Info is safely secured</p>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

function Input({ name, placeholder, type, heading }) {
    return (
        <div>
            {/* <div className='text-[#696F79] mb-2 mt-3'>{heading}</div> */}
            <label className='text-[#696F79] relative'>
                {heading}

                <input
                    placeholder={placeholder}
                    required
                    type={type}
                    name={name}
                    className='border border-[#8692A6] rounded-md h-12 w-full pl-4 mt-2 mb-3 placeholder:text-[#8692A6] outline-none focus-within:drop-shadow focus-within:border-[#1565D8]'
                />
                {type === 'password' && (
                    <div
                        className='absolute -bottom-1 right-3 text-black hover:text-stone-700'
                        onClick={e => {
                            if (e.currentTarget.previousSibling.type === 'password') {
                                e.currentTarget.previousSibling.type = 'text'
                                e.currentTarget.textContent = 'Hide'
                            } else {
                                e.currentTarget.previousSibling.type = 'password'
                                e.currentTarget.textContent = 'Show'
                            }
                        }}>
                        Show
                    </div>
                )}
            </label>
        </div>
    )
}

export default Signup
