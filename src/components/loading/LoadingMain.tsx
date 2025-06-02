import Lottie from 'lottie-react'
import animationData from '../../constants/main_loading.json'

const LoadingMain = () => {
  return (
    <div className="min-h-[100dvh] flex items-center justify-center">
      <Lottie animationData={animationData} loop autoplay />
    </div>
  )
}

export default LoadingMain